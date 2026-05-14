#!/usr/bin/env python3
"""
Compute precise caption timings from actual WAV files using energy-based VAD.
Reads each vo{n}.wav, detects speech/silence boundaries, matches to known chunks,
and writes caption_timings_precise.json + updates index.html cap() calls.
"""
import wave, json, struct, math, re
import numpy as np

ASSETS = "/home/user/Claudereels/hf-reel/assets"
INDEX_HTML = "/home/user/Claudereels/hf-reel/index.html"
OUT_JSON = "/home/user/Claudereels/caption_timings_precise.json"

# Scene start times in the global timeline (seconds)
SCENE_STARTS = {1: 0, 2: 11, 3: 26, 4: 35, 5: 48, 6: 64, 7: 77, 8: 88}

# Known pause positions: {scene_id: [(after_chunk_index, pause_ms), ...]}
# chunk_index is 0-based
PAUSES = {
    1: [(2, 800)],          # after "faster than smoking."
    2: [(1, 600), (2, 700)],# after "higher risk of death.", after "From sitting."
    6: [(0, 600), (1, 500)],# after "Thirty percent.", after "Lower blood sugar."
}

SCENES = {
    1: ["Sitting for 8 hours", "a day is killing you", "faster than smoking.",
        "Your doctor isn't", "telling you this."],
    2: ["A 40 percent", "higher risk of death.", "From sitting.",
        "Even in people who go", "to the gym.",
        "This is the Active Couch Potato effect."],
    3: ["Here's what's actually", "happening inside your body",
        "during prolonged sitting.", "And none of it is good."],
    4: ["One hour of exercise", "cannot cancel 8 hours", "of sitting.",
        "Sedentary time", "is an independent risk factor.", "Both things are true."],
    5: ["Two minutes of light walking", "every 30 minutes.", "That's the protocol.",
        "It reduces blood sugar spikes", "by 30 percent",
        "and restores the fat-clearing enzymes", "sitting shuts down."],
    6: ["Thirty percent.", "Lower blood sugar.", "From two-minute",
        "walking breaks.", "The intervention is", "almost embarrassingly simple."],
    7: ["How long did you", "sit today?", "Most people have no idea.",
        "Track it once.", "The number will", "surprise you."],
    8: ["Follow The Long Game", "for daily longevity science.", "Save this.",
        "Set your 30-minute alarm", "before you close this app."],
}


def read_wav(path):
    with wave.open(path) as w:
        sr = w.getframerate()
        n = w.getnframes()
        raw = w.readframes(n)
        sw = w.getsampwidth()
        ch = w.getnchannels()
    if sw == 2:
        samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
    else:
        samples = np.frombuffer(raw, dtype=np.int8).astype(np.float32) / 128.0
    if ch == 2:
        samples = samples.reshape(-1, 2).mean(axis=1)
    return samples, sr


def rms_energy(samples, sr, frame_ms=20):
    """Return array of RMS energy per frame_ms window."""
    frame_len = int(sr * frame_ms / 1000)
    n_frames = len(samples) // frame_len
    e = []
    for i in range(n_frames):
        seg = samples[i*frame_len:(i+1)*frame_len]
        e.append(math.sqrt(np.mean(seg**2)))
    return np.array(e), frame_len


def detect_speech_segments(samples, sr, frame_ms=20, threshold_db=-38,
                            min_speech_ms=80, min_silence_ms=60):
    """
    Return list of (start_sec, end_sec) speech segments.
    threshold_db: RMS below this level = silence.
    """
    energy, frame_len = rms_energy(samples, sr, frame_ms)
    thresh = 10 ** (threshold_db / 20)

    is_speech = energy > thresh

    # Smooth: close gaps < min_silence_ms, drop runs < min_speech_ms
    silence_frames = max(1, int(min_silence_ms / frame_ms))
    speech_frames  = max(1, int(min_speech_ms  / frame_ms))

    # Fill short silences
    i = 0
    while i < len(is_speech):
        if not is_speech[i]:
            j = i
            while j < len(is_speech) and not is_speech[j]:
                j += 1
            if (j - i) < silence_frames:
                is_speech[i:j] = True
            i = j
        else:
            i += 1

    # Collect segments
    segs = []
    in_seg = False
    start = 0
    for i, s in enumerate(is_speech):
        if s and not in_seg:
            start = i
            in_seg = True
        elif not s and in_seg:
            if (i - start) >= speech_frames:
                segs.append((start * frame_len / sr, i * frame_len / sr))
            in_seg = False
    if in_seg and (len(is_speech) - start) >= speech_frames:
        segs.append((start * frame_len / sr, len(samples) / sr))

    return segs


def assign_chunks_to_segments(segments, n_chunks, pauses_for_scene, wav_duration):
    """
    Given detected speech segments and the number of chunks,
    map segments → chunks. Strategy:
      - Scenes with pauses: segments correspond 1:1 with chunks.
      - Scenes without pauses: distribute segment time proportionally,
        or if too few segments detected, fall back to proportional assignment
        using actual segment boundaries where possible.
    Returns list of (start_sec, end_sec) per chunk (absolute within WAV).
    """
    n_segs = len(segments)

    if n_segs == n_chunks:
        # Perfect match — use detected boundaries directly
        return [(s, e) for s, e in segments]

    if n_segs > n_chunks:
        # More segments detected than chunks — merge nearby segments
        # Simple approach: merge the smallest gaps until count matches
        while len(segments) > n_chunks:
            # Find adjacent pair with smallest gap
            gaps = [(segments[i+1][0] - segments[i][1], i) for i in range(len(segments)-1)]
            _, idx = min(gaps)
            merged = (segments[idx][0], segments[idx+1][1])
            segments = segments[:idx] + [merged] + segments[idx+2:]
        return [(s, e) for s, e in segments]

    # Fewer segments than chunks — need to split.
    # Known pause positions help split at known boundaries.
    # Build expected timing using total speech time split by word count.
    chunks_in_scene = list(range(n_chunks))
    words = [len(SCENES.get(0, [])) for _ in chunks_in_scene]  # placeholder
    return None  # caller will use fallback


