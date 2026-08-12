import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6NCTrade: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const colOp   = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });
  const colY    = interpolate(frame, [20, 36], [18, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [40, 60], [0, 100], { extrapolateRight: 'clamp' });
  const ctaOp   = interpolate(frame, [50, 66], [0, 1], { extrapolateRight: 'clamp' });
  const ctaY    = interpolate(frame, [50, 66], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        The Trade
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        IT'S NOT A<br />SLEEP AID.<br />IT'S A TRADE.
      </div>

      <div style={{ opacity: colOp, transform: `translateY(${colY}px)`, display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, borderTop: `3px solid ${COLORS.greige}44`, paddingTop: 16 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 15, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${COLORS.greige}88`, marginBottom: 12 }}>You Get</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.6 }}>
            ✓ Faster sleep onset<br />
            ✓ Sedation
          </div>
        </div>
        <div style={{ flex: 1, borderTop: `3px solid ${COLORS.red}`, paddingTop: 16 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 15, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 12 }}>You Lose</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.6 }}>
            ✗ REM suppression<br />
            ✗ Deep sleep<br />
            ✗ Next-day cognition
          </div>
        </div>
      </div>

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.red, margin: '0 0 20px' }} />

      <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.5 }}>
        Most people blame the next-day cost on something else.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Now you know what it actually is.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
