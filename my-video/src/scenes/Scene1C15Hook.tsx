import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const TEAL = '#2DD4BF';
const BG   = '#050a09';

export const Scene1C15Hook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0,  14], [20, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [12, 28], [20, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [26, 42], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(45,212,191,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 110, lineHeight: 1, filter: `drop-shadow(0 0 30px rgba(45,212,191,0.6))`, marginBottom: 28 }}>
        🔬
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 108, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, letterSpacing: '-0.02em', marginBottom: 28 }}>
        SCIENTISTS<br />JUST FOUND<br />A NEW<br />ESSENTIAL<br />NUTRIENT.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.4 }}>
        The first one in over 90 years.<br />
        <strong style={{ color: COLORS.white }}>Almost nobody{"'"}s heard of it yet.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
