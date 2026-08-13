import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3VO2Mechanism: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const box1Op = interpolate(frame, [20, 38], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y  = interpolate(frame, [20, 38], [18, 0], { extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [40, 58], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y  = interpolate(frame, [40, 58], [18, 0], { extrapolateRight: 'clamp' });
  const box3Op = interpolate(frame, [60, 78], [0, 1], { extrapolateRight: 'clamp' });
  const box3Y  = interpolate(frame, [60, 78], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="orange" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 14 }}>
        The Mechanism
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        YOUR ENTIRE<br />SYSTEM.<br />ONE NUMBER.
      </div>

      {[
        { label: 'What It Measures', body: 'The maximum rate your body can use oxygen during intense exercise.', op: box1Op, y: box1Y },
        { label: 'What It Reflects', body: 'How efficiently your heart, lungs, and muscles work together as one system.', op: box2Op, y: box2Y },
        { label: 'What It Predicts', body: 'Survival — better than blood pressure, cholesterol, or BMI.', op: box3Op, y: box3Y },
      ].map((item, i) => (
        <div key={i} style={{ opacity: item.op, transform: `translateY(${item.y}px)`, borderLeft: `3px solid ${COLORS.orange}`, paddingLeft: 20, marginBottom: 18 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 5 }}>{item.label}</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>{item.body}</div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
