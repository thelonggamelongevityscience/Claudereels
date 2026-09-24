import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const BG      = '#12040c';

export const Scene4TRRWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 24], [18, 0], { extrapolateRight: 'clamp' });
  const li1Op = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const li1X  = interpolate(frame, [20, 34], [-20, 0], { extrapolateRight: 'clamp' });
  const li2Op = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const li2X  = interpolate(frame, [30, 44], [-20, 0], { extrapolateRight: 'clamp' });
  const li3Op = interpolate(frame, [40, 54], [0, 1], { extrapolateRight: 'clamp' });
  const li3X  = interpolate(frame, [40, 54], [-20, 0], { extrapolateRight: 'clamp' });

  const bullet = (text: React.ReactNode, op: number, tx: number) => (
    <div style={{ opacity: op, transform: `translateX(${tx}px)`, display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 20 }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: MAGENTA, flexShrink: 0, marginTop: 10 }} />
      <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.greige, lineHeight: 1.5 }}>{text}</div>
    </div>
  );

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 16 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 64, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        THE FIRST TIME<br />IT WAS MEASURED<br />THIS WAY.
      </div>

      {bullet(<>One of the <strong style={{ color: COLORS.white }}>first published studies</strong> showing measurable epigenetic age reversal in humans from a drug protocol.</>, li1Op, li1X)}
      {bullet(<>Opened serious research into whether aging clocks can be <strong style={{ color: COLORS.white }}>moved backward</strong>, not just slowed.</>, li2Op, li2X)}
      {bullet(<>Sparked a wave of follow-up research still <strong style={{ color: COLORS.white }}>ongoing today</strong>.</>, li3Op, li3X)}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
