import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, VO2_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1VO2Hook }      from './scenes/Scene1VO2Hook';
import { Scene2VO2WhatItIs }  from './scenes/Scene2VO2WhatItIs';
import { Scene3VO2Mechanism } from './scenes/Scene3VO2Mechanism';
import { Scene4VO2RiskGap }   from './scenes/Scene4VO2RiskGap';
import { Scene5VO2HowToTest } from './scenes/Scene5VO2HowToTest';
import { Scene6VO2Trainable } from './scenes/Scene6VO2Trainable';
import { Scene7VO2LoopHook }  from './scenes/Scene7VO2LoopHook';
import { Scene8VO2CTA }       from './scenes/Scene8VO2CTA';

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

// S1: Hook — 147f
const S1_CAPS: CaptionChunk[] = [
  { text: "This number predicts your risk of death",              startFrame:  0, endFrame:  63 },
  { text: "better than almost anything else in medicine.",        startFrame: 72, endFrame: 147 },
];

// S2: What Is VO2 Max — 331f
const S2_CAPS: CaptionChunk[] = [
  { text: "VO2 max.",                                             startFrame:  0, endFrame:  33 },
  { text: "Low VO2 max carries a higher mortality risk than smoking.", startFrame: 51, endFrame: 156 },
  { text: "It's the strongest predictor of all-cause death available — and almost nobody has tested theirs.", startFrame: 165, endFrame: 331 },
];

// S3: The Mechanism — 401f
const S3_CAPS: CaptionChunk[] = [
  { text: "VO2 max is the maximum rate your body can use oxygen during intense exercise.", startFrame:  0, endFrame: 146 },
  { text: "It reflects how efficiently your heart, lungs, and muscles work together.",    startFrame: 158, endFrame: 277 },
  { text: "It predicts survival better than blood pressure, cholesterol, or BMI.",        startFrame: 286, endFrame: 401 },
];

// S4: The Risk Gap — 298f
const S4_CAPS: CaptionChunk[] = [
  { text: "The bottom twenty-five percent carries five times the mortality risk of the top group.", startFrame:  0, endFrame: 132 },
  { text: "But where you sit isn't fixed —",                     startFrame: 144, endFrame: 206 },
  { text: "it's one of the most trainable biomarkers you have.", startFrame: 212, endFrame: 298 },
];

// S5: How To Test — 311f
const S5_CAPS: CaptionChunk[] = [
  { text: "Test it free with the Cooper Run.",                          startFrame:  0, endFrame:  56 },
  { text: "Run as far as possible in exactly twelve minutes.",          startFrame: 68, endFrame: 167 },
  { text: "Plug the distance into the formula and compare to norms for your age and sex.", startFrame: 176, endFrame: 311 },
];

// S6: It's Trainable — 357f
const S6_CAPS: CaptionChunk[] = [
  { text: "It's trainable at any age.",                                 startFrame:  0, endFrame:  49 },
  { text: "One session per week of brief, hard intervals improves VO2 max within six to eight weeks.", startFrame: 61, endFrame: 217 },
  { text: "Elite seventy-five-year-olds can match the VO2 max of average forty-year-olds.", startFrame: 226, endFrame: 357 },
];

// S7: Loop Hook — 216f
const S7_CAPS: CaptionChunk[] = [
  { text: "Have you ever tested yours?",                               startFrame:  0, endFrame:  53 },
  { text: "Most people never have.",                                   startFrame: 68, endFrame: 114 },
  { text: "The Cooper test takes twelve minutes. Free. Right now.",    startFrame: 123, endFrame: 216 },
];

// S8: CTA — 162f
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game.",                                      startFrame:  0, endFrame:  40 },
  { text: "Daily longevity science.",                                   startFrame: 49, endFrame:  98 },
  { text: "Save this — and book your test.",                           startFrame: 98, endFrame: 162 },
];

function getMusicVolume(frame: number): number {
  const S = VO2_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const VO2MaxReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = VO2_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('vo2max.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1VO2Hook      frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2VO2WhatItIs  frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3VO2Mechanism frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4VO2RiskGap   frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5VO2HowToTest frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6VO2Trainable frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7VO2LoopHook  frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8VO2CTA       frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
