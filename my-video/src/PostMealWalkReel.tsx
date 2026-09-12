import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { PMW_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1PMWHook }        from './scenes/Scene1PMWHook';
import { Scene2PMWMechanism }   from './scenes/Scene2PMWMechanism';
import { Scene3PMWComparison }  from './scenes/Scene3PMWComparison';
import { Scene4PMWWhyItMatters } from './scenes/Scene4PMWWhyItMatters';
import { Scene5PMWProtocol }    from './scenes/Scene5PMWProtocol';
import { Scene6PMWSendThis }    from './scenes/Scene6PMWSendThis';
import { Scene7PMWCTA }         from './scenes/Scene7PMWCTA';

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

// S1: Hook — 176f
const S1_CAPS: CaptionChunk[] = [
  { text: "Two people. Same meal. Different blood", startFrame:   0, endFrame: 111 },
  { text: "sugar. The difference is two minutes.", startFrame: 112, endFrame: 175 },
];

// S2: Mechanism — 334f
const S2_CAPS: CaptionChunk[] = [
  { text: "When your muscles contract during light",          startFrame:   0, endFrame:  80 },
  { text: "movement, they pull glucose out of",               startFrame:  81, endFrame: 145 },
  { text: "your bloodstream directly, independent of insulin.", startFrame: 146, endFrame: 226 },
  { text: "Right after eating is exactly when",               startFrame: 233, endFrame: 315 },
  { text: "that matters most.",                               startFrame: 316, endFrame: 333 },
];

// S3: Comparison — 266f
const S3_CAPS: CaptionChunk[] = [
  { text: "Sitting after a meal lets the",        startFrame:   0, endFrame:  72 },
  { text: "full blood sugar spike happen. Walking", startFrame:  73, endFrame: 148 },
  { text: "just 2 to 5 minutes afterward",        startFrame: 149, endFrame: 193 },
  { text: "blunts that spike by roughly 30",      startFrame: 194, endFrame: 255 },
  { text: "percent.",                             startFrame: 256, endFrame: 263 },
];

// S4: Why It Matters — 317f
const S4_CAPS: CaptionChunk[] = [
  { text: "Repeated post-meal spikes are linked to",        startFrame:   0, endFrame:  81 },
  { text: "long-term metabolic and cardiovascular risk, even", startFrame:  82, endFrame: 163 },
  { text: "in people without diabetes. This works",         startFrame: 164, endFrame: 242 },
  { text: "whether or not you already exercise",            startFrame: 243, endFrame: 287 },
  { text: "elsewhere in your day.",                         startFrame: 288, endFrame: 316 },
];

// S5: Protocol — 271f
const S5_CAPS: CaptionChunk[] = [
  { text: "You don't need a real walk.", startFrame:   0, endFrame:  62 },
  { text: "Pace during a phone call. Do", startFrame:  65, endFrame: 159 },
  { text: "the dishes standing. Take a short", startFrame: 160, endFrame: 220 },
  { text: "walk to get water right after", startFrame: 221, endFrame: 267 },
  { text: "eating.",                      startFrame: 268, endFrame: 270 },
];

// S6: Send This — 90f
const S6_CAPS: CaptionChunk[] = [
  { text: "Send this to someone who sits", startFrame:  0, endFrame: 65 },
  { text: "right after dinner.",           startFrame: 66, endFrame: 89 },
];

// S7: CTA — 103f
const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Save this", startFrame:  0, endFrame:  85 },
  { text: "for after dinner tonight.",       startFrame: 86, endFrame: 102 },
];

function getMusicVolume(frame: number): number {
  const S = PMW_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const PostMealWalkReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = PMW_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0704' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('postmealwalk.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1PMWHook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2PMWMechanism   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3PMWComparison  frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4PMWWhyItMatters frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5PMWProtocol    frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6PMWSendThis    frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7PMWCTA         frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
