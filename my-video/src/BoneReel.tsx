import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, BONE_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1BONHook }           from './scenes/Scene1BONHook';
import { Scene2BONWhatsHappening } from './scenes/Scene2BONWhatsHappening';
import { Scene3BONWhyItMatters }   from './scenes/Scene3BONWhyItMatters';
import { Scene4BONWhatAccelerates } from './scenes/Scene4BONWhatAccelerates';
import { Scene5BONHowToProtect }   from './scenes/Scene5BONHowToProtect';
import { Scene6BONWhereYouStand }  from './scenes/Scene6BONWhereYouStand';
import { Scene7BONLoopHook }       from './scenes/Scene7BONLoopHook';
import { Scene8BONCTA }            from './scenes/Scene8BONCTA';

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

// S1: Hook — 270f  (0.000–9.009s)
const S1_CAPS: CaptionChunk[] = [
  { text: "Your bones are already shrinking. Most people find", startFrame: 0,   endFrame: 79  },
  { text: "out too late. Bone density peaks around 30",        startFrame: 80,  endFrame: 158 },
  { text: "— it's mostly downhill from there, unless you",    startFrame: 164, endFrame: 243 },
  { text: "intervene.",                                        startFrame: 246, endFrame: 270 },
];

// S2: What's Happening — 368f  (9.009–21.269s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Bone density peaks around age 30, then declines",       startFrame: 0,   endFrame: 99  },
  { text: "slowly and silently. For women, the decline accelerates", startFrame: 100, endFrame: 208 },
  { text: "sharply for 5 to 10 years after menopause.",            startFrame: 209, endFrame: 279 },
  { text: "There are no symptoms until a fracture happens.",        startFrame: 293, endFrame: 368 },
];

// S3: Why It Matters — 425f  (21.269–35.433s)
const S3_CAPS: CaptionChunk[] = [
  { text: "One in 2 women and 1 in 4",                             startFrame: 0,   endFrame: 52  },
  { text: "men over 50 will experience an osteoporosis fracture.", startFrame: 54,  endFrame: 142 },
  { text: "A hip fracture after 65 carries real mortality",        startFrame: 152, endFrame: 241 },
  { text: "risk. And bone is trainable — it responds",            startFrame: 243, endFrame: 334 },
  { text: "to mechanical stress the same way muscle does.",        startFrame: 335, endFrame: 425 },
];

// S4: What Accelerates Loss — 330f  (35.433–46.439s)
const S4_CAPS: CaptionChunk[] = [
  { text: "No resistance or impact training. Chronically low protein",  startFrame: 0,   endFrame: 99  },
  { text: "and calcium. Excess alcohol and smoking. And undiagnosed",   startFrame: 102, endFrame: 219 },
  { text: "low vitamin D, which blocks calcium absorption entirely.",   startFrame: 220, endFrame: 330 },
];

// S5: How To Protect It — 344f  (46.439–57.910s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Resistance train 2 to 3 times a week.",          startFrame: 0,   endFrame: 85  },
  { text: "Add impact — jogging, jumping, stairs. Hit your", startFrame: 95,  endFrame: 218 },
  { text: "protein and calcium targets daily. And get your", startFrame: 219, endFrame: 305 },
  { text: "vitamin D tested.",                               startFrame: 307, endFrame: 344 },
];

// S6: Where You Stand — 369f  (57.910–70.217s)
const S6_CAPS: CaptionChunk[] = [
  { text: "A DEXA scan measures bone density directly —",    startFrame: 0,   endFrame: 85  },
  { text: "the gold standard. Catching low density in your", startFrame: 94,  endFrame: 181 },
  { text: "30s or 40s gives you years to intervene.",        startFrame: 183, endFrame: 253 },
  { text: "Almost nobody checks it early enough to use",     startFrame: 268, endFrame: 338 },
  { text: "that advantage.",                                 startFrame: 339, endFrame: 369 },
];

// S7: Loop Hook — 196f  (70.217–76.765s)
const S7_CAPS: CaptionChunk[] = [
  { text: "Have you ever had a bone density scan?",        startFrame: 0,   endFrame: 60  },
  { text: "Most people haven't, even in their 40s. Drop", startFrame: 73,  endFrame: 152 },
  { text: "a yes or no below.",                           startFrame: 153, endFrame: 196 },
];

// S8: CTA — 143f  (76.765–81.548s)
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.", startFrame: 0,  endFrame: 76  },
  { text: "Save this before your next checkup.",               startFrame: 89, endFrame: 143 },
];

function getMusicVolume(frame: number): number {
  const S = BONE_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const BoneReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = BONE_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('bone.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1BONHook           frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2BONWhatsHappening frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3BONWhyItMatters   frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4BONWhatAccelerates frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5BONHowToProtect   frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6BONWhereYouStand  frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7BONLoopHook       frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8BONCTA            frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
