"""
ElevenLabs voiceover generator — POST52r "Hallmarks of Aging"
Outputs: hallmarks.mp3  +  caption_timings_hallmarks.json
Run:     python gen_hallmarks.py
"""
import json, requests, os

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "hallmarks.mp3"
OUT_JSON = "caption_timings_hallmarks.json"

SCENES = [
    {
        "id": "s1_hook",
        "title": "S1: Hook",
        "text": (
            "The framework behind every post we've made. "
            "Twelve mechanisms. One unifying map of why you age. "
            "This is the science underneath everything."
        ),
    },
    {
        "id": "s2_whats_happening",
        "title": "S2: What's Happening",
        "text": (
            "In 2013, researchers formally defined the Hallmarks of Ageing — "
            "twelve interconnected mechanisms that drive ageing at the cellular level. "
            "Nearly everything covered this cycle is one of these twelve in disguise."
        ),
    },
    {
        "id": "s3_why_it_matters",
        "title": "S3: Why It Matters",
        "text": (
            "Genomic instability and telomere shortening. "
            "Cellular senescence — the zombie cells. "
            "Mitochondrial dysfunction. "
            "And dysregulated nutrient sensing — the inflammation and insulin resistance "
            "covered across multiple posts."
        ),
    },
    {
        "id": "s4_what_accelerates",
        "title": "S4: What Accelerates Them",
        "text": (
            "Chronic stress accelerates genomic instability. "
            "Poor sleep impairs cellular cleanup. "
            "Sedentary behaviour worsens mitochondrial dysfunction. "
            "And ultra-processed food feeds inflammation and nutrient-sensing dysregulation."
        ),
    },
    {
        "id": "s5_what_slows",
        "title": "S5: What Slows Them Down",
        "text": (
            "Exercise positively influences the most hallmarks simultaneously. "
            "Fasting improves nutrient sensing and triggers autophagy. "
            "Quality sleep supports repair. "
            "And managing stress reduces inflammatory signalling across all twelve."
        ),
    },
    {
        "id": "s6_why_this_matters",
        "title": "S6: Why This Matters",
        "text": (
            "Every post this cycle has been one piece of this twelve-part puzzle. "
            "You don't need twelve strategies — a handful of core habits influence "
            "nearly all twelve hallmarks at once. "
            "This is the actual science. Not marketing."
        ),
    },
    {
        "id": "s7_loop_hook",
        "title": "S7: Loop Hook",
        "text": (
            "Which hallmark do you think you're managing worst? "
            "Be honest with yourself. Drop it below."
        ),
    },
    {
        "id": "s8_cta",
        "title": "S8: CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this — it ties the whole cycle together."
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
