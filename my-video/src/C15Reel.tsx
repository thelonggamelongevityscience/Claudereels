import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C15_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1C15Hook }        from './scenes/Scene1C15Hook';
import { Scene2C15BuildUp }     from './scenes/Scene2C15BuildUp';
import { Scene3C15Reveal }      from './scenes/Scene3C15Reveal';
import { Scene4C15WhyItMatters } from './scenes/Scene4C15WhyItMatters';
import { Scene5C15WhereToFind } from './scenes/Scene5C15WhereToFind';
import { Scene6C15TheCatch }    from './scenes/Scene6C15TheCatch';
import { Scene7C15SendTrigger } from './scenes/Scene7C15SendTrigger';
import { Scene8C15CTA }         from './scenes/Scene8C15CTA';

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
  { text: "Scientists just found a new essential nutrient.", startFrame:   0, endFrame:  62 },
  { text: "The first one in over 90 years.",                startFrame:  72, endFrame: 118 },
  { text: "Almost nobody's heard of it yet.",               startFrame: 119, endFrame: 167 },
];

// S2: Build-Up — 371f  (5.573–17.926s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Only a small number of nutrients qualify",    startFrame:   0, endFrame:  60 },
  { text: "as truly essential. That list has barely",    startFrame:  61, endFrame: 132 },
  { text: "changed in nearly a century. Until now",      startFrame: 133, endFrame: 205 },
  { text: "— a new candidate was hiding in",             startFrame: 207, endFrame: 254 },
  { text: "plain sight, dismissed for decades as just",  startFrame: 256, endFrame: 332 },
  { text: "saturated fat.",                              startFrame: 334, endFrame: 371 },
];

// S3: The Reveal — 228f  (17.926–25.542s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Meet C15:0. Pentadecanoic acid. A saturated fatty", startFrame:   0, endFrame: 138 },
  { text: "acid found naturally in whole-fat dairy and",       startFrame: 140, endFrame: 203 },
  { text: "some fish.",                                        startFrame: 204, endFrame: 228 },
];

// S4: Why It Matters — 372f  (25.542–37.941s)
const S4_CAPS: CaptionChunk[] = [
  { text: "Early research links it to cell membrane",        startFrame:   0, endFrame:  65 },
  { text: "integrity and mitochondrial function. Lower levels are", startFrame:  70, endFrame: 167 },
  { text: "associated with markers of metabolic dysfunction and", startFrame: 168, endFrame: 245 },
  { text: "inflammation. It was dismissed simply for being",  startFrame: 247, endFrame: 328 },
  { text: "a saturated fat.",                                 startFrame: 330, endFrame: 372 },
];

// S5: Where To Find It — 223f  (37.941–45.371s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Whole-fat dairy naturally contains it — skim", startFrame:   0, endFrame:  84 },
  { text: "versions largely strip it out. Trace amounts",  startFrame:  87, endFrame: 169 },
  { text: "show up in some fatty fish too.",               startFrame: 170, endFrame: 223 },
];

// S6: The Catch — 318f  (45.371–55.959s)
const S6_CAPS: CaptionChunk[] = [
  { text: "A supplement industry is already forming around", startFrame:   0, endFrame:  81 },
  { text: "this. The research is genuinely early. Whole-fat", startFrame:  82, endFrame: 191 },
  { text: "dairy has existed the whole time —",              startFrame: 193, endFrame: 249 },
  { text: "you don't need a bottle to try",                  startFrame: 260, endFrame: 302 },
  { text: "it.",                                             startFrame: 304, endFrame: 318 },
];

// S7: Send Trigger — 106f  (55.959–59.488s)
const S7_CAPS: CaptionChunk[] = [
  { text: "Send this to someone who thinks they", startFrame:  0, endFrame: 46 },
  { text: "know every nutrient there is.",        startFrame: 47, endFrame: 106 },
];

// S8: CTA — 99f  (59.488–62.785s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Save this before", startFrame:  0, endFrame: 67 },
  { text: "it's mainstream.",                       startFrame: 68, endFrame: 99 },
];

function getMusicVolume(frame: number): number {
  const S = C15_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start + S.scene6.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const C15Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = C15_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050a09' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('c15.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1C15Hook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2C15BuildUp     frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3C15Reveal      frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4C15WhyItMatters frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5C15WhereToFind frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6C15TheCatch    frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7C15SendTrigger frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8C15CTA         frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
