"""
ElevenLabs voiceover generator — POST55r "hs-CRP Predicts Heart Attacks"
Outputs: hsCRP.mp3  +  caption_timings_hsCRP.json
Run:     python gen_hsCRP.py
"""
import json, requests, os

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "hsCRP.mp3"
OUT_JSON = "caption_timings_hsCRP.json"

SCENES = [
    {
        "id": "s1_hook",
        "title": "S1: Hook",
        "text": (
            "The blood marker that predicts heart attacks better. "
            "It's not cholesterol. "
            "It's a number almost nobody's been told about."
        ),
    },
    {
        "id": "s2_whats_happening",
        "title": "S2: What's Happening",
        "text": (
            "hs-CRP measures systemic inflammation circulating in your blood right now. "
            "Multiple large studies found it predicts future heart attacks and strokes "
            "as well as, or better than, LDL cholesterol."
        ),
    },
    {
        "id": "s3_why_it_matters",
        "title": "S3: Why It Matters",
        "text": (
            "Half of heart attacks occur in people with normal cholesterol. "
            "Chronic inflammation damages blood vessels for years before any symptom appears. "
            "And it's not on a standard panel — you have to ask for it by name."
        ),
    },
    {
        "id": "s4_what_raises_it",
        "title": "S4: What Raises It",
        "text": (
            "Ultra-processed food and seed oils. "
            "Visceral fat. "
            "Chronic stress. "
            "And poor sleep — inflammatory markers rise measurably after even one bad night."
        ),
    },
    {
        "id": "s5_how_to_lower_it",
        "title": "S5: How To Lower It",
        "text": (
            "Anti-inflammatory whole foods lower it within weeks. "
            "Zone 2 cardio is one of the most reliable reducers. "
            "Sleep quality matters directly. "
            "And losing visceral fat specifically drives the biggest improvements."
        ),
    },
    {
        "id": "s6_where_you_stand",
        "title": "S6: Where You Stand",
        "text": (
            "Under 1.0 is low risk. "
            "Above 3.0 is high risk, independent of your cholesterol numbers. "
            "This is the same marker behind almost everything covered this week. "
            "Ask for it by name."
        ),
    },
    {
        "id": "s7_loop_hook",
        "title": "S7: Loop Hook",
        "text": (
            "Have you ever had your hs-CRP tested? "
            "Most people have not. "
            "Drop a yes or no below."
        ),
    },
    {
        "id": "s8_cta",
        "title": "S8: CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this before your next blood draw."
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


def generate_scene(scene, retries=3):
    print(f"  Generating {scene['title']}...")
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    payload = {
        "text":           scene["text"],
        "model_id":       MODEL,
        "output_format":  "mp3_44100_128",
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
            import time; time.sleep(3)
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
