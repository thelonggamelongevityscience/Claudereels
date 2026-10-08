import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { INFL_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1INFLHook }         from './scenes/Scene1INFLHook';
import { Scene2INFLMove }         from './scenes/Scene2INFLMove';
import { Scene3INFLEat }          from './scenes/Scene3INFLEat';
import { Scene4INFLBodyFat }      from './scenes/Scene4INFLBodyFat';
import { Scene5INFLSleep }        from './scenes/Scene5INFLSleep';
import { Scene6INFLWorthKnowing } from './scenes/Scene6INFLWorthKnowing';
import { Scene7INFLCTA }          from './scenes/Scene7INFLCTA';

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

// S1: Hook — 92f
const S1_CAPS: CaptionChunk[] = [
  { text: "Part two.",                                     startFrame:  0, endFrame: 19 },
  { text: "What actually lowers chronic inflammation?",    startFrame: 20, endFrame: 91 },
];

// S2: Move — 229f
const S2_CAPS: CaptionChunk[] = [
  { text: "One, move.",                                                    startFrame:   0, endFrame:  25 },
  { text: "Eighty-three trials found exercise lowers CRP,",               startFrame:  26, endFrame: 118 },
  { text: "a key inflammation marker, even without weight loss.",          startFrame: 119, endFrame: 228 },
];

// S3: Eat — 240f
const S3_CAPS: CaptionChunk[] = [
  { text: "Two, eat Mediterranean.",                                       startFrame:   0, endFrame:  52 },
  { text: "Seventeen trials found lower CRP versus other diets,",         startFrame:  53, endFrame: 167 },
  { text: "though results varied a lot.",                                  startFrame: 168, endFrame: 239 },
];

// S4: Body Fat — 232f
const S4_CAPS: CaptionChunk[] = [
  { text: "Three, lose excess body fat.",                                  startFrame:   0, endFrame:  61 },
  { text: "Across thirty-three studies,",                                  startFrame:  62, endFrame: 128 },
  { text: "every kilogram lost meant lower CRP.",                          startFrame: 129, endFrame: 231 },
];

// S5: Sleep — 215f
const S5_CAPS: CaptionChunk[] = [
  { text: "Sleep?",                                                        startFrame:   0, endFrame:  11 },
  { text: "It is linked to inflammation, but the effect is small,",       startFrame:  12, endFrame: 130 },
  { text: "and experiments have not proven it.",                           startFrame: 131, endFrame: 214 },
];

// S6: Worth Knowing — 217f
const S6_CAPS: CaptionChunk[] = [
  { text: "These studies track a blood marker, not disease.",              startFrame:   0, endFrame:  87 },
  { text: "Ask your doctor about an hs-CRP test.",                        startFrame:  88, endFrame: 216 },
];

// S7: CTA — 176f
const S7_CAPS: CaptionChunk[] = [
  { text: "Comment AGING for the free biological age quiz,",              startFrame:   0, endFrame:  83 },
  { text: "and send this to someone who watched part one.",               startFrame:  84, endFrame: 175 },
];

function getMusicVolume(frame: number): number {
  const S = INFL_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;  // 92
  const s6start  = S.scene6.start;                       // 1008
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < s6start) return 0.08;
  if (frame < s6start + fade) return interpolate(frame, [s6start, s6start + fade], [0.08, 0.5]);
  return 0.5;
}

export const InflammationPart2Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = INFL_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0e0805' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('inflammation_p2.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1INFLHook           frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2INFLMove           frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3INFLEat            frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4INFLBodyFat        frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5INFLSleep          frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6INFLWorthKnowing   frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7INFLCTA            frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
