import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, SAUNA_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1SAUHook }          from './scenes/Scene1SAUHook';
import { Scene2SAUWhatsHappening } from './scenes/Scene2SAUWhatsHappening';
import { Scene3SAUWhyItMatters }   from './scenes/Scene3SAUWhyItMatters';
import { Scene4SAUWhatBlocks }     from './scenes/Scene4SAUWhatBlocks';
import { Scene5SAUHowToGetIt }     from './scenes/Scene5SAUHowToGetIt';
import { Scene6SAUTheNumbers }     from './scenes/Scene6SAUTheNumbers';
import { Scene7SAULoopHook }       from './scenes/Scene7SAULoopHook';
import { Scene8SAUCTA }            from './scenes/Scene8SAUCTA';

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

// S1: Hook — 162f  (0.000–5.387s)
const S1_CAPS: CaptionChunk[] = [
  { text: "The Finnish habit linked to living longer. It's", startFrame:  0, endFrame:  78 },
  { text: "not a supplement. It's not a diet. It's",        startFrame: 79, endFrame: 141 },
  { text: "heat.",                                           startFrame: 143, endFrame: 162 },
];

// S2: What's Happening — 470f  (5.387–21.037s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Sauna heat triggers heat shock proteins that repair",    startFrame:  0, endFrame:  88 },
  { text: "damaged proteins and reduce inflammation. A Finnish cohort", startFrame: 91, endFrame: 196 },
  { text: "study of over 2,300 men found those using",             startFrame: 197, endFrame: 286 },
  { text: "the sauna 4 to 7 times a week",                        startFrame: 287, endFrame: 353 },
  { text: "had significantly lower mortality than once-weekly users.", startFrame: 361, endFrame: 470 },
];

// S3: Why It Matters — 439f  (21.037–35.666s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Frequent use was linked to roughly 40% lower",           startFrame:  0, endFrame:  95 },
  { text: "all-cause mortality. Cardiovascular mortality showed one of the", startFrame:  97, endFrame: 210 },
  { text: "strongest associations of any lifestyle factor studied. And", startFrame: 212, endFrame: 312 },
  { text: "the heat response resembles moderate exercise, without the", startFrame: 314, endFrame: 412 },
  { text: "joint load.",                                            startFrame: 414, endFrame: 439 },
];

// S4: What Blocks It — 272f  (35.666–44.722s)
const S4_CAPS: CaptionChunk[] = [
  { text: "Occasional use won't replicate the research. Sessions need", startFrame:  0, endFrame: 108 },
  { text: "to be 15 to 20 minutes, not quick",                    startFrame: 109, endFrame: 171 },
  { text: "dips. And skipping hydration blunts the benefit.",     startFrame: 172, endFrame: 272 },
];

// S5: How To Get It — 301f  (44.722–54.753s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Aim for 4 or more sessions a week",                     startFrame:  0, endFrame:  55 },
  { text: "if you have access. 15 to 20 minutes",                  startFrame: 56, endFrame: 128 },
  { text: "per session. Hydrate before and after. Consistency matters", startFrame: 129, endFrame: 246 },
  { text: "more than any single long session.",                    startFrame: 247, endFrame: 301 },
];

// S6: The Numbers — 425f  (54.753–68.917s)
const S6_CAPS: CaptionChunk[] = [
  { text: "Once weekly was the baseline. Four to seven",           startFrame:  0, endFrame:  91 },
  { text: "times weekly was associated with significantly reduced cardiovascular", startFrame:  92, endFrame: 207 },
  { text: "and all-cause mortality over 20 years. This is",       startFrame: 217, endFrame: 309 },
  { text: "one of the few longevity habits with two",             startFrame: 311, endFrame: 368 },
  { text: "decades of human data behind it.",                     startFrame: 371, endFrame: 425 },
];

// S7: Loop Hook — 159f  (68.917–74.211s)
const S7_CAPS: CaptionChunk[] = [
  { text: "Do you have access to a sauna? If", startFrame:  0, endFrame:  64 },
  { text: "not, this might be worth changing. Drop your", startFrame: 67, endFrame: 129 },
  { text: "answer below.",                                startFrame: 130, endFrame: 159 },
];

// S8: CTA — 149f  (74.211–79.180s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame:  0, endFrame:  76 },
  { text: "Save this before your next gym trip.",              startFrame: 91, endFrame: 149 },
];

function getMusicVolume(frame: number): number {
  const S = SAUNA_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const SaunaReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = SAUNA_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('sauna.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1SAUHook          frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2SAUWhatsHappening frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3SAUWhyItMatters  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4SAUWhatBlocks    frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5SAUHowToGetIt    frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6SAUTheNumbers    frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7SAULoopHook      frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8SAUCTA           frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
