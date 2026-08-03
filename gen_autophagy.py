import os, json, time
import urllib.request

API_KEY  = "YOUR_ELEVENLABS_API_KEY"
VOICE_ID = "nPczCjzI2devNBz1zQrb"  # Brian
MODEL    = "eleven_multilingual_v2"
OUT_DIR  = os.path.join(os.path.expanduser("~"), "Downloads")
FPS      = 30

SCENES = {
    "scene1": "Your body has a self-cleaning mode. Most people never activate it. Here is how it works.",
    "scene2": "Autophagy — from the Greek for self-eating — is the process by which your cells identify damaged proteins, dysfunctional organelles, and cellular debris, and break them down for recycling. It is your body's built-in quality control system. Yoshinori Ohsumi won the 2016 Nobel Prize in Medicine for mapping it. The science establishment called it one of the most important biological discoveries of the century.",
    "scene3": "Autophagy is the answer to both problems we covered this week. It clears zombie cells before their inflammatory signals spread. It resolves chronic inflammation by degrading the very proteins that trigger the inflammatory cascade. It protects brain cells by clearing amyloid and tau proteins. And it removes dysfunctional mitochondria before they leak the free radicals that age you from the inside.",
    "scene4": "Four things switch your self-cleaning mode off. Constant eating — every meal triggers insulin, which directly suppresses autophagy. Excess protein activating mTOR — autophagy's direct off switch. Chronic stress impairing the rate of cellular clearance. And poor sleep — the majority of neuronal autophagy happens during deep sleep. Cut it short and you halt the brain's overnight cleanup.",
    "scene5": "Four ways to switch it back on. Fast for 16 to 18 hours — autophagy begins meaningfully around 14 to 16 hours without food. Zone 2 exercise strongly induces it in muscle, liver, and brain simultaneously. Black coffee — caffeine and polyphenols independently activate autophagy, which is one of the mechanisms behind coffee's longevity data. And protect your deep sleep at all costs.",
    "scene6": "This week was a trilogy. Tuesday — zombie cells accumulate when autophagy fails to clear them. Wednesday — chronic inflammation persists when autophagy fails to resolve it. Friday — autophagy is the mechanism that fixes both. Fast. Move. Sleep. Your cells will do the rest.",
    "scene7": "Are you accidentally keeping your self-cleaning mode off? Constant eating. Poor sleep. No fasting. No Zone 2. Drop your honest answer below.",
    "scene8": "Follow The Long Game for daily longevity science. Save this. Your cells are waiting for the signal.",
}

BUDGET = {
    "scene1":  80,
    "scene2": 155,
    "scene3": 155,
    "scene4": 155,
    "scene5": 155,
    "scene6": 130,
    "scene7":  95,
    "scene8":  80,
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

    out_mp3 = os.path.join(OUT_DIR, "autophagy.mp3")
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

    out_json = os.path.join(OUT_DIR, "caption_timings_autophagy.json")
    with open(out_json, 'w') as f:
        json.dump(timings, f, indent=2)
    print(f"Saved: {out_json}")
    print("\nUpload both files to Claude.")


if __name__ == "__main__":
    main()
