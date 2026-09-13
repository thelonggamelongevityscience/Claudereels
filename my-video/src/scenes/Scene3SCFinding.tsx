import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const PINK = '#FF6B9D';
const BG   = '#0a0508';

export const Scene3SCFinding: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const numOp  = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const numY   = interpolate(frame, [8,  22], [16, 0], { extrapolateRight: 'clamp' });
  const descOp = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });
  const descY  = interpolate(frame, [18, 32], [12, 0], { extrapolateRight: 'clamp' });
  const ctxOp  = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: 'clamp' });
  const ctxY   = interpolate(frame, [28, 42], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,107,157,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: PINK, marginBottom: 40 }}>
        The Finding
      </div>

      <div style={{ opacity: numOp, transform: `translateY(${numY}px)`, marginBottom: 8 }}>
        <span style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 220, lineHeight: 0.85, color: PINK, display: 'block' }}>#1</span>
      </div>

      <div style={{ opacity: descOp, transform: `translateY(${descY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 48, color: COLORS.white, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 28 }}>
        Predictor of Health<br />at Age 80
      </div>

      <div style={{ height: 2, backgroundColor: `rgba(255,107,157,0.3)`, marginBottom: 28 }} />

      <div style={{ opacity: ctxOp, transform: `translateY(${ctxY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.5 }}>
        Not genetics. Not cholesterol levels. The quality of your relationships was more predictive than any biomarker they tracked.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
