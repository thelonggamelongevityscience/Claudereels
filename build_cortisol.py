import os, math
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import imageio_ffmpeg
import subprocess
from moviepy import VideoFileClip, AudioFileClip, ImageClip, CompositeVideoClip
from moviepy.audio.fx import MultiplyVolume, AudioFadeOut

VIDEO_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/b78007be-reset_alorithim_reel.mp4"
MUSIC_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/e1d6718b-perfect_sound_algorithim_reset_reel.mpeg"
FONT_PATH = "/tmp/claude-0/-home-user-Claudereels/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/scratchpad/Montserrat-Regular.ttf"
OUT_FILE  = "/home/user/Claudereels/outputs/cortisol_with_text.mp4"
LOOPED_TMP = "/tmp/cortisol_looped.mp4"

W, H = 1080, 1920
DURATION = 35
VIDEO_DUR = 8.84    # seconds (source clip length)
XFADE_DUR = 0.5     # crossfade duration at each loop join
EFF_DUR = VIDEO_DUR - XFADE_DUR  # 8.34s effective per iteration

FONT_SIZE = 36
LINE_SPACING = 1.5
TEXT_COLOR = (255, 255, 255)
MUSIC_VOL = 0.15
FADE_OUT_SECS = 2

TEXT = (
    "Your cortisol drops within 90 seconds\n"
    "of watching natural water.\n"
    "\n"
    "Watch this 2-3 times.\n"
    "\n"
    "Your biology will thank you.\n"
    "So will your feed."
)


def build_looped_video_with_xfade():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    n = math.ceil(DURATION / EFF_DUR) + 1  # enough clips to cover 35s

    # Each -i is the same source file; FFmpeg resets timestamps per input
    inputs = []
    for _ in range(n):
        inputs += ["-i", VIDEO_IN]

    # Chain xfade filters: [prev][next]xfade=...offset=i*EFF_DUR
    parts = []
    prev = "[0:v]"
    for i in range(1, n):
        offset = i * EFF_DUR
        out_tag = f"[v{i:02d}]" if i < n - 1 else "[vout]"
        parts.append(
            f"{prev}[{i}:v]xfade=transition=fade:duration={XFADE_DUR:.3f}:offset={offset:.3f}{out_tag}"
        )
        prev = out_tag

    filter_complex = ";".join(parts)

    cmd = [ffmpeg, "-y"] + inputs + [
        "-filter_complex", filter_complex,
        "-map", "[vout]",
        "-t", str(DURATION),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast",
        "-an",
        LOOPED_TMP,
    ]
    print(f"Building seamless loop ({n} clips, {XFADE_DUR}s crossfades)...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr[-800:])
        raise RuntimeError("FFmpeg xfade failed")
    print(f"  Looped video: {os.path.getsize(LOOPED_TMP)/1024/1024:.1f} MB")


def render_text_overlay():
    font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    lines = TEXT.split("\n")
    line_h = int(FONT_SIZE * LINE_SPACING)
    total_h = line_h * len(lines)
    y_start = (H - total_h) // 2

    for i, line in enumerate(lines):
        if not line.strip():
            continue
        bbox = draw.textbbox((0, 0), line, font=font)
        line_w = bbox[2] - bbox[0]
        x = (W - line_w) // 2
        y = y_start + i * line_h
        draw.text((x, y), line, font=font, fill=TEXT_COLOR)

    return np.array(img)


build_looped_video_with_xfade()

print("Rendering text overlay...")
text_arr = render_text_overlay()

print("Loading looped video...")
bg = VideoFileClip(LOOPED_TMP).with_duration(DURATION)

print("Building text clip...")
text_clip = ImageClip(text_arr, duration=DURATION).with_position("center")

print("Compositing...")
composite = CompositeVideoClip([bg, text_clip], size=(W, H)).with_duration(DURATION)

print("Loading music...")
music = (
    AudioFileClip(MUSIC_IN)
    .with_duration(DURATION)
    .with_effects([MultiplyVolume(MUSIC_VOL), AudioFadeOut(FADE_OUT_SECS)])
)
composite = composite.with_audio(music)

os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
print(f"Writing {OUT_FILE}...")
composite.write_videofile(
    OUT_FILE,
    fps=30,
    codec="libx264",
    audio_codec="aac",
    preset="fast",
    logger="bar",
)
size = os.path.getsize(OUT_FILE)
print(f"\nDone: {OUT_FILE} ({size/1024/1024:.1f} MB)")
