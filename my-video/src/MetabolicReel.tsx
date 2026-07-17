import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, METABOLIC_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1MetabolicHook }     from './scenes/Scene1MetabolicHook';
import { Scene2MetabolicNumber }   from './scenes/Scene2MetabolicNumber';
import { Scene3MetabolicSilent }   from './scenes/Scene3MetabolicSilent';
import { Scene4MetabolicDiseases } from './scenes/Scene4MetabolicDiseases';
import { Scene5MetabolicTests }    from './scenes/Scene5MetabolicTests';
import { Scene6MetabolicLoopHook } from './scenes/Scene6MetabolicLoopHook';
import { Scene7MetabolicCTA }      from './scenes/Scene7MetabolicCTA';

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

// ── Caption chunks — placeholder, updated after ElevenLabs audio ──

const S1_CAPS: CaptionChunk[] = [
  { text: "88% of people are metabolically unhealthy.",  startFrame: 0,   endFrame: 87 },
  { text: "Most of them think they are fine.",           startFrame: 95,  endFrame: 155 },
  { text: "Are you one of them?",                        startFrame: 156, endFrame: 212 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "88% of Americans fail at least one marker of metabolic health.", startFrame: 0,   endFrame: 118 },
  { text: "The five markers: blood pressure, fasting glucose,",             startFrame: 119, endFrame: 237 },
  { text: "triglycerides, HDL cholesterol, and waist circumference.",       startFrame: 238, endFrame: 356 },
  { text: "You need all five in range without medication.",                  startFrame: 357, endFrame: 475 },
  { text: "Most people do not make it.",                                     startFrame: 476, endFrame: 559 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Insulin resistance — the root of metabolic syndrome —", startFrame: 0,   endFrame: 88 },
  { text: "develops silently for 10 to 15 years",                  startFrame: 96,  endFrame: 184 },
  { text: "before any standard test catches it.",                   startFrame: 192, endFrame: 280 },
  { text: "The decade before diagnosis is when intervention is most powerful.", startFrame: 288, endFrame: 376 },
  { text: "Standard care is not designed to catch you in the window.", startFrame: 384, endFrame: 479 },
  { text: "You have to catch yourself.",                            startFrame: 480, endFrame: 568 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Every major disease of ageing starts here.",                        startFrame: 0,   endFrame: 122 },
  { text: "Type 2 diabetes. Cardiovascular disease.",                          startFrame: 123, endFrame: 245 },
  { text: "Alzheimer's — now called Type 3 diabetes by researchers.",          startFrame: 246, endFrame: 368 },
  { text: "And cancer. One metabolic dysfunction. Four of the leading causes of death.", startFrame: 369, endFrame: 506 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "How to know where you actually stand: fasting insulin —", startFrame: 0,   endFrame: 127 },
  { text: "the earliest warning signal almost nobody tests.",         startFrame: 128, endFrame: 255 },
  { text: "HbA1c below 5.4. Triglyceride to HDL ratio below 1.5.",  startFrame: 256, endFrame: 383 },
  { text: "And ApoB — the actual cardiovascular risk marker",        startFrame: 384, endFrame: 511 },
  { text: "your standard panel is not measuring.",                   startFrame: 512, endFrame: 632 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Have you ever had your fasting insulin tested?",             startFrame: 0,   endFrame: 85 },
  { text: "Most people have not.",                                      startFrame: 86,  endFrame: 140 },
  { text: "And it is the most important number most doctors never order.", startFrame: 141, endFrame: 257 },
  { text: "Comment LABS below — I will send you the full blood test guide.", startFrame: 258, endFrame: 383 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,   endFrame: 83 },
  { text: "Save this. Your metabolic health is either",        startFrame: 91,  endFrame: 165 },
  { text: "working for you or against you right now.",         startFrame: 166, endFrame: 255 },
];

function getMusicVolume(frame: number): number {
  const S = METABOLIC_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const MetabolicReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = METABOLIC_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('metabolic.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1MetabolicHook     frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2MetabolicNumber   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3MetabolicSilent   frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4MetabolicDiseases frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5MetabolicTests    frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6MetabolicLoopHook frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7MetabolicCTA      frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
