import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, ZOMBIE_CELLS_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1ZombieCellsHook }        from './scenes/Scene1ZombieCellsHook';
import { Scene2ZombieCellsWhatTheyAre } from './scenes/Scene2ZombieCellsWhatTheyAre';
import { Scene3ZombieCellsDamage }      from './scenes/Scene3ZombieCellsDamage';
import { Scene4ZombieCellsResearch }    from './scenes/Scene4ZombieCellsResearch';
import { Scene5ZombieCellsCreates }     from './scenes/Scene5ZombieCellsCreates';
import { Scene6ZombieCellsProtocol }    from './scenes/Scene6ZombieCellsProtocol';
import { Scene7ZombieCellsLoopHook }    from './scenes/Scene7ZombieCellsLoopHook';
import { Scene8ZombieCellsCTA }         from './scenes/Scene8ZombieCellsCTA';

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

// ── Caption chunks — updated after ElevenLabs audio ──

const S1_CAPS: CaptionChunk[] = [
  { text: "Your body is full of zombie cells.", startFrame: 0,  endFrame: 40  },
  { text: "They refused to die.",               startFrame: 52, endFrame: 75  },
  { text: "And right now they are ageing you from the inside.", startFrame: 87, endFrame: 110 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "Senescent cells are damaged cells that stop dividing but refuse to die.", startFrame: 0,   endFrame: 65  },
  { text: "They release a toxic cocktail of inflammatory signals called the SASP —", startFrame: 74,  endFrame: 118 },
  { text: "and it spreads to healthy cells around them.",                              startFrame: 124, endFrame: 130 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "Zombie cells drive chronic inflammation, accelerate tissue ageing, impair organ function, and fuel cancer risk.", startFrame: 0,   endFrame: 88  },
  { text: "They do not just sit there —",                                                                                   startFrame: 97,  endFrame: 115 },
  { text: "they actively corrupt everything around them.",                                                                   startFrame: 121, endFrame: 130 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "In 2016 the Mayo Clinic engineered mice to clear senescent cells.",                                                   startFrame: 0,   endFrame: 72  },
  { text: "They lived 25% longer.",                                                                                              startFrame: 81,  endFrame: 104 },
  { text: "Delayed cancer. Better heart and kidney function. Maintained muscle mass far longer than controls.", startFrame: 117, endFrame: 140 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "Four things accelerate zombie cell accumulation:",                                                    startFrame: 0,   endFrame: 42  },
  { text: "chronic inflammation, DNA damage, oxidative stress from poor diet and alcohol, and poor sleep.", startFrame: 52,  endFrame: 105 },
  { text: "All four are lifestyle factors.",                                                                   startFrame: 115, endFrame: 120 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "To clear them naturally:",                                                              startFrame: 0,   endFrame: 26  },
  { text: "intermittent fasting triggers autophagy — your body's built-in cleanup system.",     startFrame: 36,  endFrame: 100 },
  { text: "Zone 2 exercise is the most potent natural senolytic available.",                      startFrame: 109, endFrame: 145 },
  { text: "And an anti-inflammatory diet removes the primary driver of ongoing accumulation.", startFrame: 153, endFrame: 150 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Did you know zombie cells were real?",                   startFrame: 0,   endFrame: 55  },
  { text: "Most people have never heard of senescence.",            startFrame: 70,  endFrame: 100 },
  { text: "Drop a zombie emoji below if this blew your mind.", startFrame: 112, endFrame: 110 },
];

const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,  endFrame: 56 },
  { text: "Save this — your cells are listening.",             startFrame: 65, endFrame: 90 },
];

function getMusicVolume(frame: number): number {
  const S = ZOMBIE_CELLS_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start + S.scene6.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const ZombieCellsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = ZOMBIE_CELLS_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('zombie_cells.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1ZombieCellsHook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2ZombieCellsWhatTheyAre frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3ZombieCellsDamage      frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4ZombieCellsResearch    frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5ZombieCellsCreates     frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6ZombieCellsProtocol    frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7ZombieCellsLoopHook    frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8ZombieCellsCTA         frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
