import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { ARR_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1ARRHook }        from './scenes/Scene1ARRHook';
import { Scene2ARRMechanism }   from './scenes/Scene2ARRMechanism';
import { Scene3ARRTimeline }    from './scenes/Scene3ARRTimeline';
import { Scene4ARRWhyItMatters } from './scenes/Scene4ARRWhyItMatters';
import { Scene5ARRProtocol }    from './scenes/Scene5ARRProtocol';
import { Scene6ARRCaution }     from './scenes/Scene6ARRCaution';
import { Scene7ARRSendThis }    from './scenes/Scene7ARRSendThis';
import { Scene8ARRTA }          from './scenes/Scene8ARRTA';

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

// S1: Hook — 248f
const S1_CAPS: CaptionChunk[] = [
  { text: "In 2016, a scientist won the", startFrame:    0, endFrame:   70 },
  { text: "Nobel Prize for this. It's happening", startFrame:   71, endFrame:  142 },
  { text: "inside you right now. Most people", startFrame:  143, endFrame:  201 },
  { text: "have never heard of it.", startFrame:  202, endFrame:  247 },
];

// S2: The Mechanism — 441f
const S2_CAPS: CaptionChunk[] = [
  { text: "Autophagy — literally self-eating in Greek", startFrame:    0, endFrame:   77 },
  { text: "— is the process by which", startFrame:   78, endFrame:  124 },
  { text: "cells break down and recycle their", startFrame:  125, endFrame:  186 },
  { text: "own damaged components. Yoshinori Ohsumi won", startFrame:  187, endFrame:  280 },
  { text: "the 2016 Nobel Prize in Medicine", startFrame:  281, endFrame:  363 },
  { text: "for mapping out exactly how it", startFrame:  364, endFrame:  408 },
  { text: "works.", startFrame:  409, endFrame:  440 },
];

// S3: The Timeline — 359f
const S3_CAPS: CaptionChunk[] = [
  { text: "Autophagy activity rises the longer you", startFrame:    0, endFrame:   70 },
  { text: "go without eating. Minimal at first,", startFrame:   71, endFrame:  141 },
  { text: "beginning around 8 hours, rising by", startFrame:  142, endFrame:  204 },
  { text: "12, meaningfully up by 16, and", startFrame:  205, endFrame:  295 },
  { text: "peaking around 24 hours.", startFrame:  296, endFrame:  358 },
];

// S4: Why It Matters — 335f
const S4_CAPS: CaptionChunk[] = [
  { text: "Damaged proteins that aren't cleared are", startFrame:    0, endFrame:   69 },
  { text: "linked to inflammation and age-related disease.", startFrame:   70, endFrame:  157 },
  { text: "This is one proposed mechanism behind", startFrame:  158, endFrame:  217 },
  { text: "fasting and caloric restriction research in", startFrame:  218, endFrame:  288 },
  { text: "longevity science.", startFrame:  289, endFrame:  334 },
];

// S5: The Protocol — 346f
const S5_CAPS: CaptionChunk[] = [
  { text: "A consistent overnight fasting window, even", startFrame:    0, endFrame:   82 },
  { text: "12 hours, contributes. Exercise independently stimulates", startFrame:   83, endFrame:  203 },
  { text: "it too. Quality sleep supports related", startFrame:  204, endFrame:  287 },
  { text: "cleanup processes in the brain.", startFrame:  288, endFrame:  345 },
];

// S6: Worth Knowing — 294f
const S6_CAPS: CaptionChunk[] = [
  { text: "You don't need extreme fasting. Most", startFrame:    0, endFrame:   69 },
  { text: "research uses moderate windows. Talk to", startFrame:   70, endFrame:  146 },
  { text: "a doctor before attempting extended fasts,", startFrame:  147, endFrame:  218 },
  { text: "especially with any underlying condition.", startFrame:  219, endFrame:  293 },
];

// S7: Send Trigger — 95f
const S7_CAPS: CaptionChunk[] = [
  { text: "Send this to someone who's never", startFrame:    0, endFrame:   44 },
  { text: "heard of autophagy.", startFrame:   45, endFrame:   94 },
];

// S8: CTA — 120f
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Save this,", startFrame:    0, endFrame:   68 },
  { text: "it's basically science class.", startFrame:   69, endFrame:  119 },
];

function getMusicVolume(frame: number): number {
  const S = ARR_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene7.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const AutophagyRemakeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = ARR_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0714' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('autophagy.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1ARRHook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2ARRMechanism   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3ARRTimeline    frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4ARRWhyItMatters frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5ARRProtocol    frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6ARRCaution     frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7ARRSendThis    frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8ARRTA          frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
