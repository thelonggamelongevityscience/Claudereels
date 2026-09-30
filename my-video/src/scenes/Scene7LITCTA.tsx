import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const BG      = '#12040c';

export const Scene7LITCTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const logoOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const logoY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const b1Op   = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y    = interpolate(frame, [12, 28], [12, 0], { extrapolateRight: 'clamp' });
  const b2Op   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y    = interpolate(frame, [22, 38], [10, 0], { extrapolateRight: 'clamp' });
  const hashOp = interpolate(frame, [32, 48], [0, 1], { extrapolateRight: 'clamp' });
  const hashY  = interpolate(frame, [32, 48], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, marginBottom: 40 }}>
        <div style={{ fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 36, color: COLORS.greige }}>the</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 128, color: COLORS.white,
          lineHeight: 0.85, textTransform: 'uppercase' }}>LONG<br />GAME</div>
        <div style={{ height: 2, backgroundColor: MAGENTA, marginTop: 16, width: '100%' }} />
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`, border: `1.5px solid ${MAGENTA}`,
        padding: '20px 28px', marginBottom: 14 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 32, color: MAGENTA,
          letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          → Comment AGING for the free quiz
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateY(${b2Y}px)`, border: '1.5px solid rgba(255,255,255,0.15)',
        padding: '20px 28px', marginBottom: 28 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 32,
          color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          → Follow for more
        </div>
      </div>

      <div style={{ opacity: hashOp, transform: `translateY(${hashY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, color: `rgba(224,51,156,0.6)`, lineHeight: 1.8 }}>
        #lithium #brainhealth #longevity #dementia #aging
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
