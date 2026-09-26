import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const LIME  = '#C6FF3D';
const GREEN = '#00FF85';
const BG    = '#080e02';

export const Scene7MOVCommentTrigger: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp    = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY     = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp     = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY      = interpolate(frame, [10, 26], [24, 0], { extrapolateRight: 'clamp' });
  const badgeOp  = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY   = interpolate(frame, [20, 36], [12, 0], { extrapolateRight: 'clamp' });
  const subOp    = interpolate(frame, [30, 46], [0, 1], { extrapolateRight: 'clamp' });
  const subY     = interpolate(frame, [30, 46], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, rgba(198,255,61,0.09) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: LIME, marginBottom: 20 }}>
        Your Turn
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 104, color: COLORS.white, lineHeight: 0.88, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 36 }}>
        How Do You<br />Move?
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(0,255,133,0.10)', border: '1px solid rgba(0,255,133,0.35)', padding: '18px 36px', marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: GREEN, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>💬 Comment It Below</div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.5 }}>
        I'll reply with your archetype<br />
        <strong style={{ color: COLORS.white }}>and the science behind it.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
