import React from 'react';
import { Composition } from 'remotion';
import { ZombieCellsReel } from './ZombieCellsReel';
import { GutAnxietyReel } from './GutAnxietyReel';
import { BloodSugarReel } from './BloodSugarReel';
import { HormonesReel } from './HormonesReel';
import { MetabolicReel } from './MetabolicReel';
import { LiverReel } from './LiverReel';
import { CholesterolReel } from './CholesterolReel';
import { FPS, WIDTH, HEIGHT, ZOMBIE_CELLS_TOTAL_FRAMES, GUT_ANXIETY_TOTAL_FRAMES, BLOOD_SUGAR_TOTAL_FRAMES, HORMONES_TOTAL_FRAMES, METABOLIC_TOTAL_FRAMES, LIVER_TOTAL_FRAMES, CHOLESTEROL_TOTAL_FRAMES } from './constants';

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
      <Composition
        id="GutAnxietyReel"
        component={GutAnxietyReel}
        durationInFrames={GUT_ANXIETY_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="BloodSugarReel"
        component={BloodSugarReel}
        durationInFrames={BLOOD_SUGAR_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="HormonesReel"
        component={HormonesReel}
        durationInFrames={HORMONES_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="MetabolicReel"
        component={MetabolicReel}
        durationInFrames={METABOLIC_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="LiverReel"
        component={LiverReel}
        durationInFrames={LIVER_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CholesterolReel"
        component={CholesterolReel}
        durationInFrames={CHOLESTEROL_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
