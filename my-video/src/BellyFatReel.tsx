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

// ── Caption chunks — from real ElevenLabs audio (caption_timings_belly_fat.json) ──

const S1_CAPS: CaptionChunk[] = [
  { text: "The belly fat is not a diet problem.",           startFrame: 0,   endFrame: 77  },
  { text: "It is a hormone problem. That is why",           startFrame: 85,  endFrame: 162 },
  { text: "cutting calories alone never works. Here is what", startFrame: 170, endFrame: 247 },
  { text: "is actually happening.",                          startFrame: 255, endFrame: 284 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Not all belly fat is the same. Subcutaneous",           startFrame: 0,   endFrame: 102 },
  { text: "fat — the soft fat under your skin",                    startFrame: 110, endFrame: 212 },
  { text: "— is relatively harmless. Visceral fat — packed",       startFrame: 220, endFrame: 322 },
  { text: "around your organs — produces inflammatory cytokines continuously,", startFrame: 330, endFrame: 432 },
  { text: "drives insulin resistance, and is far more dangerous.", startFrame: 440, endFrame: 542 },
  { text: "This is the one most people are actually",              startFrame: 550, endFrame: 652 },
  { text: "fighting.",                                             startFrame: 660, endFrame: 673 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Two hormones make visceral fat almost impossible to",          startFrame: 0,   endFrame: 108 },
  { text: "shift. Cortisol — chronic stress specifically directs fat",    startFrame: 116, endFrame: 224 },
  { text: "storage to the abdomen. And insulin — when",                   startFrame: 232, endFrame: 340 },
  { text: "chronically elevated, the body cannot access fat for",         startFrame: 348, endFrame: 456 },
  { text: "fuel regardless of caloric deficit. High cortisol plus",       startFrame: 464, endFrame: 572 },
  { text: "high insulin is the combination that makes visceral",          startFrame: 580, endFrame: 688 },
  { text: "fat completely resistant to conventional dieting.",            startFrame: 696, endFrame: 777 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "High-intensity exercise without adequate recovery raises cortisol further.", startFrame: 0,   endFrame: 112 },
  { text: "For someone already cortisol-dominant, adding more intense training",       startFrame: 120, endFrame: 232 },
  { text: "can increase visceral fat accumulation rather than reduce",                 startFrame: 240, endFrame: 352 },
  { text: "it. Zone 2 aerobic exercise — not HIIT",                                   startFrame: 360, endFrame: 472 },
  { text: "— is what the evidence actually supports for",                              startFrame: 480, endFrame: 592 },
  { text: "visceral fat specifically.",                                                startFrame: 600, endFrame: 642 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "How to actually shift it: fix sleep first",                   startFrame: 0,   endFrame: 98  },
  { text: "— cortisol normalisation starts here and visceral fat",       startFrame: 106, endFrame: 204 },
  { text: "responds to sleep quality faster than to diet.",              startFrame: 212, endFrame: 310 },
  { text: "Lower insulin through time-restricted eating and less refined", startFrame: 318, endFrame: 416 },
  { text: "carbohydrate. Zone 2 exercise four times per week.",          startFrame: 424, endFrame: 522 },
  { text: "And manage the stress system — no protocol",                  startFrame: 530, endFrame: 628 },
  { text: "works while cortisol is chronically elevated.",               startFrame: 636, endFrame: 709 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Have you been blaming your diet when it",           startFrame: 0,   endFrame: 79  },
  { text: "was actually your hormones? Most people have. Drop", startFrame: 87,  endFrame: 166 },
  { text: "a yes below if this reframes it for",               startFrame: 174, endFrame: 253 },
  { text: "you.",                                               startFrame: 261, endFrame: 271 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,   endFrame: 86  },
  { text: "Save this and send it to someone who",             startFrame: 94,  endFrame: 180 },
  { text: "has been dieting without results.",                 startFrame: 188, endFrame: 242 },
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
