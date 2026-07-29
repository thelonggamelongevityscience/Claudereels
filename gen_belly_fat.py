import os, json, time
import urllib.request

API_KEY  = "YOUR_ELEVENLABS_API_KEY"
VOICE_ID = "nPczCjzI2devNBz1zQrb"  # Brian
MODEL    = "eleven_multilingual_v2"
OUT_DIR  = os.path.join(os.path.expanduser("~"), "Downloads")
FPS      = 30

SCENES = {
    "scene1": "The belly fat is not a diet problem. It is a hormone problem. That is why cutting calories alone never works. Here is what is actually happening.",
    "scene2": "Not all belly fat is the same. Subcutaneous fat — the soft fat under your skin — is relatively harmless. Visceral fat — packed around your organs — produces inflammatory cytokines continuously, drives insulin resistance, and is far more dangerous. This is the one most people are actually fighting.",
    "scene3": "Two hormones make visceral fat almost impossible to shift. Cortisol — chronic stress specifically directs fat storage to the abdomen. And insulin — when chronically elevated, the body cannot access fat for fuel regardless of caloric deficit. High cortisol plus high insulin is the combination that makes visceral fat completely resistant to conventional dieting.",
    "scene4": "High-intensity exercise without adequate recovery raises cortisol further. For someone already cortisol-dominant, adding more intense training can increase visceral fat accumulation rather than reduce it. Zone 2 aerobic exercise — not HIIT — is what the evidence actually supports for visceral fat specifically.",
    "scene5": "How to actually shift it: fix sleep first — cortisol normalisation starts here and visceral fat responds to sleep quality faster than to diet. Lower insulin through time-restricted eating and less refined carbohydrate. Zone 2 exercise four times per week. And manage the stress system — no protocol works while cortisol is chronically elevated.",
    "scene6": "Have you been blaming your diet when it was actually your hormones? Most people have. Drop a yes below if this reframes it for you.",
    "scene7": "Follow The Long Game for daily longevity science. Save this and send it to someone who has been dieting without results.",
}

BUDGET = {
    "scene1": 90,
    "scene2": 180,
    "scene3": 200,
    "scene4": 180,
    "scene5": 200,
    "scene6": 120,
    "scene7":  90,
}


def get_mp3_duration_frames(path: str, fps: int) -> int:
    size = os.path.getsize(path)
    bitrate = 128 * 1000 / 8
    seconds = size / bitrate
    return round(seconds * fps)


def generate_tts(text: str) -> bytes:
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


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    all_chunks = {}
    audio_parts = []

    for scene_id, text in SCENES.items():
        print(f"Generating {scene_id}...")
        for attempt in range(3):
            try:
                audio = generate_tts(text)
                break
            except Exception as e:
                print(f"  Attempt {attempt+1} failed: {e}")
                if attempt < 2:
                    time.sleep(3)
                else:
                    raise

        tmp_path = os.path.join(OUT_DIR, f"_tmp_{scene_id}.mp3")
        with open(tmp_path, 'wb') as f:
            f.write(audio)
        audio_frames = get_mp3_duration_frames(tmp_path, FPS)
        os.remove(tmp_path)

        budget = BUDGET[scene_id]
        print(f"  {scene_id}: {audio_frames} frames (budget {budget})")

        all_chunks[scene_id] = {"audio_frames": audio_frames, "budget_frames": budget}
        audio_parts.append(audio)
        time.sleep(0.5)

    out_mp3 = os.path.join(OUT_DIR, "belly_fat.mp3")
    with open(out_mp3, 'wb') as f:
        f.write(b"".join(audio_parts))
    print(f"\nSaved: {out_mp3}")

    timings = {}
    for scene_id, text in SCENES.items():
        af = all_chunks[scene_id]["audio_frames"]
        bf = all_chunks[scene_id]["budget_frames"]
        words = text.split()
        n = len(words)
        chunks = []
        chunk_size = 8
        chunk_start = 0
        i = 0
        while i < n:
            end_i = min(i + chunk_size, n)
            chunk_text = " ".join(words[i:end_i])
            chunk_end = round(chunk_start + (end_i - i) / n * af)
            chunks.append({"text": chunk_text, "startFrame": chunk_start, "endFrame": chunk_end})
            chunk_start = chunk_end + 8
            i = end_i
        timings[scene_id] = {"chunks": chunks, "audio_frames": af, "budget_frames": bf}

    out_json = os.path.join(OUT_DIR, "caption_timings_belly_fat.json")
    with open(out_json, 'w') as f:
        json.dump(timings, f, indent=2)
    print(f"Saved: {out_json}")
    print("\nUpload both files to Claude.")


if __name__ == "__main__":
    main()
