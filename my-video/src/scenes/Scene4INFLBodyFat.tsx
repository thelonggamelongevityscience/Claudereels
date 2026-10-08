import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const ORANGE = '#FF6B2C';
const BG     = '#0e0805';

export const Scene4INFLBodyFat: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [18, 34], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y   = interpolate(frame, [18, 34], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 35%, rgba(255,107,44,0.07) 0%, transparent 65%)`,
        pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: ORANGE, marginBottom: 18 }}>
        03 · Body Fat
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow,
        fontWeight: 900, fontSize: 96, lineHeight: 0.88, textTransform: 'uppercase',
        color: COLORS.white, marginBottom: 44 }}>
        Lose Excess<br />Body Fat.
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`,
        borderLeft: `3px solid ${ORANGE}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: ORANGE, marginBottom: 10 }}>Evidence</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Across <strong style={{ color: COLORS.white }}>33 studies,</strong> every kilogram
          lost meant lower CRP.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
