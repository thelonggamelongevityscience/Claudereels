import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, ZCR_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1ZCRHook }         from './scenes/Scene1ZCRHook';
import { Scene2ZCRStat }         from './scenes/Scene2ZCRStat';
import { Scene3ZCRWhatTheyAre }  from './scenes/Scene3ZCRWhatTheyAre';
import { Scene4ZCRSpread }       from './scenes/Scene4ZCRSpread';
import { Scene5ZCRAccelerators } from './scenes/Scene5ZCRAccelerators';
import { Scene6ZCRProtocol }     from './scenes/Scene6ZCRProtocol';
import { Scene7ZCRLoopHook }     from './scenes/Scene7ZCRLoopHook';
import { Scene8ZCRCTA }          from './scenes/Scene8ZCRCTA';

const FONT_CSS = `
  @font-face { font-family:'Barlow Condensed'; font-weight:700; font-style:normal;
    src: url('/fonts/BarlowCondensed-700.woff2') format('woff2'); }
  @font-face { font-family:'Barlow Condensed'; font-weight:800; font-style:normal;
    src: url('/fonts/BarlowCondensed-800.woff2') format('woff2'); }
  @font-face { font-family:'Barlow Condensed'; font-weight:900; font-style:normal;
    src: url('/fonts/BarlowCondensed-900.woff2') format('woff2'); }
  @font-face { font-family:'Playfair Display'; font-weight:400; font-style:italic;
    src: url('/fonts/PlayfairDisplay-Italic.woff2') format('woff2'); }
  @font-face { font-family:'DM Mono'; font-weight:400; font-style:normal;
    src: url('/fonts/DMMono-400.woff2') format('woff2'); }
`;

// ── Caption chunks — sentence-boundary aligned using proportional word timing ──
// Split points within chunks: frame = chunk_start + (words_before_split/chunk_words) * chunk_duration

// S1: 2 chunks × 8w, audio_frames=144
const S1_CAPS: CaptionChunk[] = [
  // c0 words 1–7: "Your body is full of zombie cells." — ends at (7/8)*72=63
  { text: "Your body is full of zombie cells.",                        startFrame: 0,   endFrame: 63  },
  // c0 word 8 + c1 all: "Billions of them. Right now. And they are spreading."
  { text: "Billions of them. Right now. And they are spreading.",      startFrame: 71,  endFrame: 144 },
];

// S2: 6 chunks, audio_frames=540
const S2_CAPS: CaptionChunk[] = [
  // c0+c1 complete sentence
  { text: "In 2016, the Mayo Clinic engineered mice to clear their senescent cells — their zombie cells.", startFrame: 0,   endFrame: 214 },
  // c2 all + c3 words 1–3: "...Preserved heart and kidney function." — c3 w3 end=333+(3/8)*103=371
  { text: "They lived 25% longer. Delayed cancer. Preserved heart and kidney function.",                   startFrame: 222, endFrame: 371 },
  // c3 words 4–8 + c4 all + c5 all — to end of audio
  { text: "Maintained muscle mass far longer than controls. One intervention. All of this. Stay with me.", startFrame: 379, endFrame: 540 },
];

// S3: 7 chunks, audio_frames=546
const S3_CAPS: CaptionChunk[] = [
  // c0+c1+c2 words 1–2 "of arrest." — c2 w2 end=194+(2/8)*89=216
  { text: "When a cell is too damaged to divide safely it enters senescence — a permanent state of arrest.", startFrame: 0,   endFrame: 216 },
  // c2 words 3–8 + c3 words 1–2 "immune system." — c3 w2 end=291+(2/8)*89=313
  { text: "It should be cleared by your immune system.",                                                    startFrame: 224, endFrame: 313 },
  // c3 words 3–8 + c4 all — to end of c4 (477)
  { text: "When it is not, it stays alive releasing a toxic cocktail of inflammatory signals",              startFrame: 321, endFrame: 477 },
  // c5 words 1–3 "called the SASP." — c5 w3 end=485+(3/8)*89=518
  { text: "called the SASP.",                                                                               startFrame: 485, endFrame: 518 },
  // c5 words 4–8 + c6 word 1 "terrifying."
  { text: "And the SASP does something terrifying.",                                                        startFrame: 526, endFrame: 546 },
];

