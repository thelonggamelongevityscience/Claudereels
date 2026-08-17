"""
ElevenLabs voiceover generator — POST54r "Bone Density Decline"
Outputs: bone.mp3  +  caption_timings_bone.json
Run:     python gen_bone.py
"""
import json, requests, os

API_KEY  = "sk_f9b23f369e1d57df655ee936b6a4e20f0baf511829c16c93"
VOICE_ID = "nPczCjzI2devNBz1zQrb"
MODEL    = "eleven_multilingual_v2"
OUT_MP3  = "bone.mp3"
OUT_JSON = "caption_timings_bone.json"

SCENES = [
    {
        "id": "s1_hook",
        "title": "S1: Hook",
        "text": (
            "Your bones are already shrinking. "
            "Most people find out too late. "
            "Bone density peaks around 30 — "
            "it's mostly downhill from there, unless you intervene."
        ),
    },
    {
        "id": "s2_whats_happening",
        "title": "S2: What's Happening",
        "text": (
            "Bone density peaks around age 30, then declines slowly and silently. "
            "For women, the decline accelerates sharply for 5 to 10 years after menopause. "
            "There are no symptoms until a fracture happens."
        ),
    },
    {
        "id": "s3_why_it_matters",
        "title": "S3: Why It Matters",
        "text": (
            "One in 2 women and 1 in 4 men over 50 will experience an osteoporosis fracture. "
            "A hip fracture after 65 carries real mortality risk. "
            "And bone is trainable — it responds to mechanical stress the same way muscle does."
        ),
    },
    {
        "id": "s4_what_accelerates",
        "title": "S4: What Accelerates Loss",
        "text": (
            "No resistance or impact training. "
            "Chronically low protein and calcium. "
            "Excess alcohol and smoking. "
            "And undiagnosed low vitamin D, which blocks calcium absorption entirely."
        ),
    },
    {
        "id": "s5_how_to_protect",
        "title": "S5: How To Protect It",
        "text": (
            "Resistance train 2 to 3 times a week. "
            "Add impact — jogging, jumping, stairs. "
            "Hit your protein and calcium targets daily. "
            "And get your vitamin D tested."
        ),
    },
    {
        "id": "s6_where_you_stand",
        "title": "S6: Where You Stand",
        "text": (
            "A DEXA scan measures bone density directly — the gold standard. "
            "Catching low density in your 30s or 40s gives you years to intervene. "
            "Almost nobody checks it early enough to use that advantage."
        ),
    },
    {
        "id": "s7_loop_hook",
        "title": "S7: Loop Hook",
        "text": (
            "Have you ever had a bone density scan? "
            "Most people haven't, even in their 40s. "
            "Drop a yes or no below."
        ),
    },
    {
        "id": "s8_cta",
        "title": "S8: CTA",
        "text": (
            "Follow The Long Game for daily longevity science. "
            "Save this before your next checkup."
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
