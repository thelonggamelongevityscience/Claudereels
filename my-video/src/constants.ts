export const FPS    = 30;
export const WIDTH  = 1080;
export const HEIGHT = 1920;

export const COLORS = {
  black:  '#0D0D0D',
  white:  '#FFFFFF',
  greige: '#E8E0D5',
  grey:   '#777777',
  red:    '#FF4D6D',
  green:  '#00FF85',
  gold:   '#FFD166',
  purple: '#C4A0FF',
} as const;

export const FONTS = {
  barlow:  "'Barlow Condensed', sans-serif",
  playfair: "'Playfair Display', serif",
  mono:    "'DM Mono', monospace",
} as const;

// ── ZombieCellsReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const ZOMBIE_CELLS_SCENES = {
  scene1: { start:    0, duration: 227 },  // 0.000–7.567s    Hook
  scene2: { start:  227, duration: 337 },  // 7.567–18.800s   What They Are
  scene3: { start:  564, duration: 324 },  // 18.800–29.600s  The Damage
  scene4: { start:  888, duration: 389 },  // 29.600–42.567s  The Research
  scene5: { start: 1277, duration: 336 },  // 42.567–53.767s  What Creates Them
  scene6: { start: 1613, duration: 453 },  // 53.767–68.867s  The Protocol
  scene7: { start: 2066, duration: 239 },  // 68.867–76.833s  Loop Hook
  scene8: { start: 2305, duration: 169 },  // 76.833–82.467s  CTA
} as const;

export const ZOMBIE_CELLS_TOTAL_FRAMES = 2504; // 2474f audio + 30f buffer (82.47s)

// ── GutAnxietyReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const GUT_ANXIETY_SCENES = {
  scene1: { start:    0, duration: 174 },  // 0.000–5.800s    Hook
  scene2: { start:  174, duration: 417 },  // 5.800–19.700s   The Connection
  scene3: { start:  591, duration: 418 },  // 19.700–33.633s  The Signs
  scene4: { start: 1009, duration: 285 },  // 33.633–43.133s  What Breaks It
  scene5: { start: 1294, duration: 389 },  // 43.133–56.100s  The Fix
  scene6: { start: 1683, duration: 226 },  // 56.100–63.633s  Loop Hook
  scene7: { start: 1909, duration: 192 },  // 63.633–69.967s  CTA
} as const;

export const GUT_ANXIETY_TOTAL_FRAMES = 2131; // 2101f audio + 30f buffer (70.03s)

// ── BloodSugarReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const BLOOD_SUGAR_SCENES = {
  scene1: { start:    0, duration: 189 },  // 0.000–6.300s    Hook
  scene2: { start:  189, duration: 575 },  // 6.300–25.467s   The Problem
  scene3: { start:  764, duration: 431 },  // 25.467–39.767s  What Spikes Do
  scene4: { start: 1195, duration: 402 },  // 39.767–53.167s  The Hidden Signs
  scene5: { start: 1597, duration: 495 },  // 53.167–69.667s  The Fix
  scene6: { start: 2092, duration: 204 },  // 69.667–76.467s  Loop Hook
  scene7: { start: 2296, duration: 176 },  // 76.467–82.400s  CTA
} as const;

export const BLOOD_SUGAR_TOTAL_FRAMES = 2502; // 2472f audio + 30f buffer (82.4s)

// ── HormonesReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const HORMONES_SCENES = {
  scene1: { start:    0, duration: 222 },  // 0.000–7.400s    Hook
  scene2: { start:  222, duration: 437 },  // 7.400–22.967s   Cortisol & Insulin
  scene3: { start:  659, duration: 558 },  // 22.967–41.567s  Testosterone & Thyroid
  scene4: { start: 1217, duration: 399 },  // 40.567–53.867s  What Destroys Them
  scene5: { start: 1616, duration: 575 },  // 53.867–73.033s  The Protocol
  scene6: { start: 2191, duration: 259 },  // 73.033–81.667s  Loop Hook
  scene7: { start: 2450, duration: 215 },  // 81.667–88.833s  CTA
} as const;

export const HORMONES_TOTAL_FRAMES = 2725; // 2695f audio + 30f buffer (88.83s)

// ── MetabolicReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const METABOLIC_SCENES = {
  scene1: { start:    0, duration: 196 },  // 0.000–6.533s    Hook
  scene2: { start:  196, duration: 526 },  // 6.533–24.067s   The Number
  scene3: { start:  722, duration: 531 },  // 24.067–41.767s  Why Nobody Knows
  scene4: { start: 1253, duration: 473 },  // 41.767–57.533s  What It Drives
  scene5: { start: 1726, duration: 601 },  // 57.533–77.567s  The Five Tests
  scene6: { start: 2327, duration: 349 },  // 77.567–89.200s  Loop Hook
  scene7: { start: 2676, duration: 240 },  // 89.200–97.200s  CTA
} as const;

export const METABOLIC_TOTAL_FRAMES = 2946; // 2916f audio + 30f buffer (97.2s)

// ── LiverReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const LIVER_SCENES = {
  scene1: { start:    0, duration: 207 },  // 0.000–6.900s    Hook
  scene2: { start:  207, duration: 630 },  // 6.900–27.900s   What It Does
  scene3: { start:  837, duration: 466 },  // 27.900–43.433s  The Silent Epidemic
  scene4: { start: 1303, duration: 422 },  // 43.433–57.500s  The Signs
  scene5: { start: 1725, duration: 696 },  // 57.500–80.700s  The Protocol
  scene6: { start: 2421, duration: 166 },  // 80.700–86.233s  Loop Hook
  scene7: { start: 2587, duration: 162 },  // 86.233–91.633s  CTA
} as const;

export const LIVER_TOTAL_FRAMES = 2779; // 2749f audio + 30f buffer (91.6s)

// ── CholesterolReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const CHOLESTEROL_SCENES = {
  scene1: { start:    0, duration: 222 },  // 0.000–7.400s    Hook
  scene2: { start:  222, duration: 701 },  // 7.400–30.767s   The Problem
  scene3: { start:  923, duration: 661 },  // 30.767–52.800s  What Actually Matters
  scene4: { start: 1584, duration: 614 },  // 52.800–73.267s  What Builds Plaque
  scene5: { start: 2198, duration: 848 },  // 73.267–101.567s The Protocol
  scene6: { start: 3046, duration: 271 },  // 101.567–110.600s Loop Hook
  scene7: { start: 3317, duration: 264 },  // 110.600–119.400s CTA
} as const;

export const CHOLESTEROL_TOTAL_FRAMES = 3611; // 3581f audio + 30f buffer (120.4s)
