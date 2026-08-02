import os, json, time
import urllib.request

API_KEY  = "YOUR_ELEVENLABS_API_KEY"
VOICE_ID = "nPczCjzI2devNBz1zQrb"  # Brian
MODEL    = "eleven_multilingual_v2"
OUT_DIR  = os.path.join(os.path.expanduser("~"), "Downloads")
FPS      = 30

SCENES = {
    "scene1": "Your body is full of zombie cells. Billions of them. Right now. And they are spreading.",
    "scene2": "In 2016, the Mayo Clinic engineered mice to clear their senescent cells — their zombie cells. They lived 25% longer. Delayed cancer. Preserved heart and kidney function. Maintained muscle mass far longer than controls. One intervention. All of this. Stay with me.",
    "scene3": "When a cell is too damaged to divide safely it enters senescence — a permanent state of arrest. It should be cleared by your immune system. When it is not, it stays alive releasing a toxic cocktail of inflammatory signals called the SASP. And the SASP does something terrifying.",
    "scene4": "Zombie cells are contagious to healthy cells. The SASP signals from one senescent cell trigger senescence in the healthy cells around it — the damage multiplies outward. This is why chronic inflammation accelerates ageing so dramatically. It is not just inflammation. It is a spreading zombie infection at the cellular level.",
    "scene5": "Four things accelerate zombie cell accumulation: chronic inflammation, poor sleep, oxidative stress from seed oils and ultra-processed food, and sedentary behaviour. All four are lifestyle decisions. And all four are within your control.",
    "scene6": "Four natural senolytics that actually work: fasting 16 to 24 hours triggers autophagy — your body's built-in zombie cell clearance system. Zone 2 exercise is the most potent natural senolytic available. Quercetin and fisetin — plant compounds found in onions, apples, and strawberries — have genuine senolytic evidence. And an anti-inflammatory diet removes the primary fuel for new zombie cell creation.",
    "scene7": "Which of these four are you already doing to clear them? Fasting. Zone 2. Quercetin. Anti-inflammatory diet. Drop your number below.",
    "scene8": "Follow The Long Game for daily longevity science. Save this. Your zombie cells are listening.",
}

BUDGET = {
    "scene1":  90,
    "scene2": 130,
    "scene3": 130,
    "scene4": 130,
    "scene5": 115,
    "scene6": 140,
    "scene7": 110,
    "scene8":  90,
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

    out_mp3 = os.path.join(OUT_DIR, "zombie_cells_remake.mp3")
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

    out_json = os.path.join(OUT_DIR, "caption_timings_zombie_cells_remake.json")
    with open(out_json, 'w') as f:
        json.dump(timings, f, indent=2)
    print(f"Saved: {out_json}")
    print("\nUpload both files to Claude.")


if __name__ == "__main__":
    main()
