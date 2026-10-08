import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const ORANGE = '#FF6B2C';
const BG     = '#0e0805';

export const Scene1INFLHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emoOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const emoY   = interpolate(frame, [0,  12], [14, 0], { extrapolateRight: 'clamp' });
  const tagOp  = interpolate(frame, [6,  18], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [6,  18], [10, 0], { extrapolateRight: 'clamp' });
  const titOp  = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const titY   = interpolate(frame, [12, 28], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 40%, rgba(255,107,44,0.09) 0%, transparent 65%)`,
        pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emoOp, transform: `translateY(${emoY}px)`, fontSize: 96, lineHeight: 1,
        filter: 'drop-shadow(0 0 32px rgba(255,107,44,0.7))', marginBottom: 20 }}>
        🔥
      </div>

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: ORANGE, marginBottom: 24 }}>
        Part 2
      </div>

      <div style={{ opacity: titOp, transform: `translateY(${titY}px)`, fontFamily: FONTS.barlow,
        fontWeight: 900, fontSize: 108, lineHeight: 0.88, textTransform: 'uppercase',
        color: COLORS.white, letterSpacing: '-0.02em' }}>
        WHAT<br />ACTUALLY<br />LOWERS<br />INFLAMMATION?
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
