import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, HSCRP_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1CRPHook }           from './scenes/Scene1CRPHook';
import { Scene2CRPWhatsHappening } from './scenes/Scene2CRPWhatsHappening';
import { Scene3CRPWhyItMatters }   from './scenes/Scene3CRPWhyItMatters';
import { Scene4CRPWhatRaisesIt }   from './scenes/Scene4CRPWhatRaisesIt';
import { Scene5CRPHowToLowerIt }   from './scenes/Scene5CRPHowToLowerIt';
import { Scene6CRPWhereYouStand }  from './scenes/Scene6CRPWhereYouStand';
import { Scene7CRPLoopHook }       from './scenes/Scene7CRPLoopHook';
import { Scene8CRPCTA }            from './scenes/Scene8CRPCTA';

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

// S1: Hook — 203f  (0.000–6.780s)
const S1_CAPS: CaptionChunk[] = [
  { text: "The blood marker that predicts heart attacks better.", startFrame:  0, endFrame:  76 },
  { text: "It's not cholesterol. It's a number almost nobody's",  startFrame: 87, endFrame: 173 },
  { text: "been told about.",                                      startFrame: 174, endFrame: 203 },
];

// S2: What's Happening — 344f  (6.780–18.251s)
const S2_CAPS: CaptionChunk[] = [
  { text: "hs-CRP measures systemic inflammation circulating in your blood", startFrame:   0, endFrame: 111 },
  { text: "right now. Multiple large studies found it predicts",             startFrame: 112, endFrame: 199 },
  { text: "future heart attacks and strokes as well as,",                   startFrame: 200, endFrame: 264 },
  { text: "or better than, LDL cholesterol.",                               startFrame: 271, endFrame: 344 },
];

// S3: Why It Matters — 373f  (18.251–30.697s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Half of heart attacks occur in people with",             startFrame:   0, endFrame:  62 },
  { text: "normal cholesterol. Chronic inflammation damages blood vessels for", startFrame:  63, endFrame: 179 },
  { text: "years before any symptom appears. And it's not",         startFrame: 182, endFrame: 270 },
  { text: "on a standard panel — you have to",                     startFrame: 272, endFrame: 332 },
  { text: "ask for it by name.",                                    startFrame: 334, endFrame: 373 },
];

// S4: What Raises It — 323f  (30.697–41.471s)
const S4_CAPS: CaptionChunk[] = [
  { text: "Ultra-processed food and seed oils. Visceral fat. Chronic", startFrame:   0, endFrame: 116 },
  { text: "stress. And poor sleep — inflammatory markers rise",        startFrame: 118, endFrame: 244 },
  { text: "measurably after even one bad night.",                      startFrame: 248, endFrame: 323 },
];

// S5: How To Lower It — 355f  (41.471–53.313s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Anti-inflammatory whole foods lower it within weeks. Zone", startFrame:   0, endFrame:  97 },
  { text: "2 cardio is one of the most reliable",                      startFrame:  98, endFrame: 152 },
  { text: "reducers. Sleep quality matters directly. And losing visceral", startFrame: 153, endFrame: 276 },
  { text: "fat specifically drives the biggest improvements.",           startFrame: 278, endFrame: 355 },
];

// S6: Where You Stand — 332f  (53.313–64.366s)
const S6_CAPS: CaptionChunk[] = [
  { text: "Under 1.0 is low risk. Above 3.0 is",              startFrame:   0, endFrame: 100 },
  { text: "high risk, independent of your cholesterol numbers. This", startFrame: 102, endFrame: 196 },
  { text: "is the same marker behind almost everything covered", startFrame: 197, endFrame: 267 },
  { text: "this week. Ask for it by name.",                    startFrame: 268, endFrame: 332 },
];

// S7: Loop Hook — 166f  (64.366–69.892s)
const S7_CAPS: CaptionChunk[] = [
  { text: "Have you ever had your hs-CRP tested? Most", startFrame:  0, endFrame:  83 },
  { text: "people have not. Drop a yes or no",          startFrame: 84, endFrame: 144 },
  { text: "below.",                                      startFrame: 146, endFrame: 166 },
];

// S8: CTA — 155f  (69.892–75.047s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame:  0, endFrame:  79 },
  { text: "Save this before your next blood draw.",            startFrame: 92, endFrame: 155 },
];

function getMusicVolume(frame: number): number {
  const S = HSCRP_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const HsCRPReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = HSCRP_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('hsCRP.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1CRPHook           frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2CRPWhatsHappening frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3CRPWhyItMatters   frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4CRPWhatRaisesIt   frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5CRPHowToLowerIt   frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6CRPWhereYouStand  frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7CRPLoopHook       frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8CRPCTA            frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
