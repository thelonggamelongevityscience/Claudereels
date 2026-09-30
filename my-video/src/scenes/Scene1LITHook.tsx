import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const BG      = '#12040c';

export const Scene1LITHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emoOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const emoY   = interpolate(frame, [0,  14], [14, 0], { extrapolateRight: 'clamp' });
  const titOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const titY   = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [22, 38], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(224,51,156,0.09) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emoOp, transform: `translateY(${emoY}px)`, fontSize: 96, lineHeight: 1,
        filter: 'drop-shadow(0 0 32px rgba(224,51,156,0.7))', marginBottom: 24 }}>
        💧
      </div>

      <div style={{ opacity: titOp, transform: `translateY(${titY}px)`, fontFamily: FONTS.barlow, fontWeight: 900,
        fontSize: 112, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white,
        letterSpacing: '-0.02em', marginBottom: 36 }}>
        YOUR TAP<br />WATER MAY BE<br />PROTECTING<br />YOUR BRAIN.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic',
        fontSize: 38, color: COLORS.greige, lineHeight: 1.45 }}>
        Nobody designed a trial for this.<br />
        <strong style={{ color: COLORS.white }}>They found it in the data.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
