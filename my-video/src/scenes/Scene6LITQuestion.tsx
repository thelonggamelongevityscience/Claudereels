import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const GREEN   = '#00FF85';
const BG      = '#12040c';

export const Scene6LITQuestion: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [22, 38], [12, 0], { extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [60, 76], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY  = interpolate(frame, [60, 76], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(224,51,156,0.09) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22,
        fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 20 }}>
        Where You Stand
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900,
        fontSize: 100, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white,
        letterSpacing: '-0.02em', marginBottom: 36 }}>
        Ever Checked<br />What's In<br />Your Water?
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair,
        fontStyle: 'italic', fontSize: 36, color: COLORS.greige, lineHeight: 1.5, marginBottom: 40 }}>
        Most people have no idea what's actually in their tap.<br />
        <strong style={{ color: COLORS.white }}>Comment AGING and find out where you stand.</strong>
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'inline-flex',
        alignItems: 'center', gap: 12, background: 'rgba(0,255,133,0.10)',
        border: '1px solid rgba(0,255,133,0.35)', padding: '14px 24px' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: GREEN, fontWeight: 700,
          letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          💬 Comment AGING Below
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
