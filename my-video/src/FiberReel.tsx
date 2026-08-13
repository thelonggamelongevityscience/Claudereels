import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, FIBER_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1FIBHook }          from './scenes/Scene1FIBHook';
import { Scene2FIBWhatsHappening } from './scenes/Scene2FIBWhatsHappening';
import { Scene3FIBWhyItMatters }   from './scenes/Scene3FIBWhyItMatters';
import { Scene4FIBWhatsBlocking }  from './scenes/Scene4FIBWhatsBlocking';
import { Scene5FIBHowToClose }     from './scenes/Scene5FIBHowToClose';
import { Scene6FIBByTheNumbers }   from './scenes/Scene6FIBByTheNumbers';
import { Scene7FIBLoopHook }       from './scenes/Scene7FIBLoopHook';
import { Scene8FIBCTA }            from './scenes/Scene8FIBCTA';

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

// S1: Hook — 192f  (0.0–6.409s)
const S1_CAPS: CaptionChunk[] = [
  { text: "The most underrated longevity nutrient isn't protein. It's",  startFrame:  0, endFrame: 107 },
  { text: "the one nearly everyone is quietly running short",             startFrame: 108, endFrame: 177 },
  { text: "on.",                                                          startFrame: 178, endFrame: 192 },
];

// S2: What's Happening — 492f  (6.409–22.802s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Fiber passes undigested into your colon, where gut",           startFrame:   0, endFrame: 115 },
  { text: "bacteria ferment it into compounds that reduce inflammation",   startFrame: 116, endFrame: 225 },
  { text: "and regulate blood sugar. The recommended intake is",           startFrame: 232, endFrame: 334 },
  { text: "25 to 38 grams a day. The average",                            startFrame: 336, endFrame: 432 },
  { text: "adult eats roughly 15.",                                        startFrame: 433, endFrame: 492 },
];

// S3: Why It Matters — 449f  (22.802–37.756s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Every extra 8 grams of daily fiber is",                        startFrame:  0, endFrame:  78 },
  { text: "linked to meaningfully lower risk of heart disease,",           startFrame: 82, endFrame: 161 },
  { text: "diabetes, and colorectal cancer. It blunts blood sugar",        startFrame: 175, endFrame: 293 },
  { text: "spikes, drives gut diversity, and is one of",                   startFrame: 295, endFrame: 373 },
  { text: "the most powerful satiety levers available.",                   startFrame: 374, endFrame: 449 },
];

// S4: What's Blocking It — 372f  (37.756–50.155s)
const S4_CAPS: CaptionChunk[] = [
  { text: "Refined carbs replaced whole ones. Protein-first eating crowded", startFrame:  0, endFrame: 126 },
  { text: "out vegetables and legumes. And fear of bloating",               startFrame: 127, endFrame: 212 },
  { text: "stops people before they start — even though",                   startFrame: 216, endFrame: 297 },
  { text: "that effect resolves within a couple of weeks.",                 startFrame: 299, endFrame: 372 },
];

// S5: How To Close The Gap — 290f  (50.155–59.814s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Add one legume serving daily. Keep the skin",                   startFrame:  0, endFrame:  83 },
  { text: "on your produce. Increase gradually over 2 to",                 startFrame: 85, endFrame: 164 },
  { text: "3 weeks to avoid the bloating. And pair",                       startFrame: 165, endFrame: 230 },
  { text: "it with water so it can do its",                                startFrame: 231, endFrame: 268 },
  { text: "job.",                                                           startFrame: 269, endFrame: 290 },
];

// S6: Fiber By The Numbers — 439f  (59.814–74.443s)
const S6_CAPS: CaptionChunk[] = [
  { text: "A cup of lentils, a pear with skin,",                           startFrame:  0, endFrame:  66 },
  { text: "a cup of broccoli, and two tablespoons of",                     startFrame: 76, endFrame: 138 },
  { text: "chia seeds gets you to roughly 30 grams",                       startFrame: 140, endFrame: 222 },
  { text: "spread across a day. This is the most",                         startFrame: 223, endFrame: 294 },
  { text: "unglamorous nutrient in longevity science. It's also one",       startFrame: 298, endFrame: 401 },
  { text: "of the most powerful.",                                          startFrame: 401, endFrame: 439 },
];

// S7: Loop Hook — 173f  (74.443–80.202s)
const S7_CAPS: CaptionChunk[] = [
  { text: "What did you eat today that had fiber",                         startFrame:  0, endFrame:  59 },
  { text: "in it? Be honest — most people can't",                          startFrame: 61, endFrame: 136 },
  { text: "name one thing.",                                               startFrame: 137, endFrame: 173 },
];

// S8: CTA — 157f  (80.202–85.450s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",             startFrame:  0, endFrame:  86 },
  { text: "Save this before your next grocery run.",                       startFrame: 99, endFrame: 157 },
];

function getMusicVolume(frame: number): number {
  const S = FIBER_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const FiberReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = FIBER_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('fiber.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1FIBHook          frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2FIBWhatsHappening frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3FIBWhyItMatters  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4FIBWhatsBlocking frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5FIBHowToClose    frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6FIBByTheNumbers  frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7FIBLoopHook      frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8FIBCTA           frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
