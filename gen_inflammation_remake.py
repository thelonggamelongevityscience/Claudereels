import os, json, time
import urllib.request

API_KEY  = "YOUR_ELEVENLABS_API_KEY"
VOICE_ID = "nPczCjzI2devNBz1zQrb"  # Brian
MODEL    = "eleven_multilingual_v2"
OUT_DIR  = os.path.join(os.path.expanduser("~"), "Downloads")
FPS      = 30

SCENES = {
    "scene1": "Almost every disease that will kill you starts here. Chronic inflammation. And it is already happening inside you.",
    "scene2": "Inflammation was built to save you. Acute inflammation heals wounds and fights infections. That is exactly what it is designed for. But chronic inflammation is the same immune response stuck permanently at low grade. No wound to heal. No infection to fight. Just a continuous internal fire that slowly damages everything it touches. Most people have it. Almost nobody knows.",
    "scene3": "Heart disease. Type 2 diabetes. Alzheimer's. Cancer. Arthritis. Depression. Obesity. Non-alcoholic fatty liver disease. These are not separate diseases with separate causes. They are downstream consequences of the same upstream problem — chronic inflammation. Put out the fire and you reduce the risk of all of them simultaneously.",
    "scene4": "What is feeding the fire? Four sources most people never connect. Seed oils with omega-6 to omega-3 ratios up to 20 to 1. Chronic stress activating the master switch for inflammatory genes. Poor sleep — even one bad night measurably raises inflammatory cytokines. And ultra-processed food triggering the same pathways independently.",
    "scene5": "There is a blood test for this. It is called hs-CRP — high-sensitivity C-reactive protein. It predicts cardiovascular disease more powerfully than LDL cholesterol. It is almost never on a standard panel. Ask your doctor to add it. Below 1.0 is optimal. Most people have never seen this number.",
    "scene6": "To lower your inflammation starting today: remove seed oils — switch to olive oil or butter, this single swap lowers hs-CRP within two weeks. Prioritise sleep — it normalises inflammatory cytokines faster than any supplement. Add omega-3 daily. And do Zone 2 exercise — 150 minutes a week produces anti-inflammatory adaptations nothing else can replicate.",
    "scene7": "Send this to someone who complains of fatigue, brain fog, or joint pain. Those are not random symptoms. That is the fire. Now they know.",
    "scene8": "Follow The Long Game for daily longevity science. Save this. The fire is either burning or you are putting it out. There is no middle ground.",
}

BUDGET = {
    "scene1":  90,
    "scene2": 160,
    "scene3": 140,
    "scene4": 140,
    "scene5": 140,
    "scene6": 150,
    "scene7": 100,
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

    out_mp3 = os.path.join(OUT_DIR, "inflammation_remake.mp3")
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

    out_json = os.path.join(OUT_DIR, "caption_timings_inflammation_remake.json")
    with open(out_json, 'w') as f:
        json.dump(timings, f, indent=2)
    print(f"Saved: {out_json}")
    print("\nUpload both files to Claude.")


if __name__ == "__main__":
    main()
