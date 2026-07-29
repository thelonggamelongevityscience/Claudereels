import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, CHOLESTEROL_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1CholesterolHook }     from './scenes/Scene1CholesterolHook';
import { Scene2CholesterolProblem }  from './scenes/Scene2CholesterolProblem';
import { Scene3CholesterolMatters }  from './scenes/Scene3CholesterolMatters';
import { Scene4CholesterolPlaque }   from './scenes/Scene4CholesterolPlaque';
import { Scene5CholesterolProtocol } from './scenes/Scene5CholesterolProtocol';
import { Scene6CholesterolLoopHook } from './scenes/Scene6CholesterolLoopHook';
import { Scene7CholesterolCTA }      from './scenes/Scene7CholesterolCTA';

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
  { text: "Your doctor is checking the wrong cholesterol number.", startFrame: 0,   endFrame: 55 },
  { text: "Total cholesterol tells you almost nothing.",           startFrame: 60,  endFrame: 95 },
  { text: "Here is what actually predicts your risk.",            startFrame: 100, endFrame: 130 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Total cholesterol combines LDL, HDL, and VLDL into one number.",          startFrame: 0,   endFrame: 85 },
  { text: "That tells you almost nothing about actual cardiovascular risk.",          startFrame: 90,  endFrame: 165 },
  { text: "People have heart attacks with low total cholesterol.",                    startFrame: 170, endFrame: 240 },
  { text: "People live to 95 with high total cholesterol.",                           startFrame: 245, endFrame: 310 },
  { text: "The target you're managed to was set by pharmaceutical trial design.",     startFrame: 315, endFrame: 400 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Three numbers that actually predict your risk.",                           startFrame: 0,   endFrame: 75 },
  { text: "ApoB — counts every atherogenic particle in your blood.",                 startFrame: 80,  endFrame: 165 },
  { text: "LDL particle number — small dense particles are far more dangerous.",     startFrame: 170, endFrame: 270 },
  { text: "And your triglyceride to HDL ratio — below 1.5 is your target.",         startFrame: 275, endFrame: 375 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Arterial plaque requires chronic inflammation to begin.",                 startFrame: 0,   endFrame: 90 },
  { text: "Oxidised LDL particles — not native LDL — embed in arterial walls.",     startFrame: 95,  endFrame: 200 },
  { text: "Lowering LDL with a statin while leaving inflammation untreated",         startFrame: 205, endFrame: 295 },
  { text: "is like painting over rust.",                                              startFrame: 300, endFrame: 355 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "At your next blood test: request ApoB.",                                  startFrame: 0,   endFrame: 80 },
  { text: "Calculate your TG to HDL ratio — below 1.5 is your target.",             startFrame: 85,  endFrame: 185 },
  { text: "Request Lp(a) — test it once in your life.",                              startFrame: 190, endFrame: 275 },
  { text: "And add hsCRP to see if the inflammatory environment is active.",         startFrame: 280, endFrame: 390 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Has your doctor ever tested your ApoB or Lp(a)?",  startFrame: 0,   endFrame: 80 },
  { text: "Most have not.",                                    startFrame: 85,  endFrame: 115 },
  { text: "Comment LABS below.",                              startFrame: 120, endFrame: 155 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",                       startFrame: 0,  endFrame: 60 },
  { text: "Save this and send it to someone managing their cholesterol.",            startFrame: 65, endFrame: 120 },
];

function getMusicVolume(frame: number): number {
  const S = CHOLESTEROL_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const CholesterolReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = CHOLESTEROL_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('cholesterol.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1CholesterolHook     frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2CholesterolProblem  frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3CholesterolMatters  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4CholesterolPlaque   frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5CholesterolProtocol frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6CholesterolLoopHook frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7CholesterolCTA      frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
