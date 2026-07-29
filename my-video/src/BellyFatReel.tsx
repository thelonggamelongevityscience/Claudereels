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

// ── Caption chunks — sentence-boundary aligned using proportional word timing ──
// Split points within chunks: frame = chunk_start + (words_before_split/chunk_words) * chunk_duration

const S1_CAPS: CaptionChunk[] = [
  // c0 complete (8w, 0–77)
  { text: "The belly fat is not a diet problem.",          startFrame: 0,   endFrame: 77  },
  // c1 words 0–4: "It is a hormone problem." — ends at 85+(5/8)*77=133
  { text: "It is a hormone problem.",                      startFrame: 85,  endFrame: 133 },
  // c1 words 5–7 + c2 words 0–4: "That is why cutting calories alone never works." — ends at 170+(5/8)*77=218
  { text: "That is why cutting calories alone never works.", startFrame: 134, endFrame: 218 },
  // c2 words 5–7 + c3 complete
  { text: "Here is what is actually happening.",           startFrame: 219, endFrame: 284 },
];

const S2_CAPS: CaptionChunk[] = [
  // c0 words 0–6 (7w): "Not all belly fat is the same." — ends at (7/8)*102=89
  { text: "Not all belly fat is the same.",                                                        startFrame: 0,   endFrame: 89  },
  // c0 word 7 + c1 + c2 words 0–3: full sentence — c2 word 3 ends at 220+(4/8)*102=271
  { text: "Subcutaneous fat — the soft fat under your skin — is relatively harmless.",             startFrame: 90,  endFrame: 271 },
  // c2 words 4–7 + c3: "Visceral fat — packed around your organs — produces inflammatory cytokines continuously,"
  { text: "Visceral fat — packed around your organs — produces inflammatory cytokines continuously,", startFrame: 272, endFrame: 432 },
  // c4 complete: "drives insulin resistance, and is far more dangerous."
  { text: "drives insulin resistance, and is far more dangerous.",                                 startFrame: 440, endFrame: 542 },
  // c5 + c6 complete sentence
  { text: "This is the one most people are actually fighting.",                                    startFrame: 550, endFrame: 673 },
];

const S3_CAPS: CaptionChunk[] = [
  // c0 + c1 word 0 ("shift."): ends at 116+(1/8)*108=130
  { text: "Two hormones make visceral fat almost impossible to shift.",                                   startFrame: 0,   endFrame: 130 },
  // c1 words 1–7 + c2 words 0–3 ("abdomen."): c2 word 3 ends at 232+(4/8)*108=286
  { text: "Cortisol — chronic stress specifically directs fat storage to the abdomen.",                   startFrame: 131, endFrame: 286 },
  // c2 words 4–7 + c3 words 0–1 ("chronically elevated,"): c3 word 1 ends at 348+(2/8)*108=375
  { text: "And insulin — when chronically elevated,",                                                     startFrame: 287, endFrame: 375 },
  // c3 words 2–7 + c4 words 0–4 ("deficit."): c4 word 4 ends at 464+(5/8)*108=532
  { text: "the body cannot access fat for fuel regardless of caloric deficit.",                           startFrame: 376, endFrame: 532 },
  // c4 words 5–7 + c5 words 0–4 ("combination"): c5 word 4 ends at 580+(5/8)*108=648
  { text: "High cortisol plus high insulin is the combination",                                          startFrame: 533, endFrame: 648 },
  // c5 words 5–7 + c6 complete
  { text: "that makes visceral fat completely resistant to conventional dieting.",                        startFrame: 649, endFrame: 777 },
];

const S4_CAPS: CaptionChunk[] = [
  // c0 complete sentence
  { text: "High-intensity exercise without adequate recovery raises cortisol further.",        startFrame: 0,   endFrame: 112 },
  // c1 complete (natural comma break after "training")
  { text: "For someone already cortisol-dominant, adding more intense training",              startFrame: 120, endFrame: 232 },
  // c2 + c3 word 0 ("it."): c3 word 0 ends at 360+(1/8)*112=374
  { text: "can increase visceral fat accumulation rather than reduce it.",                    startFrame: 240, endFrame: 374 },
  // c3 words 1–7: "Zone 2 aerobic exercise — not HIIT"
  { text: "Zone 2 aerobic exercise — not HIIT",                                              startFrame: 375, endFrame: 479 },
  // c4 + c5 complete sentence
  { text: "— is what the evidence actually supports for visceral fat specifically.",          startFrame: 480, endFrame: 642 },
];

const S5_CAPS: CaptionChunk[] = [
  // c0 complete
  { text: "How to actually shift it: fix sleep first",                                startFrame: 0,   endFrame: 98  },
  // c1 complete
  { text: "— cortisol normalisation starts here and visceral fat",                   startFrame: 106, endFrame: 204 },
  // c2 complete — end of first sentence
  { text: "responds to sleep quality faster than to diet.",                           startFrame: 212, endFrame: 310 },
  // c3 + c4 word 0 ("carbohydrate."): c4 word 0 ends at 424+(1/8)*98=436
  { text: "Lower insulin through time-restricted eating and less refined carbohydrate.", startFrame: 318, endFrame: 436 },
  // c4 words 1–7: "Zone 2 exercise four times per week."
  { text: "Zone 2 exercise four times per week.",                                     startFrame: 437, endFrame: 522 },
  // c5 complete
  { text: "And manage the stress system — no protocol",                               startFrame: 530, endFrame: 628 },
  // c6 complete — end of last sentence
  { text: "works while cortisol is chronically elevated.",                            startFrame: 636, endFrame: 709 },
];

const S6_CAPS: CaptionChunk[] = [
  // c0 + c1 words 0–3 ("hormones?"): c1 word 3 ends at 87+(4/8)*79=127
  { text: "Have you been blaming your diet when it was actually your hormones?", startFrame: 0,   endFrame: 127 },
  // c1 words 4–6 ("Most people have."): word 6 ends at 87+(7/8)*79=156
  { text: "Most people have.",                                                     startFrame: 128, endFrame: 156 },
  // c1 word 7 + c2 + c3: "Drop a yes below if this reframes it for you."
  { text: "Drop a yes below if this reframes it for you.",                        startFrame: 157, endFrame: 271 },
];

const S7_CAPS: CaptionChunk[] = [
  // c0 complete sentence
  { text: "Follow The Long Game for daily longevity science.",                         startFrame: 0,  endFrame: 86  },
  // c1 + c2 complete sentence
  { text: "Save this and send it to someone who has been dieting without results.",    startFrame: 94, endFrame: 242 },
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
