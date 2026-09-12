import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const ORANGE = '#FF9800';
const BG     = '#0a0704';

export const Scene1PMWHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0,  12], [16, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [8,  22], [20, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [18, 32], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,152,0,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 120, lineHeight: 1, filter: 'drop-shadow(0 0 48px rgba(255,152,0,0.6))', marginBottom: 32 }}>🍽️</div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 100, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        TWO PEOPLE.<br />SAME MEAL.<br />DIFFERENT<br />BLOOD SUGAR.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 36, color: COLORS.greige, lineHeight: 1.4 }}>
        The difference is <span style={{ color: COLORS.white, fontStyle: 'normal' }}>two minutes.</span>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
