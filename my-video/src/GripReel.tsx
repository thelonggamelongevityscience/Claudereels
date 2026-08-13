import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, GRIP_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1GRPHook }          from './scenes/Scene1GRPHook';
import { Scene2GRPWhatsHappening } from './scenes/Scene2GRPWhatsHappening';
import { Scene3GRPWhyItMatters }   from './scenes/Scene3GRPWhyItMatters';
import { Scene4GRPWhatWeakens }    from './scenes/Scene4GRPWhatWeakens';
import { Scene5GRPHowToBuild }     from './scenes/Scene5GRPHowToBuild';
import { Scene6GRPTheNumber }      from './scenes/Scene6GRPTheNumber';
import { Scene7GRPLoopHook }       from './scenes/Scene7GRPLoopHook';
import { Scene8GRPCTA }            from './scenes/Scene8GRPCTA';

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

// S1: Hook — 189f  (0.0–6.316s)
const S1_CAPS: CaptionChunk[] = [
  { text: "Your handshake might predict how long you live.",    startFrame:  0, endFrame:  62 },
  { text: "One of the strangest, most consistent findings in", startFrame: 75, endFrame: 145 },
  { text: "longevity research.",                               startFrame: 147, endFrame: 189 },
];

// S2: What's Happening — 386f  (6.316–19.180s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Grip strength is a proxy for total-body muscle",    startFrame:  0, endFrame:  74 },
  { text: "quality and neuromuscular function. A study of nearly", startFrame: 75, endFrame: 171 },
  { text: "140,000 people across 17 countries found it predicted", startFrame: 175, endFrame: 307 },
  { text: "mortality more strongly than blood pressure.",       startFrame: 309, endFrame: 386 },
];

// S3: Why It Matters — 380f  (19.180–31.858s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Muscle loss starts as early as your 30s.",          startFrame:  0, endFrame:  68 },
  { text: "Grip strength predicts fall risk and recovery speed", startFrame: 80, endFrame: 161 },
  { text: "from illness. It reflects nervous system health. And", startFrame: 162, endFrame: 262 },
  { text: "it takes 10 seconds to measure with no",            startFrame: 264, endFrame: 336 },
  { text: "blood draw required.",                              startFrame: 338, endFrame: 380 },
];

// S4: What Weakens It — 322f  (31.858–42.586s)
const S4_CAPS: CaptionChunk[] = [
  { text: "No resistance training at all. Inadequate protein intake.", startFrame:  0, endFrame: 111 },
  { text: "And long periods of inactivity — even short",       startFrame: 121, endFrame: 203 },
  { text: "stretches of bed rest measurably reduce grip strength", startFrame: 204, endFrame: 286 },
  { text: "in older adults.",                                  startFrame: 287, endFrame: 322 },
];

// S5: How To Build It — 305f  (42.586–52.756s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Resistance train 2 to 3 times a week",              startFrame:  0, endFrame:  61 },
  { text: "with compound movements. Add direct grip work like", startFrame: 62, endFrame: 146 },
  { text: "farmer's carries. Hit your protein target. And test", startFrame: 147, endFrame: 246 },
  { text: "it periodically to track the trend.",               startFrame: 248, endFrame: 305 },
];

// S6: The Number — 472f  (52.756–68.499s)
const S6_CAPS: CaptionChunk[] = [
  { text: "For men, below roughly 26 kilograms, and for",      startFrame:  0, endFrame: 105 },
  { text: "women below roughly 16, is associated with elevated", startFrame: 107, endFrame: 214 },
  { text: "risk. But tracking the trend over years matters",   startFrame: 216, endFrame: 307 },
  { text: "more than any single number. It sounds too",        startFrame: 309, endFrame: 381 },
  { text: "simple to matter this much. The data says",         startFrame: 383, endFrame: 447 },
  { text: "otherwise.",                                        startFrame: 448, endFrame: 472 },
];

// S7: Loop Hook — 157f  (68.499–73.747s)
const S7_CAPS: CaptionChunk[] = [
  { text: "When did you last test your grip strength?",        startFrame:  0, endFrame:  58 },
  { text: "Most people never have. Drop your guess below.",    startFrame: 71, endFrame: 157 },
];

// S8: CTA — 143f  (73.747–78.530s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame:  0, endFrame:  76 },
  { text: "Save this before your next workout.",               startFrame: 90, endFrame: 143 },
];

function getMusicVolume(frame: number): number {
  const S = GRIP_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const GripReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = GRIP_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('grip.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1GRPHook          frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2GRPWhatsHappening frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3GRPWhyItMatters  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4GRPWhatWeakens   frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5GRPHowToBuild    frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6GRPTheNumber     frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7GRPLoopHook      frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8GRPCTA           frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
