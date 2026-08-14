"""
Text-on-background reel builder — POST57 "Two People Same Age"
Video: 16200612_1080_1920_60fps.mp4
Music: the_mountaindramaticdramaticmusic508006.mp3
Cover: post57_cover.png (1 second at start)
Output: outputs/post57_two_people_with_cover.mp4
"""
import subprocess, os
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

W, H         = 1080, 1920
DURATION     = 35
MUSIC_VOL    = 0.15
FADE_OUT     = 2
FONT_PATH    = "fonts/Montserrat-Bold.ttf"
FONT_SIZE    = 72
LINE_SPACING = 1.5
PADDING      = 90
TEXT_IMG     = "/tmp/post57_text_overlay.png"
OUT          = "outputs/post57_two_people_with_cover.mp4"

VIDEO = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/91f38531-16200612_1080_1920_60fps.mp4"
MUSIC = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/425685de-the_mountaindramaticdramaticmusic508006.mp3"
COVER = "my-video/public/post57_cover.png"

TEXT = """\
Two people born the same year.

One is biologically 10 years older
than the other.

Same birthday.
Different bodies.

The difference is not genetics.

It is the accumulation of daily choices
across decades.

Sleep. Food. Movement. Stress.
Connection. Purpose.

You are ageing faster or slower
than your birth certificate right now.

Which one is it?"""


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

    total = DURATION + 1  # 1s cover + 35s reel

    cmd = [
        ffmpeg, "-y",
        # Inputs: cover (1s), background video, music, text overlay
        "-loop", "1", "-t", "1", "-i", COVER,
        "-stream_loop", "-1", "-t", str(DURATION), "-i", VIDEO,
        "-stream_loop", "-1", "-t", str(total), "-i", MUSIC,
        "-i", TEXT_IMG,
        # Filter graph
        "-filter_complex",
        (
            # Cover: scale to 1080x1920, 30fps
            "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,"
            "crop=1080:1920,fps=30,setsar=1[cover_v];"

            # Background video: scale, crop, fps
            "[1:v]scale=1080:1920:force_original_aspect_ratio=increase,"
            f"crop=1080:1920,fps=30,setsar=1[bg];"

            # Overlay text PNG onto video
            "[bg][3:v]overlay=0:0[vid];"

            # Concat cover + text-video (video only, no audio stream)
            "[cover_v][vid]concat=n=2:v=1:a=0[outv];"

            # Music: volume + fade out over total duration
            f"[2:a]volume={MUSIC_VOL},"
            f"afade=t=out:st={total - FADE_OUT}:d={FADE_OUT}[aud]"
        ),
        "-map", "[outv]", "-map", "[aud]",
        "-t", str(total),
        "-c:v", "libx264", "-crf", "26", "-preset", "fast", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        OUT,
    ]

    print("Running FFmpeg...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("STDERR:", result.stderr[-2000:])
        raise RuntimeError("FFmpeg failed")
    print(f"\nDone → {OUT}  ({os.path.getsize(OUT)//1024//1024} MB)")


if __name__ == "__main__":
    make_text_image()
    build_video()
