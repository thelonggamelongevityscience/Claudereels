#!/usr/bin/env python3
"""
Generate VO WAVs + caption timings using ElevenLabs TTS.
Generates audio per caption chunk → measures duration → accumulates frame positions.
"""
import json
import os
import numpy as np
import soundfile as sf
from elevenlabs import ElevenLabs
from elevenlabs.types import VoiceSettings

API_KEY   = os.environ.get("ELEVENLABS_API_KEY", "sk_e208f42c991bce3910de44624abc1e66e3a564d8093e94c0")
VOICE_ID  = "nPczCjzI2devNBz1zQrb"   # Brian – deep American, professional & warm
MODEL_ID  = "eleven_multilingual_v2"
FPS       = 30
OUT_REMOTION = "/home/user/Claudereels/my-video/public"
OUT_HF       = "/home/user/Claudereels/hf-reel/assets"

# Voice settings tuned for calm, enthusiastic delivery
VOICE_SETTINGS = VoiceSettings(
    stability=0.45,          # lower = more expressive/dynamic
    similarity_boost=0.80,   # stays true to the voice character
    style=0.35,              # adds warmth and energy
    use_speaker_boost=True,
)

client = ElevenLabs(api_key=API_KEY)

def gen_chunk(text: str) -> tuple[np.ndarray, int]:
    """Call ElevenLabs and return (samples_float32, sample_rate=44100)."""
    audio_bytes = b"".join(
        client.text_to_speech.convert(
            voice_id=VOICE_ID,
            text=text,
            model_id=MODEL_ID,
            voice_settings=VOICE_SETTINGS,
            output_format="pcm_44100",  # 44100Hz avoids sample-rate mismatch in renderers
        )
    )
    samples = np.frombuffer(audio_bytes, dtype=np.int16).astype(np.float32) / 32768.0
    return samples, 44100

def silence(ms: int, sr: int) -> np.ndarray:
    return np.zeros(int(sr * ms / 1000), dtype=np.float32)

def s2f(n_samples: int, sr: int) -> float:
    return n_samples / sr * FPS

SCENES = [
    {"id": 1, "chunks": [
        {"text": "Sitting for 8 hours"},
        {"text": "a day is killing you"},
        {"text": "faster than smoking.", "pause_after_ms": 800},
        {"text": "Your doctor isn't"},
        {"text": "telling you this."},
    ]},
    {"id": 2, "chunks": [
        {"text": "A 40 percent"},
        {"text": "higher risk of death.", "pause_after_ms": 600},
        {"text": "From sitting.", "pause_after_ms": 700},
        {"text": "Even in people who go"},
        {"text": "to the gym."},
        {"text": "This is the Active Couch Potato effect."},
    ]},
    {"id": 3, "chunks": [
        {"text": "Here's what's actually"},
        {"text": "happening inside your body"},
        {"text": "during prolonged sitting."},
        {"text": "And none of it is good."},
    ]},
    {"id": 4, "chunks": [
        {"text": "One hour of exercise"},
        {"text": "cannot cancel 8 hours"},
        {"text": "of sitting."},
        {"text": "Sedentary time"},
        {"text": "is an independent risk factor."},
        {"text": "Both things are true."},
    ]},
    {"id": 5, "chunks": [
        {"text": "Two minutes of light walking"},
        {"text": "every 30 minutes."},
        {"text": "That's the protocol."},
        {"text": "It reduces blood sugar spikes"},
        {"text": "by 30 percent"},
        {"text": "and restores the fat-clearing enzymes"},
        {"text": "sitting shuts down."},
    ]},
    {"id": 6, "chunks": [
        {"text": "Thirty percent.", "pause_after_ms": 600},
        {"text": "Lower blood sugar.", "pause_after_ms": 500},
        {"text": "From two-minute"},
        {"text": "walking breaks."},
        {"text": "The intervention is"},
        {"text": "almost embarrassingly simple."},
    ]},
    {"id": 7, "chunks": [
        {"text": "How long did you"},
        {"text": "sit today?"},
        {"text": "Most people have no idea."},
        {"text": "Track it once."},
        {"text": "The number will"},
        {"text": "surprise you."},
    ]},
    {"id": 8, "chunks": [
        {"text": "Follow The Long Game"},
        {"text": "for daily longevity science."},
        {"text": "Save this."},
        {"text": "Set your 30-minute alarm"},
        {"text": "before you close this app."},
    ]},
]

SCENE_FRAMES = {1: 330, 2: 450, 3: 270, 4: 390, 5: 480, 6: 390, 7: 330, 8: 330}

results = {}

for scene in SCENES:
    sid = scene["id"]
    budget = SCENE_FRAMES[sid]
    print(f"\nScene {sid} (budget {budget}f / {budget/FPS:.1f}s)...")

    all_audio, chunk_timings = [], []
    current_frame = 0.0
    sr = None

    for i, chunk in enumerate(scene["chunks"]):
        text = chunk["text"]
        pause_ms = chunk.get("pause_after_ms", 0)
        is_last = (i == len(scene["chunks"]) - 1)

        audio, sr = gen_chunk(text)
        chunk_len_f = s2f(len(audio), sr)

        start_f = current_frame
        end_f   = current_frame + chunk_len_f

        if is_last:
            end_f = min(budget - 5, max(end_f, start_f + 15))

        chunk_timings.append({
            "text": text,
            "startFrame": round(start_f),
            "endFrame":   round(end_f),
        })

        all_audio.append(audio)
        current_frame += chunk_len_f

        if pause_ms > 0:
            sil = silence(pause_ms, sr)
            all_audio.append(sil)
            current_frame += s2f(len(sil), sr)

        print(f"  [{i+1}] '{text[:45]}' → {round(start_f)}–{round(end_f)}f")

    full_audio = np.concatenate(all_audio)
    actual_f = round(s2f(len(full_audio), sr))
    over = " *** OVER BUDGET ***" if actual_f > budget else ""
    print(f"  Total: {actual_f}f ({actual_f/FPS:.2f}s) / budget {budget}f{over}")

    for out_dir in [OUT_REMOTION, OUT_HF]:
        path = f"{out_dir}/vo{sid}.wav"
        sf.write(path, full_audio, sr)
        print(f"  Saved {path}")

    results[f"scene{sid}"] = {
        "chunks": chunk_timings,
        "audio_frames": actual_f,
        "budget_frames": budget,
    }

out_json = "/home/user/Claudereels/caption_timings.json"
with open(out_json, "w") as f:
    json.dump(results, f, indent=2)

print(f"\nDone. Timings → {out_json}")
print(json.dumps(results, indent=2))
