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

// Scene timing (frames at 30fps) — derived from ElevenLabs with-timestamps
export const SCENES = {
  scene1: { start: 0,    duration: 172 },  // 0.000–5.733s
  scene2: { start: 172,  duration: 243 },  // 5.747–13.847s
  scene3: { start: 415,  duration: 175 },  // 13.839–19.672s
  scene4: { start: 590,  duration: 239 },  // 19.667–27.634s
  scene5: { start: 829,  duration: 304 },  // 27.643–37.776s
  scene6: { start: 1133, duration: 220 },  // 37.790–45.123s
  scene7: { start: 1353, duration: 207 },  // 45.104–52.004s
  scene8: { start: 1560, duration: 244 },  // 52.012–60.145s
} as const;

export const TOTAL_FRAMES = 1804; // 59.117 seconds (ElevenLabs single-file VO)
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
