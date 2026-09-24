import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const RED     = '#FF4D6D';
const GREEN   = '#00FF85';
const BG      = '#12040c';

export const Scene3TRRResult: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [10, 22], [16, 0], { extrapolateRight: 'clamp' });
  const cardOp  = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });
  const cardY   = interpolate(frame, [18, 32], [16, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [28, 42], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 16 }}>
        The Result
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 56, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        EPIGENETIC AGE,<br />MEASURED.
      </div>

      {/* Before / After cards */}
      <div style={{ opacity: cardOp, transform: `translateY(${cardY}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '28px 32px', borderRadius: 12, background: 'rgba(255,77,109,0.08)', border: `1.5px solid rgba(255,77,109,0.35)` }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED }}>Trial Start</div>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 52, color: COLORS.white }}>Baseline</div>
        </div>
        <div style={{ fontSize: 44, color: 'rgba(255,255,255,0.4)' }}>→</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '28px 32px', borderRadius: 12, background: 'rgba(0,255,133,0.08)', border: `1.5px solid rgba(0,255,133,0.35)` }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', color: GREEN }}>Trial End</div>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 52, color: GREEN }}>−2.5 yrs</div>
        </div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 26, color: COLORS.greige, lineHeight: 1.45, textAlign: 'center' }}>
        Average epigenetic age <strong style={{ color: COLORS.white }}>decreased</strong> across multiple clock measurements.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
