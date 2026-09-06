import React from 'react';
import { Composition } from 'remotion';
import { ZombieCellsReel } from './ZombieCellsReel';
import { GutAnxietyReel } from './GutAnxietyReel';
import { BloodSugarReel } from './BloodSugarReel';
import { HormonesReel } from './HormonesReel';
import { MetabolicReel } from './MetabolicReel';
import { LiverReel } from './LiverReel';
import { CholesterolReel } from './CholesterolReel';
import { BellyFatReel } from './BellyFatReel';
import { ZombieCellsRemakeReel } from './ZombieCellsRemakeReel';
import { InflammationRemakeReel } from './InflammationRemakeReel';
import { AutophagyReel } from './AutophagyReel';
import { MorningLightReel } from './MorningLightReel';
import { NightcapReel } from './NightcapReel';
import { MelatoninReel } from './MelatoninReel';
import { VO2MaxReel } from './VO2MaxReel';
import { FiberReel } from './FiberReel';
import { GripReel } from './GripReel';
import { HallmarksReel } from './HallmarksReel';
import { SaunaReel } from './SaunaReel';
import { BoneReel } from './BoneReel';
import { HsCRPReel } from './HsCRPReel';
import { LongevityArchetypeReel } from './LongevityArchetypeReel';
import { GLP1Reel } from './GLP1Reel';
import { C15Reel } from './C15Reel';
import { FPS, WIDTH, HEIGHT, ZOMBIE_CELLS_TOTAL_FRAMES, GUT_ANXIETY_TOTAL_FRAMES, BLOOD_SUGAR_TOTAL_FRAMES, HORMONES_TOTAL_FRAMES, METABOLIC_TOTAL_FRAMES, LIVER_TOTAL_FRAMES, CHOLESTEROL_TOTAL_FRAMES, BELLY_FAT_TOTAL_FRAMES, ZCR_TOTAL_FRAMES, IR_TOTAL_FRAMES, AR_TOTAL_FRAMES, ML_TOTAL_FRAMES, NC_TOTAL_FRAMES, MEL_TOTAL_FRAMES, VO2_TOTAL_FRAMES, FIBER_TOTAL_FRAMES, GRIP_TOTAL_FRAMES, HALLMARKS_TOTAL_FRAMES, SAUNA_TOTAL_FRAMES, BONE_TOTAL_FRAMES, HSCRP_TOTAL_FRAMES, LA_TOTAL_FRAMES, GLP_TOTAL_FRAMES, C15_TOTAL_FRAMES } from './constants';

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
      <Composition
        id="BellyFatReel"
        component={BellyFatReel}
        durationInFrames={BELLY_FAT_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ZombieCellsRemakeReel"
        component={ZombieCellsRemakeReel}
        durationInFrames={ZCR_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="InflammationRemakeReel"
        component={InflammationRemakeReel}
        durationInFrames={IR_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="AutophagyReel"
        component={AutophagyReel}
        durationInFrames={AR_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="MorningLightReel"
        component={MorningLightReel}
        durationInFrames={ML_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="NightcapReel"
        component={NightcapReel}
        durationInFrames={NC_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="MelatoninReel"
        component={MelatoninReel}
        durationInFrames={MEL_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="VO2MaxReel"
        component={VO2MaxReel}
        durationInFrames={VO2_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FiberReel"
        component={FiberReel}
        durationInFrames={FIBER_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="GripReel"
        component={GripReel}
        durationInFrames={GRIP_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="HallmarksReel"
        component={HallmarksReel}
        durationInFrames={HALLMARKS_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="SaunaReel"
        component={SaunaReel}
        durationInFrames={SAUNA_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="BoneReel"
        component={BoneReel}
        durationInFrames={BONE_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="HsCRPReel"
        component={HsCRPReel}
        durationInFrames={HSCRP_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="LongevityArchetypeReel"
        component={LongevityArchetypeReel}
        durationInFrames={LA_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="GLP1Reel"
        component={GLP1Reel}
        durationInFrames={GLP_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="C15Reel"
        component={C15Reel}
        durationInFrames={C15_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
