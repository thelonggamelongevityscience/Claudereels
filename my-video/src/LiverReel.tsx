import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, LIVER_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1LiverHook }       from './scenes/Scene1LiverHook';
import { Scene2LiverWhatItDoes } from './scenes/Scene2LiverWhatItDoes';
import { Scene3LiverEpidemic }   from './scenes/Scene3LiverEpidemic';
import { Scene4LiverSigns }      from './scenes/Scene4LiverSigns';
import { Scene5LiverProtocol }   from './scenes/Scene5LiverProtocol';
import { Scene6LiverLoopHook }   from './scenes/Scene6LiverLoopHook';
import { Scene7LiverCTA }        from './scenes/Scene7LiverCTA';

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
  { text: "Your liver is keeping score. And it never lies.", startFrame: 0,  endFrame: 55 },
  { text: "Every ultra-processed meal. Every late night.",   startFrame: 60, endFrame: 95 },
  { text: "It remembers all of it.",                        startFrame: 100, endFrame: 120 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Your liver is running 500 functions right now.",       startFrame: 0,   endFrame: 60 },
  { text: "Filtering your blood. Regulating blood sugar.",        startFrame: 65,  endFrame: 120 },
  { text: "Processing every drug and alcohol molecule you consume.", startFrame: 125, endFrame: 190 },
  { text: "When it becomes overburdened, it begins storing fat inside its own cells.", startFrame: 195, endFrame: 265 },
  { text: "This is how NAFLD begins. Silently. Without a single symptom.", startFrame: 270, endFrame: 330 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "One in four adults globally now has NAFLD. Most have no idea.", startFrame: 0,   endFrame: 75 },
  { text: "You do not have to drink alcohol to develop it —",             startFrame: 80,  endFrame: 140 },
  { text: "excess fructose and refined carbs are equally damaging.",      startFrame: 145, endFrame: 210 },
  { text: "Standard liver tests miss it until the damage is already significant.", startFrame: 215, endFrame: 285 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Signs your liver is struggling:",                              startFrame: 0,   endFrame: 45 },
  { text: "stubborn belly fat, afternoon brain fog, bloating after fatty meals,", startFrame: 50, endFrame: 125 },
  { text: "high triglycerides, and poor sleep.",                         startFrame: 130, endFrame: 175 },
  { text: "These are not random. They are a pattern.",                   startFrame: 180, endFrame: 225 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "Remove fructose — it converts directly to fat in the liver.", startFrame: 0,   endFrame: 80 },
  { text: "Drink 2 to 3 cups of coffee daily —",                        startFrame: 85,  endFrame: 130 },
  { text: "it reduces liver fibrosis risk by up to 40%.",               startFrame: 135, endFrame: 185 },
  { text: "Do Zone 2 exercise — it reduces hepatic fat faster than diet alone.", startFrame: 190, endFrame: 260 },
  { text: "And add GGT and ALT to your next blood panel.",              startFrame: 265, endFrame: 315 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Have you ever had a liver function test done?", startFrame: 0,  endFrame: 65 },
  { text: "Most people have not.",                        startFrame: 70, endFrame: 100 },
  { text: "Drop your answer below.",                     startFrame: 105, endFrame: 130 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,  endFrame: 55 },
  { text: "Save this — your liver is listening.",             startFrame: 60, endFrame: 95 },
];

function getMusicVolume(frame: number): number {
  const S = LIVER_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const LiverReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = LIVER_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('liver.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1LiverHook       frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2LiverWhatItDoes frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3LiverEpidemic   frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4LiverSigns      frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5LiverProtocol   frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6LiverLoopHook   frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7LiverCTA        frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
