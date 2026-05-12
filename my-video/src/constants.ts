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
// Durations derived from actual Kokoro VO audio length at 0.88x + pauses + 30f buffer
export const SCENES = {
  scene1: { start: 0,    duration: 330 },  // 11s  (VO: 10.3s)
  scene2: { start: 330,  duration: 450 },  // 15s  (VO: 13.4s)
  scene3: { start: 780,  duration: 270 },  //  9s  (VO: 8.6s)
  scene4: { start: 1050, duration: 390 },  // 13s  (VO: 12.3s)
  scene5: { start: 1440, duration: 480 },  // 16s  (VO: 15.5s)
  scene6: { start: 1920, duration: 390 },  // 13s  (VO: 12.3s)
  scene7: { start: 2310, duration: 330 },  // 11s  (VO: 10.2s)
  scene8: { start: 2640, duration: 330 },  // 11s  (VO: 10.6s)
} as const;

export const TOTAL_FRAMES = 2970; // 99 seconds
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
