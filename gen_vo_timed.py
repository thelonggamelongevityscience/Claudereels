#!/usr/bin/env python3
"""
Generate voiceover WAV files + exact caption frame timings.
Strategy: generate TTS per caption chunk → measure audio duration →
accumulate frame positions → insert silence pauses → concatenate into scene WAV.
This gives frame-perfect caption sync derived from actual audio content.
"""
import sys
import json
import numpy as np
import soundfile as sf

sys.path.insert(0, '/home/user')
from kokoro_onnx import Kokoro

kokoro = Kokoro("/tmp/kokoro.onnx", "/tmp/voices.bin")
SPEED = 0.88
FPS = 30
OUT_DIR = "/home/user/Claudereels/my-video/public"

def gen_audio(text):
    samples, sr = kokoro.create(text, voice="am_echo", speed=SPEED, lang="en-us")
    return np.array(samples, dtype=np.float32), int(sr)

def silence(ms, sr):
    return np.zeros(int(sr * ms / 1000), dtype=np.float32)

def s2f(n_samples, sr):
    return n_samples / sr * FPS

# Each chunk: {"text": str, "pause_after_ms": int (optional)}
SCENES = [
    {
        "id": 1,
        "chunks": [
            {"text": "Sitting for 8 hours"},
            {"text": "a day is killing you"},
            {"text": "faster than smoking.", "pause_after_ms": 800},
            {"text": "Your doctor isn't"},
            {"text": "telling you this."},
        ]
    },
    {
        "id": 2,
        "chunks": [
            {"text": "A 40 percent"},
            {"text": "higher risk of death.", "pause_after_ms": 600},
            {"text": "From sitting.", "pause_after_ms": 700},
            {"text": "Even in people who go"},
            {"text": "to the gym."},
            {"text": "This is the Active Couch Potato effect."},
        ]
    },
    {
        "id": 3,
        "chunks": [
            {"text": "Here's what's actually"},
            {"text": "happening inside your body"},
            {"text": "during prolonged sitting."},
            {"text": "And none of it is good."},
        ]
    },
    {
        "id": 4,
        "chunks": [
            {"text": "One hour of exercise"},
            {"text": "cannot cancel 8 hours"},
            {"text": "of sitting."},
            {"text": "Sedentary time"},
            {"text": "is an independent risk factor."},
            {"text": "Both things are true."},
        ]
    },
    {
        "id": 5,
        "chunks": [
            {"text": "Two minutes of light walking"},
            {"text": "every 30 minutes."},
            {"text": "That's the protocol."},
            {"text": "It reduces blood sugar spikes"},
            {"text": "by 30 percent"},
            {"text": "and restores the fat-clearing enzymes"},
            {"text": "sitting shuts down."},
        ]
    },
    {
        "id": 6,
        "chunks": [
            {"text": "Thirty percent.", "pause_after_ms": 600},
            {"text": "Lower blood sugar.", "pause_after_ms": 500},
            {"text": "From two-minute"},
            {"text": "walking breaks."},
            {"text": "The intervention is"},
            {"text": "almost embarrassingly simple."},
        ]
    },
    {
        "id": 7,
        "chunks": [
            {"text": "How long did you"},
            {"text": "sit today?"},
            {"text": "Most people have no idea."},
            {"text": "Track it once."},
            {"text": "The number will"},
            {"text": "surprise you."},
        ]
    },
    {
        "id": 8,
        "chunks": [
            {"text": "Follow The Long Game"},
            {"text": "for daily longevity science."},
            {"text": "Save this."},
            {"text": "Set your 30-minute alarm"},
            {"text": "before you close this app."},
        ]
    },
]

# Scene frame budgets — set to actual VO length + ~30f buffer so no scene cuts early
# S3/4/5/6/7/8 extended beyond user's initial estimates to fit 0.88x VO + pauses
SCENE_FRAMES = {1: 330, 2: 450, 3: 270, 4: 390, 5: 480, 6: 390, 7: 330, 8: 330}

results = {}

for scene in SCENES:
    sid = scene["id"]
    budget = SCENE_FRAMES[sid]
    print(f"\nScene {sid} (budget {budget} frames / {budget/FPS:.1f}s)...")

    all_audio = []
    chunk_timings = []
    current_frame = 0.0
    sr = None

    for i, chunk in enumerate(scene["chunks"]):
        text = chunk["text"]
        pause_ms = chunk.get("pause_after_ms", 0)
        is_last = (i == len(scene["chunks"]) - 1)

        audio, sr = gen_audio(text)
        chunk_len_f = s2f(len(audio), sr)

        start_f = current_frame
        end_f = current_frame + chunk_len_f

        # Last chunk: keep caption visible until near end of scene
        if is_last:
            end_f = min(budget - 5, max(end_f, start_f + 15))

        chunk_timings.append({
            "text": text,
            "startFrame": round(start_f),
            "endFrame": round(end_f),
        })

        all_audio.append(audio)
        current_frame = current_frame + chunk_len_f  # advance by actual audio, not padded end_f

        if pause_ms > 0:
            sil = silence(pause_ms, sr)
            all_audio.append(sil)
            current_frame += s2f(len(sil), sr)

        print(f"  [{i+1}] '{text[:40]}' → frames {round(start_f)}–{round(end_f)}")

    full_audio = np.concatenate(all_audio)
    actual_frames = round(s2f(len(full_audio), sr))
    print(f"  Audio: {actual_frames} frames ({actual_frames/FPS:.2f}s), budget: {budget} frames")

    if actual_frames > budget:
        print(f"  WARNING: VO ({actual_frames}f) exceeds scene budget ({budget}f)!")

    out_path = f"{OUT_DIR}/vo{sid}.wav"
    sf.write(out_path, full_audio, sr)
    print(f"  Saved {out_path}")

    results[f"scene{sid}"] = {
        "chunks": chunk_timings,
        "audio_frames": actual_frames,
        "budget_frames": budget,
    }

out_json = "/home/user/Claudereels/caption_timings.json"
with open(out_json, "w") as f:
    json.dump(results, f, indent=2)

print(f"\nDone. Timings saved to {out_json}")
print(json.dumps(results, indent=2))
