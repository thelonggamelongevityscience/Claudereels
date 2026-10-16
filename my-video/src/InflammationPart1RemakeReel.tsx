import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { IP1_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1IP1Hook }     from './scenes/Scene1IP1Hook';
import { Scene2IP1Marker }   from './scenes/Scene2IP1Marker';
import { Scene3IP1Quiet }    from './scenes/Scene3IP1Quiet';
import { Scene4IP1Pattern }  from './scenes/Scene4IP1Pattern';
import { Scene5IP1Question } from './scenes/Scene5IP1Question';
import { Scene6IP1CTA }      from './scenes/Scene6IP1CTA';

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

// S1: Hook — 178f
const S1_CAPS: CaptionChunk[] = [
  { text: "Almost every disease that will kill you has one thing in common.", startFrame:  0, endFrame: 90 },
  { text: "Chronic inflammation.",                                           startFrame: 91, endFrame: 177 },
];

// S2: The Marker — 373f
const S2_CAPS: CaptionChunk[] = [
  { text: "You can measure it.",                                                                                      startFrame:   0, endFrame:  24 },
  { text: "It is called hs-CRP, a blood marker most people never see.",                                              startFrame:  25, endFrame: 171 },
  { text: "In about one hundred sixty thousand people, higher levels went with more heart attacks and strokes.",      startFrame: 172, endFrame: 372 },
];

// S3: It Is Quiet — 220f
const S3_CAPS: CaptionChunk[] = [
  { text: "The problem is that it is quiet.",                                                        startFrame:   0, endFrame:  44 },
  { text: "Chronic, low-grade inflammation can run for years without a single symptom.",             startFrame:  45, endFrame: 219 },
];

// S4: The Pattern — 347f
const S4_CAPS: CaptionChunk[] = [
  { text: "It is linked to heart disease, type 2 diabetes, Alzheimer's and some cancers.",          startFrame:   0, endFrame: 161 },
  { text: "Linked, not the single cause.",                                                           startFrame: 162, endFrame: 253 },
  { text: "One factor among many.",                                                                  startFrame: 254, endFrame: 346 },
];

// S5: The Question — 307f
const S5_CAPS: CaptionChunk[] = [
  { text: "Have you ever tested your hs-CRP?",                          startFrame:   0, endFrame:  53 },
  { text: "Under one is generally lower risk.",                          startFrame:  54, endFrame: 136 },
  { text: "Over three is higher.",                                       startFrame: 137, endFrame: 202 },
  { text: "Ask your doctor if it makes sense for you.",                  startFrame: 203, endFrame: 306 },
];

// S6: CTA — 234f
const S6_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for part two: what actually lowers it.", startFrame:   0, endFrame: 114 },
  { text: "And comment AGING for the free biological age quiz.",         startFrame: 115, endFrame: 233 },
];

function getMusicVolume(frame: number): number {
  const S = IP1_SCENES;
  const hookEnd = S.scene1.start + S.scene1.duration;  // 178
  const s5start = S.scene5.start;                       // 1118
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < s5start) return 0.08;
  if (frame < s5start + fade) return interpolate(frame, [s5start, s5start + fade], [0.08, 0.5]);
  return 0.5;
}

export const InflammationPart1RemakeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = IP1_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0D0D' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('inflammation_p1_remake.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1IP1Hook     frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2IP1Marker   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3IP1Quiet    frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4IP1Pattern  frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5IP1Question frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6IP1CTA      frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
