"""
Text-on-background reel builder.
Output: 1080x1920, 35s, static centered text, music at 15% with 2s fade-out.
"""
import subprocess
import sys
import os
from PIL import Image, ImageDraw, ImageFont

FFMPEG = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"

VIDEO_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/26d6583a-15631157_1440_2560_30fps_1.mp4"
MUSIC_IN  = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/2ab8ca3a-music_for_reel_52_the_trap.mpeg"
FONT_PATH = "/tmp/montserrat_pkg/usr/share/fonts/truetype/montserrat/Montserrat-Regular.ttf"
TEXT_IMG  = "/tmp/text_overlay.png"
OUTPUT    = "/home/user/Claudereels/outputs/post55_doctor_will_not_tell_you.mp4"

W, H     = 1080, 1920
DURATION = 35
FONT_SIZE = 52       # reduced; auto-fit will shrink further if needed
LINE_SPACING = 1.5  # multiplier on font size
PADDING = 80        # horizontal safe-zone pixels each side

TEXT = """\
Your doctor will not tell you
to fix your sleep before your prescription.

They will not tell you
that chronic inflammation
is behind almost every disease
that will kill you.

They have 7 minutes.
They have a prescription pad.
They have liability to manage.

You have the rest of your life.

Learn the science yourself."""


def make_text_image():
    """Render static text to a transparent PNG at 1080x1920."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Auto-fit: shrink font until the widest line fits within (W - 2*PADDING)
    max_text_w = W - 2 * PADDING
    size = FONT_SIZE
    while size > 20:
        font = ImageFont.truetype(FONT_PATH, size)
        widths = [draw.textbbox((0, 0), l, font=font)[2] for l in TEXT.split("\n") if l.strip()]
        if max(widths) <= max_text_w:
            break
        size -= 2

    print(f"Using font size: {size}px")
    line_height = int(size * LINE_SPACING)
    lines = TEXT.split("\n")

    # Measure total text block height
    total_height = len(lines) * line_height
    # Start y so the block is vertically centered
    y = (H - total_height) // 2

    for line in lines:
        if line.strip() == "":
            y += line_height
            continue
        bbox = draw.textbbox((0, 0), line, font=font)
        text_w = bbox[2] - bbox[0]
        x = (W - text_w) // 2
        draw.text((x, y), line, font=font, fill=(255, 255, 255, 255))
        y += line_height

    img.save(TEXT_IMG)
    print(f"Text overlay saved: {TEXT_IMG}")


def build_video():
    """FFmpeg: scale+crop video to 1080x1920, loop to 35s, overlay text, mix music."""
    # Video input: 1440x2560 → scale to fit 1080 wide, crop to 1920 tall
    # 1440*1920/2560 = 1080 exactly, so simple scale to 1080x1920

    cmd = [
        FFMPEG, "-y",
        # Loop video in case it's shorter than 35s
        "-stream_loop", "-1", "-t", str(DURATION), "-i", VIDEO_IN,
        # Music input
        "-t", str(DURATION), "-i", MUSIC_IN,
        # Text overlay image
        "-i", TEXT_IMG,
        "-filter_complex",
        (
            # Scale video to 1080x1920
            "[0:v]scale=1080:1920,setsar=1[bg];"
            # Overlay text image (already 1080x1920 RGBA)
            "[bg][2:v]overlay=0:0[vout];"
            # Music: volume 0.15, fade out last 2 seconds
            f"[1:a]volume=0.15,afade=t=out:st={DURATION - 2}:d=2[aout]"
        ),
        "-map", "[vout]",
        "-map", "[aout]",
        "-t", str(DURATION),
        "-c:v", "libx264", "-crf", "23", "-preset", "fast",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-movflags", "+faststart",
        OUTPUT,
    ]

    print("Running FFmpeg...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("STDERR:", result.stderr[-3000:])
        sys.exit(1)
    print(f"Output: {OUTPUT}")
    size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
    print(f"Size: {size_mb:.1f} MB")


if __name__ == "__main__":
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    make_text_image()
    build_video()
