import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, LA_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1LAHook }           from './scenes/Scene1LAHook';
import { Scene2LAHowItWorks }     from './scenes/Scene2LAHowItWorks';
import { Scene3LAJanJun }         from './scenes/Scene3LAJanJun';
import { Scene4LAJulDec }         from './scenes/Scene4LAJulDec';
import { Scene5LAExampleSept }    from './scenes/Scene5LAExampleSept';
import { Scene6LAExampleJan }     from './scenes/Scene6LAExampleJan';
import { Scene7LACommentTrigger } from './scenes/Scene7LACommentTrigger';
import { Scene8LACTA }            from './scenes/Scene8LACTA';

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

// S1: Hook — 167f  (0.000–5.573s)
const S1_CAPS: CaptionChunk[] = [
  { text: "Find your longevity archetype, based on the", startFrame:   0, endFrame:  69 },
  { text: "month you were born. Comment it below",       startFrame:  70, endFrame: 135 },
  { text: "to find out.",                                startFrame: 138, endFrame: 167 },
];

// S2: How It Works — 244f  (5.573–13.700s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Every birth month has an archetype. Find", startFrame:   0, endFrame:  74 },
  { text: "yours below. Then comment your month —",   startFrame:  75, endFrame: 152 },
  { text: "I'll reply with your longevity trait to",  startFrame: 159, endFrame: 219 },
  { text: "work on.",                                  startFrame: 220, endFrame: 244 },
];

// S3: Jan–Jun Chart — 270f  (13.700–22.709s)
const S3_CAPS: CaptionChunk[] = [
  { text: "January through June — the Optimizer, the",          startFrame:   0, endFrame:  91 },
  { text: "Steady One, the Night Owl, the Protocol",            startFrame:  93, endFrame: 159 },
  { text: "Follower, the Hydrated One, the Perpetual Snoozer.", startFrame: 161, endFrame: 270 },
];

// S4: Jul–Dec Chart — 327f  (22.709–33.622s)
const S4_CAPS: CaptionChunk[] = [
  { text: "July through December — the Relentless One,",   startFrame:   0, endFrame:  94 },
  { text: "the Immortal Mindset, Chaotic Good, the Ancestral", startFrame: 102, endFrame: 218 },
  { text: "Type, the Structured Mind, the Locked-In One.", startFrame: 220, endFrame: 327 },
];

// S5: Example Sept — 301f  (33.622–43.653s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Born in September? You're Chaotic Good —",        startFrame:   0, endFrame:  93 },
  { text: "high potential, inconsistent execution. Your biggest lever", startFrame: 111, endFrame: 228 },
  { text: "is consistency, not intensity.",                   startFrame: 230, endFrame: 301 },
];

// S6: Example Jan — 227f  (43.653–51.223s)
const S6_CAPS: CaptionChunk[] = [
  { text: "Born in January? You're the Optimizer —",    startFrame:   0, endFrame:  81 },
  { text: "you already track everything. Your biggest lever", startFrame:  91, endFrame: 171 },
  { text: "is doing less, better.",                      startFrame: 172, endFrame: 227 },
];

// S7: Comment Trigger — 199f  (51.223–57.864s)
const S7_CAPS: CaptionChunk[] = [
  { text: "What month were you born? Comment it", startFrame:   0, endFrame:  75 },
  { text: "below — I'll reply with your archetype", startFrame:  76, endFrame: 150 },
  { text: "and one thing to work on.",              startFrame: 152, endFrame: 199 },
];

// S8: CTA — 146f  (57.864–62.740s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Tag a friend",       startFrame:   0, endFrame:  65 },
  { text: "and see if their archetype matches their", startFrame:  67, endFrame: 113 },
  { text: "personality.",                              startFrame: 114, endFrame: 146 },
];

function getMusicVolume(frame: number): number {
  const S = LA_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start + S.scene6.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const LongevityArchetypeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = LA_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('longevityArchetype.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1LAHook           frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2LAHowItWorks     frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3LAJanJun         frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4LAJulDec         frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5LAExampleSept    frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6LAExampleJan     frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7LACommentTrigger frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8LACTA            frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
