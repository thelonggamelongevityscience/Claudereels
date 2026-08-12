"""
ElevenLabs TTS generator — POST48 Melatonin Reel
Voice: Brian (nPczCjzI2devNBz1zQrb), eleven_multilingual_v2
Output: melatonin.mp3 + caption_timings_melatonin.json
"""
import json, os, time, base64
import requests

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "melatonin.mp3"
OUT_JSON = "caption_timings_melatonin.json"

SCENES = [
    {
        "id": "s1",
        "title": "Hook",
        "text": (
            "Your melatonin supplement is probably doing nothing. "
            "Here's what it's actually for, and why your bottle is dosed wrong. "
            "Let's fix that."
        ),
    },
    {
        "id": "s2",
        "title": "What It Actually Is",
        "text": (
            "Melatonin isn't what knocks you out. "
            "It's the hormone that tells your body it's getting dark, prepare for sleep. "
            "Your brain naturally releases it about 2 hours before your natural sleep time, "
            "at roughly 0.1 to 0.3 milligrams a night."
        ),
    },
    {
        "id": "s3",
        "title": "Why It Matters",
        "text": (
            "Most over-the-counter melatonin is dosed at 3 to 10 milligrams — "
            "several multiples of what your body naturally uses. "
            "Megadoses can actually desensitize your receptors over time. "
            "And timing matters more than dose — it's a clock-shifter, not a sedative."
        ),
    },
    {
        "id": "s4",
        "title": "Whats Going Wrong",
        "text": (
            "Three ways people get it backwards. "
            "Taking it as a sleeping pill right before bed. "
            "Taking a mega-dose that can blunt receptor sensitivity. "
            "And scrolling your phone right after, which cancels the signal with light."
        ),
    },
    {
        "id": "s5",
        "title": "How To Use It",
        "text": (
            "Use 0.3 to 1 milligram, not 5 or 10. "
            "Take it 1 to 2 hours before your target sleep time. "
            "Save it for circadian shifts like jet lag or shift work. "
            "And fix your light exposure first — that does more than any supplement."
        ),
    },
    {
        "id": "s6",
        "title": "The Pattern",
        "text": (
            "Same story as protein powders and fat burners — "
            "a real mechanism, sold at a dose that doesn't match how it works. "
            "The mechanism is real. "
            "The dose on your shelf probably isn't helping it."
        ),
    },
    {
        "id": "s7",
        "title": "Loop Hook",
        "text": (
            "What dose is on your melatonin bottle? "
            "Go check right now. "
            "Drop the number below."
        ),
    },
    {
        "id": "s8",
        "title": "CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this before you buy your next bottle."
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
