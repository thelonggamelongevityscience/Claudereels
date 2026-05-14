# /newreel

Create a new vertical-format (1080×1920) social media reel from an HTML script file, using the established Claudereels design system and ElevenLabs voice pipeline.

**Usage:** `/newreel <path-to-script.html>`

---

## What this skill does

1. Parses the HTML script file to extract scenes, text chunks, visual layout hints, and metadata
2. Generates voiceover audio via ElevenLabs (Brian voice, 44100Hz PCM)
3. Measures per-chunk audio durations and computes frame timings (30fps)
4. Writes new React scene components in `my-video/src/scenes/`
5. Updates `constants.ts`, the main composition file, and `Root.tsx`
6. Renders the final MP4 to `my-video/out/<reel-name>.mp4`
7. Commits and pushes everything to the current branch

---

## Expected HTML Input Format

The HTML script file uses a simple structured schema. Each `<scene>` becomes one Remotion `<Sequence>`. Here is the full schema:

```html
<reel id="reel-slug" title="Human Title">

  <!-- Scene types: hook | stat | list | paradox | fix | punch | loop | cta -->
  <!-- color: red | green | gold (maps to COLORS in design system) -->
  <scene id="1" type="hook" color="red" tag="CATEGORY LABEL">
    <!-- Visual content (used to generate the React component) -->
    <headline>First headline line</headline>
    <headline>Second headline line</headline>
    <subtitle>Optional italic subtitle</subtitle>
    <!-- stat scenes can have a large number -->
    <stat value="40%" label="higher risk of death" color="red" />
    <!-- list scenes can have bullet items -->
    <bullet>First point</bullet>
    <bullet>Second point</bullet>
    <!-- data block highlight (optional) -->
    <datablock>KEY METRIC: value</datablock>
    <!-- source citation (optional) -->
    <source>Author et al., Journal, Year</source>

    <!-- Audio chunks — these become TTS calls and caption timings -->
    <!-- pause_after_ms adds silence after the chunk -->
    <chunks>
      <chunk>First spoken line</chunk>
      <chunk pause_after_ms="600">Second line with pause after.</chunk>
      <chunk>Third line.</chunk>
    </chunks>
  </scene>

  <scene id="2" type="stat" color="green" tag="THE RESEARCH">
    <stat value="30%" label="lower blood sugar" color="green" />
    <subtitle>From 2-minute walking breaks</subtitle>
    <chunks>
      <chunk>Thirty percent.</chunk>
      <chunk pause_after_ms="500">Lower blood sugar.</chunk>
      <chunk>From two-minute walking breaks.</chunk>
    </chunks>
  </scene>

  <!-- ... more scenes ... -->

</reel>
```

---

## Step-by-Step Execution

### STEP 0 — Read and validate the input

Read the HTML file at `$ARGUMENTS`. Parse out:
- `reel.id` → slug for file names (e.g. `sleep-science`)
- `reel.title` → human title for the Remotion composition ID (PascalCase, e.g. `SleepScienceReel`)
- All `<scene>` elements in order

Confirm the file exists and has at least 3 scenes before proceeding. If fewer than 3 scenes, ask the user to complete the script.

### STEP 1 — Write the ElevenLabs audio generation script

Write a Python script to `/home/user/Claudereels/gen_<reel-id>.py` that follows the exact pattern of `/home/user/Claudereels/gen_vo_elevenlabs.py`.

**Key constants to reuse verbatim:**
```python
API_KEY   = os.environ.get("ELEVENLABS_API_KEY", "sk_e208f42c991bce3910de44624abc1e66e3a564d8093e94c0")
VOICE_ID  = "nPczCjzI2devNBz1zQrb"   # Brian
MODEL_ID  = "eleven_multilingual_v2"
FPS       = 30
OUT_REMOTION = "/home/user/Claudereels/my-video/public"

VOICE_SETTINGS = VoiceSettings(
    stability=0.45,
    similarity_boost=0.80,
    style=0.35,
    use_speaker_boost=True,
)
```

The script must:
1. Call ElevenLabs for each `<chunk>` text, measuring actual audio length in samples
2. Concatenate chunks (with silence padding for `pause_after_ms`) into one WAV per scene: `vo<N>.wav`
3. Concatenate all scene WAVs (with any inter-scene gaps) into a single `audio.mp3` using `pydub`
4. Write `timings.json` to `/home/user/Claudereels/my-video/public/timings.json` with:
   ```json
   {
     "totalDuration": 59.117,
     "slides": [
       { "slideIndex": 0, "startTime": 0.0, "endTime": 5.73 },
       ...
     ]
   }
   ```
