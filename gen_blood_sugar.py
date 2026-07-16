import os, json, time, struct, wave
import urllib.request, urllib.error

API_KEY  = "YOUR_ELEVENLABS_API_KEY"
VOICE_ID = "nPczCjzI2devNBz1zQrb"  # Brian
MODEL    = "eleven_multilingual_v2"
OUT_DIR  = os.path.join(os.path.expanduser("~"), "Downloads")
FPS      = 30

SCENES = {
    "scene1": "Your blood sugar is lying to you. Your fasting glucose looks fine. The damage is happening between meals.",
    "scene2": "Your doctor checks fasting glucose and HbA1c — both snapshots taken when your blood sugar is at its lowest. They miss the 4 to 6 hours after every meal when most metabolic damage is done. Studies show 80 percent of people with normal fasting glucose still experience significant postprandial spikes.",
    "scene3": "Every glucose spike triggers glycation, oxidative stress, an insulin surge, and a wave of inflammation. This is happening multiple times a day in most people. And their doctor has no idea because the test is not designed to catch it.",
    "scene4": "Signs your blood sugar is spiking without a test: crashing after meals, intense cravings two hours later, belly fat that does not respond to diet, and afternoon energy crashes. Sound familiar?",
    "scene5": "To flatten your glucose curve: eat fibre and protein first, carbs last — this alone reduces spikes by up to 73 percent. Take a 10 minute walk after meals. Never eat carbs alone. These four habits change your metabolic health faster than any supplement.",
    "scene6": "Do you crash after meals or stay steady? Your answer tells us a lot about your metabolic health. Drop it below.",
    "scene7": "Follow The Long Game for daily longevity science. Save this — your blood sugar is listening.",
}

BUDGET = {
    "scene1": 105,
    "scene2": 120,
    "scene3": 120,
    "scene4": 105,
    "scene5": 120,
    "scene6": 105,
    "scene7":  90,
}


def get_mp3_duration_frames(path: str, fps: int) -> int:
    size = os.path.getsize(path)
    bitrate = 128 * 1000 / 8
    seconds = size / bitrate
    return round(seconds * fps)


def generate_tts(scene_id: str, text: str) -> bytes:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    payload = json.dumps({
        "text": text,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.2},
    }).encode()
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"xi-api-key": API_KEY, "Content-Type": "application/json", "Accept": "audio/mpeg"},
        method="POST",
    )
    with urllib.request.urlopen(req) as r:
        return r.read()


def add_silence(audio_data: bytes, silence_frames: int, fps: int) -> bytes:
    if silence_frames <= 0:
        return audio_data
    silence_seconds = silence_frames / fps
    n_samples = int(44100 * silence_seconds)
    buf = struct.pack('<' + 'h' * n_samples, *([0] * n_samples))
    import io
    wav_buf = io.BytesIO()
    with wave.open(wav_buf, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(44100)
        wf.writeframes(buf)
    return audio_data + wav_buf.getvalue()


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    all_chunks = {}
    audio_parts = []

    for scene_id, text in SCENES.items():
        print(f"Generating {scene_id}...")
        for attempt in range(3):
            try:
                audio = generate_tts(scene_id, text)
                break
            except Exception as e:
                print(f"  Attempt {attempt+1} failed: {e}")
                if attempt < 2:
                    time.sleep(3)
                else:
                    raise

        audio_frames = get_mp3_duration_frames(
            __import__('tempfile').NamedTemporaryFile(suffix='.mp3', delete=False,
                dir=OUT_DIR).name, FPS
        )
        # Write temp to measure
        tmp_path = os.path.join(OUT_DIR, f"_tmp_{scene_id}.mp3")
        with open(tmp_path, 'wb') as f:
            f.write(audio)
        audio_frames = get_mp3_duration_frames(tmp_path, FPS)
        os.remove(tmp_path)

        budget = BUDGET[scene_id]
        gap = max(0, budget - audio_frames)
        print(f"  {scene_id}: {audio_frames} frames (budget {budget}, gap {gap})")

        all_chunks[scene_id] = {
            "audio_frames": audio_frames,
            "budget_frames": budget,
        }
        audio_parts.append(audio)
        time.sleep(0.5)

    # Concatenate all audio into one MP3
    combined = b"".join(audio_parts)
    out_mp3 = os.path.join(OUT_DIR, "blood_sugar.mp3")
    with open(out_mp3, 'wb') as f:
        f.write(combined)
    print(f"\nSaved: {out_mp3}")

    # Build caption timing JSON with cumulative offsets
    timings = {}
    cursor = 0
    for scene_id, text in SCENES.items():
        af = all_chunks[scene_id]["audio_frames"]
        bf = all_chunks[scene_id]["budget_frames"]
        words = text.split()
        n = len(words)
        chunks = []
        # Split into ~8-word caption chunks
        chunk_size = 8
        word_cursor = 0
        chunk_start = 0
        i = 0
        while i < n:
            end_i = min(i + chunk_size, n)
            chunk_text = " ".join(words[i:end_i])
            chunk_end = round(chunk_start + (end_i - i) / n * af)
            chunks.append({"text": chunk_text, "startFrame": chunk_start, "endFrame": chunk_end})
            chunk_start = chunk_end + 8
            i = end_i

        timings[scene_id] = {
            "chunks": chunks,
            "audio_frames": af,
            "budget_frames": bf,
        }
        cursor += af

    out_json = os.path.join(OUT_DIR, "caption_timings_blood_sugar.json")
    with open(out_json, 'w') as f:
        json.dump(timings, f, indent=2)
    print(f"Saved: {out_json}")
    print("\nUpload both files to Claude.")


if __name__ == "__main__":
    main()
