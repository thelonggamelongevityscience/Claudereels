import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, AR_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1ARHook }         from './scenes/Scene1ARHook';
import { Scene2ARWhatIs }       from './scenes/Scene2ARWhatIs';
import { Scene3ARWhyItMatters } from './scenes/Scene3ARWhyItMatters';
import { Scene4ARBlocks }       from './scenes/Scene4ARBlocks';
import { Scene5ARActivate }     from './scenes/Scene5ARActivate';
import { Scene6ARTrilogy }      from './scenes/Scene6ARTrilogy';
import { Scene7ARLoopHook }     from './scenes/Scene7ARLoopHook';
import { Scene8ARCTA }          from './scenes/Scene8ARCTA';

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

// ── Caption chunks — sentence-boundary aligned using proportional word timing ──
// Split points within chunks: frame = chunk_start + (words_before_split / chunk_words) * chunk_duration

// S1: 2 chunks × 8w, audio_frames=155
const S1_CAPS: CaptionChunk[] = [
  // c0 w1-7 "Your body has a self-cleaning mode."
  { text: "Your body has a self-cleaning mode.",  startFrame: 0,   endFrame: 68  },
  // c0 w8 + c1 w1-4 "Most people never activate it."
  { text: "Most people never activate it.",        startFrame: 76,  endFrame: 125 },
  // c1 w5-8 "Here is how it works."
  { text: "Here is how it works.",                 startFrame: 133, endFrame: 155 },
];

// S2: 8 chunks × 8w, audio_frames=775
const S2_CAPS: CaptionChunk[] = [
  // c0 all + c1 all + c2 w1-7 — through "cellular debris,"
  { text: "Autophagy — from the Greek for self-eating — is the process by which your cells identify damaged proteins, dysfunctional organelles, and cellular debris,", startFrame: 0,   endFrame: 295 },
  // c2 w8 + c3 w1-5 "and break them down for recycling."
  { text: "and break them down for recycling.",                                    startFrame: 303, endFrame: 376 },
  // c3 w6-8 + c4 w1-5 "It is your body's built-in quality control system."
  { text: "It is your body's built-in quality control system.",                   startFrame: 384, endFrame: 481 },
  // c4 w6-8 + c5 all + c6 w1 "Yoshinori Ohsumi won the 2016 Nobel Prize in Medicine for mapping it."
  { text: "Yoshinori Ohsumi won the 2016 Nobel Prize in Medicine for mapping it.", startFrame: 489, endFrame: 642 },
  // c6 w2-8 + c7 all "The science establishment called it one of the most important biological discoveries of the century."
  { text: "The science establishment called it one of the most important biological discoveries of the century.", startFrame: 650, endFrame: 775 },
];

// S3: 8 chunks (last 5w), audio_frames=671
const S3_CAPS: CaptionChunk[] = [
  // c0 all + c1 w1-3 "Autophagy is the answer to both problems we covered this week."
  { text: "Autophagy is the answer to both problems we covered this week.",                                    startFrame: 0,   endFrame: 129 },
  // c1 w4-8 + c2 w1-4 "It clears zombie cells before their inflammatory signals spread."
  { text: "It clears zombie cells before their inflammatory signals spread.",                                   startFrame: 137, endFrame: 236 },
  // c2 w5-8 + c3 all + c4 w1-2 "It resolves chronic inflammation by degrading the very proteins that trigger the inflammatory cascade."
  { text: "It resolves chronic inflammation by degrading the very proteins that trigger the inflammatory cascade.", startFrame: 244, endFrame: 406 },
  // c4 w3-8 + c5 w1-4 "It protects brain cells by clearing amyloid and tau proteins."
  { text: "It protects brain cells by clearing amyloid and tau proteins.",                                     startFrame: 414, endFrame: 524 },
  // c5 w5-8 + c6 all + c7 all "And it removes dysfunctional mitochondria before they leak the free radicals that age you from the inside."
  { text: "And it removes dysfunctional mitochondria before they leak the free radicals that age you from the inside.", startFrame: 532, endFrame: 671 },
];

// S4: 8 chunks (last 2w), audio_frames=774
const S4_CAPS: CaptionChunk[] = [
  // c0 w1-7 "Four things switch your self-cleaning mode off."
  { text: "Four things switch your self-cleaning mode off.",                                           startFrame: 0,   endFrame: 93  },
  // c0 w8 + c1 all + c2 w1-2 "Constant eating — every meal triggers insulin, which directly suppresses autophagy."
  { text: "Constant eating — every meal triggers insulin, which directly suppresses autophagy.",       startFrame: 101, endFrame: 257 },
  // c2 w3-8 + c3 w1-3 "Excess protein activating mTOR — autophagy's direct off switch."
  { text: "Excess protein activating mTOR — autophagy's direct off switch.",                          startFrame: 265, endFrame: 385 },
  // c3 w4-8 + c4 w1-3 "Chronic stress impairing the rate of cellular clearance."
  { text: "Chronic stress impairing the rate of cellular clearance.",                                 startFrame: 393, endFrame: 500 },
  // c4 w4-8 + c5 all "And poor sleep — the majority of neuronal autophagy happens during deep sleep."
  { text: "And poor sleep — the majority of neuronal autophagy happens during deep sleep.",            startFrame: 508, endFrame: 682 },
  // c6 all + c7 all "Cut it short and you halt the brain's overnight cleanup."
  { text: "Cut it short and you halt the brain's overnight cleanup.",                                 startFrame: 690, endFrame: 774 },
];