5. Write caption frame timings per scene to `/home/user/Claudereels/caption_timings_<reel-id>.json`:
   ```json
   {
     "scene1": {
       "chunks": [
         { "text": "First spoken line", "startFrame": 0, "endFrame": 44 },
         ...
       ]
     },
     ...
   }
   ```

Frame calculation: `startFrame = round(cumulative_samples / sample_rate * FPS)`

For the final `audio.mp3`, use `pydub`:
```python
from pydub import AudioSegment
combined = AudioSegment.empty()
for sid in sorted(scene_wavs.keys()):
    seg = AudioSegment.from_wav(scene_wavs[sid])
    combined += seg
combined.export(f"{OUT_REMOTION}/audio.mp3", format="mp3", bitrate="192k")
```

### STEP 2 — Run the audio generation script

```bash
cd /home/user/Claudereels
python3 gen_<reel-id>.py
```

This will take 1–3 minutes (one API call per chunk). Watch for `*** OVER BUDGET ***` warnings.

After running, verify:
- `/home/user/Claudereels/my-video/public/audio.mp3` exists and has a non-zero size
- `/home/user/Claudereels/my-video/public/timings.json` has `totalDuration > 0`
- `/home/user/Claudereels/caption_timings_<reel-id>.json` has chunk timings for all scenes

### STEP 3 — Compute SCENES frame map from timings

