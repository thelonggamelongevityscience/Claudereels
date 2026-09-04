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
  orange: '#FF6B2B',
  blue:   '#00CFFF',
  indigo: '#7C83FD',
  ember:  '#E85D04',
  sand:   '#D8C4A0',
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

// ── BellyFatReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const BELLY_FAT_SCENES = {
  scene1: { start:    0, duration: 259 },  // 0.000–8.633s    Hook
  scene2: { start:  259, duration: 626 },  // 8.633–29.500s   Two Types of Fat
  scene3: { start:  885, duration: 727 },  // 29.500–53.733s  Why Diet Fails
  scene4: { start: 1612, duration: 601 },  // 53.733–73.767s  Why Exercise Fails
  scene5: { start: 2213, duration: 661 },  // 73.767–95.800s  The Protocol
  scene6: { start: 2874, duration: 246 },  // 95.800–104.000s Loop Hook
  scene7: { start: 3120, duration: 225 },  // 104.000–111.500s CTA
} as const;

export const BELLY_FAT_TOTAL_FRAMES = 3375; // 3345f audio + 30f buffer (112.5s)

// ── ZombieCellsRemakeReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const ZCR_SCENES = {
  scene1: { start:    0, duration:  144 },  // 0.000–4.800s    Hook
  scene2: { start:  144, duration:  540 },  // 4.800–22.800s   The Stat
  scene3: { start:  684, duration:  546 },  // 22.800–40.999s  What They Are
  scene4: { start: 1230, duration:  623 },  // 40.999–61.766s  They Spread
  scene5: { start: 1853, duration:  487 },  // 61.766–78.033s  What Creates Them
  scene6: { start: 2340, duration:  825 },  // 78.033–105.533s The Protocol
  scene7: { start: 3165, duration:  282 },  // 105.533–114.933s Loop Hook
  scene8: { start: 3447, duration:  177 },  // 114.933–120.833s CTA
} as const;

export const ZCR_TOTAL_FRAMES = 3654; // 3624f audio + 30f buffer (121.2s)

// ── InflammationRemakeReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const IR_SCENES = {
  scene1: { start:    0, duration:  207 },  // 0.000–6.900s    Hook
  scene2: { start:  207, duration:  729 },  // 6.900–31.200s   Mechanism
  scene3: { start:  936, duration:  686 },  // 31.200–54.067s  Diseases
  scene4: { start: 1622, duration:  644 },  // 54.067–75.533s  Sources
  scene5: { start: 2266, duration:  641 },  // 75.533–96.900s  The Test
  scene6: { start: 2907, duration:  784 },  // 96.900–123.033s Protocol
  scene7: { start: 3691, duration:  259 },  // 123.033–131.667s Loop Hook
  scene8: { start: 3950, duration:  246 },  // 131.667–139.867s CTA
} as const;

export const IR_TOTAL_FRAMES = 4226; // 4196f audio + 30f buffer (140.2s)

// ── AutophagyReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const AR_SCENES = {
  scene1: { start:    0, duration:  155 },  // 0.000–5.167s    Hook
  scene2: { start:  155, duration:  775 },  // 5.167–30.967s   What Is Autophagy
  scene3: { start:  930, duration:  671 },  // 30.967–53.333s  Why It Matters
  scene4: { start: 1601, duration:  774 },  // 53.333–79.133s  What Blocks It
  scene5: { start: 2375, duration:  778 },  // 79.133–105.100s How To Activate
  scene6: { start: 3153, duration:  629 },  // 105.100–126.067s The Trilogy
  scene7: { start: 3782, duration:  295 },  // 126.067–135.900s Loop Hook
  scene8: { start: 4077, duration:  179 },  // 135.900–141.867s CTA
} as const;

export const AR_TOTAL_FRAMES = 4286; // 4256f audio + 30f buffer (142.2s)

// ── MorningLightReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const ML_SCENES = {
  scene1: { start:    0, duration:  219 },  // 0.000–7.291s    Hook
  scene2: { start:  219, duration:  496 },  // 7.291–23.824s   What's Happening
  scene3: { start:  715, duration:  460 },  // 23.824–39.149s  Why It Matters
  scene4: { start: 1175, duration:  461 },  // 39.149–54.521s  What Blocks It
  scene5: { start: 1636, duration:  435 },  // 54.521–69.010s  How To Fix It
  scene6: { start: 2071, duration:  431 },  // 69.010–83.360s  The Lux Gap
  scene7: { start: 2502, duration:  198 },  // 83.360–89.954s  Loop Hook
  scene8: { start: 2700, duration:  141 },  // 89.954–94.644s  CTA
} as const;

