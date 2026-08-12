import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5MELHowToUse: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const b1Op   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y    = interpolate(frame, [22, 38], [16, 0], { extrapolateRight: 'clamp' });
  const b2Op   = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y    = interpolate(frame, [34, 50], [16, 0], { extrapolateRight: 'clamp' });
  const b3Op   = interpolate(frame, [46, 62], [0, 1], { extrapolateRight: 'clamp' });
  const b3Y    = interpolate(frame, [46, 62], [16, 0], { extrapolateRight: 'clamp' });
  const b4Op   = interpolate(frame, [58, 74], [0, 1], { extrapolateRight: 'clamp' });
  const b4Y    = interpolate(frame, [58, 74], [16, 0], { extrapolateRight: 'clamp' });

  const steps = [
    { text: 'Use 0.3 to 1mg, not 5 or 10 — closer to what your body naturally produces.', op: b1Op, y: b1Y },
    { text: 'Take it 1 to 2 hours before your target sleep time, not right as you lie down.', op: b2Op, y: b2Y },
    { text: 'Save it for circadian shifts: jet lag, shift work, or intentionally resetting your schedule — not as a nightly crutch.', op: b3Op, y: b3Y },
    { text: 'Fix your light exposure first — morning sunlight and evening darkness do more for your natural melatonin than any supplement.', op: b4Op, y: b4Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 14 }}>
        How To Actually Use It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.green, marginBottom: 28 }}>
        LOW DOSE.<br />RIGHT TIMING.<br />RIGHT PURPOSE.
      </div>

      {steps.map((s, i) => (
        <div key={i} style={{ opacity: s.op, transform: `translateY(${s.y}px)`, display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.green, flexShrink: 0, marginTop: 8, marginRight: 18 }} />
          <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: COLORS.greige, lineHeight: 1.5 }}>{s.text}</div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
