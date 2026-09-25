import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { NAD_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1NADHook }        from './scenes/Scene1NADHook';
import { Scene2NADBasics }      from './scenes/Scene2NADBasics';
import { Scene3NADClaims }      from './scenes/Scene3NADClaims';
import { Scene4NADFinePrint }   from './scenes/Scene4NADFinePrint';
import { Scene5NADWorthKnowing }from './scenes/Scene5NADWorthKnowing';
import { Scene6NADQuestion }    from './scenes/Scene6NADQuestion';
import { Scene7NADCTA }         from './scenes/Scene7NADCTA';

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

// S1: Hook — 145f
const S1_CAPS: CaptionChunk[] = [
  { text: "NAD+ is a multi-billion dollar supplement.",  startFrame:  0, endFrame:  88 },
  { text: "Here's what's actually proven.",             startFrame: 91, endFrame: 144 },
];

// S2: The Basics — 417f
const S2_CAPS: CaptionChunk[] = [
  { text: "NAD+ is essential for cellular energy production and DNA repair.", startFrame:   0, endFrame: 120 },
  { text: "Levels decline significantly with age.",                           startFrame: 129, endFrame: 200 },
  { text: "NMN and NR are the two most popular NAD+ boosting supplements,",  startFrame: 204, endFrame: 340 },
  { text: "marketed to reverse that decline.",                                startFrame: 350, endFrame: 416 },
];

// S3: Claims Rated — 438f
const S3_CAPS: CaptionChunk[] = [
  { text: "Raises blood NAD+ — proven. Makes you live longer — not proven.", startFrame:   0, endFrame: 140 },
  { text: "Reverses cellular aging — overhyped.",                            startFrame: 148, endFrame: 230 },
  { text: "Improves muscle strength and function — mostly null.",            startFrame: 233, endFrame: 330 },
  { text: "Every brand is the same quality — false.",                        startFrame: 341, endFrame: 437 },
];

// S4: The Fine Print — 606f
const S4_CAPS: CaptionChunk[] = [
  { text: "A 2025 meta-analysis of 10 randomized trials",                                       startFrame:   0, endFrame: 120 },
  { text: "found no benefit for muscle mass, strength, or function in older adults,",           startFrame: 117, endFrame: 250 },
  { text: "despite NAD+ levels reliably going up.",                                             startFrame: 251, endFrame: 345 },
  { text: "A January 2026 trial: NMN and NR double blood NAD+ in 14 days, while nicotinamide barely moves it.", startFrame: 347, endFrame: 605 },
];

// S5: Worth Knowing — 324f
const S5_CAPS: CaptionChunk[] = [
  { text: "NMN's regulatory status was contested for years",               startFrame:   0, endFrame:  88 },
  { text: "and only became clearly lawful to sell as a supplement in 2025.", startFrame:  90, endFrame: 220 },
  { text: "Quality and purity still vary widely by brand.",                startFrame: 226, endFrame: 323 },
];

// S6: The Question — 204f
const S6_CAPS: CaptionChunk[] = [
  { text: "Supplementing blind?",                                     startFrame:   0, endFrame:  48 },
  { text: "Or do you actually know your biological age first?",       startFrame:  50, endFrame: 145 },
  { text: "Comment AGING and find out.",                              startFrame: 148, endFrame: 203 },
];

// S7: CTA — 150f
const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game.",                      startFrame:  0, endFrame:  43 },
  { text: "Comment AGING for the free quiz,",          startFrame: 45, endFrame: 100 },
  { text: "and follow for episode 2 next week.",       startFrame: 99, endFrame: 149 },
];

function getMusicVolume(frame: number): number {
  const S = NAD_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const NADReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = NAD_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050414' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('nad.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1NADHook          frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2NADBasics        frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3NADClaims        frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4NADFinePrint     frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5NADWorthKnowing  frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6NADQuestion      frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7NADCTA           frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
