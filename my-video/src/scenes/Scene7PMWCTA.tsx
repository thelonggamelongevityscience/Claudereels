import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const ORANGE = '#FF9800';
const BG     = '#0a0704';

export const Scene7PMWCTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const logoOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const logoY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const box1Op = interpolate(frame, [12, 26], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y  = interpolate(frame, [12, 26], [12, 0], { extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y  = interpolate(frame, [20, 34], [12, 0], { extrapolateRight: 'clamp' });
  const hashOp = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: 'clamp' });
  const hashY  = interpolate(frame, [28, 42], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,152,0,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 36, color: COLORS.greige }}>the</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 130, color: COLORS.white, lineHeight: 0.85, textTransform: 'uppercase' }}>LONG<br />GAME</div>
        <div style={{ height: 2, backgroundColor: ORANGE, marginTop: 16, marginBottom: 12, width: '100%' }} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: ORANGE }}>Longevity Science</div>
      </div>

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, border: `1.5px solid ${ORANGE}`, padding: '22px 28px', marginBottom: 16 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 32, color: ORANGE, letterSpacing: '0.1em', textTransform: 'uppercase' }}>→ Save this for after dinner</div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, border: '1.5px solid rgba(255,255,255,0.15)', padding: '22px 28px', marginBottom: 28 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 32, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>→ Follow for more</div>
      </div>

      <div style={{ opacity: hashOp, transform: `translateY(${hashY}px)`, fontFamily: FONTS.mono, fontSize: 20, color: `rgba(255,152,0,0.6)`, lineHeight: 1.8 }}>
        #bloodsugar #metabolichealth #walking<br />#longevity #movement
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
