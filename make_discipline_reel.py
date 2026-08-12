"""
Text-on-background reel builder — POST56 "Discipline / Sleep"
Video: 15634216_1080_1920_60fps_1_1.mp4
Music: perfect_sound_algorithim_reset_reel.mpeg
Output: outputs/post56_discipline_sleep.mp4
"""
import subprocess, os, textwrap
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

W, H        = 1080, 1920
DURATION    = 35
MUSIC_VOL   = 0.15
FADE_OUT    = 2
FONT_PATH   = "fonts/Montserrat-Bold.ttf"
FONT_SIZE   = 72
LINE_SPACING = 1.5
PADDING     = 90          # horizontal safe-zone px each side
TEXT_IMG    = "/tmp/text_overlay.png"
OUT         = "outputs/post56_discipline_sleep.mp4"

VIDEO = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/be677a82-15634216_1080_1920_60fps_1_1.mp4"
MUSIC = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/75743eb2-perfect_sound_algorithim_reset_reel.mpeg"

TEXT = """\
The most disciplined thing
you can do right now

is go to bed at 9pm.

Not hustle until midnight.
Not optimise your morning routine.
Not drink another coffee.

Sleep is the protocol.
Everything else is noise."""


def make_text_image():
    img  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    max_text_w = W - 2 * PADDING

    # Auto-fit: shrink font until widest line fits
    size = FONT_SIZE
    while size > 20:
        font = ImageFont.truetype(FONT_PATH, size)
        widths = [draw.textbbox((0, 0), ln, font=font)[2]
                  for ln in TEXT.split("\n")]
        if max(widths) <= max_text_w:
            break
        size -= 2

    font        = ImageFont.truetype(FONT_PATH, size)
    line_height = int(size * LINE_SPACING)
    lines       = TEXT.split("\n")
    total_h     = len(lines) * line_height

    # Center block vertically
    y = (H - total_h) // 2
    for line in lines:
        if line.strip() == "":
            y += line_height
            continue
        bbox = draw.textbbox((0, 0), line, font=font)
        x    = (W - (bbox[2] - bbox[0])) // 2
        # Subtle shadow for readability
        draw.text((x + 2, y + 2), line, font=font, fill=(0, 0, 0, 160))
        draw.text((x, y),         line, font=font, fill=(255, 255, 255, 255))
        y += line_height

    img.save(TEXT_IMG)
    print(f"Text image saved ({size}px font)")


def build_video():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    os.makedirs("outputs", exist_ok=True)

    fade_start = DURATION - FADE_OUT

    cmd = [
        ffmpeg, "-y",
        # Inputs
        "-stream_loop", "-1", "-t", str(DURATION), "-i", VIDEO,
        "-stream_loop", "-1", "-t", str(DURATION), "-i", MUSIC,
        "-i", TEXT_IMG,
        # Filter graph
        "-filter_complex",
        (
            # Scale & crop video to exact 1080x1920, 30fps
            f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,"
            f"crop=1080:1920,fps=30,setsar=1[bg];"
            # Overlay transparent text PNG
            f"[bg][2:v]overlay=0:0[vid];"
            # Music: volume + fade out
            f"[1:a]volume={MUSIC_VOL},"
            f"afade=t=out:st={fade_start}:d={FADE_OUT}[aud]"
        ),
        "-map", "[vid]", "-map", "[aud]",
        "-t", str(DURATION),
        "-c:v", "libx264", "-crf", "26", "-preset", "fast", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        OUT,
    ]

    print("Running FFmpeg...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("STDERR:", result.stderr[-1000:])
        raise RuntimeError("FFmpeg failed")
    print(f"\nDone → {OUT}  ({os.path.getsize(OUT)//1024//1024} MB)")


if __name__ == "__main__":
    make_text_image()
    build_video()
