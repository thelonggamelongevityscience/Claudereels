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

// ── Caption chunks — sentence-boundary aligned using proportional word timing ──
// Split points within chunks: frame = chunk_start + (words_before_split / chunk_words) * chunk_duration

// S1: 3 chunks × ~8w, audio_frames=207
const S1_CAPS: CaptionChunk[] = [
  // c0 all + c1 w1 "here." — c1 w1 end = 100+(1/8)*92=112
  { text: "Almost every disease that will kill you starts here.", startFrame: 0,   endFrame: 112 },
  // c1 w2-3 "Chronic inflammation."
  { text: "Chronic inflammation.",                               startFrame: 120, endFrame: 135 },
  // c1 w4-8 + c2 all "And it is already happening inside you."
  { text: "And it is already happening inside you.",            startFrame: 143, endFrame: 207 },
];

// S2: 8 chunks × 8w (last 4w), audio_frames=729
const S2_CAPS: CaptionChunk[] = [
  // c0 w1-6 "Inflammation was built to save you."
  { text: "Inflammation was built to save you.",                                                     startFrame: 0,   endFrame: 73  },
  // c0 w7-8 + c1 all + c2 w1-5 — full sentence
  { text: "Acute inflammation heals wounds and fights infections. That is exactly what it is designed for.", startFrame: 81, endFrame: 271 },
  // c2 w6-8 + c3 all + c4 w1-2 "But chronic inflammation...low grade."
  { text: "But chronic inflammation is the same immune response stuck permanently at low grade.",    startFrame: 279, endFrame: 444 },
  // c4 w3-8 + c5 w1-2 "No wound to heal. No infection to fight."
  { text: "No wound to heal. No infection to fight.",                                               startFrame: 452, endFrame: 549 },
  // c5 w3-8 + c6 w1-5 "Just a continuous internal fire that slowly damages everything it touches."
  { text: "Just a continuous internal fire that slowly damages everything it touches.",             startFrame: 557, endFrame: 691 },
  // c6 w6-8 + c7 all
  { text: "Most people have it. Almost nobody knows.",                                              startFrame: 699, endFrame: 729 },
];

// S3: 6 chunks × ~8w, audio_frames=686
const S3_CAPS: CaptionChunk[] = [
  // c0 all + c1 w1-6 — all disease names
  { text: "Heart disease. Type 2 diabetes. Alzheimer's. Cancer. Arthritis. Depression. Obesity. Non-alcoholic fatty liver disease.", startFrame: 0,   endFrame: 208 },
  // c1 w7-8 + c2 w1-6 "These are not separate diseases with separate causes."
  { text: "These are not separate diseases with separate causes.",                                                  startFrame: 216, endFrame: 330 },
  // c2 w7-8 + c3 all + c4 w1-2
  { text: "They are downstream consequences of the same upstream problem — chronic inflammation.",                  startFrame: 338, endFrame: 517 },
  // c4 w3-8 + c5 all
  { text: "Put out the fire and you reduce the risk of all of them simultaneously.",                               startFrame: 525, endFrame: 686 },
];

// S4: 7 chunks, audio_frames=644
const S4_CAPS: CaptionChunk[] = [
  // c0 w1-5 "What is feeding the fire?"
  { text: "What is feeding the fire?",                                                        startFrame: 0,   endFrame: 63  },
  // c0 w6-8 + c1 w1-3 "Four sources most people never connect."
  { text: "Four sources most people never connect.",                                          startFrame: 71,  endFrame: 147 },
  // c1 w4-8 + c2 w1-7 "Seed oils...20 to 1."
  { text: "Seed oils with omega-6 to omega-3 ratios up to 20 to 1.",                        startFrame: 155, endFrame: 307 },
  // c2 w8 + c3 all "Chronic stress activating the master switch for inflammatory genes."
  { text: "Chronic stress activating the master switch for inflammatory genes.",             startFrame: 315, endFrame: 428 },
  // c4 all + c5 w1-3 "Poor sleep...inflammatory cytokines."
  { text: "Poor sleep — even one bad night measurably raises inflammatory cytokines.",       startFrame: 436, endFrame: 583 },
  // c5 w4-8 + c6 all "And ultra-processed food triggering the same pathways independently."
  { text: "And ultra-processed food triggering the same pathways independently.",            startFrame: 591, endFrame: 644 },
];

