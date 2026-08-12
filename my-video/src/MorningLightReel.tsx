import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, ML_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1MLHook }        from './scenes/Scene1MLHook';
import { Scene2MLMechanism }   from './scenes/Scene2MLMechanism';
import { Scene3MLWhyItMatters } from './scenes/Scene3MLWhyItMatters';
import { Scene4MLBlocks }      from './scenes/Scene4MLBlocks';
import { Scene5MLFix }         from './scenes/Scene5MLFix';
import { Scene6MLLuxGap }      from './scenes/Scene6MLLuxGap';
import { Scene7MLLoopHook }    from './scenes/Scene7MLLoopHook';
import { Scene8MLCTA }         from './scenes/Scene8MLCTA';

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

// S1: 3 chunks, audio_frames=219
const S1_CAPS: CaptionChunk[] = [
  { text: "Your first 30 minutes awake decide tonight's sleep.",        startFrame:   0, endFrame:  74 },
  { text: "Most people wreck it before they even leave the bedroom.",   startFrame:  90, endFrame: 167 },
  { text: "Here's what's actually happening.",                          startFrame: 175, endFrame: 219 },
];

// S2: 6 chunks, audio_frames=496
const S2_CAPS: CaptionChunk[] = [
  { text: "Specialized cells in your retina detect light and send a signal straight to your brain's master clock.", startFrame:   0, endFrame: 147 },
  { text: "That single signal sets a countdown — roughly 14 to 16 hours later, your brain releases the melatonin that puts you to sleep.", startFrame: 155, endFrame: 400 },
  { text: "Miss the signal and the countdown starts late.",             startFrame: 420, endFrame: 496 },
];

// S3: 5 chunks, audio_frames=460
const S3_CAPS: CaptionChunk[] = [
  { text: "Morning light triggers the healthy cortisol spike that should happen at wake-up, not at 11pm.", startFrame:   0, endFrame: 170 },
  { text: "It shifts your melatonin release time.",                    startFrame: 178, endFrame: 249 },
  { text: "It produces deeper, less fragmented sleep.",                startFrame: 257, endFrame: 321 },
  { text: "And it regulates the same pathway that controls your mood by 3pm.", startFrame: 329, endFrame: 460 },
];

// S4: 5 chunks, audio_frames=461
const S4_CAPS: CaptionChunk[] = [
  { text: "Four things sabotage your morning signal.",                  startFrame:   0, endFrame:  71 },
  { text: "Scrolling your phone before sunlight.",                     startFrame:  79, endFrame: 133 },
  { text: "Leaving the blackout curtains closed.",                     startFrame: 141, endFrame: 197 },
  { text: "Putting sunglasses on the second you step outside.",        startFrame: 211, endFrame: 287 },
  { text: "And drinking coffee before light — which masks the tiredness while the delay compounds.", startFrame: 297, endFrame: 461 },
];

// S5: 6 chunks, audio_frames=435
const S5_CAPS: CaptionChunk[] = [
  { text: "Get outside within 30 minutes of waking.",                  startFrame:   0, endFrame:  69 },
  { text: "No sunglasses, no window glass in between.",                startFrame:  77, endFrame: 147 },
  { text: "Five to ten minutes is enough, even on a cloudy day.",      startFrame: 155, endFrame: 245 },
  { text: "Consistency beats duration.",                               startFrame: 253, endFrame: 287 },
  { text: "And pairing it with a short walk does double duty for your cortisol too.", startFrame: 295, endFrame: 435 },
];

// S6: 5 chunks, audio_frames=431
const S6_CAPS: CaptionChunk[] = [
  { text: "Typical indoor lighting is around 200 to 500 lux.",         startFrame:   0, endFrame: 103 },
  { text: "Outdoor light, even overcast, is 1,000 to 2,000 lux or more.", startFrame: 111, endFrame: 253 },
  { text: "Your brain isn't judging brightness the way it looks to your eyes.", startFrame: 261, endFrame: 350 },
  { text: "It's measuring lux. Go outside.",                           startFrame: 360, endFrame: 431 },
];

// S7: 3 chunks, audio_frames=198
const S7_CAPS: CaptionChunk[] = [
  { text: "What time did you get outside today?",                      startFrame:   0, endFrame:  64 },
  { text: "Before coffee, before your phone, before anything else.",   startFrame:  72, endFrame: 154 },
  { text: "Drop your time below.",                                     startFrame: 162, endFrame: 198 },
];

// S8: 2 chunks, audio_frames=141
const S8_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game for daily longevity science.",         startFrame:   0, endFrame:  77 },
  { text: "Save this for tomorrow morning.",                           startFrame:  90, endFrame: 141 },
];

function getMusicVolume(frame: number): number {
  const S = ML_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene5.start + S.scene5.duration;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const MorningLightReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = ML_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('morning_light.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1MLHook        frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2MLMechanism   frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3MLWhyItMatters frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4MLBlocks      frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5MLFix         frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6MLLuxGap      frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7MLLoopHook    frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
      <Sequence from={S.scene8.start} durationInFrames={S.scene8.duration}>
        <Scene8MLCTA         frame={frame - S.scene8.start} captionChunks={S8_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