// S5: 8 chunks (last 7w), audio_frames=778
const S5_CAPS: CaptionChunk[] = [
  // c0 w1-7 "Four ways to switch it back on."
  { text: "Four ways to switch it back on.",                                                            startFrame: 0,   endFrame: 87  },
  // c0 w8 + c1 all + c2 all "Fast for 16 to 18 hours — autophagy begins meaningfully around 14 to 16 hours without food."
  { text: "Fast for 16 to 18 hours — autophagy begins meaningfully around 14 to 16 hours without food.", startFrame: 95, endFrame: 313 },
  // c3 all + c4 w1-4 "Zone 2 exercise strongly induces it in muscle, liver, and brain simultaneously."
  { text: "Zone 2 exercise strongly induces it in muscle, liver, and brain simultaneously.",            startFrame: 321, endFrame: 478 },
  // c4 w5-8 + c5 all + c6 w1-7 "Black coffee — caffeine and polyphenols independently activate autophagy, which is one of the mechanisms behind coffee's longevity data."
  { text: "Black coffee — caffeine and polyphenols independently activate autophagy, which is one of the mechanisms behind coffee's longevity data.", startFrame: 486, endFrame: 729 },
  // c6 w8 + c7 all "And protect your deep sleep at all costs."
  { text: "And protect your deep sleep at all costs.",                                                  startFrame: 737, endFrame: 778 },
];

// S6: 6 chunks (last 5w), audio_frames=629
const S6_CAPS: CaptionChunk[] = [
  // c0 w1-5 "This week was a trilogy."
  { text: "This week was a trilogy.",                                                   startFrame: 0,   endFrame: 70  },
  // c0 w6-8 + c1 all "Tuesday — zombie cells accumulate when autophagy fails to clear them."
  { text: "Tuesday — zombie cells accumulate when autophagy fails to clear them.",     startFrame: 78,  endFrame: 232 },
  // c2 all + c3 w1-3 "Wednesday — chronic inflammation persists when autophagy fails to resolve it."
  { text: "Wednesday — chronic inflammation persists when autophagy fails to resolve it.", startFrame: 240, endFrame: 402 },
  // c3 w4-8 + c4 w1-4 "Friday — autophagy is the mechanism that fixes both."
  { text: "Friday — autophagy is the mechanism that fixes both.",                      startFrame: 410, endFrame: 536 },
  // c4 w5-8 + c5 all "Fast. Move. Sleep. Your cells will do the rest."
  { text: "Fast. Move. Sleep. Your cells will do the rest.",                           startFrame: 544, endFrame: 629 },
];

// S7: 3 chunks, audio_frames=295
const S7_CAPS: CaptionChunk[] = [
  // c0 all "Are you accidentally keeping your self-cleaning mode off?"
  { text: "Are you accidentally keeping your self-cleaning mode off?", startFrame: 0,   endFrame: 107 },
  // c1 all + c2 w1 "Constant eating. Poor sleep. No fasting. No Zone 2."
  { text: "Constant eating. Poor sleep. No fasting. No Zone 2.",       startFrame: 115, endFrame: 243 },
  // c2 w2-6 "Drop your honest answer below."
  { text: "Drop your honest answer below.",                             startFrame: 251, endFrame: 295 },
];

// S8: 3 chunks, audio_frames=179
const S8_CAPS: CaptionChunk[] = [
  // c0 all "Follow The Long Game for daily longevity science."
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,   endFrame: 84  },
  // c1 w1-2 "Save this."
  { text: "Save this.",                                         startFrame: 92,  endFrame: 113 },
  // c1 w3-8 + c2 "Your cells are waiting for the signal."
  { text: "Your cells are waiting for the signal.",            startFrame: 121, endFrame: 179 },
];

function getMusicVolume(frame: number): number {
  const S = AR_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const AutophagyReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = AR_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('autophagy.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1ARHook         frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2ARWhatIs       frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3ARWhyItMatters frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4ARBlocks       frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5ARActivate     frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6ARTrilogy      frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7ARLoopHook     frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8ARCTA          frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