// S4: 7 chunks, audio_frames=623
const S4_CAPS: CaptionChunk[] = [
  // c0 words 1–7: "Zombie cells are contagious to healthy cells." — (7/8)*98=85
  { text: "Zombie cells are contagious to healthy cells.",                          startFrame: 0,   endFrame: 85  },
  // c0 word 8 + c1 words 1–7 — c1 w7 end=106+(7/8)*98=192
  { text: "The SASP signals from one senescent cell trigger senescence",            startFrame: 93,  endFrame: 191 },
  // c1 word 8 + c2 all + c3 words 1–3 "damage multiplies outward." — c3 w3 end=318+(3/8)*98=354
  { text: "in the healthy cells around it — the damage multiplies outward.",        startFrame: 199, endFrame: 354 },
  // c3 words 4–8 + c4 words 1–4 "so dramatically." — c4 w4 end=424+(4/8)*98=473
  { text: "This is why chronic inflammation accelerates ageing so dramatically.",   startFrame: 362, endFrame: 473 },
  // c4 words 5–8 + c5 word 1 "inflammation." — c5 w1 end=530+(1/8)*98=542
  { text: "It is not just inflammation.",                                            startFrame: 481, endFrame: 542 },
  // c5 words 2–8 + c6 all
  { text: "It is a spreading zombie infection at the cellular level.",              startFrame: 550, endFrame: 623 },
];

// S5: 5 chunks, audio_frames=487
const S5_CAPS: CaptionChunk[] = [
  // c0 all + c1 words 1–4 "and" — c1 w4 end=126+(4/8)*118=185
  { text: "Four things accelerate zombie cell accumulation: chronic inflammation, poor sleep,",             startFrame: 0,   endFrame: 185 },
  // c1 words 5–8 + c2 words 1–5 "sedentary behaviour." — c2 w5 end=252+(5/8)*118=325
  { text: "oxidative stress from seed oils and ultra-processed food, and sedentary behaviour.",            startFrame: 193, endFrame: 325 },
  // c2 words 6–8 + c3 words 1–2 "decisions." — c3 w2 end=378+(2/8)*118=407
  { text: "All four are lifestyle decisions.",                                                              startFrame: 333, endFrame: 407 },
  // c3 words 3–8 + c4 word 1
  { text: "And all four are within your control.",                                                         startFrame: 415, endFrame: 487 },
];

// S6: 8 chunks, audio_frames=825
const S6_CAPS: CaptionChunk[] = [
  // c0+c1 words 1–6 "autophagy —" — c1 w6 end=116+(6/8)*108=197
  { text: "Four natural senolytics that actually work: fasting 16 to 24 hours triggers autophagy —",      startFrame: 0,   endFrame: 197 },
  // c1 words 7–8 + c2 words 1–5 "clearance system." — c2 w5 end=232+(5/8)*108=299
  { text: "your body's built-in zombie cell clearance system.",                                            startFrame: 205, endFrame: 299 },
  // c2 words 6–8 + c3 words 1–7 "available." — c3 w7 end=348+(7/8)*108=442
  { text: "Zone 2 exercise is the most potent natural senolytic available.",                               startFrame: 307, endFrame: 442 },
  // c3 word 8 + c4 all — through "onions,"
  { text: "Quercetin and fisetin — plant compounds found in onions,",                                     startFrame: 450, endFrame: 572 },
  // c5 all: "apples, and strawberries — have genuine senolytic evidence."
  { text: "apples, and strawberries — have genuine senolytic evidence.",                                   startFrame: 580, endFrame: 688 },
  // c6+c7 all: "And an anti-inflammatory diet removes the primary fuel for new zombie cell creation."
  { text: "And an anti-inflammatory diet removes the primary fuel for new zombie cell creation.",          startFrame: 696, endFrame: 825 },
];

// S7: 3 chunks, audio_frames=282
const S7_CAPS: CaptionChunk[] = [
  // c0 all + c1 words 1–3 "to clear them?" — c1 w3 end=115+(3/8)*107=155
  { text: "Which of these four are you already doing to clear them?",             startFrame: 0,   endFrame: 155 },
  // c1 words 4–8 + c2 word 1 "diet." — c2 w1 end=230+(1/5)*67=243
  { text: "Fasting. Zone 2. Quercetin. Anti-inflammatory diet.",                  startFrame: 163, endFrame: 243 },
  // c2 words 2–5: "Drop your number below."
  { text: "Drop your number below.",                                               startFrame: 251, endFrame: 282 },
];

// S8: 2 chunks, audio_frames=177
const S8_CAPS: CaptionChunk[] = [
  // c0 complete sentence
  { text: "Follow The Long Game for daily longevity science.",  startFrame: 0,   endFrame: 94  },
  // c1 words 1–2 "Save this." — c1 w2 end=102+(2/7)*83=125
  { text: "Save this.",                                          startFrame: 102, endFrame: 125 },
  // c1 words 3–7: "Your zombie cells are listening."
  { text: "Your zombie cells are listening.",                    startFrame: 133, endFrame: 177 },
];

function getMusicVolume(frame: number): number {
  const S = ZCR_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start + S.scene6.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const ZombieCellsRemakeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = ZCR_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('zombie_cells_remake.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1ZCRHook         frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2ZCRStat         frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3ZCRWhatTheyAre  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4ZCRSpread       frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5ZCRAccelerators frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6ZCRProtocol     frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7ZCRLoopHook     frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8ZCRCTA          frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
