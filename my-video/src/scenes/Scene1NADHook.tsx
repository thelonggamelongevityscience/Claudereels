import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const INDIGO = '#6366F1';
const BG     = '#050414';

export const Scene1NADHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const emoOp  = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const emoY   = interpolate(frame, [8,  22], [12, 0], { extrapolateRight: 'clamp' });
  const titOp  = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const titY   = interpolate(frame, [12, 28], [12, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [22, 38], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.09) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, display: 'inline-block', background: 'rgba(99,102,241,0.14)', border: '1px solid rgba(99,102,241,0.4)', color: INDIGO, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '8px 20px', marginBottom: 36 }}>
        What's Actually Proven About Aging · Ep. 1
      </div>

      <div style={{ opacity: emoOp, transform: `translateY(${emoY}px)`, fontSize: 96, lineHeight: 1, filter: `drop-shadow(0 0 32px rgba(99,102,241,0.7))`, marginBottom: 20 }}>
        💊
      </div>

      <div style={{ opacity: titOp, transform: `translateY(${titY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 118, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, letterSpacing: '-0.02em', marginBottom: 32 }}>
        NAD+ IS A<br />MULTI-BILLION<br />DOLLAR<br />SUPPLEMENT.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 40, color: COLORS.greige, lineHeight: 1.4 }}>
        Here's what's <strong style={{ color: COLORS.white }}>actually proven.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
