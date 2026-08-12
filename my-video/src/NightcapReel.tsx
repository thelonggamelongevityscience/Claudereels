import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, NC_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1NCHook }        from './scenes/Scene1NCHook';
import { Scene2NCMechanism }   from './scenes/Scene2NCMechanism';
import { Scene3NCWhyItMatters } from './scenes/Scene3NCWhyItMatters';
import { Scene4NCMyths }       from './scenes/Scene4NCMyths';
import { Scene5NCFix }         from './scenes/Scene5NCFix';
import { Scene6NCTrade }       from './scenes/Scene6NCTrade';
import { Scene7NCLoopHook }    from './scenes/Scene7NCLoopHook';
import { Scene8NCCTA }         from './scenes/Scene8NCCTA';

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

// S1: 3 sentences, 234f
const S1_CAPS: CaptionChunk[] = [
  { text: "Passed out is not the same as asleep.",                          startFrame:   0, endFrame:  62 },
  { text: "That nightcap is stealing something you don't get back.",        startFrame:  72, endFrame: 143 },
  { text: "Here's what alcohol actually does to your sleep.",               startFrame: 151, endFrame: 234 },
];

// S2: 3 sentences, 483f
const S2_CAPS: CaptionChunk[] = [
  { text: "Alcohol is a sedative — it knocks you out fast, which is why you fall asleep quicker.",              startFrame:   0, endFrame: 155 },
  { text: "But it suppresses REM sleep almost completely during the first several hours.",                       startFrame: 163, endFrame: 299 },
  { text: "Then as your body metabolizes it, you get a REM rebound that fragments the second half of your night.", startFrame: 307, endFrame: 483 },
];

// S3: 4 sentences, 476f
const S3_CAPS: CaptionChunk[] = [
  { text: "REM sleep is where memory consolidates — suppress it and you wake up having slept but not processed the day.", startFrame:   0, endFrame: 207 },
  { text: "Deep sleep drops too.",                                            startFrame: 215, endFrame: 257 },
  { text: "Fragmentation rises.",                                             startFrame: 273, endFrame: 300 },
  { text: "And that disrupted REM is directly linked to the anxious, foggy feeling the day after.", startFrame: 308, endFrame: 476 },
];

// S4: 3 myth sentences, 488f
const S4_CAPS: CaptionChunk[] = [
  { text: "It helps me fall asleep — true, and irrelevant.",                 startFrame:   0, endFrame:  84 },
  { text: "Just one drink is harmless — false, even one drink measurably reduces REM.", startFrame:  92, endFrame: 284 },
  { text: "My tolerance protects my sleep — no, tolerance only changes how sedated you feel.", startFrame: 292, endFrame: 488 },
];

// S5: 4 sentences, 403f
const S5_CAPS: CaptionChunk[] = [
  { text: "Stop drinking 3 to 4 hours before bed.",                          startFrame:   0, endFrame:  78 },
  { text: "Hydrate alongside every drink.",                                   startFrame:  88, endFrame: 146 },
  { text: "Build in alcohol-free nights so REM debt doesn't compound.",       startFrame: 154, endFrame: 255 },
  { text: "And track how you actually feel the next day — not how fast you fell asleep.", startFrame: 263, endFrame: 403 },
];

// S6: 4 sentences, 385f
const S6_CAPS: CaptionChunk[] = [
  { text: "Alcohol gives you faster sleep onset and sedation.",               startFrame:   0, endFrame:  88 },
  { text: "In exchange it takes REM suppression, deep sleep reduction, and a next-day cost most people blame on something else.", startFrame: 101, endFrame: 303 },
  { text: "It's not a sleep aid.",                                            startFrame: 311, endFrame: 352 },
  { text: "It's a trade.",                                                    startFrame: 353, endFrame: 385 },
];

// S7: 3 sentences, 173f
const S7_CAPS: CaptionChunk[] = [
  { text: "How many nights a week is your nightcap actually helping?",        startFrame:   0, endFrame:  54 },
  { text: "Be honest with yourself.",                                         startFrame:  62, endFrame:  97 },
  { text: "Drop your number below.",                                          startFrame: 105, endFrame: 173 },
];

// S8: 2 sentences, 163f
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",                startFrame:   0, endFrame:  76 },
  { text: "Save this for the next time you reach for a nightcap.",            startFrame:  90, endFrame: 163 },
];

function getMusicVolume(frame: number): number {
  const S = NC_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const NightcapReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = NC_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('nightcap.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1NCHook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2NCMechanism   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3NCWhyItMatters frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4NCMyths       frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5NCFix         frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6NCTrade       frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7NCLoopHook    frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8NCCTA         frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
