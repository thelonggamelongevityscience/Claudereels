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

// ── HormonesReel — PLACEHOLDER timing (frames at 30fps) — updated after audio gen ──
export const HORMONES_SCENES = {
  scene1: { start:    0, duration: 105 },  // Hook
  scene2: { start:  105, duration: 120 },  // Cortisol & Insulin
  scene3: { start:  225, duration: 120 },  // Testosterone & Thyroid
  scene4: { start:  345, duration: 120 },  // What Destroys Them
  scene5: { start:  465, duration: 120 },  // The Protocol
  scene6: { start:  585, duration: 105 },  // Loop Hook
  scene7: { start:  690, duration:  90 },  // CTA
} as const;

export const HORMONES_TOTAL_FRAMES = 810; // placeholder
