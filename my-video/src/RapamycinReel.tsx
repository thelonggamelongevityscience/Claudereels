import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { RAP_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1RAPHook }         from './scenes/Scene1RAPHook';
import { Scene2RAPBasics }       from './scenes/Scene2RAPBasics';
import { Scene3RAPClaims }       from './scenes/Scene3RAPClaims';
import { Scene4RAPFinePrint }    from './scenes/Scene4RAPFinePrint';
import { Scene5RAPWorthKnowing } from './scenes/Scene5RAPWorthKnowing';
import { Scene6RAPQuestion }     from './scenes/Scene6RAPQuestion';
import { Scene7RAPCTA }          from './scenes/Scene7RAPCTA';

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

// S1: Hook — 148f
const S1_CAPS: CaptionChunk[] = [
  { text: "Rapamycin adds 25 percent to a mouse's lifespan.", startFrame:  0, endFrame:  90 },
  { text: "What about a human's?",                           startFrame: 97, endFrame: 147 },
];

// S2: The Basics — 534f
const S2_CAPS: CaptionChunk[] = [
  { text: "Rapamycin inhibits mTOR, a pathway controlling cell growth, autophagy, immunity, and exercise response.", startFrame:   0, endFrame: 230 },
  { text: "It's already FDA-approved at high doses to suppress immunity after organ transplants.",                   startFrame: 236, endFrame: 385 },
  { text: "Longevity use means much lower, intermittent doses instead.",                                            startFrame: 395, endFrame: 533 },
];

// S3: Claims Rated — 608f
const S3_CAPS: CaptionChunk[] = [
  { text: "Extends lifespan in mice — proven. Extends human lifespan — not proven.",  startFrame:   0, endFrame: 185 },
  { text: "Reduces visceral fat — missed, that was its own trial's goal.",            startFrame: 199, endFrame: 330 },
  { text: "Improves immune aging markers at low dose — promising signal.",            startFrame: 340, endFrame: 485 },
  { text: "Safe with no real downsides — overstated.",                               startFrame: 502, endFrame: 607 },
];

// S4: The Fine Print — 556f
const S4_CAPS: CaptionChunk[] = [
  { text: "The PEARL trial, 48 weeks, missed its primary goal of reducing visceral fat,", startFrame:   0, endFrame: 150 },
  { text: "though women on the higher dose saw improved muscle mass and less pain.",       startFrame: 160, endFrame: 270 },
  { text: "A newer 2026 trial found weekly rapamycin blunted exercise gains in older adults,", startFrame: 285, endFrame: 465 },
  { text: "with more adverse events than placebo.",                                        startFrame: 471, endFrame: 555 },
];

// S5: Worth Knowing — 309f
const S5_CAPS: CaptionChunk[] = [
  { text: "This isn't an over-the-counter supplement.",                              startFrame:   0, endFrame:  65 },
  { text: "It requires a prescription used off-label, real monitoring,",            startFrame:  71, endFrame: 195 },
  { text: "and a conversation with a doctor who knows the research.",               startFrame: 198, endFrame: 308 },
];

// S6: The Question — 235f
const S6_CAPS: CaptionChunk[] = [
  { text: "Chasing a mouse result?",                                      startFrame:   0, endFrame:  55 },
  { text: "Or do you know your own biological age first?",               startFrame:  58, endFrame: 150 },
  { text: "Comment AGING and find out.",                                  startFrame: 165, endFrame: 234 },
];

// S7: CTA — 172f
const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game.",                       startFrame:   0, endFrame:  45 },
  { text: "Comment AGING for the free quiz,",           startFrame:  48, endFrame: 110 },
  { text: "and follow for episode 3 next week.",        startFrame: 114, endFrame: 171 },
];

function getMusicVolume(frame: number): number {
  const S = RAP_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const RapamycinReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = RAP_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050414' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('rapamycin.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1RAPHook         frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2RAPBasics       frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3RAPClaims       frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4RAPFinePrint    frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5RAPWorthKnowing frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6RAPQuestion     frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7RAPCTA          frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
