import os, textwrap
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from moviepy import VideoFileClip, AudioFileClip, ImageClip, CompositeVideoClip
from moviepy.audio.fx import MultiplyVolume, AudioFadeOut
from moviepy.video.fx import Loop

VIDEO_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/b78007be-reset_alorithim_reel.mp4"
MUSIC_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/e1d6718b-perfect_sound_algorithim_reset_reel.mpeg"
FONT_PATH = "/tmp/claude-0/-home-user-Claudereels/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/scratchpad/Montserrat-Regular.ttf"
OUT_FILE  = "/home/user/Claudereels/outputs/cortisol_with_text.mp4"

W, H = 1080, 1920
DURATION = 35
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


def render_text_overlay(text, font_path, font_size, line_spacing, color, canvas_w, canvas_h):
    font = ImageFont.truetype(font_path, font_size)
    img = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    lines = text.split("\n")
    line_h = int(font_size * line_spacing)
    total_h = line_h * len(lines)

    y_start = (canvas_h - total_h) // 2

    for i, line in enumerate(lines):
        if line.strip() == "":
            continue
        bbox = draw.textbbox((0, 0), line, font=font)
        line_w = bbox[2] - bbox[0]
        x = (canvas_w - line_w) // 2
        y = y_start + i * line_h
        draw.text((x, y), line, font=font, fill=color)

    return np.array(img)


print("Rendering text overlay...")
text_arr = render_text_overlay(TEXT, FONT_PATH, FONT_SIZE, LINE_SPACING, TEXT_COLOR, W, H)

print("Loading video...")
bg = VideoFileClip(VIDEO_IN).with_effects([Loop(duration=DURATION)]).with_duration(DURATION)

# Scale to fill 1080x1920 if needed (already correct size but be safe)
if bg.w != W or bg.h != H:
    bg = bg.resized((W, H))

print("Building text clip...")
text_clip = (
    ImageClip(text_arr, duration=DURATION)
    .with_position("center")
)

print("Compositing...")
composite = CompositeVideoClip([bg, text_clip], size=(W, H)).with_duration(DURATION)

print("Loading music...")
music = (
    AudioFileClip(MUSIC_IN)
    .with_duration(DURATION)
    .with_effects([
        MultiplyVolume(MUSIC_VOL),
        AudioFadeOut(FADE_OUT_SECS),
    ])
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
print(f"\nDone: {OUT_FILE} ({os.path.getsize(OUT_FILE)/1024/1024:.1f} MB)")
