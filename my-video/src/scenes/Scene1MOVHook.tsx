import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const LIME = '#C6FF3D';
const BG   = '#080e02';

export const Scene1MOVHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0,  14], [20, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [10, 26], [24, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [22, 38], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, rgba(198,255,61,0.09) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 96, lineHeight: 1, filter: 'drop-shadow(0 0 28px rgba(198,255,61,0.65))', marginBottom: 32 }}>
        🏃
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 108, color: COLORS.white, lineHeight: 0.88, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 36 }}>
        WHAT'S YOUR<br />MOVEMENT<br />TYPE?
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 38, color: COLORS.greige, lineHeight: 1.45 }}>
        Comment your favorite way to move.<br />
        <strong style={{ color: COLORS.white }}>I'll tell you what it means.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
