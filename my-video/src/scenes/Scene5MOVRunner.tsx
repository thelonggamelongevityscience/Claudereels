import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const LIME = '#C6FF3D';
const BG   = '#080e02';

export const Scene5MOVRunner: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const boxOp = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const boxY  = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [22, 38], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 80px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 42%, rgba(198,255,61,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: LIME, marginBottom: 20 }}>
        If You Said Running
      </div>

      <div style={{ opacity: boxOp, transform: `translateY(${boxY}px)`, border: `2px solid ${LIME}`, padding: '22px 36px', background: 'rgba(198,255,61,0.06)', marginBottom: 32, width: '100%' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>You Are</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 64, color: LIME, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05 }}>The Cardio Optimizer</div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.5 }}>
        Chasing the number that predicts<br />
        <strong style={{ color: COLORS.white }}>lifespan better than almost anything else.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
