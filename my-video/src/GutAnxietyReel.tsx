import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, GUT_ANXIETY_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1GutAnxietyHook }      from './scenes/Scene1GutAnxietyHook';
import { Scene2GutAnxietyConnection } from './scenes/Scene2GutAnxietyConnection';
import { Scene3GutAnxietySigns }     from './scenes/Scene3GutAnxietySigns';
import { Scene4GutAnxietyBreaks }    from './scenes/Scene4GutAnxietyBreaks';
import { Scene5GutAnxietyFix }       from './scenes/Scene5GutAnxietyFix';
import { Scene6GutAnxietyLoopHook }  from './scenes/Scene6GutAnxietyLoopHook';
import { Scene7GutAnxietyCTA }       from './scenes/Scene7GutAnxietyCTA';

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

// ── Caption chunks — placeholder, updated after ElevenLabs audio ──

const S1_CAPS: CaptionChunk[] = [
  { text: "Your gut is making you anxious.",               startFrame: 0,  endFrame: 40 },
  { text: "Not your thoughts.",                            startFrame: 52, endFrame: 68 },
  { text: "Your gut bacteria are running your mood.",      startFrame: 80, endFrame: 105 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "90 percent of your serotonin is made in your gut.",        startFrame: 0,   endFrame: 55 },
  { text: "The vagus nerve runs directly between your gut and brain —", startFrame: 64,  endFrame: 115 },
  { text: "and 80 percent of its signals travel upward.",              startFrame: 121, endFrame: 148 },
  { text: "Your gut is talking to your brain more than your brain is talking to your gut.", startFrame: 157, endFrame: 150 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Four signs your gut is driving your anxiety.",                                                    startFrame: 0,  endFrame: 44 },
  { text: "Anxiety that worsens after eating. Bloating alongside low mood. Anxiety spikes after antibiotics.", startFrame: 53, endFrame: 105 },
  { text: "And feeling calmer after fermented foods. These are not coincidences.",                           startFrame: 111, endFrame: 130 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Four things are disrupting your gut-brain axis right now:",         startFrame: 0,  endFrame: 50 },
  { text: "ultra-processed food, chronic stress, antibiotics, and poor sleep.", startFrame: 59, endFrame: 110 },
  { text: "Each one compounds the others.",                                     startFrame: 119, endFrame: 120 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "To calm your gut and your anxiety:",                                                                          startFrame: 0,   endFrame: 32 },
  { text: "fermented foods daily, 30 different plants per week, remove ultra-processed food, and manage your stress.", startFrame: 41,  endFrame: 110 },
  { text: "In that order.",                                                                                               startFrame: 116, endFrame: 130 },
  { text: "You cannot fix the gut while cortisol is running the show.",                                                  startFrame: 136, endFrame: 145 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Does your anxiety get worse after certain foods?", startFrame: 0,  endFrame: 55 },
  { text: "More people than you think say yes.",              startFrame: 70, endFrame: 95 },
  { text: "Drop your trigger below.",                         startFrame: 104, endFrame: 105 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",              startFrame: 0,  endFrame: 52 },
  { text: "Save this and check what you ate the last time anxiety hit.", startFrame: 61, endFrame: 85 },
];

function getMusicVolume(frame: number): number {
  const S = GUT_ANXIETY_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const GutAnxietyReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = GUT_ANXIETY_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('gut_anxiety.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1GutAnxietyHook      frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2GutAnxietyConnection frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3GutAnxietySigns     frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4GutAnxietyBreaks    frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5GutAnxietyFix       frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6GutAnxietyLoopHook  frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7GutAnxietyCTA       frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
