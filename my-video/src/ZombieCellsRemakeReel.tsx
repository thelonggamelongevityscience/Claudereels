import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, ZCR_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1ZCRHook }         from './scenes/Scene1ZCRHook';
import { Scene2ZCRStat }         from './scenes/Scene2ZCRStat';
import { Scene3ZCRWhatTheyAre }  from './scenes/Scene3ZCRWhatTheyAre';
import { Scene4ZCRSpread }       from './scenes/Scene4ZCRSpread';
import { Scene5ZCRAccelerators } from './scenes/Scene5ZCRAccelerators';
import { Scene6ZCRProtocol }     from './scenes/Scene6ZCRProtocol';
import { Scene7ZCRLoopHook }     from './scenes/Scene7ZCRLoopHook';
import { Scene8ZCRCTA }          from './scenes/Scene8ZCRCTA';

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

// ── Caption chunks — PLACEHOLDER until real audio timing is provided ──
// These will be replaced after gen_zombie_cells_remake.py is run and JSON uploaded.

const S1_CAPS: CaptionChunk[] = [
  { text: "Your body is full of zombie cells.",        startFrame: 0,   endFrame: 60  },
  { text: "Billions of them. Right now.",              startFrame: 68,  endFrame: 120 },
  { text: "And they are spreading.",                   startFrame: 128, endFrame: 180 },
];

const S2_CAPS: CaptionChunk[] = [
  { text: "In 2016, the Mayo Clinic engineered mice",       startFrame: 0,   endFrame: 60  },
  { text: "to clear their zombie cells.",                   startFrame: 68,  endFrame: 110 },
  { text: "They lived 25% longer.",                         startFrame: 118, endFrame: 160 },
  { text: "Delayed cancer. Preserved organ function.",      startFrame: 168, endFrame: 230 },
  { text: "Maintained muscle mass far longer than controls.", startFrame: 238, endFrame: 310 },
  { text: "One intervention. All of this. Stay with me.",   startFrame: 318, endFrame: 390 },
];

const S3_CAPS: CaptionChunk[] = [
  { text: "When a cell is too damaged to divide safely",    startFrame: 0,   endFrame: 70  },
  { text: "it enters senescence — a permanent state of arrest.", startFrame: 78,  endFrame: 155 },
  { text: "It should be cleared by your immune system.",   startFrame: 163, endFrame: 230 },
  { text: "When it is not, it stays alive",                startFrame: 238, endFrame: 285 },
  { text: "releasing a toxic cocktail called the SASP.",   startFrame: 293, endFrame: 360 },
  { text: "And the SASP does something terrifying.",       startFrame: 368, endFrame: 420 },
];

const S4_CAPS: CaptionChunk[] = [
  { text: "Zombie cells are contagious to healthy cells.",          startFrame: 0,   endFrame: 75  },
  { text: "The SASP signals from one senescent cell",              startFrame: 83,  endFrame: 140 },
  { text: "trigger senescence in the healthy cells around it.",    startFrame: 148, endFrame: 215 },
  { text: "This is why chronic inflammation accelerates ageing",   startFrame: 223, endFrame: 295 },
  { text: "so dramatically.",                                      startFrame: 303, endFrame: 330 },
  { text: "It is a spreading zombie infection at the cellular level.", startFrame: 338, endFrame: 420 },
];

const S5_CAPS: CaptionChunk[] = [
  { text: "Four things accelerate zombie cell accumulation:",      startFrame: 0,   endFrame: 75  },
  { text: "chronic inflammation, poor sleep,",                    startFrame: 83,  endFrame: 130 },
  { text: "oxidative stress from seed oils and ultra-processed food,", startFrame: 138, endFrame: 215 },
  { text: "and sedentary behaviour.",                             startFrame: 223, endFrame: 260 },
  { text: "All four are lifestyle decisions.",                    startFrame: 268, endFrame: 315 },
  { text: "And all four are within your control.",               startFrame: 323, endFrame: 375 },
];

const S6_CAPS: CaptionChunk[] = [
  { text: "Four natural senolytics that actually work:",          startFrame: 0,   endFrame: 70  },
  { text: "fasting 16 to 24 hours triggers autophagy —",         startFrame: 78,  endFrame: 145 },
  { text: "your body's built-in zombie cell clearance system.",  startFrame: 153, endFrame: 225 },
  { text: "Zone 2 exercise is the most potent natural senolytic.", startFrame: 233, endFrame: 305 },
  { text: "Quercetin and fisetin have genuine senolytic evidence.", startFrame: 313, endFrame: 380 },
  { text: "And an anti-inflammatory diet removes the primary fuel.", startFrame: 388, endFrame: 450 },
];

const S7_CAPS: CaptionChunk[] = [
  { text: "Which of these four are you already doing",            startFrame: 0,   endFrame: 70  },
  { text: "to clear them?",                                       startFrame: 78,  endFrame: 110 },
  { text: "Fasting. Zone 2. Quercetin. Anti-inflammatory diet.",  startFrame: 118, endFrame: 200 },
  { text: "Drop your number below.",                              startFrame: 208, endFrame: 255 },
];

const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,  endFrame: 85  },
  { text: "Save this.",                                         startFrame: 93, endFrame: 125 },
  { text: "Your zombie cells are listening.",                   startFrame: 133, endFrame: 195 },
];

function getMusicVolume(frame: number): number {
  const S = ZCR_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start + S.scene6.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const ZombieCellsRemakeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = ZCR_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('zombie_cells_remake.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1ZCRHook         frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2ZCRStat         frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3ZCRWhatTheyAre  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4ZCRSpread       frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5ZCRAccelerators frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6ZCRProtocol     frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7ZCRLoopHook     frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8ZCRCTA          frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
