import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const BG      = '#12040c';

export const Scene4LITWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const b1X   = interpolate(frame, [22, 38], [-32, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [22, 38], [0, 1],   { extrapolateRight: 'clamp' });
  const b2X   = interpolate(frame, [38, 54], [-32, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [38, 54], [0, 1],   { extrapolateRight: 'clamp' });
  const b3X   = interpolate(frame, [54, 70], [-32, 0], { extrapolateRight: 'clamp' });
  const b3Op  = interpolate(frame, [54, 70], [0, 1],   { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22,
        fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 20 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800,
        fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 44 }}>
        The Amounts Are<br />Tiny. The Pattern<br />Isn't.
      </div>

      <div style={{ opacity: b1Op, transform: `translateX(${b1X}px)`, display: 'flex', gap: 22,
        alignItems: 'flex-start', marginBottom: 28 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: MAGENTA,
          flexShrink: 0, marginTop: 9 }} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 27, color: COLORS.greige, lineHeight: 1.55 }}>
          Naturally occurring trace lithium — <strong style={{ color: COLORS.white }}>far below any prescription
          dose</strong> — showing up in public health data across 7 countries.
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateX(${b2X}px)`, display: 'flex', gap: 22,
        alignItems: 'flex-start', marginBottom: 28 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: MAGENTA,
          flexShrink: 0, marginTop: 9 }} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 27, color: COLORS.greige, lineHeight: 1.55 }}>
          Suggests something protective may be happening at exposure levels{' '}
          <strong style={{ color: COLORS.white }}>nobody thought mattered</strong>.
        </div>
      </div>

      <div style={{ opacity: b3Op, transform: `translateX(${b3X}px)`, display: 'flex', gap: 22,
        alignItems: 'flex-start' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: MAGENTA,
          flexShrink: 0, marginTop: 9 }} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 27, color: COLORS.greige, lineHeight: 1.55 }}>
          Now pushing researchers toward actual{' '}
          <strong style={{ color: COLORS.white }}>randomized trials</strong>, not just population data.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
