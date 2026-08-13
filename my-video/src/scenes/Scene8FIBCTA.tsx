import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene8FIBCTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const logoOp  = interpolate(frame, [0,  16], [0, 1], { extrapolateRight: 'clamp' });
  const logoY   = interpolate(frame, [0,  16], [16, 0], { extrapolateRight: 'clamp' });
  const headOp  = interpolate(frame, [14, 28], [0, 1], { extrapolateRight: 'clamp' });
  const headY   = interpolate(frame, [14, 28], [16, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [28, 46], [0, 100], { extrapolateRight: 'clamp' });
  const box1Op  = interpolate(frame, [40, 56], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y   = interpolate(frame, [40, 56], [14, 0], { extrapolateRight: 'clamp' });
  const box2Op  = interpolate(frame, [52, 68], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y   = interpolate(frame, [52, 68], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 22, color: COLORS.greige }}>the</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 96, color: COLORS.white, lineHeight: 0.85, textTransform: 'uppercase' }}>LONG<br />GAME</div>
      </div>

      <div style={{ opacity: headOp, transform: `translateY(${headY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 6 }}>
        Longevity Science
      </div>

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.green, margin: '14px 0 20px' }} />

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, border: `1.5px solid ${COLORS.green}`, padding: '14px 18px', marginBottom: 10 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 26, color: COLORS.green, letterSpacing: '0.1em', textTransform: 'uppercase' }}>→ Save this</div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, border: `1.5px solid rgba(255,255,255,0.15)`, padding: '14px 18px', marginBottom: 18 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>→ Follow for more</div>
      </div>

      <div style={{ opacity: box2Op, fontFamily: FONTS.mono, fontSize: 18, color: `${COLORS.green}88` }}>
        #fiber #guthealth #longevity #nutrition #microbiome
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
