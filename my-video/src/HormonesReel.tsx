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
  { text: "Your hormones are running your life.", startFrame: 0,  endFrame: 45 },
  { text: "Not you.",                             startFrame: 50, endFrame: 65 },
  { text: "Every decision you think you are making — your chemistry made first.", startFrame: 70, endFrame: 105 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Four hormones are deciding your entire day.",              startFrame: 0,   endFrame: 50 },
  { text: "Cortisol — the threat detector —",                        startFrame: 55,  endFrame: 80 },
  { text: "controls your energy, inflammation, blood sugar, and sleep.", startFrame: 85, endFrame: 130 },
  { text: "Insulin — the storage manager —",                         startFrame: 135, endFrame: 160 },
  { text: "decides whether calories become energy or fat.",           startFrame: 165, endFrame: 200 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Testosterone controls muscle synthesis, libido, motivation, and cognitive focus —", startFrame: 0,   endFrame: 80 },
  { text: "and it is declining in men 10 years earlier than previous generations.", startFrame: 85,  endFrame: 145 },
  { text: "Thyroid sets the speed of every cellular process.",        startFrame: 150, endFrame: 190 },
  { text: "One in five people has subclinical hypothyroidism. Most have no idea.", startFrame: 195, endFrame: 240 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Four things are destroying your hormonal balance:",        startFrame: 0,   endFrame: 55 },
  { text: "chronic stress, endocrine disruptors in plastic and pesticides,", startFrame: 60, endFrame: 120 },
  { text: "poor sleep — 70% of testosterone release happens during deep sleep —", startFrame: 125, endFrame: 190 },
  { text: "and ultra-processed food.",                                startFrame: 195, endFrame: 225 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "To take back control: sleep first —",                     startFrame: 0,   endFrame: 45 },
  { text: "it is the single most powerful hormonal intervention.",    startFrame: 50,  endFrame: 95 },
  { text: "Resistance train. Remove plastic from your kitchen.",      startFrame: 100, endFrame: 145 },
  { text: "And test all four: cortisol curve, fasting insulin,",     startFrame: 150, endFrame: 195 },
  { text: "free testosterone, and full thyroid panel.",               startFrame: 200, endFrame: 235 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Which of these four hormones do you think is off for you —", startFrame: 0,  endFrame: 70 },
  { text: "cortisol, insulin, testosterone, or thyroid?",             startFrame: 75, endFrame: 120 },
  { text: "Drop your guess below.",                                   startFrame: 125, endFrame: 150 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",        startFrame: 0,  endFrame: 55 },
  { text: "Save this — your hormones are paying attention even when you are not.", startFrame: 60, endFrame: 110 },
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
