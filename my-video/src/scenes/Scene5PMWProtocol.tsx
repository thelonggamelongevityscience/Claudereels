import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const BG    = '#0a0704';
const GREEN = '#00FF85';

export const Scene5PMWProtocol: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const b1X   = interpolate(frame, [20, 34], [-20, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const b2X   = interpolate(frame, [30, 44], [-20, 0], { extrapolateRight: 'clamp' });
  const b3Op  = interpolate(frame, [40, 54], [0, 1], { extrapolateRight: 'clamp' });
  const b3X   = interpolate(frame, [40, 54], [-20, 0], { extrapolateRight: 'clamp' });

  const dot = { width: 12, height: 12, borderRadius: '50%', background: GREEN, flexShrink: 0, marginTop: 8 } as const;

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(0,255,133,0.04) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: GREEN, marginBottom: 24 }}>
        The Protocol
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase', color: GREEN, marginBottom: 48 }}>
        YOU DON'T NEED<br />A REAL WALK.
      </div>

      <div style={{ opacity: b1Op, transform: `translateX(${b1X}px)`, display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={dot} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Pace around while <span style={{ color: COLORS.white }}>on a phone call</span> after dinner instead of sitting.
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateX(${b2X}px)`, display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={dot} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Do the <span style={{ color: COLORS.white }}>dishes standing and moving</span> rather than sitting immediately after eating.
        </div>
      </div>

      <div style={{ opacity: b3Op, transform: `translateX(${b3X}px)`, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={dot} />
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Take a <span style={{ color: COLORS.white }}>short walk to get water</span> or take the stairs right after a meal.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
