import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, BELLY_FAT_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1BellyFatHook }     from './scenes/Scene1BellyFatHook';
import { Scene2BellyFatTwoTypes } from './scenes/Scene2BellyFatTwoTypes';
import { Scene3BellyFatHormones } from './scenes/Scene3BellyFatHormones';
import { Scene4BellyFatExercise } from './scenes/Scene4BellyFatExercise';
import { Scene5BellyFatProtocol } from './scenes/Scene5BellyFatProtocol';
import { Scene6BellyFatLoopHook } from './scenes/Scene6BellyFatLoopHook';
import { Scene7BellyFatCTA }      from './scenes/Scene7BellyFatCTA';

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
  { text: "The belly fat is not a diet problem.", startFrame: 0,   endFrame: 60  },
  { text: "It is a hormone problem.",             startFrame: 65,  endFrame: 105 },
  { text: "That is why cutting calories alone never works.", startFrame: 110, endFrame: 180 },
  { text: "Here is what is actually happening.",  startFrame: 185, endFrame: 224 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Not all belly fat is the same.",                                                  startFrame: 0,   endFrame: 80  },
  { text: "Subcutaneous fat — the soft fat under your skin — is relatively harmless.",       startFrame: 85,  endFrame: 215 },
  { text: "Visceral fat — packed around your organs — produces inflammatory cytokines continuously,", startFrame: 220, endFrame: 380 },
  { text: "drives insulin resistance, and is far more dangerous.",                           startFrame: 385, endFrame: 480 },
  { text: "This is the one most people are actually fighting.",                              startFrame: 485, endFrame: 575 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Two hormones make visceral fat almost impossible to shift.",                                          startFrame: 0,   endFrame: 115 },
  { text: "Cortisol — chronic stress specifically directs fat storage to the abdomen.",                          startFrame: 120, endFrame: 240 },
  { text: "And insulin — when chronically elevated, the body cannot access fat for fuel regardless of caloric deficit.", startFrame: 245, endFrame: 420 },
  { text: "High cortisol plus high insulin is the combination that makes visceral fat completely resistant to conventional dieting.", startFrame: 425, endFrame: 645 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "High-intensity exercise without adequate recovery raises cortisol further.",                         startFrame: 0,   endFrame: 130 },
  { text: "For someone already cortisol-dominant, adding more intense training can increase visceral fat accumulation.", startFrame: 135, endFrame: 315 },
  { text: "Zone 2 aerobic exercise — not HIIT — is what the evidence actually supports for visceral fat specifically.", startFrame: 320, endFrame: 520 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "How to actually shift it: fix sleep first —",                                                  startFrame: 0,   endFrame: 100 },
  { text: "cortisol normalisation starts here and visceral fat responds to sleep quality faster than to diet.", startFrame: 105, endFrame: 255 },
  { text: "Lower insulin through time-restricted eating and less refined carbohydrate.",                   startFrame: 260, endFrame: 395 },
  { text: "Zone 2 exercise four times per week.",                                                          startFrame: 400, endFrame: 480 },
  { text: "And manage the stress system — no protocol works while cortisol is chronically elevated.",      startFrame: 485, endFrame: 650 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Have you been blaming your diet when it was actually your hormones?", startFrame: 0,   endFrame: 130 },
  { text: "Most people have.",                                                    startFrame: 135, endFrame: 175 },
  { text: "Drop a yes below if this reframes it for you.",                       startFrame: 180, endFrame: 270 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",                                        startFrame: 0,   endFrame: 95  },
  { text: "Save this and send it to someone who has been dieting without results.",                   startFrame: 100, endFrame: 240 },
];

function getMusicVolume(frame: number): number {
  const S = BELLY_FAT_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const BellyFatReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = BELLY_FAT_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('belly_fat.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1BellyFatHook     frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2BellyFatTwoTypes frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3BellyFatHormones frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4BellyFatExercise frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5BellyFatProtocol frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6BellyFatLoopHook frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7BellyFatCTA      frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
