import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const ORANGE = '#FF9800';
const BG     = '#0a0704';

export const Scene4PMWWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op   = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const b1X    = interpolate(frame, [20, 34], [-20, 0], { extrapolateRight: 'clamp' });
  const b2Op   = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const b2X    = interpolate(frame, [30, 44], [-20, 0], { extrapolateRight: 'clamp' });
  const b3Op   = interpolate(frame, [40, 54], [0, 1], { extrapolateRight: 'clamp' });
  const b3X    = interpolate(frame, [40, 54], [-20, 0], { extrapolateRight: 'clamp' });

  const dot = { width: 12, height: 12, borderRadius: '50%', background: ORANGE, flexShrink: 0, marginTop: 8 } as const;

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,152,0,0.05) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: ORANGE, marginBottom: 24 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 96, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, marginBottom: 48 }}>
        EVERY SPIKE<br />ADDS UP.
      </div>

      <div style={{ opacity: b1Op, transform: `translateX(${b1X}px)`, display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={dot} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Repeated <span style={{ color: COLORS.white }}>post-meal glucose spikes</span>, even in people without diabetes, are linked to long-term metabolic and cardiovascular risk.
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateX(${b2X}px)`, display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={dot} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          This isn't about intense exercise — <span style={{ color: COLORS.white }}>light movement is enough</span> to trigger the effect.
        </div>
      </div>

      <div style={{ opacity: b3Op, transform: `translateX(${b3X}px)`, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={dot} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          It works <span style={{ color: COLORS.white }}>whether or not</span> you already exercise regularly elsewhere in your day.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
