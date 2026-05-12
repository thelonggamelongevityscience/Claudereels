import React from 'react';
import { Composition } from 'remotion';
import { SittingReel } from './SittingReel';
import { TOTAL_FRAMES, FPS, WIDTH, HEIGHT } from './constants';

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
