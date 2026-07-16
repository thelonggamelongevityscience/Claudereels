import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, HORMONES_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1HormonesHook }            from './scenes/Scene1HormonesHook';
import { Scene2HormonesCortisolInsulin } from './scenes/Scene2HormonesCortisolInsulin';
import { Scene3HormonesTostThyroid }     from './scenes/Scene3HormonesTostThyroid';
import { Scene4HormonesDisruptors }      from './scenes/Scene4HormonesDisruptors';
import { Scene5HormonesProtocol }        from './scenes/Scene5HormonesProtocol';
import { Scene6HormonesLoopHook }        from './scenes/Scene6HormonesLoopHook';
import { Scene7HormonesCTA }             from './scenes/Scene7HormonesCTA';

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
  { text: "Your hormones are running your life. Not you.", startFrame: 0,   endFrame: 89 },
  { text: "Every decision you think you are making —",  startFrame: 97,  endFrame: 186 },
  { text: "your chemistry made first.",                     startFrame: 194, endFrame: 238 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Four hormones are deciding your entire day. Cortisol", startFrame: 0,   endFrame: 103 },
  { text: "— the threat detector — controls your energy,",        startFrame: 111, endFrame: 214 },
  { text: "inflammation, blood sugar, and sleep. Insulin — the",  startFrame: 222, endFrame: 325 },
  { text: "storage manager — decides whether calories become energy", startFrame: 333, endFrame: 436 },
  { text: "or fat.",                                               startFrame: 444, endFrame: 470 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Testosterone controls muscle synthesis, libido, motivation, and cognitive", startFrame: 0,   endFrame: 109 },
  { text: "focus — and it is declining in men",                      startFrame: 117, endFrame: 226 },
  { text: "10 years earlier than previous generations. Thyroid sets", startFrame: 234, endFrame: 343 },
  { text: "the speed of every cellular process. One in",             startFrame: 351, endFrame: 460 },
  { text: "five people has subclinical hypothyroidism. Most have no", startFrame: 468, endFrame: 577 },
  { text: "idea.",                                                    startFrame: 585, endFrame: 599 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Four things are destroying your hormonal balance: chronic", startFrame: 0,   endFrame: 103 },
  { text: "stress, endocrine disruptors in plastic and pesticides, poor", startFrame: 111, endFrame: 214 },
  { text: "sleep — 70 percent of testosterone release happens",      startFrame: 222, endFrame: 325 },
  { text: "during deep sleep — and ultra-processed food.",           startFrame: 333, endFrame: 423 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "To take back control: sleep first — it",                  startFrame: 0,   endFrame: 128 },
  { text: "is the single most powerful hormonal intervention. Resistance", startFrame: 136, endFrame: 264 },
  { text: "train. Remove plastic from your kitchen. And test",       startFrame: 272, endFrame: 400 },
  { text: "all four: cortisol curve, fasting insulin, free testosterone,", startFrame: 408, endFrame: 536 },
  { text: "and full thyroid panel.",                                  startFrame: 544, endFrame: 608 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Which of these four hormones do you think", startFrame: 0,   endFrame: 94 },
  { text: "is off for you — cortisol, insulin, testosterone,", startFrame: 102, endFrame: 196 },
  { text: "or thyroid? Drop your guess below.",        startFrame: 204, endFrame: 275 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,   endFrame: 82 },
  { text: "Save this — your hormones are paying attention",   startFrame: 90,  endFrame: 172 },
  { text: "even when you are not.",                           startFrame: 180, endFrame: 231 },
];

function getMusicVolume(frame: number): number {
  const S = HORMONES_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const HormonesReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = HORMONES_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('hormones.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1HormonesHook            frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2HormonesCortisolInsulin frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3HormonesTostThyroid     frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4HormonesDisruptors      frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5HormonesProtocol        frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6HormonesLoopHook        frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7HormonesCTA             frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
