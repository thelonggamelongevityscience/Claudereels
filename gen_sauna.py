"""
ElevenLabs voiceover generator — POST53r "Sauna Longevity Protocol"
Outputs: sauna.mp3  +  caption_timings_sauna.json
Run:     python gen_sauna.py
"""
import json, requests, os

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "sauna.mp3"
OUT_JSON = "caption_timings_sauna.json"

SCENES = [
    {
        "id": "s1_hook",
        "title": "S1: Hook",
        "text": (
            "The Finnish habit linked to living longer. "
            "It's not a supplement. It's not a diet. "
            "It's heat."
        ),
    },
    {
        "id": "s2_whats_happening",
        "title": "S2: What's Happening",
        "text": (
            "Sauna heat triggers heat shock proteins that repair damaged proteins "
            "and reduce inflammation. "
            "A Finnish cohort study of over 2,300 men found those using the sauna "
            "4 to 7 times a week had significantly lower mortality than once-weekly users."
        ),
    },
    {
        "id": "s3_why_it_matters",
        "title": "S3: Why It Matters",
        "text": (
            "Frequent use was linked to roughly 40% lower all-cause mortality. "
            "Cardiovascular mortality showed one of the strongest associations "
            "of any lifestyle factor studied. "
            "And the heat response resembles moderate exercise, without the joint load."
        ),
    },
    {
        "id": "s4_what_blocks",
        "title": "S4: What Blocks It",
        "text": (
            "Occasional use won't replicate the research. "
            "Sessions need to be 15 to 20 minutes, not quick dips. "
            "And skipping hydration blunts the benefit."
        ),
    },
    {
        "id": "s5_how_to_get_it",
        "title": "S5: How To Get It",
        "text": (
            "Aim for 4 or more sessions a week if you have access. "
            "15 to 20 minutes per session. "
            "Hydrate before and after. "
            "Consistency matters more than any single long session."
        ),
    },
    {
        "id": "s6_the_numbers",
        "title": "S6: The Numbers",
        "text": (
            "Once weekly was the baseline. "
            "Four to seven times weekly was associated with significantly reduced "
            "cardiovascular and all-cause mortality over 20 years. "
            "This is one of the few longevity habits with two decades of human data behind it."
        ),
    },
    {
        "id": "s7_loop_hook",
        "title": "S7: Loop Hook",
        "text": (
            "Do you have access to a sauna? "
            "If not, this might be worth changing. "
            "Drop your answer below."
        ),
    },
    {
        "id": "s8_cta",
        "title": "S8: CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this before your next gym trip."
        ),
    },
]


def chunk_alignment(char_start_times, char_end_times, chars, words_per_chunk=8):
    words, chunks = [], []
    current_word, word_start = "", None
    for i, ch in enumerate(chars):
        if ch == " " or i == len(chars) - 1:
            if i == len(chars) - 1 and ch != " ":
                current_word += ch
                if word_start is None:
                    word_start = char_start_times[i]
            if current_word:
                words.append({"word": current_word, "start": word_start, "end": char_end_times[i - (1 if ch == " " else 0)]})
            current_word, word_start = "", None
        else:
            if word_start is None:
                word_start = char_start_times[i]
            current_word += ch

    for i in range(0, len(words), words_per_chunk):
        group = words[i:i + words_per_chunk]
        chunks.append({
            "text":  " ".join(w["word"] for w in group),
            "start": group[0]["start"],
            "end":   group[-1]["end"],
        })
    return chunks


def generate_scene(scene):
    print(f"  Generating {scene['title']}...")
    url  = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    resp = requests.post(
        url,
        headers={"xi-api-key": API_KEY, "Content-Type": "application/json"},
        json={
            "text":       scene["text"],
            "model_id":   MODEL,
            "voice_settings": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.2},
        },
    )
    resp.raise_for_status()
    data = resp.json()
    audio_bytes = __import__("base64").b64decode(data["audio_base64"])
    alignment   = data["alignment"]
    chunks = chunk_alignment(
        alignment["character_start_times_seconds"],
        alignment["character_end_times_seconds"],
        alignment["characters"],
    )
    duration = alignment["character_end_times_seconds"][-1]
    print(f"    → {duration:.3f}s  ({len(chunks)} caption chunks)")
    return audio_bytes, chunks, duration


def main():
    all_audio   = b""
    scene_data  = []
    cursor      = 0.0

    for scene in SCENES:
        audio_bytes, chunks, duration = generate_scene(scene)
        scene_data.append({
            "id":         scene["id"],
            "title":      scene["title"],
            "start_time": round(cursor, 4),
            "duration":   round(duration, 4),
            "end_time":   round(cursor + duration, 4),
            "chunks":     chunks,
        })
        all_audio += audio_bytes
        cursor    += duration

    with open(OUT_MP3, "wb") as f:
        f.write(all_audio)
    with open(OUT_JSON, "w") as f:
        json.dump(scene_data, f, indent=2)

    print(f"\nDone!")
    print(f"  MP3  → {OUT_MP3}  ({os.path.getsize(OUT_MP3)//1024} KB)")
    print(f"  JSON → {OUT_JSON}")
    print(f"\nScene timing summary:")
    for s in scene_data:
        frames = round(s["duration"] * 30)
        print(f"  {s['title']:<28}  {s['start_time']:6.3f}s – {s['end_time']:6.3f}s  ({frames}f)")


if __name__ == "__main__":
    main()
