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

// ── ZombieCellsReel — PLACEHOLDER timing (frames at 30fps) — updated after audio gen ──
export const ZOMBIE_CELLS_SCENES = {
  scene1: { start:    0, duration: 110 },  // Hook
  scene2: { start:  110, duration: 130 },  // What They Are
  scene3: { start:  240, duration: 130 },  // The Damage
  scene4: { start:  370, duration: 140 },  // The Research
  scene5: { start:  510, duration: 120 },  // What Creates Them
  scene6: { start:  630, duration: 150 },  // The Protocol
  scene7: { start:  780, duration: 110 },  // Loop Hook
  scene8: { start:  890, duration:  90 },  // CTA
} as const;

export const ZOMBIE_CELLS_TOTAL_FRAMES = 1010; // placeholder