export const ML_TOTAL_FRAMES = 2871; // 2841f audio + 30f buffer (94.6s)

// ── NightcapReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const NC_SCENES = {
  scene1: { start:    0, duration:  234 },  // 0.000–7.802s    Hook
  scene2: { start:  234, duration:  483 },  // 7.802–23.917s   What's Happening
  scene3: { start:  717, duration:  476 },  // 23.917–39.799s  Why It Matters
  scene4: { start: 1193, duration:  488 },  // 39.799–56.053s  The Myths
  scene5: { start: 1681, duration:  403 },  // 56.053–69.474s  How To Protect It
  scene6: { start: 2084, duration:  385 },  // 69.474–82.291s  The Trade
  scene7: { start: 2469, duration:  173 },  // 82.291–88.050s  Loop Hook
  scene8: { start: 2642, duration:  163 },  // 88.050–93.483s  CTA
} as const;

export const NC_TOTAL_FRAMES = 2835; // 2805f audio + 30f buffer (93.5s)

// ── MelatoninReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const MEL_SCENES = {
  scene1: { start:    0, duration:  228 },  // 0.000–7.616s    Hook
  scene2: { start:  228, duration:  470 },  // 7.616–23.266s   What It Actually Is
  scene3: { start:  698, duration:  492 },  // 23.266–39.659s  Why It Matters
  scene4: { start: 1190, duration:  372 },  // 39.659–52.058s  What's Going Wrong
  scene5: { start: 1562, duration:  443 },  // 52.058–66.826s  How To Use It
  scene6: { start: 2005, duration:  337 },  // 66.826–78.064s  The Pattern
  scene7: { start: 2342, duration:  138 },  // 78.064–82.662s  Loop Hook
  scene8: { start: 2480, duration:  149 },  // 82.662–87.631s  CTA
} as const;

export const MEL_TOTAL_FRAMES = 2659; // 2629f audio + 30f buffer (87.6s)

// ── VO2MaxReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const VO2_SCENES = {
  scene1: { start:    0, duration:  147 },  // 0.000–4.898s    Hook
  scene2: { start:  147, duration:  331 },  // 4.898–15.921s   What Is VO2 Max
  scene3: { start:  478, duration:  401 },  // 15.921–29.300s  The Mechanism
  scene4: { start:  879, duration:  298 },  // 29.300–39.234s  The Risk Gap
  scene5: { start: 1177, duration:  311 },  // 39.234–49.593s  How To Test
  scene6: { start: 1488, duration:  357 },  // 49.593–61.485s  It's Trainable
  scene7: { start: 1845, duration:  216 },  // 61.485–68.694s  Loop Hook
  scene8: { start: 2061, duration:  162 },  // 68.694–74.103s  CTA
} as const;

export const VO2_TOTAL_FRAMES = 2253; // 2223f audio + 30f buffer (74.1s)

// ── FiberReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const FIBER_SCENES = {
  scene1: { start:    0, duration:  192 },  // 0.000–6.409s    Hook
  scene2: { start:  192, duration:  492 },  // 6.409–22.802s   What's Happening
  scene3: { start:  684, duration:  449 },  // 22.802–37.756s  Why It Matters
  scene4: { start: 1133, duration:  372 },  // 37.756–50.155s  What's Blocking It
  scene5: { start: 1505, duration:  290 },  // 50.155–59.814s  How To Close The Gap
  scene6: { start: 1795, duration:  439 },  // 59.814–74.443s  Fiber By The Numbers
  scene7: { start: 2234, duration:  173 },  // 74.443–80.202s  Loop Hook
  scene8: { start: 2407, duration:  157 },  // 80.202–85.450s  CTA
} as const;

export const FIBER_TOTAL_FRAMES = 2594; // 2564f audio + 30f buffer (85.5s)

// ── GripReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const GRIP_SCENES = {
  scene1: { start:    0, duration:  189 },  // 0.000–6.316s    Hook
  scene2: { start:  189, duration:  386 },  // 6.316–19.180s   What's Happening
  scene3: { start:  575, duration:  380 },  // 19.180–31.858s  Why It Matters
  scene4: { start:  955, duration:  322 },  // 31.858–42.586s  What Weakens It
  scene5: { start: 1277, duration:  305 },  // 42.586–52.756s  How To Build It
  scene6: { start: 1582, duration:  472 },  // 52.756–68.499s  The Number
  scene7: { start: 2054, duration:  157 },  // 68.499–73.747s  Loop Hook
  scene8: { start: 2211, duration:  143 },  // 73.747–78.530s  CTA
} as const;

export const GRIP_TOTAL_FRAMES = 2384; // 2354f audio + 30f buffer (78.5s)

// ── HallmarksReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const HALLMARKS_SCENES = {
  scene1: { start:    0, duration:  276 },  // 0.000–9.195s    Hook
  scene2: { start:  276, duration:  379 },  // 9.195–21.827s   What's Happening
  scene3: { start:  655, duration:  440 },  // 21.827–36.502s  Why It Matters
  scene4: { start: 1095, duration:  425 },  // 36.502–50.666s  What Accelerates Them
  scene5: { start: 1520, duration:  428 },  // 50.666–64.923s  What Slows Them Down
  scene6: { start: 1948, duration:  421 },  // 64.923–78.948s  Why This Matters
  scene7: { start: 2369, duration:  145 },  // 78.948–83.778s  Loop Hook
  scene8: { start: 2514, duration:  174 },  // 83.778–89.583s  CTA
} as const;

export const HALLMARKS_TOTAL_FRAMES = 2718; // 2688f audio + 30f buffer (89.6s)

// ── SaunaReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const SAUNA_SCENES = {
  scene1: { start:    0, duration:  162 },  // 0.000–5.387s    Hook
  scene2: { start:  162, duration:  470 },  // 5.387–21.037s   What's Happening
  scene3: { start:  632, duration:  439 },  // 21.037–35.666s  Why It Matters
  scene4: { start: 1071, duration:  272 },  // 35.666–44.722s  What Blocks It
  scene5: { start: 1343, duration:  301 },  // 44.722–54.753s  How To Get It
  scene6: { start: 1644, duration:  425 },  // 54.753–68.917s  The Numbers
  scene7: { start: 2069, duration:  159 },  // 68.917–74.211s  Loop Hook
  scene8: { start: 2228, duration:  149 },  // 74.211–79.180s  CTA
} as const;

export const SAUNA_TOTAL_FRAMES = 2407; // 2377f audio + 30f buffer (79.2s)

// ── BoneReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const BONE_SCENES = {
  scene1: { start:    0, duration:  270 },  // 0.000–9.009s    Hook
  scene2: { start:  270, duration:  368 },  // 9.009–21.269s   What's Happening
  scene3: { start:  638, duration:  425 },  // 21.269–35.433s  Why It Matters
  scene4: { start: 1063, duration:  330 },  // 35.433–46.439s  What Accelerates Loss
  scene5: { start: 1393, duration:  344 },  // 46.439–57.910s  How To Protect It
  scene6: { start: 1737, duration:  369 },  // 57.910–70.217s  Where You Stand
  scene7: { start: 2106, duration:  196 },  // 70.217–76.765s  Loop Hook
  scene8: { start: 2302, duration:  143 },  // 76.765–81.548s  CTA
} as const;

export const BONE_TOTAL_FRAMES = 2475; // 2445f audio + 30f buffer (81.5s)

// ── HsCRPReel — scene timing (frames at 30fps) — from real ElevenLabs audio ──
export const HSCRP_SCENES = {
  scene1: { start:    0, duration:  203 },  // 0.000–6.780s    Hook
  scene2: { start:  203, duration:  344 },  // 6.780–18.251s   What's Happening
  scene3: { start:  547, duration:  373 },  // 18.251–30.697s  Why It Matters
  scene4: { start:  920, duration:  323 },  // 30.697–41.471s  What Raises It
  scene5: { start: 1243, duration:  355 },  // 41.471–53.313s  How To Lower It
  scene6: { start: 1598, duration:  332 },  // 53.313–64.366s  Where You Stand
  scene7: { start: 1930, duration:  166 },  // 64.366–69.892s  Loop Hook
  scene8: { start: 2096, duration:  155 },  // 69.892–75.047s  CTA
} as const;

export const HSCRP_TOTAL_FRAMES = 2281; // 2251f audio + 30f buffer (75.0s)
