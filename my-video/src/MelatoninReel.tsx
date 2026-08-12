import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, MEL_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1MELHook }       from './scenes/Scene1MELHook';
import { Scene2MELWhatItIs }   from './scenes/Scene2MELWhatItIs';
import { Scene3MELWhyItMatters } from './scenes/Scene3MELWhyItMatters';
import { Scene4MELWhatsWrong } from './scenes/Scene4MELWhatsWrong';
import { Scene5MELHowToUse }   from './scenes/Scene5MELHowToUse';
import { Scene6MELPattern }    from './scenes/Scene6MELPattern';
import { Scene7MELLoopHook }   from './scenes/Scene7MELLoopHook';
import { Scene8MELCTA }        from './scenes/Scene8MELCTA';

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

// S1: Hook — 228f
const S1_CAPS: CaptionChunk[] = [
  { text: "Your melatonin supplement is probably doing nothing.",              startFrame:   0, endFrame:  77 },
  { text: "Here's what it's actually for, and why your bottle is dosed wrong.", startFrame:  85, endFrame: 195 },
  { text: "Let's fix that.",                                                   startFrame: 203, endFrame: 228 },
];

// S2: What It Actually Is — 470f
const S2_CAPS: CaptionChunk[] = [
  { text: "Melatonin isn't what knocks you out.",                             startFrame:   0, endFrame:  72 },
  { text: "It's the hormone that tells your body it's getting dark, prepare for sleep.", startFrame:  80, endFrame: 200 },
  { text: "Your brain naturally releases it about 2 hours before your natural sleep time, at roughly 0.1 to 0.3 milligrams a night.", startFrame: 208, endFrame: 470 },
];

// S3: Why It Matters — 492f
const S3_CAPS: CaptionChunk[] = [
  { text: "Most over-the-counter melatonin is dosed at 3 to 10 milligrams — several multiples of what your body naturally uses.", startFrame:   0, endFrame: 211 },
  { text: "Megadoses can actually desensitize your receptors over time.",       startFrame: 219, endFrame: 328 },
  { text: "And timing matters more than dose — it's a clock-shifter, not a sedative.", startFrame: 336, endFrame: 492 },
];

// S4: What's Going Wrong — 372f
const S4_CAPS: CaptionChunk[] = [
  { text: "Three ways people get it backwards.",                               startFrame:   0, endFrame:  58 },
  { text: "Taking it as a sleeping pill right before bed.",                    startFrame:  66, endFrame: 147 },
  { text: "Taking a mega-dose that can blunt receptor sensitivity.",           startFrame: 155, endFrame: 243 },
  { text: "And scrolling your phone right after, which cancels the signal with light.", startFrame: 251, endFrame: 372 },
];

// S5: How To Use It — 443f
const S5_CAPS: CaptionChunk[] = [
  { text: "Use 0.3 to 1 milligram, not 5 or 10.",                             startFrame:   0, endFrame: 103 },
  { text: "Take it 1 to 2 hours before your target sleep time.",               startFrame: 111, endFrame: 205 },
  { text: "Save it for circadian shifts like jet lag or shift work.",           startFrame: 213, endFrame: 314 },
  { text: "And fix your light exposure first — that does more than any supplement.", startFrame: 322, endFrame: 443 },
];

// S6: The Pattern — 337f
const S6_CAPS: CaptionChunk[] = [
  { text: "Same story as protein powders and fat burners — a real mechanism, sold at a dose that doesn't match how it works.", startFrame:   0, endFrame: 213 },
  { text: "The mechanism is real.",                                             startFrame: 221, endFrame: 253 },
  { text: "The dose on your shelf probably isn't helping it.",                  startFrame: 261, endFrame: 337 },
];

// S7: Loop Hook — 138f
const S7_CAPS: CaptionChunk[] = [
  { text: "What dose is on your melatonin bottle?",                            startFrame:   0, endFrame:  67 },
  { text: "Go check right now.",                                                startFrame:  75, endFrame: 104 },
  { text: "Drop the number below.",                                             startFrame: 112, endFrame: 138 },
];

// S8: CTA — 149f
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",                  startFrame:   0, endFrame:  78 },
  { text: "Save this before you buy your next bottle.",                         startFrame:  91, endFrame: 149 },
];

function getMusicVolume(frame: number): number {
  const S = MEL_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const MelatoninReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = MEL_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('melatonin.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1MELHook       frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2MELWhatItIs   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3MELWhyItMatters frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4MELWhatsWrong frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5MELHowToUse   frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6MELPattern    frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7MELLoopHook   frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8MELCTA        frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
