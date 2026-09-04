import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props {
  frame: number;
  captionChunks?: CaptionChunk[];
  mythNum: string;
  mythText: string;
  realityText: React.ReactNode;
}

export const SceneGLPMythReality: React.FC<Props> = ({ frame, captionChunks, mythNum, mythText, realityText }) => {
  const numOp    = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const numY     = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const mythOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const mythY    = interpolate(frame, [10, 26], [18, 0], { extrapolateRight: 'clamp' });
  const realOp   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const realY    = interpolate(frame, [22, 38], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: '#07080c', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      {/* numbered counter */}
      <div style={{ opacity: numOp, transform: `translateY(${numY}px)`, fontFamily: FONTS.mono, fontSize: 22, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
        {mythNum}
      </div>

      {/* myth block */}
      <div style={{ opacity: mythOp, transform: `translateY(${mythY}px)`, backgroundColor: 'rgba(255,77,109,0.07)', border: '1.5px solid rgba(255,77,109,0.35)', padding: '32px 36px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, color: COLORS.red, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>
          ✕ The Myth
        </div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 42, color: 'rgba(255,255,255,0.6)', lineHeight: 1.2, textDecoration: 'line-through', textDecorationColor: 'rgba(255,77,109,0.5)' }}>
          {mythText}
        </div>
      </div>

      {/* reality block */}
      <div style={{ opacity: realOp, transform: `translateY(${realY}px)`, backgroundColor: 'rgba(0,255,133,0.07)', border: '1.5px solid rgba(0,255,133,0.35)', padding: '32px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, color: COLORS.green, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>
          ✓ The Reality
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          {realityText}
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
