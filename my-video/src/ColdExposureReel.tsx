import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { CE_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1CERHook }         from './scenes/Scene1CERHook';
import { Scene2CERMechanism }    from './scenes/Scene2CERMechanism';
import { Scene3CERClaimsRated }  from './scenes/Scene3CERClaimsRated';
import { Scene4CERProtocol }     from './scenes/Scene4CERProtocol';
import { Scene5CERWorthKnowing } from './scenes/Scene5CERWorthKnowing';
import { Scene6CERSendThis }     from './scenes/Scene6CERSendThis';
import { Scene7CERTA }           from './scenes/Scene7CERTA';

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

// S1: Hook — 167f
const S1_CAPS: CaptionChunk[] = [
  { text: "Cold plunges are everywhere. Here's what's", startFrame:   0, endFrame:  75 },
  { text: "actually proven. Five common claims, rated.", startFrame:  76, endFrame: 166 },
];

// S2: The Mechanism — 346f
const S2_CAPS: CaptionChunk[] = [
  { text: "Cold exposure triggers a sharp spike",    startFrame:   0, endFrame:  64 },
  { text: "in norepinephrine, linked to alertness,", startFrame:  65, endFrame: 146 },
  { text: "mood, and focus. This is the",            startFrame: 147, endFrame: 206 },
  { text: "best-documented effect by far.",          startFrame: 207, endFrame: 279 },
  { text: "Everything else is much more mixed.",     startFrame: 280, endFrame: 345 },
];

// S3: The Claims Rated — 430f
const S3_CAPS: CaptionChunk[] = [
  { text: "Improves mood and alertness — proven.",       startFrame:   0, endFrame:  83 },
  { text: "Burns significant fat — overhyped.",          startFrame:  84, endFrame: 182 },
  { text: "Boosts immune function — mixed.",             startFrame: 183, endFrame: 255 },
  { text: "Directly extends lifespan — not proven.",     startFrame: 256, endFrame: 349 },
  { text: "Reduces soreness — mixed.",                   startFrame: 350, endFrame: 429 },
];

// S4: The Protocol — 311f
const S4_CAPS: CaptionChunk[] = [
  { text: "A cold shower for 1 to 3 minutes is enough", startFrame:   0, endFrame:  70 },
  { text: "to trigger the alertness effect.",           startFrame:  71, endFrame: 125 },
  { text: "Avoid cold exposure right after strength training", startFrame: 126, endFrame: 207 },
  { text: "— it may blunt some muscle-building",        startFrame: 208, endFrame: 267 },
  { text: "adaptations.",                               startFrame: 268, endFrame: 310 },
];

// S5: Worth Knowing — 250f
const S5_CAPS: CaptionChunk[] = [
  { text: "Certain cardiovascular conditions make sudden", startFrame:   0, endFrame:  78 },
  { text: "cold exposure genuinely risky.",               startFrame:  79, endFrame: 165 },
  { text: "Check with a doctor first if that",           startFrame: 166, endFrame: 210 },
  { text: "applies to you.",                             startFrame: 211, endFrame: 249 },
];

// S6: Send Trigger — 83f
const S6_CAPS: CaptionChunk[] = [
  { text: "Send this to someone hyping their", startFrame:  0, endFrame: 46 },
  { text: "cold plunge.",                      startFrame: 47, endFrame: 82 },
];

// S7: CTA — 104f
const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Save this", startFrame:  0, endFrame:  64 },
  { text: "before your next plunge.",        startFrame: 65, endFrame: 103 },
];

function getMusicVolume(frame: number): number {
  const S = CE_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const ColdExposureReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = CE_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#040c10' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('coldexposure.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1CERHook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2CERMechanism   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3CERClaimsRated frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4CERProtocol    frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5CERWorthKnowing frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6CERSendThis    frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7CERTA          frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
