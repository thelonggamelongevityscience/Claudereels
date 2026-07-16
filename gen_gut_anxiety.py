#!/usr/bin/env python3
"""
Generate VO MP3 + caption timings for GutAnxietyReel (7 scenes).
Save this anywhere on your machine, then run:
  pip install elevenlabs pydub numpy
  python gen_gut_anxiety.py
Outputs to ~/Downloads:
  gut_anxiety.mp3
  caption_timings_gut_anxiety.json
"""
import io, json, os
import numpy as np
from pydub import AudioSegment
from elevenlabs import ElevenLabs
from elevenlabs.types import VoiceSettings

API_KEY  = os.environ.get("ELEVENLABS_API_KEY", "sk_e208f42c991bce3910de44624abc1e66e3a564d8093e94c0")
VOICE_ID = "nPczCjzI2devNBz1zQrb"   # Brian
MODEL_ID = "eleven_multilingual_v2"
FPS      = 30
OUT_DIR  = os.path.join(os.path.expanduser("~"), "Downloads")

VOICE_SETTINGS = VoiceSettings(stability=0.45, similarity_boost=0.80, style=0.35, use_speaker_boost=True)
client = ElevenLabs(api_key=API_KEY)

def gen_chunk(text):
    audio_bytes = b"".join(client.text_to_speech.convert(
        voice_id=VOICE_ID, text=text, model_id=MODEL_ID,
        voice_settings=VOICE_SETTINGS, output_format="mp3_44100_128",
    ))
    seg = AudioSegment.from_mp3(io.BytesIO(audio_bytes)).set_channels(1).set_frame_rate(44100)
    samples = np.array(seg.get_array_of_samples(), dtype=np.float32) / 32768.0
    return samples, 44100

def silence(ms, sr):
    return np.zeros(int(sr * ms / 1000), dtype=np.float32)

def s2f(n, sr):
    return n / sr * FPS

SCENES = [
    {"id": 1, "budget": 105, "chunks": [
        {"text": "Your gut is making you anxious.", "pause_after_ms": 400},
        {"text": "Not your thoughts.", "pause_after_ms": 400},
        {"text": "Your gut bacteria are running your mood."},
    ]},
    {"id": 2, "budget": 150, "chunks": [
        {"text": "90 percent of your serotonin is made in your gut.", "pause_after_ms": 300},
        {"text": "The vagus nerve runs directly between your gut and brain —", "pause_after_ms": 200},
        {"text": "and 80 percent of its signals travel upward.", "pause_after_ms": 300},
        {"text": "Your gut is talking to your brain more than your brain is talking to your gut."},
    ]},
    {"id": 3, "budget": 130, "chunks": [
        {"text": "Four signs your gut is driving your anxiety.", "pause_after_ms": 300},
        {"text": "Anxiety that worsens after eating. Bloating alongside low mood. Anxiety spikes after antibiotics.", "pause_after_ms": 200},
        {"text": "And feeling calmer after fermented foods. These are not coincidences."},
    ]},
    {"id": 4, "budget": 120, "chunks": [
        {"text": "Four things are disrupting your gut-brain axis right now:", "pause_after_ms": 300},
        {"text": "ultra-processed food, chronic stress, antibiotics, and poor sleep.", "pause_after_ms": 300},
        {"text": "Each one compounds the others."},
    ]},
    {"id": 5, "budget": 145, "chunks": [
        {"text": "To calm your gut and your anxiety:", "pause_after_ms": 300},
        {"text": "fermented foods daily, 30 different plants per week, remove ultra-processed food, and manage your stress.", "pause_after_ms": 300},
        {"text": "In that order.", "pause_after_ms": 200},
        {"text": "You cannot fix the gut while cortisol is running the show."},
    ]},
    {"id": 6, "budget": 105, "chunks": [
        {"text": "Does your anxiety get worse after certain foods?", "pause_after_ms": 500},
        {"text": "More people than you think say yes.", "pause_after_ms": 300},
        {"text": "Drop your trigger below."},
    ]},
    {"id": 7, "budget": 85, "chunks": [
        {"text": "Follow The Long Game for daily longevity science.", "pause_after_ms": 300},
        {"text": "Save this and check what you ate the last time anxiety hit."},
    ]},
]

results = {}
scene_segments = {}
scene_durations_s = []

for scene in SCENES:
    sid = scene["id"]
    budget = scene["budget"]
    print(f"\nScene {sid} (budget {budget}f / {budget/FPS:.1f}s)...")
    all_audio, chunk_timings = [], []
    current_frame = 0.0
    sr = None
    for i, chunk in enumerate(scene["chunks"]):
        text = chunk["text"]
        pause_ms = chunk.get("pause_after_ms", 0)
        audio, sr = gen_chunk(text)
        chunk_len_f = s2f(len(audio), sr)
        start_f = current_frame
        end_f = current_frame + chunk_len_f
        chunk_timings.append({"text": text, "startFrame": round(start_f), "endFrame": round(end_f)})
        all_audio.append(audio)
        current_frame += chunk_len_f
        if pause_ms > 0:
            sil = silence(pause_ms, sr)
            all_audio.append(sil)
            current_frame += s2f(len(sil), sr)
        print(f"  [{i+1}] '{text[:55]}' -> {round(start_f)}-{round(end_f)}f")
    full_audio = np.concatenate(all_audio)
    actual_f = round(s2f(len(full_audio), sr))
    actual_s = len(full_audio) / sr
    over = " *** OVER BUDGET ***" if actual_f > budget else ""
    print(f"  Total: {actual_f}f ({actual_s:.2f}s) / budget {budget}f{over}")
    pcm_bytes = (full_audio * 32768.0).astype(np.int16).tobytes()
    scene_segments[sid] = AudioSegment(data=pcm_bytes, sample_width=2, frame_rate=44100, channels=1)
    scene_durations_s.append(actual_s)
    results[f"scene{sid}"] = {"chunks": chunk_timings, "audio_frames": actual_f, "budget_frames": budget}

print("\nConcatenating into gut_anxiety.mp3...")
combined_seg = AudioSegment.empty()
for sid in sorted(scene_segments.keys()):
    combined_seg += scene_segments[sid]

mp3_path = os.path.join(OUT_DIR, "gut_anxiety.mp3")
combined_seg.export(mp3_path, format="mp3", bitrate="192k")
print(f"Saved: {mp3_path}  ({os.path.getsize(mp3_path)//1024}KB)")

with open(os.path.join(OUT_DIR, "caption_timings_gut_anxiety.json"), "w") as f:
    json.dump(results, f, indent=2)
print(f"Saved: caption_timings_gut_anxiety.json")

total_duration = sum(scene_durations_s)
slides = []
t = 0.0
for i, dur in enumerate(scene_durations_s):
    slides.append({"slideIndex": i, "startTime": round(t, 3), "endTime": round(t + dur, 3)})
    t += dur

print("\n// GUT_ANXIETY_SCENES for constants.ts:")
running = 0
for i, scene in enumerate(SCENES):
    sid = scene["id"]
    dur = results[f"scene{sid}"]["audio_frames"]
    print(f"  scene{sid}: {{ start: {running:4d}, duration: {dur} }},")
    running += dur
total_frames = running + FPS
print(f"\nexport const GUT_ANXIETY_TOTAL_FRAMES = {total_frames};")
print(f"\nDone! Files saved to: {OUT_DIR}")
