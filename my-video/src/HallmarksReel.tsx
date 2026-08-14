import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, HALLMARKS_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1HALHook }           from './scenes/Scene1HALHook';
import { Scene2HALWhatsHappening } from './scenes/Scene2HALWhatsHappening';
import { Scene3HALWhyItMatters }   from './scenes/Scene3HALWhyItMatters';
import { Scene4HALWhatAccelerates } from './scenes/Scene4HALWhatAccelerates';
import { Scene5HALWhatSlows }      from './scenes/Scene5HALWhatSlows';
import { Scene6HALWhyThisMatters } from './scenes/Scene6HALWhyThisMatters';
import { Scene7HALLoopHook }       from './scenes/Scene7HALLoopHook';
import { Scene8HALCTA }            from './scenes/Scene8HALCTA';

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

// S1: Hook — 276f  (0.000–9.195s)
const S1_CAPS: CaptionChunk[] = [
  { text: "The framework behind every post we've made. Twelve", startFrame:  0, endFrame:  93 },
  { text: "mechanisms. One unifying map of why you age.",        startFrame: 94, endFrame: 188 },
  { text: "This is the science underneath everything.",          startFrame: 202, endFrame: 276 },
];

// S2: What's Happening — 379f  (9.195–21.827s)
const S2_CAPS: CaptionChunk[] = [
  { text: "In 2013, researchers formally defined the Hallmarks of", startFrame:  0, endFrame: 106 },
  { text: "Ageing — twelve interconnected mechanisms that drive ageing", startFrame: 108, endFrame: 215 },
  { text: "at the cellular level. Nearly everything covered this", startFrame: 216, endFrame: 304 },
  { text: "cycle is one of these twelve in disguise.",            startFrame: 305, endFrame: 379 },
];

// S3: Why It Matters — 440f  (21.827–36.502s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Genomic instability and telomere shortening. Cellular senescence —", startFrame:  0, endFrame: 125 },
  { text: "the zombie cells. Mitochondrial dysfunction. And dysregulated nutrient", startFrame: 132, endFrame: 283 },
  { text: "sensing — the inflammation and insulin resistance covered",            startFrame: 284, endFrame: 391 },
  { text: "across multiple posts.",                                               startFrame: 392, endFrame: 440 },
];

// S4: What Accelerates Them — 425f  (36.502–50.666s)
const S4_CAPS: CaptionChunk[] = [
  { text: "Chronic stress accelerates genomic instability. Poor sleep impairs", startFrame:  0, endFrame: 127 },
  { text: "cellular cleanup. Sedentary behaviour worsens mitochondrial dysfunction. And", startFrame: 128, endFrame: 286 },
  { text: "ultra-processed food feeds inflammation and nutrient-sensing dysregulation.", startFrame: 288, endFrame: 425 },
];

// S5: What Slows Them Down — 428f  (50.666–64.923s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Exercise positively influences the most hallmarks simultaneously. Fasting", startFrame:  0, endFrame: 143 },
  { text: "improves nutrient sensing and triggers autophagy. Quality sleep",           startFrame: 145, endFrame: 262 },
  { text: "supports repair. And managing stress reduces inflammatory signalling",      startFrame: 263, endFrame: 385 },
  { text: "across all twelve.",                                                        startFrame: 389, endFrame: 428 },
];

// S6: Why This Matters — 421f  (64.923–78.948s)
const S6_CAPS: CaptionChunk[] = [
  { text: "Every post this cycle has been one piece",        startFrame:  0, endFrame:  70 },
  { text: "of this twelve-part puzzle. You don't need twelve", startFrame:  71, endFrame: 148 },
  { text: "strategies — a handful of core habits influence", startFrame: 149, endFrame: 249 },
  { text: "nearly all twelve hallmarks at once. This is",    startFrame: 252, endFrame: 338 },
  { text: "the actual science. Not marketing.",              startFrame: 339, endFrame: 421 },
];

// S7: Loop Hook — 145f  (78.948–83.778s)
const S7_CAPS: CaptionChunk[] = [
  { text: "Which hallmark do you think you're managing worst?", startFrame:  0, endFrame:  63 },
  { text: "Be honest with yourself. Drop it below.",           startFrame:  76, endFrame: 145 },
];

// S8: CTA — 174f  (83.778–89.583s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame:  0, endFrame:  82 },
  { text: "Save this — it ties the whole cycle",              startFrame:  94, endFrame: 152 },
  { text: "together.",                                         startFrame: 153, endFrame: 174 },
];

function getMusicVolume(frame: number): number {
  const S = HALLMARKS_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const HallmarksReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = HALLMARKS_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('hallmarks.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1HALHook          frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2HALWhatsHappening frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3HALWhyItMatters  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4HALWhatAccelerates frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5HALWhatSlows     frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6HALWhyThisMatters frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7HALLoopHook      frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8HALCTA           frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