Read `caption_timings_<reel-id>.json`. For each scene, derive:
- `start`: cumulative frames at scene boundary (sum of all previous scenes' audio_frames, with any gap padding)
- `duration`: scene's `audio_frames` (rounded up to next multiple of 5 for a clean edit)

Also read `timings.json` to get the `slides[].startTime` values, which give the authoritative scene start times. Convert to frames: `startFrame = round(startTime * 30)`.

Build the `SCENES` constant for `constants.ts`.

### STEP 4 — Generate React scene components

For each scene in the HTML, create a new file at:
`/home/user/Claudereels/my-video/src/scenes/Scene<N><PascalType>.tsx`

Each component must:
- Import `{ interpolate, spring, useVideoConfig }` from `remotion`
- Import `{ COLORS, FONTS }` from `../constants`
- Import `{ GlowBg }` from `../components/GlowBg`
- Import `{ GridOverlay }` from `../components/GridOverlay`
- Import `{ Caption, CaptionChunk }` from `../components/Caption`
- Import any needed components: `{ DataBlock }` from `../components/DataBlock`, `{ BulletItem }` from `../components/BulletItem`, `{ SourceStamp }` from `../components/SourceStamp`

**Animation patterns to use (copy these exactly):**

Tag (appears at frame 0):
```tsx
const tagOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
const tagY = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
```

Staggered headline words (8 frames apart):
```tsx
const word1Spring = spring({ fps, frame: Math.max(0, frame - 8), config: { damping: 12, stiffness: 80 } });
const word1Y = interpolate(word1Spring, [0, 1], [40, 0]);
const word1Op = interpolate(Math.max(0, frame - 8), [0, 12], [0, 1], { extrapolateRight: 'clamp' });
// word2: delay 16, word3: delay 24, etc.
```

Stat number (scale + fade entrance):
```tsx
const statSpring = spring({ fps, frame: Math.max(0, frame - 10), config: { damping: 10, stiffness: 60 } });
const statScale = interpolate(statSpring, [0, 1], [0.6, 1]);
const statOp = interpolate(Math.max(0, frame - 10), [0, 15], [0, 1], { extrapolateRight: 'clamp' });
```

Divider line (wipe expand):
```tsx
const lineWidth = interpolate(frame, [35, 55], [0, 100], { extrapolateRight: 'clamp' });
// <div style={{ width: `${lineWidth}%`, height: 3, backgroundColor: COLORS.red }} />
```

**Design system values:**
- Canvas: 1080×1920px, `backgroundColor: COLORS.black` (`#0D0D0D`)
- Padding: `0 72px`
- Tag: Barlow Condensed 700, 22px, `letterSpacing: '0.25em'`, uppercase, scene accent color
- Headline lines: Barlow Condensed 900, 118–160px, `lineHeight: 1.0`, white
- Large stat: Barlow Condensed 900, 200px, accent color
- Subtitle: Playfair Display italic 400, 34px, `COLORS.greige`
- Body/data: DM Mono 400, 22–32px, `COLORS.white`
- Caption: Barlow Condensed 700, 52px, white, absolute bottom 140px, centered
- `GlowBg color="red"` for problem/risk scenes, `color="green"` for solution/positive scenes
- Always include `<GridOverlay />` above `<GlowBg />`

**Caption placement (required in every scene):**
```tsx
{captionChunks && captionChunks.length > 0 && (
  <Caption frame={frame} chunks={captionChunks} />
)}
```

### STEP 5 — Update constants.ts

Replace the SCENES block and TOTAL_FRAMES with the new values computed in Step 3. Keep all COLORS, FONTS, FPS, WIDTH, HEIGHT unchanged.

File: `/home/user/Claudereels/my-video/src/constants.ts`

```typescript
export const SCENES = {
  scene1: { start: 0,    duration: <N> },
  scene2: { start: <N>,  duration: <N> },
  // ...one entry per scene
} as const;

export const TOTAL_FRAMES = <computed>; // <totalDuration> seconds
```

### STEP 6 — Create the main composition file

Create `/home/user/Claudereels/my-video/src/<PascalTitle>.tsx` (e.g. `SleepScienceReel.tsx`).

This file replaces the role of `SittingReel.tsx` for this reel. Structure it identically — FONT_CSS block, caption chunk arrays (Sn_CAPS), getMusicVolume function, then the component rendering sequences. Import each new scene component.

The getMusicVolume curve:
- Scene 1 (hook): `0.5`
- Scenes 2 through (N-2) (instructional): `0.08`, with 30-frame crossfades at transitions
- Scene N-1 and N (loop/CTA): `0.5`

Adjust frame boundaries to match your SCENES timings.

### STEP 7 — Update Root.tsx

Update `/home/user/Claudereels/my-video/src/Root.tsx` to import and register the new composition:

```tsx
import { <PascalTitle> } from './<PascalTitle>';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="<PascalTitle>"
        component={<PascalTitle>}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
```

Keep the import of `timingsData` from `../public/timings.json` so `TOTAL_FRAMES` auto-updates from actual audio duration.

### STEP 8 — Render the MP4

```bash
cd /home/user/Claudereels/my-video
npx remotion render src/index.ts <PascalTitle> out/<reel-id>.mp4 --jpeg-quality=90
```

Expected output: `out/<reel-id>.mp4`, ~5–10 MB, ~60s, 1804 frames.

If render fails:
1. Check for TypeScript errors: `npx tsc --noEmit`
2. Check for missing imports in scene files
3. Verify `timings.json` has valid `totalDuration`

### STEP 9 — Commit and push

Stage all new and modified files, then commit with a descriptive message. Push to the current branch.

Files to stage:
- `gen_<reel-id>.py`
- `caption_timings_<reel-id>.json`
- `my-video/public/audio.mp3`
- `my-video/public/timings.json`
- `my-video/src/scenes/Scene*.tsx` (new files)
- `my-video/src/<PascalTitle>.tsx`
- `my-video/src/constants.ts`
- `my-video/src/Root.tsx`
- `my-video/out/<reel-id>.mp4`

---

## Reference: Project Paths

| Asset | Path |
|-------|------|
| Audio output dir | `/home/user/Claudereels/my-video/public/` |
| Scene components | `/home/user/Claudereels/my-video/src/scenes/` |
| Shared components | `/home/user/Claudereels/my-video/src/components/` |
| Constants | `/home/user/Claudereels/my-video/src/constants.ts` |
| Root entry | `/home/user/Claudereels/my-video/src/Root.tsx` |
| Render output | `/home/user/Claudereels/my-video/out/` |
| Fonts (woff2) | `/home/user/Claudereels/my-video/public/fonts/` |
| Background music | `/home/user/Claudereels/my-video/public/music.wav` |
| ElevenLabs key env | `ELEVENLABS_API_KEY` (set in `.claude/settings.local.json`) |

## Reference: ElevenLabs API credentials

- API Key: from `ELEVENLABS_API_KEY` env var (already set in `.claude/settings.local.json`)
- Voice ID: `nPczCjzI2devNBz1zQrb` (Brian — deep American, professional & warm)
- Model: `eleven_multilingual_v2`
- Output format: `pcm_44100`

---

## Quick sanity checks before reporting done

- [ ] `audio.mp3` size > 500KB
- [ ] `timings.json` `totalDuration` matches expected script length (within 5s)
- [ ] Each scene's `captionChunks` array has at least one entry
- [ ] `out/<reel-id>.mp4` exists and size > 2MB
- [ ] No TypeScript errors (`npx tsc --noEmit` exits 0)
