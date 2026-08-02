import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, IR_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1IRHook }      from './scenes/Scene1IRHook';
import { Scene2IRMechanism } from './scenes/Scene2IRMechanism';
import { Scene3IRDiseases }  from './scenes/Scene3IRDiseases';
import { Scene4IRSources }   from './scenes/Scene4IRSources';
import { Scene5IRTest }      from './scenes/Scene5IRTest';
import { Scene6IRProtocol }  from './scenes/Scene6IRProtocol';
import { Scene7IRLoopHook }  from './scenes/Scene7IRLoopHook';
import { Scene8IRCTA }       from './scenes/Scene8IRCTA';

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

// ── Caption chunks — PLACEHOLDER until real ElevenLabs audio timings are uploaded ──
const S1_CAPS: CaptionChunk[] = [
  { text: "Almost every disease that will kill you starts here.",  startFrame: 0,  endFrame: 54 },
  { text: "Chronic inflammation.",                                 startFrame: 62, endFrame: 72 },
  { text: "And it is already happening inside you.",              startFrame: 80, endFrame: 90 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Inflammation was built to save you.",                                               startFrame: 0,   endFrame: 40 },
  { text: "Acute inflammation heals wounds and fights infections.",                            startFrame: 48,  endFrame: 90 },
  { text: "But chronic inflammation is the same immune response stuck permanently at low grade.", startFrame: 98, endFrame: 140 },
  { text: "No wound to heal. No infection to fight.",                                          startFrame: 148, endFrame: 160 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Heart disease. Type 2 diabetes. Alzheimer's. Cancer. Arthritis. Depression.",    startFrame: 0,   endFrame: 60 },
  { text: "These are not separate diseases with separate causes.",                           startFrame: 68,  endFrame: 100 },
  { text: "They are downstream consequences of the same upstream problem — chronic inflammation.", startFrame: 108, endFrame: 140 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "What is feeding the fire? Four sources most people never connect.",  startFrame: 0,   endFrame: 50 },
  { text: "Seed oils with omega-6 to omega-3 ratios up to 20 to 1.",           startFrame: 58,  endFrame: 90 },
  { text: "Chronic stress activating the master switch for inflammatory genes.", startFrame: 98,  endFrame: 130 },
  { text: "Poor sleep and ultra-processed food triggering the same pathways.",  startFrame: 138, endFrame: 140 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "There is a blood test for this. It is called hs-CRP.",                        startFrame: 0,   endFrame: 50 },
  { text: "It predicts cardiovascular disease more powerfully than LDL cholesterol.",    startFrame: 58,  endFrame: 100 },
  { text: "It is almost never on a standard panel. Ask your doctor to add it.",          startFrame: 108, endFrame: 140 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Remove seed oils — switch to olive oil or butter.",               startFrame: 0,   endFrame: 45 },
  { text: "This single swap lowers hs-CRP within two weeks.",                startFrame: 53,  endFrame: 85 },
  { text: "Prioritise sleep — it normalises inflammatory cytokines faster than any supplement.", startFrame: 93,  endFrame: 130 },
  { text: "And do Zone 2 exercise — 150 minutes a week produces anti-inflammatory adaptations.", startFrame: 138, endFrame: 150 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Send this to someone who complains of fatigue, brain fog, or joint pain.", startFrame: 0,  endFrame: 60 },
  { text: "Those are not random symptoms. That is the fire. Now they know.",          startFrame: 68, endFrame: 100 },
];

const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",                             startFrame: 0,  endFrame: 48 },
  { text: "Save this.",                                                                     startFrame: 56, endFrame: 66 },
  { text: "The fire is either burning or you are putting it out. There is no middle ground.", startFrame: 74, endFrame: 90 },
];

function getMusicVolume(frame: number): number {
  const S = IR_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start + S.scene6.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const InflammationRemakeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = IR_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('inflammation_remake.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1IRHook      frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2IRMechanism frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3IRDiseases  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4IRSources   frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5IRTest      frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6IRProtocol  frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7IRLoopHook  frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8IRCTA       frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
