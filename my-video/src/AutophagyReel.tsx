import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, AR_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1ARHook }         from './scenes/Scene1ARHook';
import { Scene2ARWhatIs }       from './scenes/Scene2ARWhatIs';
import { Scene3ARWhyItMatters } from './scenes/Scene3ARWhyItMatters';
import { Scene4ARBlocks }       from './scenes/Scene4ARBlocks';
import { Scene5ARActivate }     from './scenes/Scene5ARActivate';
import { Scene6ARTrilogy }      from './scenes/Scene6ARTrilogy';
import { Scene7ARLoopHook }     from './scenes/Scene7ARLoopHook';
import { Scene8ARCTA }          from './scenes/Scene8ARCTA';

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

// ── Caption chunks — PLACEHOLDER until real ElevenLabs audio timings are uploaded ──
const S1_CAPS: CaptionChunk[] = [
  { text: "Your body has a self-cleaning mode.",  startFrame: 0,  endFrame: 50 },
  { text: "Most people never activate it.",        startFrame: 58, endFrame: 72 },
  { text: "Here is how it works.",                 startFrame: 80, endFrame: 90 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Autophagy — from the Greek for self-eating — is the process by which your cells identify damaged proteins,", startFrame: 0,   endFrame: 70 },
  { text: "dysfunctional organelles, and cellular debris, and break them down for recycling.",                          startFrame: 78,  endFrame: 120 },
  { text: "It is your body's built-in quality control system.",                                                         startFrame: 128, endFrame: 160 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Autophagy is the answer to both problems we covered this week.",                    startFrame: 0,   endFrame: 50 },
  { text: "It clears zombie cells before their inflammatory signals spread.",                   startFrame: 58,  endFrame: 95 },
  { text: "It resolves chronic inflammation by degrading the proteins that trigger NF-kB.",    startFrame: 103, endFrame: 140 },
  { text: "And it removes dysfunctional mitochondria before they leak the free radicals that age you.", startFrame: 148, endFrame: 160 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Four things switch your self-cleaning mode off.",                                   startFrame: 0,   endFrame: 40 },
  { text: "Constant eating — every meal triggers insulin, which directly suppresses autophagy.", startFrame: 48, endFrame: 90 },
  { text: "Excess protein activates mTOR — autophagy's direct off switch.",                    startFrame: 98,  endFrame: 130 },
  { text: "Poor sleep halts the brain's overnight cleanup.",                                    startFrame: 138, endFrame: 160 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "Four ways to switch it back on.",                                                      startFrame: 0,   endFrame: 30 },
  { text: "Fast for 16 to 18 hours — autophagy begins meaningfully around 14 to 16 hours without food.", startFrame: 38, endFrame: 90 },
  { text: "Zone 2 exercise strongly induces it in muscle, liver, and brain simultaneously.",      startFrame: 98,  endFrame: 130 },
  { text: "Black coffee and deep sleep complete the protocol.",                                    startFrame: 138, endFrame: 160 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "This week was a trilogy.",                                                   startFrame: 0,   endFrame: 28 },
  { text: "Tuesday — zombie cells accumulate when autophagy fails to clear them.",     startFrame: 36,  endFrame: 75 },
  { text: "Wednesday — chronic inflammation persists when autophagy fails to resolve it.", startFrame: 83, endFrame: 115 },
  { text: "Friday — autophagy is the mechanism that fixes both.",                      startFrame: 123, endFrame: 140 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Are you accidentally keeping your self-cleaning mode off?", startFrame: 0,  endFrame: 55 },
  { text: "Constant eating. Poor sleep. No fasting. No Zone 2.",       startFrame: 63, endFrame: 85 },
  { text: "Drop your honest answer below.",                             startFrame: 93, endFrame: 95 },
];

const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,  endFrame: 48 },
  { text: "Save this.",                                         startFrame: 56, endFrame: 66 },
  { text: "Your cells are waiting for the signal.",            startFrame: 74, endFrame: 90 },
];

function getMusicVolume(frame: number): number {
  const S = AR_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const AutophagyReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = AR_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('autophagy.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1ARHook         frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2ARWhatIs       frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3ARWhyItMatters frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4ARBlocks       frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5ARActivate     frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6ARTrilogy      frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7ARLoopHook     frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8ARCTA          frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
