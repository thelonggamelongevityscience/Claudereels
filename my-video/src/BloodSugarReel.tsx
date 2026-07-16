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
  { text: "Your blood sugar is lying to you.",                     startFrame: 0,  endFrame: 45 },
  { text: "Your fasting glucose looks fine.",                      startFrame: 52, endFrame: 80 },
  { text: "The damage is happening between meals.",                startFrame: 85, endFrame: 105 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Your doctor checks fasting glucose and HbA1c —",       startFrame: 0,   endFrame: 55 },
  { text: "both snapshots taken when your blood sugar is at its lowest.", startFrame: 60, endFrame: 110 },
  { text: "They miss the 4 to 6 hours after every meal when most metabolic damage is done.", startFrame: 115, endFrame: 175 },
  { text: "Studies show 80% of people with normal fasting glucose still experience significant postprandial spikes.", startFrame: 180, endFrame: 255 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Every glucose spike triggers glycation, oxidative stress, an insulin surge, and a wave of inflammation.", startFrame: 0,  endFrame: 90 },
  { text: "This is happening multiple times a day in most people.",  startFrame: 95,  endFrame: 145 },
  { text: "And their doctor has no idea because the test is not designed to catch it.", startFrame: 150, endFrame: 210 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Signs your blood sugar is spiking without a test:",      startFrame: 0,  endFrame: 55 },
  { text: "crashing after meals, intense cravings two hours later,", startFrame: 60, endFrame: 105 },
  { text: "belly fat that does not respond to diet, and afternoon energy crashes. Sound familiar?", startFrame: 110, endFrame: 175 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "To flatten your glucose curve:",                         startFrame: 0,  endFrame: 40 },
  { text: "eat fibre and protein first, carbs last — this alone reduces spikes by up to 73%.", startFrame: 45, endFrame: 115 },
  { text: "Take a 10 minute walk after meals. Never eat carbs alone.", startFrame: 120, endFrame: 175 },
  { text: "These four habits change your metabolic health faster than any supplement.", startFrame: 180, endFrame: 240 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Do you crash after meals or stay steady?",              startFrame: 0,  endFrame: 60 },
  { text: "Your answer tells us a lot about your metabolic health.", startFrame: 65, endFrame: 115 },
  { text: "Drop it below.",                                         startFrame: 120, endFrame: 150 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",     startFrame: 0,  endFrame: 55 },
  { text: "Save this — your blood sugar is listening.",            startFrame: 60, endFrame: 90 },
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
