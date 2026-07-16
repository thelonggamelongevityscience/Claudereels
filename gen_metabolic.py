import os, json, time
import urllib.request

API_KEY  = "YOUR_ELEVENLABS_API_KEY"
VOICE_ID = "nPczCjzI2devNBz1zQrb"  # Brian
MODEL    = "eleven_multilingual_v2"
OUT_DIR  = os.path.join(os.path.expanduser("~"), "Downloads")
FPS      = 30

SCENES = {
    "scene1": "88% of people are metabolically unhealthy. Most of them think they are fine. Are you one of them?",
    "scene2": "88% of Americans fail at least one marker of metabolic health. The five markers: blood pressure, fasting glucose, triglycerides, HDL cholesterol, and waist circumference. You need all five in range without medication. Most people do not make it.",
    "scene3": "Insulin resistance — the root of metabolic syndrome — develops silently for 10 to 15 years before any standard test catches it. The decade before diagnosis is when intervention is most powerful. Standard care is not designed to catch you in the window. You have to catch yourself.",
    "scene4": "Every major disease of ageing starts here. Type 2 diabetes. Cardiovascular disease. Alzheimer's — now called Type 3 diabetes by researchers. And cancer. One metabolic dysfunction. Four of the leading causes of death.",
    "scene5": "How to know where you actually stand: fasting insulin — the earliest warning signal almost nobody tests. HbA1c below 5.4. Triglyceride to HDL ratio below 1.5. And ApoB — the actual cardiovascular risk marker your standard panel is not measuring.",
    "scene6": "Have you ever had your fasting insulin tested? Most people have not. And it is the most important number most doctors never order. Comment LABS below and I will send you the full blood test guide.",
    "scene7": "Follow The Long Game for daily longevity science. Save this. Your metabolic health is either working for you or against you right now.",
}

BUDGET = {
    "scene1": 105,
    "scene2": 130,
    "scene3": 130,
    "scene4": 120,
    "scene5": 130,
    "scene6": 105,
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

    out_mp3 = os.path.join(OUT_DIR, "metabolic.mp3")
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

    out_json = os.path.join(OUT_DIR, "caption_timings_metabolic.json")
    with open(out_json, 'w') as f:
        json.dump(timings, f, indent=2)
    print(f"Saved: {out_json}")
    print("\nUpload both files to Claude.")


if __name__ == "__main__":
    main()
