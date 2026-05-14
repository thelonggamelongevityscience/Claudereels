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
  scene1: { start: 0,   duration: 175 },  // 0.000–5.828s
  scene2: { start: 175, duration: 163 },  // 5.828–11.274s
  scene3: { start: 338, duration: 222 },  // 11.274–18.658s
  scene4: { start: 560, duration: 181 },  // 18.658–24.695s
  scene5: { start: 741, duration: 206 },  // 24.695–31.557s
  scene6: { start: 947, duration: 176 },  // 31.557–37.431s
  scene7: { start: 1123, duration: 191 }, // 37.431–43.805s
  scene8: { start: 1314, duration: 135 }, // 43.805–48.298s
} as const;

export const TOTAL_FRAMES = 1449; // 48.298 seconds (ElevenLabs single-file VO)
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
