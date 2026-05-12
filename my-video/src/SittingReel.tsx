import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as loadPlayfairDisplay } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadDMMono } from '@remotion/google-fonts/DMMono';

import { COLORS, SCENES } from './constants';
import { ProgressBar } from './components/ProgressBar';

import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Stat } from './scenes/Scene2Stat';
import { Scene3WhatHappens } from './scenes/Scene3WhatHappens';
import { Scene4Paradox } from './scenes/Scene4Paradox';
import { Scene5Fix } from './scenes/Scene5Fix';
import { Scene6StatPunch } from './scenes/Scene6StatPunch';
import { Scene7LoopHook } from './scenes/Scene7LoopHook';
import { Scene8CTA } from './scenes/Scene8CTA';

// Load fonts
loadBarlowCondensed();
loadPlayfairDisplay();
loadDMMono();

// Music volume curve
// Scenes 1–2 (0–209): 0.5 | fade 210–240: 0.5→0.08 | Scenes 3–5 (240–539): 0.08 | fade 540–570: 0.08→0.5 | Scenes 6–8 (570–839): 0.5
function getMusicVolume(frame: number): number {
  if (frame < 210) return 0.5;
  if (frame < 240) return interpolate(frame, [210, 240], [0.5, 0.08]);
  if (frame < 540) return 0.08;
  if (frame < 570) return interpolate(frame, [540, 570], [0.08, 0.5]);
  return 0.5;
}

export const SittingReel: React.FC = () => {
  const frame = useCurrentFrame();
  const musicVolume = getMusicVolume(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Background music - looped, volume-controlled */}
      <Audio
        src={staticFile('music.mp3')}
        volume={musicVolume}
        loop
      />

      {/* Scene 1 – Hook: frames 0–104 */}
      <Sequence from={SCENES.scene1.start} durationInFrames={SCENES.scene1.duration}>
        <Audio src={staticFile('vo1.mp3')} startFrom={0} volume={1} />
        <Scene1Hook frame={frame - SCENES.scene1.start} />
      </Sequence>

      {/* Scene 2 – The Stat: frames 105–209 */}
      <Sequence from={SCENES.scene2.start} durationInFrames={SCENES.scene2.duration}>
        <Audio src={staticFile('vo2.mp3')} startFrom={0} volume={1} />
        <Scene2Stat frame={frame - SCENES.scene2.start} />
      </Sequence>

      {/* Scene 3 – What Happens: frames 210–314 */}
      <Sequence from={SCENES.scene3.start} durationInFrames={SCENES.scene3.duration}>
        <Audio src={staticFile('vo3.mp3')} startFrom={0} volume={1} />
        <Scene3WhatHappens frame={frame - SCENES.scene3.start} />
      </Sequence>

      {/* Scene 4 – The Paradox: frames 315–419 */}
      <Sequence from={SCENES.scene4.start} durationInFrames={SCENES.scene4.duration}>
        <Audio src={staticFile('vo4.mp3')} startFrom={0} volume={1} />
        <Scene4Paradox frame={frame - SCENES.scene4.start} />
      </Sequence>

      {/* Scene 5 – The Fix: frames 420–539 */}
      <Sequence from={SCENES.scene5.start} durationInFrames={SCENES.scene5.duration}>
        <Audio src={staticFile('vo5.mp3')} startFrom={0} volume={1} />
        <Scene5Fix frame={frame - SCENES.scene5.start} />
      </Sequence>

      {/* Scene 6 – Stat Punch: frames 540–629 */}
      <Sequence from={SCENES.scene6.start} durationInFrames={SCENES.scene6.duration}>
        <Audio src={staticFile('vo6.mp3')} startFrom={0} volume={1} />
        <Scene6StatPunch frame={frame - SCENES.scene6.start} />
      </Sequence>

      {/* Scene 7 – Loop Hook: frames 630–719 */}
      <Sequence from={SCENES.scene7.start} durationInFrames={SCENES.scene7.duration}>
        <Audio src={staticFile('vo7.mp3')} startFrom={0} volume={1} />
        <Scene7LoopHook frame={frame - SCENES.scene7.start} />
      </Sequence>

      {/* Scene 8 – CTA: frames 720–839 */}
      <Sequence from={SCENES.scene8.start} durationInFrames={SCENES.scene8.duration}>
        <Audio src={staticFile('vo8.mp3')} startFrom={0} volume={1} />
        <Scene8CTA frame={frame - SCENES.scene8.start} />
      </Sequence>

      {/* Progress bar — always on top */}
      <ProgressBar frame={frame} />
    </AbsoluteFill>
  );
};
