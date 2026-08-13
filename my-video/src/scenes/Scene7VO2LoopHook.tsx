import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7VO2LoopHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const h1Op    = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const h1Y     = interpolate(frame, [8,  22], [20, 0], { extrapolateRight: 'clamp' });
  const h2Op    = interpolate(frame, [22, 36], [0, 1], { extrapolateRight: 'clamp' });
  const h2Y     = interpolate(frame, [22, 36], [20, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [42, 58], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [42, 58], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="orange" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, fontSize: 96, lineHeight: 1, marginBottom: 20, filter: `drop-shadow(0 0 32px ${COLORS.orange}99)` }}>🏃</div>

      <div style={{ opacity: h1Op, transform: `translateY(${h1Y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 100, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 4 }}>
        HAVE YOU
      </div>
      <div style={{ opacity: h2Op, transform: `translateY(${h2Y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 100, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.orange, marginBottom: 24 }}>
        TESTED YOURS?
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.45 }}>
        Most people never have. The Cooper test takes 12 minutes. Free. Right now.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Comment when you do.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
