import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, GLP_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1GLPHook }        from './scenes/Scene1GLPHook';
import { SceneGLPMythReality }  from './scenes/SceneGLPMythReality';
import { Scene7GLPSendTrigger } from './scenes/Scene7GLPSendTrigger';
import { Scene8GLPCTA }         from './scenes/Scene8GLPCTA';

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

// S1: Hook — 201f  (0.000–6.687s)
const S1_CAPS: CaptionChunk[] = [
  { text: "GLP-1s. Myth versus reality. The most talked-about", startFrame:   0, endFrame: 108 },
  { text: "drugs in health right now. Let's separate",          startFrame: 110, endFrame: 179 },
  { text: "the two.",                                            startFrame: 180, endFrame: 201 },
];

// S2: Myth 1 — 337f  (6.687–17.925s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Myth: they're just for weight loss. Reality:",         startFrame:   0, endFrame:  94 },
  { text: "they also improve insulin sensitivity, reduce inflammation,", startFrame:  95, endFrame: 201 },
  { text: "and lower cardiovascular risk, independent of how",    startFrame: 208, endFrame: 289 },
  { text: "much weight is actually lost.",                        startFrame: 290, endFrame: 337 },
];

// S3: Myth 2 — 333f  (17.925–29.024s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Myth: they're a shortcut, not real medicine.",  startFrame:   0, endFrame:  83 },
  { text: "Reality: these are FDA-approved drugs with some", startFrame:  98, endFrame: 175 },
  { text: "of the strongest cardiovascular outcome data of", startFrame: 176, endFrame: 258 },
  { text: "any weight-management intervention ever studied.", startFrame: 260, endFrame: 333 },
];

// S4: Myth 3 — 368f  (29.024–41.284s)
const S4_CAPS: CaptionChunk[] = [
  { text: "Myth: once you're on them you can",               startFrame:   0, endFrame:  75 },
  { text: "eat however you want. Reality: muscle loss",      startFrame:  76, endFrame: 175 },
  { text: "is a real risk without adequate protein",         startFrame: 176, endFrame: 242 },
  { text: "and resistance training. The drug doesn't protect", startFrame: 247, endFrame: 329 },
  { text: "your muscle for you.",                            startFrame: 331, endFrame: 368 },
];

// S5: Myth 4 — 365f  (41.284–53.451s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Myth: they're only relevant for weight loss.",     startFrame:   0, endFrame:  81 },
  { text: "Reality: research is expanding into their effects", startFrame:  99, endFrame: 180 },
  { text: "on inflammation, addiction pathways, and neurodegeneration risk,", startFrame: 181, endFrame: 312 },
  { text: "independent of weight.",                           startFrame: 322, endFrame: 365 },
];

// S6: Myth 5 — 326f  (53.451–64.318s)
const S6_CAPS: CaptionChunk[] = [
  { text: "Myth: they're an automatic longevity boost. Reality:", startFrame:   0, endFrame: 107 },
  { text: "the cardiovascular benefits are real. But long-term",  startFrame: 119, endFrame: 208 },
  { text: "lifespan data doesn't exist yet. That claim",          startFrame: 209, endFrame: 290 },
  { text: "is still premature.",                                   startFrame: 291, endFrame: 326 },
];

// S7: Send Trigger — 181f  (64.318–70.355s)
const S7_CAPS: CaptionChunk[] = [
  { text: "Send this to someone with an opinion",  startFrame:   0, endFrame:  62 },
  { text: "on Ozempic. Everyone has one. Not everyone", startFrame:  64, endFrame: 150 },
  { text: "has the facts.",                         startFrame: 151, endFrame: 181 },
];

// S8: CTA — 102f  (70.355–73.745s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Save this for", startFrame:  0, endFrame: 56 },
  { text: "the next time this comes up.",         startFrame: 57, endFrame: 102 },
];

function getMusicVolume(frame: number): number {
  const S = GLP_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start + S.scene6.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const GLP1Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = GLP_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#07080c' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('glp1.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1GLPHook frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>

      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <SceneGLPMythReality
          frame={frame - S.scene2.start}
          captionChunks={S2_CAPS}
          mythNum="1 of 5"
          mythText={"\"They're just for weight loss.\""}
          realityText={<>GLP-1s also <strong style={{ color: COLORS.white }}>improve insulin sensitivity, reduce inflammation, and lower cardiovascular risk</strong> — effects documented independent of how much weight is actually lost.</>}
        />
      </Sequence>

      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <SceneGLPMythReality
          frame={frame - S.scene3.start}
          captionChunks={S3_CAPS}
          mythNum="2 of 5"
          mythText={"\"They're a shortcut, not real medicine.\""}
          realityText={<>These are FDA-approved drugs with <strong style={{ color: COLORS.white }}>some of the strongest cardiovascular outcome data</strong> of any weight-management intervention ever studied in large trials.</>}
        />
      </Sequence>

      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <SceneGLPMythReality
          frame={frame - S.scene4.start}
          captionChunks={S4_CAPS}
          mythNum="3 of 5"
          mythText={"\"Once you're on them, you can eat however you want.\""}
          realityText={<><strong style={{ color: COLORS.white }}>Muscle loss is a real risk</strong> without adequate protein and resistance training — the drug suppresses appetite, it {"doesn't"} protect your muscle mass for you.</>}
        />
      </Sequence>

      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <SceneGLPMythReality
          frame={frame - S.scene5.start}
          captionChunks={S5_CAPS}
          mythNum="4 of 5"
          mythText={"\"They're only relevant if you're trying to lose weight.\""}
          realityText={<>Research is actively expanding into their effects on <strong style={{ color: COLORS.white }}>inflammation, addiction pathways, and neurodegeneration risk</strong> — independent of weight loss entirely.</>}
        />
      </Sequence>

      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <SceneGLPMythReality
          frame={frame - S.scene6.start}
          captionChunks={S6_CAPS}
          mythNum="5 of 5"
          mythText={"\"They're an automatic longevity boost.\""}
          realityText={<>The cardiovascular and metabolic benefits are real and documented. But <strong style={{ color: COLORS.white }}>long-term lifespan data {"doesn't"} exist yet</strong> — {"\"increases"} longevity{"\""}  claims are still premature.</>}
        />
      </Sequence>

      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7GLPSendTrigger frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>

      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8GLPCTA frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
