import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { VD_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1VDHook }       from './scenes/Scene1VDHook';
import { SceneVDMythReality } from './scenes/SceneVDMythReality';
import { Scene7VDSendThis }   from './scenes/Scene7VDSendThis';
import { Scene8VDCTA }        from './scenes/Scene8VDCTA';

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

// S1: Hook — 212f
const S1_CAPS: CaptionChunk[] = [
  { text: "Vitamin D. Myth versus reality.",          startFrame:   0, endFrame:  77 },
  { text: "The most common deficiency in the world.", startFrame:  78, endFrame: 169 },
  { text: "Also the most misunderstood.",             startFrame: 170, endFrame: 211 },
];

// S2: Myth 1 — 453f
const S2_CAPS: CaptionChunk[] = [
  { text: "Myth: I get sun, so I don't need to test it.",      startFrame:   0, endFrame: 122 },
  { text: "Reality: sunscreen, darker skin, northern latitudes,", startFrame: 124, endFrame: 256 },
  { text: "and time indoors all blunt production dramatically.", startFrame: 259, endFrame: 365 },
  { text: "Testing is the only way to actually know.",         startFrame: 368, endFrame: 452 },
];

// S3: Myth 2 — 330f
const S3_CAPS: CaptionChunk[] = [
  { text: "Myth: more sun always means more vitamin D.", startFrame:   0, endFrame: 131 },
  { text: "Reality: production plateaus.",              startFrame: 134, endFrame: 210 },
  { text: "Extra time past that point just adds skin damage risk.", startFrame: 214, endFrame: 329 },
];

// S4: Myth 3 — 270f
const S4_CAPS: CaptionChunk[] = [
  { text: "Myth: it's just for bone health.",                   startFrame:   0, endFrame:  92 },
  { text: "Reality: it also plays a significant role in",       startFrame:  94, endFrame: 181 },
  { text: "immune function and mood regulation.",               startFrame: 182, endFrame: 269 },
];

// S5: Myth 4 — 384f
const S5_CAPS: CaptionChunk[] = [
  { text: "Myth: any supplement dose is fine.",               startFrame:   0, endFrame: 111 },
  { text: "Reality: dosing matters.",                         startFrame: 113, endFrame: 191 },
  { text: "Excessive supplementation without monitoring",     startFrame: 194, endFrame: 261 },
  { text: "can lead to toxicity. Testing helps guide the right dose.", startFrame: 262, endFrame: 383 },
];

// S6: Myth 5 — 309f
const S6_CAPS: CaptionChunk[] = [
  { text: "Myth: if I feel fine, my levels are probably fine.", startFrame:   0, endFrame: 129 },
  { text: "Reality: deficiency is frequently",                 startFrame: 131, endFrame: 197 },
  { text: "completely asymptomatic until levels are quite low.", startFrame: 199, endFrame: 308 },
];

// S7: Send Trigger — 92f
const S7_CAPS: CaptionChunk[] = [
  { text: "Send this to someone who skips their", startFrame:  0, endFrame: 48 },
  { text: "vitamin D test.",                      startFrame: 50, endFrame: 91 },
];

// S8: CTA — 114f
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game.",            startFrame:  0, endFrame:  48 },
  { text: "Comment LABS for the full guide.", startFrame: 50, endFrame: 113 },
];

function getMusicVolume(frame: number): number {
  const S = VD_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene7.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const VitaminDReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = VD_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0e0a02' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('vitamind.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1VDHook frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>

      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <SceneVDMythReality
          frame={frame - S.scene2.start}
          counter="1 of 5"
          mythText="I get sun, so I don't need to test it."
          realityContent={<>Sunscreen, darker skin, northern latitudes, and time indoors all <strong style={{ color: '#FFC53D' }}>blunt production dramatically</strong>. Testing is the only way to actually know.</>}
          captionChunks={S2_CAPS}
        />
      </Sequence>

      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <SceneVDMythReality
          frame={frame - S.scene3.start}
          counter="2 of 5"
          mythText="More sun always means more vitamin D."
          realityContent={<>Production <strong style={{ color: '#FFC53D' }}>plateaus</strong> after a point. Extra time past that just adds skin damage risk.</>}
          captionChunks={S3_CAPS}
        />
      </Sequence>

      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <SceneVDMythReality
          frame={frame - S.scene4.start}
          counter="3 of 5"
          mythText="It's just for bone health."
          realityContent={<>Vitamin D also plays a significant role in <strong style={{ color: '#FFC53D' }}>immune function and mood regulation</strong>.</>}
          captionChunks={S4_CAPS}
        />
      </Sequence>

      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <SceneVDMythReality
          frame={frame - S.scene5.start}
          counter="4 of 5"
          mythText="Any supplement dose is fine."
          realityContent={<>Dosing actually matters. <strong style={{ color: '#FFC53D' }}>Excessive supplementation without monitoring</strong> can lead to toxicity. Testing helps guide the right dose.</>}
          captionChunks={S5_CAPS}
        />
      </Sequence>

      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <SceneVDMythReality
          frame={frame - S.scene6.start}
          counter="5 of 5"
          mythText="If I feel fine, my levels are probably fine."
          realityContent={<>Deficiency is frequently <strong style={{ color: '#FFC53D' }}>completely asymptomatic</strong> until levels are quite low. Feeling fine tells you nothing.</>}
          captionChunks={S6_CAPS}
        />
      </Sequence>

      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7VDSendThis frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>

      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8VDCTA frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
