"""
ElevenLabs TTS generator — POST50 Fiber Reel
Voice: Brian (nPczCjzI2devNBz1zQrb), eleven_multilingual_v2
Output: fiber.mp3 + caption_timings_fiber.json
"""
import json, os, time, base64
import requests

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "fiber.mp3"
OUT_JSON = "caption_timings_fiber.json"

SCENES = [
    {
        "id": "s1",
        "title": "Hook",
        "text": (
            "The most underrated longevity nutrient isn't protein. "
            "It's the one nearly everyone is quietly running short on."
        ),
    },
    {
        "id": "s2",
        "title": "Whats Happening",
        "text": (
            "Fiber passes undigested into your colon, where gut bacteria ferment it into compounds "
            "that reduce inflammation and regulate blood sugar. "
            "The recommended intake is 25 to 38 grams a day. "
            "The average adult eats roughly 15."
        ),
    },
    {
        "id": "s3",
        "title": "Why It Matters",
        "text": (
            "Every extra 8 grams of daily fiber is linked to meaningfully lower risk of "
            "heart disease, diabetes, and colorectal cancer. "
            "It blunts blood sugar spikes, drives gut diversity, "
            "and is one of the most powerful satiety levers available."
        ),
    },
    {
        "id": "s4",
        "title": "Whats Blocking It",
        "text": (
            "Refined carbs replaced whole ones. "
            "Protein-first eating crowded out vegetables and legumes. "
            "And fear of bloating stops people before they start — "
            "even though that effect resolves within a couple of weeks."
        ),
    },
    {
        "id": "s5",
        "title": "How To Close The Gap",
        "text": (
            "Add one legume serving daily. "
            "Keep the skin on your produce. "
            "Increase gradually over 2 to 3 weeks to avoid the bloating. "
            "And pair it with water so it can do its job."
        ),
    },
    {
        "id": "s6",
        "title": "Fiber By The Numbers",
        "text": (
            "A cup of lentils, a pear with skin, a cup of broccoli, and two tablespoons of chia seeds "
            "gets you to roughly 30 grams spread across a day. "
            "This is the most unglamorous nutrient in longevity science. "
            "It's also one of the most powerful."
        ),
    },
    {
        "id": "s7",
        "title": "Loop Hook",
        "text": (
            "What did you eat today that had fiber in it? "
            "Be honest — most people can't name one thing."
        ),
    },
    {
        "id": "s8",
        "title": "CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this before your next grocery run."
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
