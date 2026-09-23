import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const YELLOW = '#FFC53D';
const BG     = '#0e0a02';

export const Scene1VDHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [22, 36], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [22, 36], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,197,61,0.12) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 120, lineHeight: 1, marginBottom: 24, filter: `drop-shadow(0 0 40px rgba(255,197,61,0.6))` }}>
        ☀️
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 86, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        VITAMIN D.<br />MYTH VERSUS<br />REALITY.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.4 }}>
        The most common deficiency in the world. <strong style={{ color: COLORS.white }}>Also the most misunderstood.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
