import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene8VO2CTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const logoOp  = interpolate(frame, [0,  16], [0, 1], { extrapolateRight: 'clamp' });
  const logoY   = interpolate(frame, [0,  16], [16, 0], { extrapolateRight: 'clamp' });
  const line1Op = interpolate(frame, [14, 28], [0, 1], { extrapolateRight: 'clamp' });
  const line1Y  = interpolate(frame, [14, 28], [16, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [28, 46], [0, 100], { extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [40, 56], [0, 1], { extrapolateRight: 'clamp' });
  const line2Y  = interpolate(frame, [40, 56], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="orange" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 20 }}>
        The Long Game
      </div>

      <div style={{ opacity: line1Op, transform: `translateY(${line1Y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 96, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 8 }}>
        FOLLOW.<br />SAVE.<br />TEST.
      </div>

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.orange, margin: '18px 0 18px' }} />

      <div style={{ opacity: line2Op, transform: `translateY(${line2Y}px)`, fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.55 }}>
        Daily longevity science.<br />
        <span style={{ color: COLORS.white }}>Save this — and book your test.</span>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
