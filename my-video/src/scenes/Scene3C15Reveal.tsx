import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const TEAL = '#2DD4BF';
const BG   = '#050a09';

export const Scene3C15Reveal: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [10, 24], [10, 0], { extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY  = interpolate(frame, [20, 36], [20, 0], { extrapolateRight: 'clamp' });
  const descOp  = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const descY   = interpolate(frame, [34, 50], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(45,212,191,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: TEAL, marginBottom: 24 }}>
        The Reveal
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, marginBottom: 32 }}>
        Meet the newest name on the list.
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: `2px solid ${TEAL}`, padding: '40px 48px', backgroundColor: 'rgba(45,212,191,0.06)', marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Also known as</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 120, color: TEAL, letterSpacing: '-0.01em', lineHeight: 0.9 }}>C15:0</div>
      </div>

      <div style={{ opacity: descOp, transform: `translateY(${descY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 28, color: COLORS.greige, lineHeight: 1.5 }}>
        Pentadecanoic acid. A saturated fatty acid found naturally in whole-fat dairy and some fish.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