def process_scene(sid, samples, sr):
    wav_dur = len(samples) / sr
    scene_start = SCENE_STARTS[sid]
    chunks = SCENES[sid]
    n_chunks = len(chunks)
    pauses = PAUSES.get(sid, [])

    print(f"\n  Scene {sid}: {wav_dur:.4f}s, {n_chunks} chunks, {len(pauses)} pauses")

    # Try different thresholds to get the right segment count
    best_segs = None
    for thr in [-35, -40, -45, -32, -30, -50]:
        segs = detect_speech_segments(samples, sr, frame_ms=20,
                                      threshold_db=thr,
                                      min_speech_ms=80,
                                      min_silence_ms=60)
        print(f"    threshold={thr}dB → {len(segs)} segments")
        if len(segs) == n_chunks:
            best_segs = segs
            break
        if best_segs is None or abs(len(segs) - n_chunks) < abs(len(best_segs) - n_chunks):
            best_segs = segs

    if best_segs and len(best_segs) == n_chunks:
        print(f"    Perfect match at threshold — using VAD boundaries.")
        timings = [(s, e) for s, e in best_segs]
    elif best_segs and len(best_segs) > n_chunks:
        segs = list(best_segs)
        while len(segs) > n_chunks:
            gaps = [(segs[i+1][0] - segs[i][1], i) for i in range(len(segs)-1)]
            _, idx = min(gaps)
            merged = (segs[idx][0], segs[idx+1][1])
            segs = segs[:idx] + [merged] + segs[idx+2:]
        print(f"    Merged to {n_chunks} segments.")
        timings = [(s, e) for s, e in segs]
    else:
        # Fallback: proportional distribution using known WAV duration
        # Subtract known pause durations to get pure speech time
        total_pause_sec = sum(p/1000 for _, p in pauses)
        speech_time = wav_dur - total_pause_sec

        word_counts = [len(c.split()) for c in chunks]
        total_words = sum(word_counts)

        # Build timings accounting for pauses
        pause_map = {idx: ms/1000 for idx, ms in pauses}
        timings = []
        t = 0.0
        for i, (chunk, wc) in enumerate(zip(chunks, word_counts)):
            frac = wc / total_words
            dur = speech_time * frac
            start = t
            end = t + dur
            timings.append((start, end))
            t = end
            if i in pause_map:
                t += pause_map[i]

        print(f"    Fell back to proportional distribution.")

    # Build result with absolute timeline positions
    result = []
    for i, (start, end) in enumerate(timings):
        abs_start = round(scene_start + start, 3)
        abs_end   = round(scene_start + end,   3)
        # Last chunk: hold until WAV end
        if i == n_chunks - 1:
            abs_end = round(scene_start + wav_dur, 3)
        result.append({
            "text":       chunks[i],
            "start_sec":  abs_start,
            "end_sec":    abs_end,
        })
        print(f"    [{i+1}] '{chunks[i][:40]}' → {abs_start:.3f}–{abs_end:.3f}s")

    return result


def update_html(all_timings):
    with open(INDEX_HTML) as f:
        html = f.read()

    for sid, chunks in all_timings.items():
        n = len(chunks)
        new_lines = []
        for i, c in enumerate(chunks):
            new_lines.append(
                f'    cap("#s{sid}c{i+1}", {c["start_sec"]:.3f}, {c["end_sec"]:.3f});'
            )
        new_block = "\n".join(new_lines)

        # Replace existing cap block for this scene
        # Match all cap("#s{sid}c...) lines as a group
        pattern = r'(    cap\("#s' + str(sid) + r'c1".*?)(?=\n\n|\n    //|\n    tl\.|\n    window)'
        m = re.search(pattern, html, re.DOTALL)
        if m:
            html = html[:m.start()] + new_block + html[m.end():]
            print(f"  Updated S{sid} cap block in index.html")
        else:
            print(f"  WARNING: Could not find S{sid} cap block in index.html")

    with open(INDEX_HTML, "w") as f:
        f.write(html)


all_timings = {}

for sid in range(1, 9):
    path = f"{ASSETS}/vo{sid}.wav"
    samples, sr = read_wav(path)
    timings = process_scene(sid, samples, sr)
    all_timings[sid] = timings

# Save JSON
out = {}
for sid, chunks in all_timings.items():
    out[f"scene{sid}"] = {
        "chunks": [{"text": c["text"], "start_sec": c["start_sec"], "end_sec": c["end_sec"]}
                   for c in chunks]
    }
with open(OUT_JSON, "w") as f:
    json.dump(out, f, indent=2)
print(f"\nSaved {OUT_JSON}")

# Update index.html
update_html(all_timings)
print("Done.")
