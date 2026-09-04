import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2LAHowItWorks: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [12, 28], [20, 0], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [26, 42], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.05} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 24 }}>
        How This Works
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 88, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        EVERY BIRTH<br />MONTH HAS<br />AN ARCHETYPE.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.5 }}>
        Find yours below. Then comment<br />
        your month — I{"'"}ll reply with<br />
        <strong style={{ color: COLORS.white }}>your longevity trait to work on.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
