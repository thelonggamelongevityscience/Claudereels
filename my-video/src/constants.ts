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
