import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { SC_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1SCHook }       from './scenes/Scene1SCHook';
import { Scene2SCStudy }      from './scenes/Scene2SCStudy';
import { Scene3SCFinding }    from './scenes/Scene3SCFinding';
import { Scene4SCRisk }       from './scenes/Scene4SCRisk';
import { Scene5SCProtective } from './scenes/Scene5SCProtective';
import { Scene6SCProtocol }   from './scenes/Scene6SCProtocol';
import { Scene7SCSendThis }   from './scenes/Scene7SCSendThis';
import { Scene8SCTA }         from './scenes/Scene8SCTA';

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

// S1: Hook — 261f
const S1_CAPS: CaptionChunk[] = [
  { text: "The longest study on happiness ever", startFrame:    0, endFrame:   61 },
  { text: "conducted found one thing. Not diet.", startFrame:   62, endFrame:  161 },
  { text: "Not exercise. Not cholesterol.", startFrame:  162, endFrame:  260 },
];

// S2: The Study — 272f
const S2_CAPS: CaptionChunk[] = [
  { text: "The Harvard Study of Adult Development.", startFrame:    0, endFrame:   72 },
  { text: "Eighty-five plus years running. The longest-running", startFrame:   73, endFrame:  167 },
  { text: "study on human happiness and health", startFrame:  168, endFrame:  230 },
  { text: "ever conducted.", startFrame:  231, endFrame:  271 },
];

// S3: The Finding — 350f
const S3_CAPS: CaptionChunk[] = [
  { text: "Not genetics. Not cholesterol levels. The", startFrame:    0, endFrame:  103 },
  { text: "quality of your relationships was the", startFrame:  104, endFrame:  158 },
  { text: "number one predictor of health at", startFrame:  159, endFrame:  213 },
  { text: "age 80 — more predictive than", startFrame:  214, endFrame:  284 },
  { text: "any biomarker they tracked.", startFrame:  285, endFrame:  349 },
];

// S4: The Risk — 234f
const S4_CAPS: CaptionChunk[] = [
  { text: "Chronic loneliness carries a mortality risk", startFrame:    0, endFrame:   70 },
  { text: "comparable to smoking fifteen cigarettes a", startFrame:   71, endFrame:  137 },
  { text: "day, according to a major meta-analysis.", startFrame:  138, endFrame:  233 },
];

// S5: The Protective Side — 298f
const S5_CAPS: CaptionChunk[] = [
  { text: "People with strong social relationships show", startFrame:    0, endFrame:   81 },
  { text: "roughly fifty percent better survival odds", startFrame:   82, endFrame:  149 },
  { text: "across studies, independent of age, sex,", startFrame:  150, endFrame:  246 },
  { text: "or health status.", startFrame:  247, endFrame:  297 },
];

// S6: The Protocol — 413f
const S6_CAPS: CaptionChunk[] = [
  { text: "It's not about how many friends", startFrame:    0, endFrame:   43 },
  { text: "you have. A handful of close", startFrame:   44, endFrame:  103 },
  { text: "relationships beats a wide social circle.", startFrame:  104, endFrame:  185 },
  { text: "Regular contact beats occasional deep conversations.", startFrame:  186, endFrame:  290 },
  { text: "Showing up consistently matters more than", startFrame:  291, endFrame:  358 },
  { text: "grand gestures.", startFrame:  359, endFrame:  412 },
];

// S7: Send Trigger — 78f
const S7_CAPS: CaptionChunk[] = [
  { text: "Send this to someone you haven't", startFrame:    0, endFrame:   40 },
  { text: "called in a while.", startFrame:   41, endFrame:   77 },
];

// S8: CTA — 94f
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Save this,", startFrame:    0, endFrame:   76 },
  { text: "then call someone.", startFrame:   77, endFrame:   93 },
];

function getMusicVolume(frame: number): number {
  const S = SC_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene7.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const SocialConnectionReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = SC_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0508' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('socialconnection.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1SCHook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2SCStudy       frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3SCFinding     frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4SCRisk        frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5SCProtective  frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6SCProtocol    frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7SCSendThis    frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8SCTA          frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
