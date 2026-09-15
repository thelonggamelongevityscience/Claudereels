import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const VIOLET = '#A855F7';
const BG     = '#0a0714';

export const Scene4ARRWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y   = interpolate(frame, [18, 32], [12, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [26, 40], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y   = interpolate(frame, [26, 40], [12, 0], { extrapolateRight: 'clamp' });
  const b3Op  = interpolate(frame, [34, 48], [0, 1], { extrapolateRight: 'clamp' });
  const b3Y   = interpolate(frame, [34, 48], [12, 0], { extrapolateRight: 'clamp' });

  const bullet = (op: number, y: number, text: React.ReactNode) => (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: VIOLET, flexShrink: 0, marginTop: 10 }} />
      <span style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.5 }}>{text}</span>
    </div>
  );

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(168,85,247,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VIOLET, marginBottom: 24 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, color: COLORS.white, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 36 }}>
        Cleanup Before<br />Problems Start.
      </div>

      {bullet(b1Op, b1Y, <>Damaged proteins that <strong style={{ color: COLORS.white }}>aren't cleared</strong> are linked to inflammation and age-related disease.</>)}
      {bullet(b2Op, b2Y, <>Autophagy is one proposed mechanism behind <strong style={{ color: COLORS.white }}>fasting and caloric restriction</strong> research in longevity science.</>)}
      {bullet(b3Op, b3Y, <>It's a <strong style={{ color: COLORS.white }}>normal, ongoing process</strong> — not something exotic you have to manufacture from scratch.</>)}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
