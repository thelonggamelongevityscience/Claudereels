import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const RED   = '#FF4D6D';
const GREEN = '#00FF85';
const BG    = '#0D0D0D';

export const Scene5IP1Question: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  24], [16, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [24, 46], [0, 100], { extrapolateRight: 'clamp' });
  const r1Op  = interpolate(frame, [44, 58], [0, 1], { extrapolateRight: 'clamp' });
  const r1Y   = interpolate(frame, [44, 58], [12, 0], { extrapolateRight: 'clamp' });
  const r2Op  = interpolate(frame, [58, 72], [0, 1], { extrapolateRight: 'clamp' });
  const r2Y   = interpolate(frame, [58, 72], [12, 0], { extrapolateRight: 'clamp' });
  const r3Op  = interpolate(frame, [72, 86], [0, 1], { extrapolateRight: 'clamp' });
  const r3Y   = interpolate(frame, [72, 86], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 35%, rgba(255,77,109,0.08) 0%, transparent 65%)`,
        pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: RED, marginBottom: 20 }}>
        The Question
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow,
        fontWeight: 900, fontSize: 100, lineHeight: 0.88, textTransform: 'uppercase',
        color: COLORS.white, marginBottom: 28 }}>
        Have You Ever<br />Tested<br />hs-CRP?
      </div>

      <div style={{ height: 2, backgroundColor: RED, width: `${lineW}%`, marginBottom: 32 }} />

      <div style={{ opacity: r1Op, transform: `translateY(${r1Y}px)`, display: 'flex',
        alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: GREEN, flexShrink: 0 }} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.5 }}>
          Under <strong style={{ color: COLORS.white }}>1.0 mg/L</strong> — generally lower risk
        </div>
      </div>

      <div style={{ opacity: r2Op, transform: `translateY(${r2Y}px)`, display: 'flex',
        alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: RED, flexShrink: 0 }} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.5 }}>
          Over <strong style={{ color: COLORS.white }}>3.0 mg/L</strong> — higher risk
        </div>
      </div>

      <div style={{ opacity: r3Op, transform: `translateY(${r3Y}px)`, fontFamily: FONTS.mono,
        fontSize: 24, color: COLORS.greige, lineHeight: 1.5, marginTop: 16 }}>
        Ask your doctor if it makes sense for you.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
