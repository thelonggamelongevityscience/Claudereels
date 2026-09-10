import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BT_SCENES } from './constants';
import { CaptionChunk } from './components/Caption';
import { Scene1BTHook }           from './scenes/Scene1BTHook';
import { Scene2BTWhatsHappening } from './scenes/Scene2BTWhatsHappening';
import { Scene3BTWhyItMatters }   from './scenes/Scene3BTWhyItMatters';
import { Scene4BTWhatKeepsItWarm } from './scenes/Scene4BTWhatKeepsItWarm';
import { Scene5BTTheFix }         from './scenes/Scene5BTTheFix';
import { Scene6BTTonight }        from './scenes/Scene6BTTonight';
import { Scene7BTCTA }            from './scenes/Scene7BTCTA';

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

// S1: Hook — 172f  (0.000–5.735s)
const S1_CAPS: CaptionChunk[] = [
  { text: "Your bedroom is probably too warm", startFrame:   0, endFrame:  43 },
  { text: "to sleep well. Not too dark.",      startFrame:  44, endFrame: 103 },
  { text: "Not too quiet. Too warm.",           startFrame: 108, endFrame: 172 },
];

// S2: What's Happening — 394f  (5.979–19.121s)
const S2_CAPS: CaptionChunk[] = [
  { text: "Your body needs to drop its",           startFrame:   0, endFrame:  39 },
  { text: "core temperature by 1 to 2",            startFrame:  41, endFrame:  87 },
  { text: "degrees to initiate and maintain sleep.", startFrame:  90, endFrame: 166 },
  { text: "A bedroom that's too warm fights",      startFrame: 184, endFrame: 243 },
  { text: "this process directly — sleep onset",   startFrame: 245, endFrame: 333 },
  { text: "delays and deep sleep gets cut",        startFrame: 334, endFrame: 380 },
  { text: "short.",                                startFrame: 382, endFrame: 394 },
];

// S3: Why It Matters — 388f  (19.504–32.427s)
const S3_CAPS: CaptionChunk[] = [
  { text: "Sleep researchers point to 65 to",          startFrame:   0, endFrame:  63 },
  { text: "68 degrees as optimal for most",            startFrame:  67, endFrame: 130 },
  { text: "adults. Deep sleep is when the",            startFrame: 131, endFrame: 193 },
  { text: "most repair happens, and temperature disruption", startFrame: 195, endFrame: 270 },
  { text: "cuts into it specifically. Most people",    startFrame: 272, endFrame: 343 },
  { text: "never think to check the thermostat.",      startFrame: 344, endFrame: 388 },
];

// S4: What Keeps It Warm — 284f  (32.810–42.284s)
const S4_CAPS: CaptionChunk[] = [
  { text: "Heavy synthetic bedding that traps heat.", startFrame:   0, endFrame:  61 },
  { text: "Leaving the thermostat at a daytime",      startFrame:  82, endFrame: 135 },
  { text: "setting. A hot shower too close",          startFrame: 137, endFrame: 203 },
  { text: "to bedtime without enough cool-down time.", startFrame: 204, endFrame: 284 },
];

// S5: The Fix — 396f  (42.980–56.169s)
const S5_CAPS: CaptionChunk[] = [
  { text: "Set the thermostat to 65 to",           startFrame:   0, endFrame:  61 },
  { text: "68 degrees about an hour before",       startFrame:  63, endFrame: 116 },
  { text: "bed. A warm shower 1 to",               startFrame: 118, endFrame: 188 },
  { text: "2 hours before bed actually helps,",    startFrame: 192, endFrame: 253 },
  { text: "thanks to the rebound cooling effect.", startFrame: 260, endFrame: 315 },
  { text: "Swap heavy bedding for breathable fabrics.", startFrame: 326, endFrame: 396 },
];

// S6: Tonight — 287f  (56.552–66.108s)
const S6_CAPS: CaptionChunk[] = [
  { text: "Check your thermostat before bed tonight.", startFrame:   0, endFrame:  66 },
  { text: "One setting, zero cost. What's your",      startFrame:  81, endFrame: 155 },
  { text: "bedroom set to right now? Send",            startFrame: 156, endFrame: 213 },
  { text: "this to someone who complains about",       startFrame: 214, endFrame: 262 },
  { text: "bad sleep.",                               startFrame: 263, endFrame: 287 },
];

// S7: CTA — 91f  (66.804–69.846s)
const S7_CAPS: CaptionChunk[] = [
  { text: "Follow The Long Game. Save this", startFrame:  0, endFrame: 63 },
  { text: "for tonight.",                    startFrame: 65, endFrame: 91 },
];

function getMusicVolume(frame: number): number {
  const S = BT_SCENES;
  const hookEnd  = S.scene1.start + S.scene1.duration;
  const instrEnd = S.scene6.start;
  const fade = 30;
  if (frame < hookEnd) return 0.5;
  if (frame < hookEnd + fade) return interpolate(frame, [hookEnd, hookEnd + fade], [0.5, 0.08]);
  if (frame < instrEnd) return 0.08;
  if (frame < instrEnd + fade) return interpolate(frame, [instrEnd, instrEnd + fade], [0.08, 0.5]);
  return 0.5;
}

export const BedroomTempReel: React.FC = () => {
  const frame = useCurrentFrame();
  const S = BT_SCENES;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050810' }}>
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Audio src={staticFile('music.wav')} volume={getMusicVolume(frame)} loop />
      <Audio src={staticFile('bedroomtemp.mp3')} volume={1} />

      <Sequence from={S.scene1.start} durationInFrames={S.scene1.duration}>
        <Scene1BTHook           frame={frame - S.scene1.start} captionChunks={S1_CAPS} />
      </Sequence>
      <Sequence from={S.scene2.start} durationInFrames={S.scene2.duration}>
        <Scene2BTWhatsHappening frame={frame - S.scene2.start} captionChunks={S2_CAPS} />
      </Sequence>
      <Sequence from={S.scene3.start} durationInFrames={S.scene3.duration}>
        <Scene3BTWhyItMatters   frame={frame - S.scene3.start} captionChunks={S3_CAPS} />
      </Sequence>
      <Sequence from={S.scene4.start} durationInFrames={S.scene4.duration}>
        <Scene4BTWhatKeepsItWarm frame={frame - S.scene4.start} captionChunks={S4_CAPS} />
      </Sequence>
      <Sequence from={S.scene5.start} durationInFrames={S.scene5.duration}>
        <Scene5BTTheFix         frame={frame - S.scene5.start} captionChunks={S5_CAPS} />
      </Sequence>
      <Sequence from={S.scene6.start} durationInFrames={S.scene6.duration}>
        <Scene6BTTonight        frame={frame - S.scene6.start} captionChunks={S6_CAPS} />
      </Sequence>
      <Sequence from={S.scene7.start} durationInFrames={S.scene7.duration}>
        <Scene7BTCTA            frame={frame - S.scene7.start} captionChunks={S7_CAPS} />
      </Sequence>
    </AbsoluteFill>
  );
};
