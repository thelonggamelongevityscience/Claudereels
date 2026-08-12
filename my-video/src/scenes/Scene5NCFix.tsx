import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5NCFix: React.FC<Props> = ({ frame, captionChunks }) => {
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
    { num: '01', text: 'Stop drinking 3 to 4 hours before bed.', op: b1Op, y: b1Y },
    { num: '02', text: 'Hydrate alongside every drink.', op: b2Op, y: b2Y },
    { num: '03', text: "Build in alcohol-free nights so REM debt doesn't compound.", op: b3Op, y: b3Y },
    { num: '04', text: 'Track how you actually feel the next day — not how fast you fell asleep.', op: b4Op, y: b4Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        How To Protect It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        YOU CAN STILL<br />DRINK. DO IT<br />SMARTER.
      </div>

      {steps.map((s, i) => (
        <div key={i} style={{ opacity: s.op, transform: `translateY(${s.y}px)`, display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 52, lineHeight: 1, color: COLORS.red, marginRight: 20, flexShrink: 0, opacity: 0.6 }}>{s.num}</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5, paddingTop: 6 }}>{s.text}</div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
