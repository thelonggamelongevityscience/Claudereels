import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const INDIGO = '#6366F1';
const GOLD   = '#FFD166';
const BG     = '#050414';

export const Scene4NADFinePrint: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y   = interpolate(frame, [22, 38], [14, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y   = interpolate(frame, [34, 50], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, rgba(99,102,241,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: INDIGO, marginBottom: 24 }}>
        The Fine Print
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 44 }}>
        What The 2025<br />Data Actually<br />Showed.
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`, borderLeft: `3px solid ${INDIGO}`, paddingLeft: 28, marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: INDIGO, marginBottom: 10 }}>The Evidence Gap</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.greige, lineHeight: 1.5 }}>
          A 2025 meta-analysis of 10 randomized trials found <strong style={{ color: COLORS.white }}>NO benefit</strong> for muscle mass, strength, or physical function in older adults — despite NAD+ levels reliably going up.
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateY(${b2Y}px)`, borderLeft: `3px solid ${GOLD}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>What Does Differ</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.greige, lineHeight: 1.5 }}>
          A January 2026 trial found NMN and NR <strong style={{ color: COLORS.white }}>double blood NAD+ in 14 days</strong> — while the cheaper nicotinamide barely moves it.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
