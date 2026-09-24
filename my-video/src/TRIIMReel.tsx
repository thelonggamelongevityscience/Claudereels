import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { TRIIM_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1TRRHook }           from './scenes/Scene1TRRHook';
import { Scene2TRRStudy }          from './scenes/Scene2TRRStudy';
import { Scene3TRRResult }         from './scenes/Scene3TRRResult';
import { Scene4TRRWhyItMatters }   from './scenes/Scene4TRRWhyItMatters';
import { Scene5TRRWorthKnowing }   from './scenes/Scene5TRRWorthKnowing';
import { Scene6TRRQuestion }       from './scenes/Scene6TRRQuestion';
import { Scene7TRRTA }             from './scenes/Scene7TRRTA';

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

// S1: Hook — 212f
const S1_CAPS: CaptionChunk[] = [
  { text: "Scientists accidentally reversed biological age.",    startFrame:   0, endFrame:  71 },
  { text: "Then they measured it. A small pilot trial.",        startFrame:  72, endFrame: 150 },
  { text: "A result nobody expected.",                          startFrame: 151, endFrame: 211 },
];

// S2: The Study — 490f
const S2_CAPS: CaptionChunk[] = [
  { text: "The TRIIM trial combined growth hormone, DHEA, and metformin,", startFrame:   0, endFrame: 147 },
  { text: "originally designed to test thymus regeneration, not aging reversal.", startFrame: 154, endFrame: 275 },
  { text: "Researchers measured epigenetic age before and after.",            startFrame: 294, endFrame: 385 },
  { text: "What they found wasn't in the original hypothesis.",               startFrame: 394, endFrame: 489 },
];

// S3: The Result — 213f
const S3_CAPS: CaptionChunk[] = [
  { text: "Average epigenetic age decreased by about two and a half years", startFrame:   0, endFrame: 100 },
  { text: "across multiple clock measurements by the end of the trial.",    startFrame: 104, endFrame: 212 },
];

// S4: Why It Matters — 344f
const S4_CAPS: CaptionChunk[] = [
  { text: "One of the first published studies",                               startFrame:   0, endFrame:  42 },
  { text: "showing measurable epigenetic age reversal in humans from a drug protocol.", startFrame:  44, endFrame: 172 },
  { text: "It opened research into whether aging clocks can move backward,",  startFrame: 185, endFrame: 277 },
  { text: "not just slow down.",                                               startFrame: 284, endFrame: 316 },
];

// S5: Worth Knowing — 318f
const S5_CAPS: CaptionChunk[] = [
  { text: "Nine participants.",                                                     startFrame:   0, endFrame:  36 },
  { text: "Prescription drugs with real side-effect risk under medical supervision.", startFrame:  41, endFrame: 145 },
  { text: "This is science-in-progress, not a DIY stack.",                         startFrame: 154, endFrame: 245 },
  { text: "The free levers still matter most.",                                     startFrame: 257, endFrame: 308 },
];

// S6: The Question — 195f
const S6_CAPS: CaptionChunk[] = [
  { text: "Do you know your number?",                            startFrame:   0, endFrame:  27 },
  { text: "Most people have never actually measured it.",        startFrame:  45, endFrame: 104 },
  { text: "Comment AGING and find out where you stand.",         startFrame: 117, endFrame: 182 },
];

// S7: CTA — 109f
const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game.",             startFrame:  0, endFrame:  36 },
  { text: "Comment AGING for the free quiz.",  startFrame: 46, endFrame: 108 },
];

function getMusicVolume(frame: number): number {
  const S = TRIIM_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const TRIIMReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = TRIIM_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#12040c' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('triim.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1TRRHook          frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2TRRStudy         frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3TRRResult        frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4TRRWhyItMatters  frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5TRRWorthKnowing  frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6TRRQuestion      frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7TRRTA            frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
