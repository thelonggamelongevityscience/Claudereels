import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { MOV_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1MOVHook }           from './scenes/Scene1MOVHook';
import { Scene2MOVHowItWorks }     from './scenes/Scene2MOVHowItWorks';
import { Scene3MOVWalker }         from './scenes/Scene3MOVWalker';
import { Scene4MOVLifter }         from './scenes/Scene4MOVLifter';
import { Scene5MOVRunner }         from './scenes/Scene5MOVRunner';
import { Scene6MOVYoga }           from './scenes/Scene6MOVYoga';
import { Scene7MOVCommentTrigger } from './scenes/Scene7MOVCommentTrigger';
import { Scene8MOVCTA }            from './scenes/Scene8MOVCTA';

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

// S1: Hook — 164f
const S1_CAPS: CaptionChunk[] = [
  { text: "What's your movement type?",            startFrame:  0, endFrame:  50 },
  { text: "Comment your favorite way to move —",  startFrame: 51, endFrame: 114 },
  { text: "I'll tell you what it means.",          startFrame: 115, endFrame: 163 },
];

// S2: How It Works — 222f
const S2_CAPS: CaptionChunk[] = [
  { text: "Comment walking, lifting, running, yoga,", startFrame:  0, endFrame: 107 },
  { text: "cycling, or swimming.",                    startFrame: 108, endFrame: 158 },
  { text: "I'll reply with your archetype.",          startFrame: 159, endFrame: 221 },
];

// S3: Walker — 275f
const S3_CAPS: CaptionChunk[] = [
  { text: "If you said walking —",                              startFrame:  0, endFrame:  51 },
  { text: "you're the Steady Builder.",                        startFrame: 45, endFrame:  96 },
  { text: "Low-intensity, endlessly consistent.",             startFrame: 97, endFrame: 183 },
  { text: "Often the strongest longevity baseline of all.",   startFrame: 184, endFrame: 274 },
];

// S4: Lifter — 215f
const S4_CAPS: CaptionChunk[] = [
  { text: "If you said lifting — you're the Strength Guardian.", startFrame:  0, endFrame:  85 },
  { text: "Protecting muscle and bone density",                   startFrame: 102, endFrame: 153 },
  { text: "before it's even a concern.",                         startFrame: 154, endFrame: 214 },
];

// S5: Runner — 236f
const S5_CAPS: CaptionChunk[] = [
  { text: "If you said running — you're the Cardio Optimizer.", startFrame:  0, endFrame:  89 },
  { text: "Chasing the number that predicts lifespan",          startFrame: 105, endFrame: 169 },
  { text: "better than almost anything else.",                  startFrame: 173, endFrame: 235 },
];

// S6: Yoga — 227f
const S6_CAPS: CaptionChunk[] = [
  { text: "If you said yoga — you're the Recovery Specialist.", startFrame:  0, endFrame:  90 },
  { text: "Nervous system and flexibility work",                startFrame: 109, endFrame: 163 },
  { text: "most people skip entirely.",                        startFrame: 167, endFrame: 226 },
];

// S7: Comment Trigger — 199f
const S7_CAPS: CaptionChunk[] = [
  { text: "How do you move?",                                       startFrame:  0, endFrame:  37 },
  { text: "Comment it below —",                                    startFrame: 38, endFrame:  90 },
  { text: "I'll reply with your archetype and the science behind it.", startFrame: 91, endFrame: 198 },
];

// S8: CTA — 144f
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game.",                          startFrame:  0, endFrame:  46 },
  { text: "Tag a friend and see if their type matches",    startFrame: 47, endFrame: 105 },
  { text: "how they actually move.",                       startFrame: 106, endFrame: 143 },
];

function getMusicVolume(frame: number): number {
  const S = MOV_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const s7start  = S.scene7.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < s7start) return 0.08;
  if (frame < s7start + fade) return interpolate(frame, [s7start, s7start + fade], [0.08, 0.5]);
  return 0.5;
}

export const MovementTypeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = MOV_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#080e02' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('movement.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1MOVHook           frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2MOVHowItWorks     frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3MOVWalker         frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4MOVLifter         frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5MOVRunner         frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6MOVYoga           frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7MOVCommentTrigger frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8MOVCTA            frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
