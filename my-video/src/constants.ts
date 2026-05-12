// ============================================================
// Design System Constants — The Long Game: Sitting Death Sentence
// ============================================================

export const COLORS = {
  black: '#0D0D0D',
  green: '#00FF85',
  gold: '#FFD166',
  red: '#FF4D6D',
  white: '#FFFFFF',
  greige: '#E8E0D5',
  grey: '#777777',
} as const;

export const FONTS = {
  barlow: "'Barlow Condensed', sans-serif",
  playfair: "'Playfair Display', serif",
  mono: "'DM Mono', monospace",
} as const;

// Scene timing (frames at 30fps)
export const SCENES = {
  scene1: { start: 0,   duration: 105 },
  scene2: { start: 105, duration: 105 },
  scene3: { start: 210, duration: 105 },
  scene4: { start: 315, duration: 105 },
  scene5: { start: 420, duration: 120 },
  scene6: { start: 540, duration: 90  },
  scene7: { start: 630, duration: 90  },
  scene8: { start: 720, duration: 120 },
} as const;

export const TOTAL_FRAMES = 840;
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
