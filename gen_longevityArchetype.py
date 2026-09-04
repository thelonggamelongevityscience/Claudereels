import requests, json, base64, os, time

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"

SCENES = [
    {
        "id": "scene1",
        "text": "Find your longevity archetype, based on the month you were born. Comment it below to find out.",
    },
    {
        "id": "scene2",
        "text": "Every birth month has an archetype. Find yours below. Then comment your month — I'll reply with your longevity trait to work on.",
    },
    {
        "id": "scene3",
        "text": "January through June — the Optimizer, the Steady One, the Night Owl, the Protocol Follower, the Hydrated One, the Perpetual Snoozer.",
    },
    {
        "id": "scene4",
        "text": "July through December — the Relentless One, the Immortal Mindset, Chaotic Good, the Ancestral Type, the Structured Mind, the Locked-In One.",
    },
    {
        "id": "scene5",
        "text": "Born in September? You're Chaotic Good — high potential, inconsistent execution. Your biggest lever is consistency, not intensity.",
    },
    {
        "id": "scene6",
        "text": "Born in January? You're the Optimizer — you already track everything. Your biggest lever is doing less, better.",
    },
    {
        "id": "scene7",
        "text": "What month were you born? Comment it below — I'll reply with your archetype and one thing to work on.",
    },
    {
        "id": "scene8",
        "text": "Follow The Long Game. Tag a friend and see if their archetype matches their personality.",
    },
]


def chunk_alignment(starts, ends, chars):
    words, word_start, word_end, buf = [], None, None, []
    for s, e, c in zip(starts, ends, chars):
        if c == " ":
            if buf:
                words.append({"word": "".join(buf), "start": word_start, "end": word_end})
                buf = []
                word_start = None
        else:
            if not buf:
                word_start = s
            buf.append(c)
            word_end = e
    if buf:
        words.append({"word": "".join(buf), "start": word_start, "end": word_end})

    chunks, cur, cur_start, cur_end = [], [], None, None
    for w in words:
        cur.append(w["word"])
        if cur_start is None:
            cur_start = w["start"]
        cur_end = w["end"]
        if len(cur) >= 7:
            chunks.append({"text": " ".join(cur), "start": cur_start, "end": cur_end})
            cur, cur_start, cur_end = [], None, None
    if cur:
        chunks.append({"text": " ".join(cur), "start": cur_start, "end": cur_end})
    return chunks


def generate_scene(scene, retries=3):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    payload = {
        "text": scene["text"],
        "model_id": MODEL,
        "output_format": "mp3_44100_128",
        "voice_settings": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.2},
    }
    for attempt in range(1, retries + 1):
        try:
            resp = requests.post(
                url,
                headers={"xi-api-key": API_KEY, "Content-Type": "application/json"},
                json=payload,
                timeout=60,
            )
            resp.raise_for_status()
            break
        except Exception as e:
            print(f"    Attempt {attempt} failed: {e}")
            if attempt == retries:
                raise
            time.sleep(3)
    data = resp.json()
    audio_bytes = base64.b64decode(data["audio_base64"])
    alignment = data["alignment"]
    chunks = chunk_alignment(
        alignment["character_start_times_seconds"],
        alignment["character_end_times_seconds"],
        alignment["characters"],
    )
    duration = alignment["character_end_times_seconds"][-1]
    return audio_bytes, chunks, duration


all_audio = b""
timings = {}
offset = 0.0

for scene in SCENES:
    print(f"Generating {scene['id']}...")
    audio, chunks, duration = generate_scene(scene)
    all_audio += audio
    timings[scene["id"]] = {
        "offset": offset,
        "duration": duration,
        "chunks": chunks,
    }
    offset += duration
    print(f"  done — {duration:.3f}s")

with open("longevityArchetype.mp3", "wb") as f:
    f.write(all_audio)

with open("caption_timings_longevityArchetype.json", "w") as f:
    json.dump(timings, f, indent=2)

print("\nDone.")
print(f"  longevityArchetype.mp3")
print(f"  caption_timings_longevityArchetype.json")
print(f"  Total audio: {offset:.3f}s")
