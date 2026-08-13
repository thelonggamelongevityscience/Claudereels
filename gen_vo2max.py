"""
ElevenLabs TTS generator — POST49 VO2 Max Reel
Voice: Brian (nPczCjzI2devNBz1zQrb), eleven_multilingual_v2
Output: vo2max.mp3 + caption_timings_vo2max.json
"""
import json, os, time, base64
import requests

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "vo2max.mp3"
OUT_JSON = "caption_timings_vo2max.json"

SCENES = [
    {
        "id": "s1",
        "title": "Hook",
        "text": (
            "The one number that predicts how long you live. "
            "It's not your cholesterol, not your weight. "
            "It's a number almost nobody has ever measured."
        ),
    },
    {
        "id": "s2",
        "title": "Whats Happening",
        "text": (
            "VO2 max measures the maximum oxygen your body can use during intense exercise. "
            "It reflects how efficiently your heart, lungs, blood, and muscles work together as one system. "
            "A study of over 122,000 people found it predicted mortality more powerfully than smoking, diabetes, or heart disease. "
            "It was the single strongest predictor measured."
        ),
    },
    {
        "id": "s3",
        "title": "Why It Matters",
        "text": (
            "People in the lowest fitness quartile had nearly 5 times the mortality risk of elite fitness — "
            "a bigger gap than any single traditional risk factor. "
            "Moving from low to just below average cut risk roughly in half. "
            "And it's one of the most trainable traits in human physiology at any age."
        ),
    },
    {
        "id": "s4",
        "title": "What Works Against You",
        "text": (
            "Sitting most of the day — deconditioning happens faster than most people realise. "
            "Only doing low-intensity movement — walking helps, but VO2 max needs higher-intensity effort. "
            "Skipping cardio for strength training alone. "
            "And chronic under-recovery blunting the adaptations that raise it."
        ),
    },
    {
        "id": "s5",
        "title": "How To Raise It",
        "text": (
            "Zone 2 training 3 to 4 times a week — steady effort that builds the aerobic base. "
            "One interval session weekly — the most potent single stimulus for raising VO2 max. "
            "Consistency over intensity — the adaptation takes 8 to 12 weeks to show up meaningfully. "
            "And track it if your watch allows — a number you can actually follow over time."
        ),
    },
    {
        "id": "s6",
        "title": "Where You Stand",
        "text": (
            "Below average is roughly the bottom 25% for your age and sex — "
            "where the sharpest mortality risk increase shows up in the research. "
            "Moving even one category up is associated with a meaningful reduction in all-cause mortality risk. "
            "This is one of the few numbers in medicine you can meaningfully change. "
            "Most people have simply never measured it."
        ),
    },
    {
        "id": "s7",
        "title": "Loop Hook",
        "text": (
            "Have you ever had your VO2 max estimated? "
            "Most people have not. "
            "Drop a yes or no below."
        ),
    },
    {
        "id": "s8",
        "title": "CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this before your next workout."
        ),
    },
]

HEADERS = {"xi-api-key": API_KEY, "Content-Type": "application/json"}


def generate_scene(scene):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    payload = {
        "text": scene["text"],
        "model_id": MODEL,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
        "output_format": "mp3_44100_128",
    }
    for attempt in range(3):
        r = requests.post(url, headers=HEADERS, json=payload, timeout=60)
        if r.status_code == 200:
            data = r.json()
            audio_bytes = base64.b64decode(data["audio_base64"])
            return audio_bytes, data.get("alignment", {})
        print(f"  Attempt {attempt+1} failed: {r.status_code} {r.text[:200]}")
        time.sleep(2 ** attempt)
    raise RuntimeError(f"Failed to generate scene {scene['id']}")


def chunk_alignment(alignment, chunk_size=8):
    chars  = alignment.get("characters", [])
    starts = alignment.get("character_start_times_seconds", [])
    ends   = alignment.get("character_end_times_seconds", [])
    words, w_start, w_end = [], [], []
    cur_word, cs, ce = "", None, None
    for ch, s, e in zip(chars, starts, ends):
        if ch == " ":
            if cur_word:
                words.append(cur_word); w_start.append(cs); w_end.append(ce)
                cur_word, cs, ce = "", None, None
        else:
            cur_word += ch
            if cs is None: cs = s
            ce = e
    if cur_word:
        words.append(cur_word); w_start.append(cs); w_end.append(ce)
    chunks = []
    for i in range(0, len(words), chunk_size):
        batch = words[i:i+chunk_size]
        chunks.append({
            "chunk_index": len(chunks),
            "text": " ".join(batch),
            "start_time": w_start[i],
            "end_time": w_end[min(i+chunk_size-1, len(words)-1)],
            "word_count": len(batch),
        })
    return chunks


def main():
    all_chunks, audio_parts, t = [], [], 0.0
    for scene in SCENES:
        print(f"Generating {scene['id']}: {scene['title']}...")
        audio_bytes, alignment = generate_scene(scene)
        audio_parts.append(audio_bytes)
        chunks = chunk_alignment(alignment)
        duration = max(c["end_time"] for c in chunks) if chunks else 0.0
        all_chunks.append({
            "scene_id": scene["id"],
            "title":    scene["title"],
            "start_time": t,
            "duration":   duration,
            "chunks": [{**c, "start_time": c["start_time"]+t, "end_time": c["end_time"]+t} for c in chunks],
        })
        t += duration
        print(f"  Done. Duration: {duration:.3f}s  Chunks: {len(chunks)}")
        time.sleep(0.5)

    with open(OUT_MP3, "wb") as f:
        for p in audio_parts: f.write(p)
    print(f"\nWrote {OUT_MP3} ({os.path.getsize(OUT_MP3)//1024} KB)")

    with open(OUT_JSON, "w") as f:
        json.dump({"total_duration": t, "scenes": all_chunks}, f, indent=2)
    print(f"Wrote {OUT_JSON}")

    print("\n=== SCENE TIMING SUMMARY (30fps) ===")
    frame = 0
    for sc in all_chunks:
        frames = round(sc["duration"] * 30)
        print(f"{sc['scene_id']}: start={frame}f  duration={frames}f  ({sc['duration']:.3f}s)  [{sc['title']}]")
        frame += frames


if __name__ == "__main__":
    main()
