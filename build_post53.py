import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from moviepy import VideoFileClip, ImageClip, AudioFileClip, CompositeVideoClip, concatenate_videoclips
from moviepy.audio.fx import MultiplyVolume, AudioFadeOut
from moviepy.video.fx import Resize, Loop

# ── Paths ──────────────────────────────────────────────────────────────────────
VIDEO_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/90b54b1c-15084294_2160_3840_30fps.mp4"
COVER_IN  = "/tmp/post53/post 53 the healthiest people i know.png"
MUSIC_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/abb30d66-post_53_leberchpianocalm525211.mp3.mpeg"
FONT_PATH = "/tmp/Montserrat-Bold.ttf"
OUTPUT    = "/home/user/Claudereels/outputs/post53_healthiest_with_cover.mp4"

# ── Spec ───────────────────────────────────────────────────────────────────────
W, H           = 1080, 1920
FPS            = 30
TOTAL_DUR      = 35.0
COVER_DUR      = 2.0
VIDEO_DUR      = TOTAL_DUR - COVER_DUR   # 33s
MUSIC_VOL      = 0.15
FADE_DUR       = 2.0
FONT_SIZE_MAX  = 72
PAD_X          = 80   # horizontal padding each side
PAD_Y          = 100  # vertical padding top/bottom
LINE_SPACING   = 1.5

TEXT = """\
The healthiest people I know

Do not talk about their diet at dinner.
Do not wear their fitness tracker as a personality.
Do not post every workout.

They just quietly

Sleep 8 hours.
Walk every day.
Eat real food.
Manage their stress.

And they look 10 years younger than everyone else.

Quiet consistency beats loud motivation.
Every time."""

os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)


# ── 1. Render text to RGBA image (auto-fit font size) ─────────────────────────
def make_text_image(text: str, max_w: int, max_h: int, font_path: str, max_size: int) -> Image.Image:
    lines = text.split('\n')
    font_size = max_size

    while font_size >= 14:
        font = ImageFont.truetype(font_path, font_size)
        line_h = int(font_size * LINE_SPACING)
        total_h = line_h * len(lines)

        # measure widest line
        test_img = Image.new('RGBA', (1, 1))
        draw = ImageDraw.Draw(test_img)
        max_line_w = max(
            draw.textlength(line, font=font) if line.strip() else 0
            for line in lines
        )

        if max_line_w <= max_w and total_h <= max_h:
            break
        font_size -= 1

    print(f"  Font size settled at: {font_size}px")

    font = ImageFont.truetype(font_path, font_size)
    line_h = int(font_size * LINE_SPACING)
    total_h = line_h * len(lines)

    img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # center block vertically
    y_start = (H - total_h) // 2

    for i, line in enumerate(lines):
        y = y_start + i * line_h
        if line.strip():
            lw = draw.textlength(line, font=font)
            x = (W - lw) / 2  # center horizontally
            draw.text((x, y), line, font=font, fill=(255, 255, 255, 255))

    return img


print("Rendering text image...")
text_img = make_text_image(TEXT, W - 2 * PAD_X, H - 2 * PAD_Y, FONT_PATH, FONT_SIZE_MAX)
text_arr = np.array(text_img)
print("  Text image rendered.")


# ── 2. Cover clip (2s still) ───────────────────────────────────────────────────
print("Building cover clip...")
cover_pil = Image.open(COVER_IN).convert('RGB').resize((W, H), Image.LANCZOS)
cover_arr = np.array(cover_pil)
cover_clip = ImageClip(cover_arr).with_duration(COVER_DUR).with_fps(FPS)
print("  Cover clip ready.")


# ── 3. Background video: scale + loop to VIDEO_DUR ────────────────────────────
print("Loading background video...")
bg = VideoFileClip(VIDEO_IN, audio=False)
bg = bg.with_effects([Resize((W, H))])
# loop to fill VIDEO_DUR
bg = bg.with_effects([Loop(duration=VIDEO_DUR)])
bg = bg.with_duration(VIDEO_DUR).with_fps(FPS)
print(f"  Background video: {bg.duration:.2f}s at {W}x{H}")


# ── 4. Text overlay on video ───────────────────────────────────────────────────
print("Compositing text overlay...")
text_clip = ImageClip(text_arr, is_mask=False).with_duration(VIDEO_DUR).with_fps(FPS)
video_with_text = CompositeVideoClip([bg, text_clip]).with_duration(VIDEO_DUR).with_fps(FPS)
print("  Composite ready.")


# ── 5. Concatenate cover + video ───────────────────────────────────────────────
print("Concatenating cover + video...")
final_video = concatenate_videoclips([cover_clip, video_with_text])
print(f"  Final video duration: {final_video.duration:.2f}s")


# ── 6. Music: 15% volume, 2s fade out ─────────────────────────────────────────
print("Loading music...")
music = AudioFileClip(MUSIC_IN)
# Trim or loop music to match total duration
if music.duration < TOTAL_DUR:
    from moviepy.audio.fx import AudioLoop
    music = music.with_effects([AudioLoop(duration=TOTAL_DUR)])
music = music.with_duration(TOTAL_DUR)
music = music.with_effects([
    MultiplyVolume(MUSIC_VOL),
    AudioFadeOut(FADE_DUR),
])
print(f"  Music ready: {music.duration:.2f}s @ {int(MUSIC_VOL*100)}% vol, {FADE_DUR}s fade out")


# ── 7. Attach audio and export ─────────────────────────────────────────────────
print("Attaching audio...")
final = final_video.with_audio(music)

print(f"Rendering to {OUTPUT} ...")
final.write_videofile(
    OUTPUT,
    fps=FPS,
    codec='libx264',
    audio_codec='aac',
    audio_bitrate='192k',
    preset='fast',
    threads=4,
    logger='bar',
)

size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
print(f"\nDone: {OUTPUT} ({size_mb:.1f} MB)")
