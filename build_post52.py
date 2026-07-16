import os, sys, json, zipfile, subprocess
from PIL import Image, ImageDraw, ImageFont

UPLOADS = "/root/.claude/uploads/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2"
WORK    = "/tmp/claude-0/-home-user-Claudereels/37d971bc-cb9a-57c8-a7cd-0e63d7416cc2/scratchpad"
VIDEO_IN = f"{UPLOADS}/0ad752db-5595352hd_1080_1920_24fps.mp4"
ZIP_IN   = f"{UPLOADS}/d65e6323-post_52_the_trap_most_people_never_escapefor_claude.zip"
MUSIC_IN = f"{UPLOADS}/4a974a1a-music_for_reel_52_the_trap.mpeg"
FONT     = f"{WORK}/Montserrat-Bold.ttf"
OUTPUT   = "/home/user/Claudereels/outputs/post52_the_trap_with_cover.mp4"
import imageio_ffmpeg
FFMPEG   = imageio_ffmpeg.get_ffmpeg_exe()

W, H = 1080, 1920
COVER_SECONDS  = 2.0
TARGET_TOTAL   = 35.0           # desired total duration
VIDEO_SECTION  = TARGET_TOTAL - COVER_SECONDS  # 33s of looped background
VIDEO_FPS      = 24
MUSIC_VOLUME   = 0.15
FADE_OUT_DUR   = 2.0

# ── 1. Extract cover PNG ─────────────────────────────────────────────────────
print("Extracting cover PNG...")
with zipfile.ZipFile(ZIP_IN) as z:
    png_names = [f for f in z.namelist() if f.lower().endswith('.png')]
    extracted = z.extract(png_names[0], WORK)
    cover_png = extracted
print(f"  Cover: {cover_png}")

# ── 2. Probe video duration ──────────────────────────────────────────────────
print("Probing video...")
FFPROBE = "/home/user/Claudereels/my-video/node_modules/@remotion/compositor-linux-x64-gnu/ffprobe"
probe = subprocess.run(
    [FFPROBE, "-v", "quiet", "-print_format", "json",
     "-show_format", VIDEO_IN],
    capture_output=True, text=True
)
video_duration = float(json.loads(probe.stdout)["format"]["duration"])
print(f"  Video duration: {video_duration:.3f}s (will loop to fill {VIDEO_SECTION:.0f}s)")

total_duration = TARGET_TOTAL
fade_start     = total_duration - FADE_OUT_DUR
print(f"  Total: {total_duration:.3f}s, music fade at {fade_start:.3f}s")

# ── 3. Render text overlay PNG ───────────────────────────────────────────────
print("Rendering text overlay...")

TEXT_LINES = [
    "Most people will spend",
    "the first half of their life",
    "destroying their health to build wealth.",
    "",
    "And the second half",
    "spending that wealth",
    "trying to rebuild their health.",
    "",
    "You do not have to.",
    "",
    "The habits that protect your biology",
    "are free, boring, and available today.",
    "",
    "Nobody sells them.",
    "That is why nobody talks about them.",
]

FONT_SIZE_REQUESTED = 72
LINE_SPACING = 1.5
SIDE_PAD     = 60   # px padding each side
MAX_TEXT_W   = W - SIDE_PAD * 2  # 960px usable width

# Auto-fit: find largest font size where all lines fit within MAX_TEXT_W
font_size = FONT_SIZE_REQUESTED
while font_size > 20:
    font = ImageFont.truetype(FONT, font_size)
    widths = [font.getbbox(l)[2] - font.getbbox(l)[0] for l in TEXT_LINES if l]
    if max(widths) <= MAX_TEXT_W:
        break
    font_size -= 1

if font_size < FONT_SIZE_REQUESTED:
    print(f"  NOTE: Reduced font size from {FONT_SIZE_REQUESTED}px to {font_size}px to fit {W}px frame")

LINE_H = int(font_size * LINE_SPACING)
font   = ImageFont.truetype(FONT, font_size)

# Measure actual text block height
total_text_h = len(TEXT_LINES) * LINE_H
start_y = (H - total_text_h) // 2

max_w = max(font.getbbox(l)[2] - font.getbbox(l)[0] for l in TEXT_LINES if l)
print(f"  Text block: {max_w}px wide × {total_text_h}px tall, starts at y={start_y}, font={font_size}px")

img  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

for i, line in enumerate(TEXT_LINES):
    if not line:
        continue
    y  = start_y + i * LINE_H
    bb = font.getbbox(line)
    tw = bb[2] - bb[0]
    x  = (W - tw) // 2
    draw.text((x, y), line, font=font, fill=(255, 255, 255, 255))

text_png = f"{WORK}/text_overlay.png"
img.save(text_png)
print(f"  Saved: {text_png}")

# ── 4. Compose with ffmpeg ───────────────────────────────────────────────────
# Inputs:
#   0 = cover PNG  (still, loop 1, duration=COVER_SECONDS)
#   1 = background video (has audio we ignore)
#   2 = text overlay PNG (still, loop 1, full duration)
#   3 = music MP3

print("Composing video with ffmpeg...")

filter_complex = (
    # Cover image → 2s video clip
    f"[0:v]scale={W}:{H},setsar=1,trim=duration={COVER_SECONDS},setpts=PTS-STARTPTS[cover_v];"
    # Background video → scale, trim to VIDEO_SECTION (input is stream_loop -1)
    f"[1:v]scale={W}:{H},setsar=1,trim=duration={VIDEO_SECTION:.3f},setpts=PTS-STARTPTS[bg_v];"
    # Text overlay PNG → hold for VIDEO_SECTION seconds
    f"[2:v]scale={W}:{H},trim=duration={VIDEO_SECTION:.3f},setpts=PTS-STARTPTS[txt_v];"
    # Overlay text on looped background video
    "[bg_v][txt_v]overlay=0:0[video_v];"
    # Concatenate cover + text-video
    f"[cover_v][video_v]concat=n=2:v=1:a=0[out_v];"
    # Music: 15% volume, fade out last 2s, trim to total duration
    f"[3:a]volume={MUSIC_VOLUME},afade=t=out:st={fade_start:.3f}:d={FADE_OUT_DUR},"
    f"atrim=duration={total_duration:.3f},asetpts=PTS-STARTPTS[out_a]"
)

cmd = [
    FFMPEG, "-y",
    "-loop", "1", "-framerate", str(VIDEO_FPS), "-t", str(COVER_SECONDS), "-i", cover_png,
    "-stream_loop", "-1", "-i", VIDEO_IN,   # loop video input indefinitely
    "-loop", "1", "-framerate", str(VIDEO_FPS), "-i", text_png,  # text PNG loops too
    "-i", MUSIC_IN,
    "-filter_complex", filter_complex,
    "-map", "[out_v]",
    "-map", "[out_a]",
    "-c:v", "libx264", "-preset", "fast", "-crf", "18",
    "-c:a", "aac", "-b:a", "192k",
    "-r", str(VIDEO_FPS),
    "-t", str(total_duration),
    OUTPUT,
]

result = subprocess.run(cmd, capture_output=True, text=True)
if result.returncode != 0:
    print("STDERR:", result.stderr[-3000:])
    sys.exit(1)

size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
print(f"\nSuccess! {OUTPUT} ({size_mb:.1f} MB)")
