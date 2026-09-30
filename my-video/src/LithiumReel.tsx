import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { LIT_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1LITHook }         from './scenes/Scene1LITHook';
import { Scene2LITDiscovery }    from './scenes/Scene2LITDiscovery';
import { Scene3LITResult }       from './scenes/Scene3LITResult';
import { Scene4LITWhyItMatters } from './scenes/Scene4LITWhyItMatters';
import { Scene5LITWorthKnowing } from './scenes/Scene5LITWorthKnowing';
import { Scene6LITQuestion }     from './scenes/Scene6LITQuestion';
import { Scene7LITCTA }          from './scenes/Scene7LITCTA';

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

// S1: Hook — 182f
const S1_CAPS: CaptionChunk[] = [
  { text: "Your tap water may be protecting your brain.", startFrame:   0, endFrame:  60 },
  { text: "Nobody designed a trial for this.",            startFrame:  61, endFrame: 121 },
  { text: "They found it in the data.",                   startFrame: 122, endFrame: 181 },
];

// S2: The Discovery — 570f
const S2_CAPS: CaptionChunk[] = [
  { text: "Researchers comparing suicide rates across 1,286 cities",  startFrame:   0, endFrame: 148 },
  { text: "kept seeing a pattern with no obvious cause,",             startFrame: 149, endFrame: 234 },
  { text: "until they cross-referenced local water supplies.",        startFrame: 235, endFrame: 321 },
  { text: "A review of 415 studies from 1946 to 2018",               startFrame: 322, endFrame: 465 },
  { text: "across seven countries kept showing the same thing.",      startFrame: 466, endFrame: 569 },
];

// S3: The Result — 302f
const S3_CAPS: CaptionChunk[] = [
  { text: "Areas with higher trace lithium in their water",                   startFrame:   0, endFrame:  80 },
  { text: "consistently had lower suicide rates.",                            startFrame:  81, endFrame: 131 },
  { text: "A separate study out of Japan linked",                             startFrame: 132, endFrame: 209 },
  { text: "the same trace levels to lower dementia rates too.",               startFrame: 210, endFrame: 301 },
];

// S4: Why It Matters — 401f
const S4_CAPS: CaptionChunk[] = [
  { text: "These are naturally occurring trace amounts,",                startFrame:   0, endFrame:  77 },
  { text: "far below any prescription dose, showing up in public health data across seven countries.", startFrame:  78, endFrame: 229 },
  { text: "It's pushing researchers toward actual randomized trials,",   startFrame: 230, endFrame: 387 },
  { text: "not just population data.",                                    startFrame: 388, endFrame: 400 },
];

// S5: Worth Knowing — 348f
const S5_CAPS: CaptionChunk[] = [
  { text: "This is correlation from population data, not a controlled trial.", startFrame:   0, endFrame: 116 },
  { text: "Local water levels vary hugely",                                    startFrame: 117, endFrame: 207 },
  { text: "and aren't something to replicate on your own.",                    startFrame: 208, endFrame: 265 },
  { text: "The free levers still matter most.",                                startFrame: 266, endFrame: 347 },
];

// S6: The Question — 228f
const S6_CAPS: CaptionChunk[] = [
  { text: "Ever checked what's actually in your water?",        startFrame:   0, endFrame:  59 },
  { text: "Most people have no idea.",                          startFrame:  60, endFrame: 120 },
  { text: "Comment AGING and find out where you stand.",        startFrame: 121, endFrame: 227 },
];

// S7: CTA — 111f
const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game.",              startFrame:  0, endFrame:  34 },
  { text: "Comment AGING for the free quiz.",   startFrame: 35, endFrame: 110 },
];

function getMusicVolume(frame: number): number {
  const S = LIT_SCENES;
  const hookEnd = S.scene1.start + S.scene1.duration;  // 182
  const s6start = S.scene6.start;                       // 1803
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < s6start) return 0.08;
  if (frame < s6start + fade) return interpolate(frame, [s6start, s6start + fade], [0.08, 0.5]);
  return 0.5;
}

export const LithiumReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = LIT_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#12040c' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('lithium.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1LITHook           frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2LITDiscovery      frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3LITResult         frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4LITWhyItMatters   frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5LITWorthKnowing   frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6LITQuestion       frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7LITCTA            frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
