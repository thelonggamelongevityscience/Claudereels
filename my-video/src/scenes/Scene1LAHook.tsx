import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene1LAHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  16], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0,  16], [20, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [14, 30], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [14, 30], [20, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [28, 44], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 120, lineHeight: 1, filter: `drop-shadow(0 0 40px rgba(255,209,102,0.6))`, marginBottom: 32 }}>
        🧬
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 110, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        FIND YOUR<br />LONGEVITY<br />ARCHETYPE.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 38, color: COLORS.greige, lineHeight: 1.4 }}>
        Based on the month you were born.<br />
        <strong style={{ color: COLORS.white }}>Comment it below to find out.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
