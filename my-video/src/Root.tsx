import React from 'react';
import { Composition } from 'remotion';
import { SittingReel } from './SittingReel';
import { FPS, WIDTH, HEIGHT } from './constants';
import timingsData from '../public/timings.json';

const TOTAL_FRAMES = Math.ceil(timingsData.totalDuration * FPS) + FPS; // +1s buffer

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SittingReel"
        component={SittingReel}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
