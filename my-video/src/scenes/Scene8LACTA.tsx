import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene8LACTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const logoOp = interpolate(frame, [0,  16], [0, 1], { extrapolateRight: 'clamp' });
  const logoY  = interpolate(frame, [0,  16], [10, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [14, 30], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [14, 30], [12, 0], { extrapolateRight: 'clamp' });
  const hashOp = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: 'clamp' });
  const hashY  = interpolate(frame, [28, 44], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 36, color: COLORS.greige }}>the</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 130, color: COLORS.white, lineHeight: 0.85, textTransform: 'uppercase' }}>LONG<br />GAME</div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.5, marginBottom: 36 }}>
        Tag a friend and see if their<br />
        <strong style={{ color: COLORS.white }}>archetype matches their personality.</strong>
      </div>

      <div style={{ opacity: hashOp, transform: `translateY(${hashY}px)`, fontFamily: FONTS.mono, fontSize: 20, color: `rgba(255,209,102,0.6)`, lineHeight: 1.8 }}>
        #longevity #biologicalage #wellness<br />
        #selfcare #healthylifestyle
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