// S5: 7 chunks, audio_frames=641
const S5_CAPS: CaptionChunk[] = [
  // c0 w1-7 "There is a blood test for this."
  { text: "There is a blood test for this.",                                              startFrame: 0,   endFrame: 92  },
  // c0 w8 + c1 w1-7 "It is called hs-CRP — high-sensitivity C-reactive protein."
  { text: "It is called hs-CRP — high-sensitivity C-reactive protein.",                 startFrame: 100, endFrame: 205 },
  // c1 w8 + c2 all "It predicts cardiovascular disease more powerfully than LDL cholesterol."
  { text: "It predicts cardiovascular disease more powerfully than LDL cholesterol.",   startFrame: 213, endFrame: 331 },
  // c3 all "It is almost never on a standard panel."
  { text: "It is almost never on a standard panel.",                                    startFrame: 339, endFrame: 444 },
  // c4 w1-6 "Ask your doctor to add it."
  { text: "Ask your doctor to add it.",                                                 startFrame: 452, endFrame: 531 },
  // c4 w7-8 + c5 all + c6 "Below 1.0 is optimal. Most people have never seen this number."
  { text: "Below 1.0 is optimal. Most people have never seen this number.",             startFrame: 539, endFrame: 641 },
];

// S6: 7 chunks, audio_frames=784
const S6_CAPS: CaptionChunk[] = [
  // c0 all + c1 all "To lower your inflammation starting today: remove seed oils — switch to olive oil or butter,"
  { text: "To lower your inflammation starting today: remove seed oils — switch to olive oil or butter,", startFrame: 0,   endFrame: 236 },
  // c2 all "this single swap lowers hs-CRP within two weeks."
  { text: "this single swap lowers hs-CRP within two weeks.",                                            startFrame: 244, endFrame: 358 },
  // c3 all + c4 w1-3 "Prioritise sleep — it normalises inflammatory cytokines faster than any supplement."
  { text: "Prioritise sleep — it normalises inflammatory cytokines faster than any supplement.",         startFrame: 366, endFrame: 531 },
  // c4 w4-6 "Add omega-3 daily."
  { text: "Add omega-3 daily.",                                                                          startFrame: 539, endFrame: 574 },
  // c4 w7-8 + c5 all + c6 all
  { text: "And do Zone 2 exercise — 150 minutes a week produces anti-inflammatory adaptations nothing else can replicate.", startFrame: 582, endFrame: 784 },
];

// S7: 4 chunks, audio_frames=259
const S7_CAPS: CaptionChunk[] = [
  // c0 all + c1 w1-5 "Send this to someone who complains of fatigue, brain fog, or joint pain."
  { text: "Send this to someone who complains of fatigue, brain fog, or joint pain.", startFrame: 0,   endFrame: 143 },
  // c1 w6-8 + c2 w1-2 "Those are not random symptoms."
  { text: "Those are not random symptoms.",                                            startFrame: 151, endFrame: 203 },
  // c2 w3-6 "That is the fire."
  { text: "That is the fire.",                                                         startFrame: 211, endFrame: 244 },
  // c2 w7-8 + c3 "Now they know."
  { text: "Now they know.",                                                            startFrame: 252, endFrame: 259 },
];

// S8: 4 chunks, audio_frames=246
const S8_CAPS: CaptionChunk[] = [
  // c0 all "Follow The Long Game for daily longevity science."
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,   endFrame: 76  },
  // c1 w1-2 "Save this."
  { text: "Save this.",                                        startFrame: 84,  endFrame: 103 },
  // c1 w3-8 + c2 w1-5 "The fire is either burning or you are putting it out."
  { text: "The fire is either burning or you are putting it out.", startFrame: 111, endFrame: 216 },
  // c2 w6-8 + c3 "There is no middle ground."
  { text: "There is no middle ground.",                        startFrame: 224, endFrame: 246 },
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
