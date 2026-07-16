import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, BLOOD_SUGAR_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1BloodSugarHook }    from './scenes/Scene1BloodSugarHook';
import { Scene2BloodSugarProblem } from './scenes/Scene2BloodSugarProblem';
import { Scene3BloodSugarSpikes }  from './scenes/Scene3BloodSugarSpikes';
import { Scene4BloodSugarSigns }   from './scenes/Scene4BloodSugarSigns';
import { Scene5BloodSugarFix }     from './scenes/Scene5BloodSugarFix';
import { Scene6BloodSugarLoopHook } from './scenes/Scene6BloodSugarLoopHook';
import { Scene7BloodSugarCTA }     from './scenes/Scene7BloodSugarCTA';

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
  { text: "Your blood sugar is lying to you. Your",        startFrame: 0,   endFrame: 84 },
  { text: "fasting glucose looks fine. The damage is happening", startFrame: 92, endFrame: 176 },
  { text: "between meals.",                                startFrame: 184, endFrame: 205 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Your doctor checks fasting glucose and HbA1c —",           startFrame: 0,   endFrame: 92 },
  { text: "both snapshots taken when your blood sugar is",             startFrame: 100, endFrame: 192 },
  { text: "at its lowest. They miss the 4 to",                        startFrame: 200, endFrame: 292 },
  { text: "6 hours after every meal when most metabolic",              startFrame: 300, endFrame: 392 },
  { text: "damage is done. Studies show 80 percent of",                startFrame: 400, endFrame: 492 },
  { text: "people with normal fasting glucose still experience significant", startFrame: 500, endFrame: 592 },
  { text: "postprandial spikes.",                                      startFrame: 600, endFrame: 623 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Every glucose spike triggers glycation, oxidative stress, an", startFrame: 0,   endFrame: 86 },
  { text: "insulin surge, and a wave of inflammation. This",             startFrame: 94,  endFrame: 180 },
  { text: "is happening multiple times a day in most",                   startFrame: 188, endFrame: 274 },
  { text: "people. And their doctor has no idea because",                startFrame: 282, endFrame: 368 },
  { text: "the test is not designed to catch it.",                       startFrame: 376, endFrame: 462 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Signs your blood sugar is spiking without a",   startFrame: 0,   endFrame: 104 },
  { text: "test: crashing after meals, intense cravings two hours", startFrame: 112, endFrame: 216 },
  { text: "later, belly fat that does not respond to",     startFrame: 224, endFrame: 328 },
  { text: "diet, and afternoon energy crashes. Sound familiar?", startFrame: 336, endFrame: 427 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "To flatten your glucose curve: eat fibre and",  startFrame: 0,   endFrame: 90 },
  { text: "protein first, carbs last — this alone reduces", startFrame: 98,  endFrame: 188 },
  { text: "spikes by up to 73 percent. Take a",            startFrame: 196, endFrame: 286 },
  { text: "10 minute walk after meals. Never eat carbs",   startFrame: 294, endFrame: 384 },
  { text: "alone. These four habits change your metabolic health", startFrame: 392, endFrame: 482 },
  { text: "faster than any supplement.",                   startFrame: 490, endFrame: 535 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Do you crash after meals or stay steady?",      startFrame: 0,   endFrame: 78 },
  { text: "Your answer tells us a lot about your",         startFrame: 86,  endFrame: 164 },
  { text: "metabolic health. Drop it below.",              startFrame: 172, endFrame: 221 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,  endFrame: 88 },
  { text: "Save this — your blood sugar is listening.",        startFrame: 96, endFrame: 184 },
];

function getMusicVolume(frame: number): number {
  const S = BLOOD_SUGAR_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const BloodSugarReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = BLOOD_SUGAR_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('blood_sugar.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1BloodSugarHook    frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2BloodSugarProblem frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3BloodSugarSpikes  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4BloodSugarSigns   frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5BloodSugarFix     frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6BloodSugarLoopHook frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7BloodSugarCTA     frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
