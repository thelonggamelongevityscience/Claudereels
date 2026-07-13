import React from 'react';
import { Composition } from 'remotion';
import { ZombieCellsReel } from './ZombieCellsReel';
import { FPS, WIDTH, HEIGHT, ZOMBIE_CELLS_TOTAL_FRAMES } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ZombieCellsReel"
        component={ZombieCellsReel}
        durationInFrames={ZOMBIE_CELLS_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
