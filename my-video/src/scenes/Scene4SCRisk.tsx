import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const RED = '#FF4444';
const BG  = '#0a0508';

export const Scene4SCRisk: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const numOp  = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const numY   = interpolate(frame, [8,  22], [16, 0], { extrapolateRight: 'clamp' });
  const descOp = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });
  const descY  = interpolate(frame, [18, 32], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,68,68,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: 40 }}>
        The Risk Side
      </div>

      <div style={{ opacity: numOp, transform: `translateY(${numY}px)`, marginBottom: 8 }}>
        <span style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 180, lineHeight: 0.85, color: RED, display: 'block' }}>15/day</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.greige }}>Cigarettes, Equivalent</span>
      </div>

      <div style={{ height: 2, backgroundColor: `rgba(255,68,68,0.3)`, margin: '32px 0' }} />

      <div style={{ opacity: descOp, transform: `translateY(${descY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.5 }}>
        Chronic loneliness carries a mortality risk comparable to smoking fifteen cigarettes a day, according to a major meta-analysis.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
