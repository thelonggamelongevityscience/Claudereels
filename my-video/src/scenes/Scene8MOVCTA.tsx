import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const LIME = '#C6FF3D';
const BG   = '#080e02';

export const Scene8MOVCTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const logoOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const logoY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [12, 28], [12, 0], { extrapolateRight: 'clamp' });
  const hashOp = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: 'clamp' });
  const hashY  = interpolate(frame, [24, 38], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(198,255,61,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 36, color: COLORS.greige }}>the</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 130, color: COLORS.white, lineHeight: 0.85, textTransform: 'uppercase' }}>LONG<br />GAME</div>
        <div style={{ height: 2, backgroundColor: LIME, marginTop: 16, marginBottom: 0, width: '100%' }} />
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 36, color: COLORS.greige, lineHeight: 1.5, marginBottom: 32 }}>
        Tag a friend and see if their type<br />
        <strong style={{ color: COLORS.white }}>matches how they actually move.</strong>
      </div>

      <div style={{ opacity: hashOp, transform: `translateY(${hashY}px)`, fontFamily: FONTS.mono, fontSize: 20, color: `rgba(198,255,61,0.6)`, lineHeight: 1.8 }}>
        #movementtype #longevity #fitness #wellness #healthylifestyle
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
