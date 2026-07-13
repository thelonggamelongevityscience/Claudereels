#!/usr/bin/env python3
"""
Generate VO MP3 + caption timings for ZombieCellsReel (8 scenes).
Outputs to ~/Downloads:
  zombie_cells.mp3                  — full concatenated voiceover
  timings_zombie_cells.json         — slide boundaries
  caption_timings_zombie_cells.json — per-chunk frame timings
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
OUT_DIR  = "/home/user/Claudereels/my-video/public"

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
    {"id": 1, "budget": 110, "chunks": [
        {"text": "Your body is full of zombie cells.", "pause_after_ms": 400},
        {"text": "They refused to die.", "pause_after_ms": 400},
        {"text": "And right now they are ageing you from the inside."},
    ]},
    {"id": 2, "budget": 130, "chunks": [
        {"text": "Senescent cells are damaged cells that stop dividing but refuse to die.", "pause_after_ms": 300},
        {"text": "They release a toxic cocktail of inflammatory signals called the SASP —", "pause_after_ms": 200},
        {"text": "and it spreads to healthy cells around them."},
    ]},
    {"id": 3, "budget": 130, "chunks": [
        {"text": "Zombie cells drive chronic inflammation, accelerate tissue ageing, impair organ function, and fuel cancer risk.", "pause_after_ms": 300},
        {"text": "They do not just sit there —", "pause_after_ms": 200},
        {"text": "they actively corrupt everything around them."},
    ]},
    {"id": 4, "budget": 140, "chunks": [
        {"text": "In 2016 the Mayo Clinic engineered mice to clear senescent cells.", "pause_after_ms": 300},
        {"text": "They lived 25 percent longer.", "pause_after_ms": 400},
        {"text": "Delayed cancer. Better heart and kidney function. Maintained muscle mass far longer than controls."},
    ]},
    {"id": 5, "budget": 120, "chunks": [
        {"text": "Four things accelerate zombie cell accumulation:", "pause_after_ms": 300},
        {"text": "chronic inflammation, DNA damage, oxidative stress from poor diet and alcohol, and poor sleep.", "pause_after_ms": 300},
        {"text": "All four are lifestyle factors."},
    ]},
    {"id": 6, "budget": 160, "chunks": [
        {"text": "To clear them naturally:", "pause_after_ms": 300},
        {"text": "intermittent fasting triggers autophagy — your body's built-in cleanup system.", "pause_after_ms": 300},
        {"text": "Zone 2 exercise is the most potent natural senolytic available.", "pause_after_ms": 200},
        {"text": "And an anti-inflammatory diet removes the primary driver of ongoing accumulation."},
    ]},
    {"id": 7, "budget": 110, "chunks": [
        {"text": "Did you know zombie cells were real?", "pause_after_ms": 500},
        {"text": "Most people have never heard of senescence.", "pause_after_ms": 300},
        {"text": "Drop a zombie emoji below if this blew your mind."},
    ]},
    {"id": 8, "budget": 90, "chunks": [
        {"text": "Follow The Long Game for daily longevity science.", "pause_after_ms": 300},
        {"text": "Save this — your cells are listening."},
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

print("\nConcatenating into zombie_cells.mp3...")
combined_seg = AudioSegment.empty()
for sid in sorted(scene_segments.keys()):
    combined_seg += scene_segments[sid]

mp3_path = os.path.join(OUT_DIR, "zombie_cells.mp3")
combined_seg.export(mp3_path, format="mp3", bitrate="192k")
print(f"Saved {mp3_path} ({os.path.getsize(mp3_path)//1024}KB, {len(combined_seg)/1000:.2f}s)")

total_duration = sum(scene_durations_s)
slides = []
t = 0.0
for i, dur in enumerate(scene_durations_s):
    slides.append({"slideIndex": i, "startTime": round(t, 3), "endTime": round(t + dur, 3)})
    t += dur

with open(os.path.join(OUT_DIR, "caption_timings_zombie_cells.json"), "w") as f:
    json.dump(results, f, indent=2)

print("\n// ZOMBIE_CELLS_SCENES for constants.ts:")
running = 0
for i, scene in enumerate(SCENES):
    sid = scene["id"]
    dur = results[f"scene{sid}"]["audio_frames"]
    print(f"  scene{sid}: {{ start: {running:4d}, duration: {dur} }},  // {slides[i]['startTime']:.3f}-{slides[i]['endTime']:.3f}s")
    running += dur
total_frames = running + FPS
print(f"\nexport const ZOMBIE_CELLS_TOTAL_FRAMES = {total_frames};")
print(f"\nDone. {len(SCENES)} scenes, {total_frames} frames, {total_duration:.1f}s")
