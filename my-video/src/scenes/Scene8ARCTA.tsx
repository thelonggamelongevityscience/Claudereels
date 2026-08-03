import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene8ARCTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const brandOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const brandY  = interpolate(frame, [0, 18], [20, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [20, 40], [0, 100], { extrapolateRight: 'clamp' });
  const btn1Op  = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: 'clamp' });
  const btn2Op  = interpolate(frame, [38, 52], [0, 1], { extrapolateRight: 'clamp' });
  const tagOp   = interpolate(frame, [48, 62], [0, 1], { extrapolateRight: 'clamp' });
  const ctaOp   = interpolate(frame, [56, 70], [0, 1], { extrapolateRight: 'clamp' });
  const ctaY    = interpolate(frame, [56, 70], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: brandOp, transform: `translateY(${brandY}px)`, marginBottom: 40 }}>
        <div style={{ fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 44, color: COLORS.greige, lineHeight: 1 }}>the</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 192, color: COLORS.white, lineHeight: 0.85, textTransform: 'uppercase' }}>LONG<br />GAME</div>
        <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.blue, margin: '20px 0 16px' }} />
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue }}>LONGEVITY SCIENCE</div>
      </div>

      <div style={{ opacity: btn1Op, border: `2px solid ${COLORS.blue}`, padding: '24px 32px', marginBottom: 16 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 28, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.blue }}>→ Save this</div>
      </div>

      <div style={{ opacity: btn2Op, border: '2px solid rgba(255,255,255,0.15)', padding: '24px 32px', marginBottom: 24 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 28, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>→ Follow for more</div>
      </div>

      <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 28, color: COLORS.greige, lineHeight: 1.5, marginBottom: 20 }}>
        Your cells are waiting for the signal.
      </div>

      <div style={{ opacity: tagOp, fontFamily: FONTS.mono, fontSize: 20, color: `${COLORS.blue}66`, lineHeight: 1.6 }}>
        #autophagy #longevity #cellularhealth<br />#intermittentfasting #antiaging #senescence
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
