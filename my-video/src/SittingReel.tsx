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
  { text: 'is killing you faster than smoking.',  startFrame: 45,  endFrame: 104 },
  { text: "Your doctor isn't telling you this.",  startFrame: 112, endFrame: 160 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: 'A 40 percent higher risk of death.',        startFrame: 0,   endFrame: 62  },
  { text: 'From sitting.',                              startFrame: 74,  endFrame: 100 },
  { text: 'Even in people who go to the gym.',         startFrame: 102, endFrame: 153 },
  { text: 'This is the Active Couch Potato effect.',   startFrame: 165, endFrame: 234 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Here's what's actually happening inside your body", startFrame: 0,   endFrame: 71  },
  { text: 'during prolonged sitting.',                         startFrame: 72,  endFrame: 109 },
  { text: 'And none of it is good.',                          startFrame: 118, endFrame: 157 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: 'One hour of exercise cannot cancel 8 hours of sitting.', startFrame: 0,   endFrame: 97  },
  { text: 'Sedentary time is an independent risk factor.',           startFrame: 109, endFrame: 187 },
  { text: 'Both things are true.',                                   startFrame: 193, endFrame: 230 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: 'Two minutes of light walking every 30 minutes.',         startFrame: 0,   endFrame: 76  },
  { text: "That's the protocol.",                                    startFrame: 80,  endFrame: 113 },
  { text: 'It reduces blood sugar spikes by 30 percent',            startFrame: 117, endFrame: 196 },
  { text: 'and restores the fat-clearing enzymes sitting shuts down.', startFrame: 198, endFrame: 292 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: 'Thirty percent.',                                       startFrame: 0,   endFrame: 26  },
  { text: 'Lower blood sugar.',                                    startFrame: 35,  endFrame: 65  },
  { text: 'From two-minute walking breaks.',                       startFrame: 72,  endFrame: 119 },
  { text: 'The intervention is almost embarrassingly simple.',     startFrame: 131, endFrame: 210 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: 'How long did you sit today?',     startFrame: 0,   endFrame: 47  },
  { text: 'Most people have no idea.',       startFrame: 62,  endFrame: 110 },
  { text: 'Track it once.',                  startFrame: 113, endFrame: 144 },
  { text: 'The number will surprise you.',   startFrame: 149, endFrame: 190 },
];

const S8_CAPS: CaptionChunk[] = [
  { text: 'Follow The Long Game for daily longevity science.',       startFrame: 0,   endFrame: 84  },
  { text: 'Save this',                                               startFrame: 90,  endFrame: 109 },
  { text: 'set your 30-minute alarm before you close this app.',     startFrame: 128, endFrame: 214 },
];

// ── Music volume: louder on hooks/outro, quieter under instructional scenes ──
function getMusicVolume(frame: number): number {
  if (frame < 415) return 0.5;
  if (frame < 445) return interpolate(frame, [415, 445], [0.5, 0.08]);
  if (frame < 1133) return 0.08;
  if (frame < 1163) return interpolate(frame, [1133, 1163], [0.08, 0.5]);
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
