import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { COLORS, SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { ProgressBar } from './components/ProgressBar';

import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Stat } from './scenes/Scene2Stat';
import { Scene3WhatHappens } from './scenes/Scene3WhatHappens';
import { Scene4Paradox } from './scenes/Scene4Paradox';
import { Scene5Fix } from './scenes/Scene5Fix';
import { Scene6StatPunch } from './scenes/Scene6StatPunch';
import { Scene7LoopHook } from './scenes/Scene7LoopHook';
import { Scene8CTA } from './scenes/Scene8CTA';

const FONT_CSS = `
  @font-face { font-family:'Barlow Condensed'; font-weight:700; font-style:normal;
    src: url('${staticFile('fonts/BarlowCondensed-700.woff2')}') format('woff2'); }
  @font-face { font-family:'Barlow Condensed'; font-weight:800; font-style:normal;
    src: url('${staticFile('fonts/BarlowCondensed-800.woff2')}') format('woff2'); }
  @font-face { font-family:'Barlow Condensed'; font-weight:900; font-style:normal;
    src: url('${staticFile('fonts/BarlowCondensed-900.woff2')}') format('woff2'); }
  @font-face { font-family:'Playfair Display'; font-weight:400; font-style:italic;
    src: url('${staticFile('fonts/PlayfairDisplay-Italic.woff2')}') format('woff2'); }
  @font-face { font-family:'DM Mono'; font-weight:400; font-style:normal;
    src: url('${staticFile('fonts/DMMono-400.woff2')}') format('woff2'); }
`;

// ── ElevenLabs character-aligned caption chunks (scene-relative frames @ 30fps) ──

const S1_CAPS: CaptionChunk[] = [
  { text: 'Sitting for 8 hours a day',            startFrame: 0,   endFrame: 44  },
  { text: 'is killing you faster than smoking.',  startFrame: 45,  endFrame: 102 },
  { text: "Your doctor isn't telling you this.",  startFrame: 114, endFrame: 162 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: 'A 40 percent higher risk of death.',  startFrame: 0,   endFrame: 61  },
  { text: 'From sitting.',                        startFrame: 74,  endFrame: 99  },
  { text: 'Even in people who go to the gym.',   startFrame: 103, endFrame: 154 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Here's what happens inside your body.", startFrame: 0,   endFrame: 52  },
  { text: 'Blood pools in your legs.',             startFrame: 57,  endFrame: 102 },
  { text: 'Your metabolism shuts down.',           startFrame: 103, endFrame: 161 },
  { text: 'Insulin stops working.',                startFrame: 166, endFrame: 216 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: 'The paradox?',                          startFrame: 0,   endFrame: 26  },
  { text: 'You can exercise every day',            startFrame: 28,  endFrame: 77  },
  { text: 'and still die early.',                  startFrame: 79,  endFrame: 113 },
  { text: 'If you sit for the other 23 hours.',   startFrame: 118, endFrame: 180 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "The fix isn't a gym membership.",       startFrame: 0,   endFrame: 49  },
  { text: "It's movement snacks.",                 startFrame: 52,  endFrame: 87  },
  { text: 'Two minutes of walking every 30 minutes', startFrame: 100, endFrame: 162 },
  { text: 'resets everything.',                    startFrame: 165, endFrame: 195 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: 'People who break up sitting',           startFrame: 0,   endFrame: 37  },
  { text: 'live 4 years longer on average.',       startFrame: 43,  endFrame: 98  },
  { text: 'Four years.',                           startFrame: 111, endFrame: 134 },
  { text: 'From standing up.',                     startFrame: 136, endFrame: 165 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: 'You already knew sitting too much was bad.', startFrame: 0,   endFrame: 66  },
  { text: "Now you know it's as dangerous",             startFrame: 81,  endFrame: 123 },
  { text: 'as a pack of cigarettes a day.',             startFrame: 125, endFrame: 174 },
];

const S8_CAPS: CaptionChunk[] = [
  { text: 'Follow for one evidence-based habit a week.', startFrame: 0,  endFrame: 70  },
  { text: 'Your future self will thank you.',            startFrame: 83, endFrame: 135 },
];

// ── Music volume: louder on hooks/outro, quieter under instructional scenes ──
function getMusicVolume(frame: number): number {
  if (frame < 338) return 0.5;
  if (frame < 368) return interpolate(frame, [338, 368], [0.5, 0.08]);
  if (frame < 947) return 0.08;
  if (frame < 977) return interpolate(frame, [947, 977], [0.08, 0.5]);
  return 0.5;
}

export const SittingReel: React.FC = () => {
  const frame = useCurrentFrame();
  const musicVolume = getMusicVolume(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

      {/* Background music */}
      <Audio src={staticFile('music.wav')} volume={musicVolume} loop />

      {/* Single voiceover — full reel, character-level aligned via ElevenLabs */}
      <Audio src={staticFile('audio.mp3')} volume={1} />

      <Sequence from={SCENES.scene1.start} durationInFrames={SCENES.scene1.duration}>
        <Scene1Hook frame={frame - SCENES.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>

      <Sequence from={SCENES.scene2.start} durationInFrames={SCENES.scene2.duration}>
        <Scene2Stat frame={frame - SCENES.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>

      <Sequence from={SCENES.scene3.start} durationInFrames={SCENES.scene3.duration}>
        <Scene3WhatHappens frame={frame - SCENES.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>

      <Sequence from={SCENES.scene4.start} durationInFrames={SCENES.scene4.duration}>
        <Scene4Paradox frame={frame - SCENES.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>

      <Sequence from={SCENES.scene5.start} durationInFrames={SCENES.scene5.duration}>
        <Scene5Fix frame={frame - SCENES.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>

      <Sequence from={SCENES.scene6.start} durationInFrames={SCENES.scene6.duration}>
        <Scene6StatPunch frame={frame - SCENES.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>

      <Sequence from={SCENES.scene7.start} durationInFrames={SCENES.scene7.duration}>
        <Scene7LoopHook frame={frame - SCENES.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>

      <Sequence from={SCENES.scene8.start} durationInFrames={SCENES.scene8.duration}>
        <Scene8CTA frame={frame - SCENES.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>

      <ProgressBar frame={frame} />
    </AbsoluteFill>
  );
};
