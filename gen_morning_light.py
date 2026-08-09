"""
ElevenLabs TTS generator — POST46 Morning Light Reel
Voice: Brian (nPczCjzI2devNBz1zQrb), eleven_multilingual_v2
Output: morning_light.mp3 + caption_timings_morning_light.json
"""
import json, os, time
from pathlib import Path
import requests

API_KEY   = os.environ["ELEVENLABS_API_KEY"]
VOICE_ID  = "nPczCjzI2devNBz1zQrb"
MODEL     = "eleven_multilingual_v2"
OUT_MP3   = "morning_light.mp3"
OUT_JSON  = "caption_timings_morning_light.json"

SCENES = [
    {
        "id": "s1",
        "title": "Hook",
        "text": (
            "Your first 30 minutes awake decide tonight's sleep. "
            "Most people wreck it before they even leave the bedroom. "
            "Here's what's actually happening."
        ),
    },
    {
        "id": "s2",
        "title": "Whats Happening",
        "text": (
            "Specialized cells in your retina detect light and send a signal straight to your brain's master clock. "
            "That single signal sets a countdown — roughly 14 to 16 hours later, your brain releases the melatonin "
            "that puts you to sleep. Miss the signal and the countdown starts late."
        ),
    },
    {
        "id": "s3",
        "title": "Why It Matters",
        "text": (
            "Morning light triggers the healthy cortisol spike that should happen at wake-up, not at 11pm. "
            "It shifts your melatonin release time. "
            "It produces deeper, less fragmented sleep. "
            "And it regulates the same pathway that controls your mood by 3pm."
        ),
    },
    {
        "id": "s4",
        "title": "What Blocks It",
        "text": (
            "Four things sabotage your morning signal. "
            "Scrolling your phone before sunlight. "
            "Leaving the blackout curtains closed. "
            "Putting sunglasses on the second you step outside. "
            "And drinking coffee before light — which masks the tiredness while the delay compounds."
        ),
    },
    {
        "id": "s5",
        "title": "How To Fix It",
        "text": (
            "Get outside within 30 minutes of waking. "
            "No sunglasses, no window glass in between. "
            "Five to ten minutes is enough, even on a cloudy day. "
            "Consistency beats duration. "
            "And pairing it with a short walk does double duty for your cortisol too."
        ),
    },
    {
        "id": "s6",
        "title": "The Lux Gap",
        "text": (
            "Typical indoor lighting is around 200 to 500 lux. "
            "Outdoor light, even overcast, is 1,000 to 2,000 lux or more. "
            "Your brain isn't judging brightness the way it looks to your eyes. "
            "It's measuring lux. Go outside."
        ),
    },
    {
        "id": "s7",
        "title": "Loop Hook",
        "text": (
            "What time did you get outside today? "
            "Before coffee, before your phone, before anything else. "
            "Drop your time below."
        ),
    },
    {
        "id": "s8",
        "title": "CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this for tomorrow morning."
        ),
    },
]

HEADERS = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json",
}


def generate_scene(scene: dict) -> tuple[bytes, list]:
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
            audio_b64 = data["audio_base64"]
            alignment = data.get("alignment", {})
            import base64
            audio_bytes = base64.b64decode(audio_b64)
            return audio_bytes, alignment
        print(f"  Attempt {attempt+1} failed: {r.status_code} {r.text[:200]}")
        time.sleep(2 ** attempt)
    raise RuntimeError(f"Failed to generate scene {scene['id']}")


def chunk_alignment(alignment: dict, chunk_size: int = 8) -> list:
    """Split character-level alignment into ~8-word chunks."""
    chars = alignment.get("characters", [])
    start_times = alignment.get("character_start_times_seconds", [])
    end_times   = alignment.get("character_end_times_seconds", [])

    # Rebuild words from character stream
    words, w_start, w_end = [], [], []
    cur_word, cs, ce = "", None, None
    for ch, s, e in zip(chars, start_times, end_times):
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

    # Build chunks
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
    all_chunks = []
    audio_parts = []
    cumulative_time = 0.0

    for scene in SCENES:
        print(f"Generating {scene['id']}: {scene['title']}...")
        audio_bytes, alignment = generate_scene(scene)
        audio_parts.append(audio_bytes)

        chunks = chunk_alignment(alignment)
        scene_duration = max(c["end_time"] for c in chunks) if chunks else 0.0

        all_chunks.append({
            "scene_id": scene["id"],
            "title": scene["title"],
            "start_time": cumulative_time,
            "duration": scene_duration,
            "chunks": [
                {
                    **c,
                    "start_time": c["start_time"] + cumulative_time,
                    "end_time":   c["end_time"]   + cumulative_time,
                }
                for c in chunks
            ],
        })

        cumulative_time += scene_duration
        print(f"  Done. Duration: {scene_duration:.3f}s  Chunks: {len(chunks)}")
        time.sleep(0.5)

    # Write combined MP3
    with open(OUT_MP3, "wb") as f:
        for part in audio_parts:
            f.write(part)
    print(f"\nWrote {OUT_MP3} ({os.path.getsize(OUT_MP3)//1024} KB)")

    # Write JSON
    output = {
        "total_duration": cumulative_time,
        "scenes": all_chunks,
    }
    with open(OUT_JSON, "w") as f:
        json.dump(output, f, indent=2)
    print(f"Wrote {OUT_JSON}")

    # Summary
    print("\n=== SCENE TIMING SUMMARY (30fps) ===")
    t = 0
    for sc in all_chunks:
        frames = round(sc["duration"] * 30)
        print(f"{sc['scene_id']}: start={t}f  duration={frames}f  ({sc['duration']:.3f}s)  [{sc['title']}]")
        t += frames


if __name__ == "__main__":
    main()
