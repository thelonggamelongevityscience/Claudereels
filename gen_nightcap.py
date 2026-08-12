"""
ElevenLabs TTS generator — POST47 Nightcap & Sleep Reel
Voice: Brian (nPczCjzI2devNBz1zQrb), eleven_multilingual_v2
Output: nightcap.mp3 + caption_timings_nightcap.json
"""
import json, os, time, base64
import requests

API_KEY  = os.environ["ELEVENLABS_API_KEY"]
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "nightcap.mp3"
OUT_JSON = "caption_timings_nightcap.json"

SCENES = [
    {
        "id": "s1",
        "title": "Hook",
        "text": (
            "Passed out is not the same as asleep. "
            "That nightcap is stealing something you don't get back. "
            "Here's what alcohol actually does to your sleep."
        ),
    },
    {
        "id": "s2",
        "title": "Whats Happening",
        "text": (
            "Alcohol is a sedative — it knocks you out fast, which is why you fall asleep quicker. "
            "But it suppresses REM sleep almost completely during the first several hours. "
            "Then as your body metabolizes it, you get a REM rebound that fragments the second half of your night."
        ),
    },
    {
        "id": "s3",
        "title": "Why It Matters",
        "text": (
            "REM sleep is where memory consolidates — suppress it and you wake up having slept but not processed the day. "
            "Deep sleep drops too. "
            "Fragmentation rises. "
            "And that disrupted REM is directly linked to the anxious, foggy feeling the day after."
        ),
    },
    {
        "id": "s4",
        "title": "The Myths",
        "text": (
            "It helps me fall asleep — true, and irrelevant. "
            "Just one drink is harmless — false, even one drink measurably reduces REM. "
            "My tolerance protects my sleep — no, tolerance only changes how sedated you feel."
        ),
    },
    {
        "id": "s5",
        "title": "How To Protect It",
        "text": (
            "Stop drinking 3 to 4 hours before bed. "
            "Hydrate alongside every drink. "
            "Build in alcohol-free nights so REM debt doesn't compound. "
            "And track how you actually feel the next day — not how fast you fell asleep."
        ),
    },
    {
        "id": "s6",
        "title": "The Trade",
        "text": (
            "Alcohol gives you faster sleep onset and sedation. "
            "In exchange it takes REM suppression, deep sleep reduction, and a next-day cost most people blame on something else. "
            "It's not a sleep aid. It's a trade."
        ),
    },
    {
        "id": "s7",
        "title": "Loop Hook",
        "text": (
            "How many nights a week is your nightcap actually helping? "
            "Be honest with yourself. "
            "Drop your number below."
        ),
    },
    {
        "id": "s8",
        "title": "CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this for the next time you reach for a nightcap."
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
    chars = alignment.get("characters", [])
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
            "title": scene["title"],
            "start_time": t,
            "duration": duration,
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
