import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const INDIGO = '#6366F1';
const RED    = '#FF4D6D';
const BG     = '#050414';

export const Scene4RAPFinePrint: React.FC<Props> = ({ frame, captionChunks }) => {
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

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 84, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 44 }}>
        The 2025 Trial<br />Everyone's<br />Talking About.
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`, borderLeft: `3px solid ${INDIGO}`, paddingLeft: 28, marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: INDIGO, marginBottom: 10 }}>PEARL Trial</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 27, color: COLORS.greige, lineHeight: 1.5 }}>
          48 weeks, missed its primary goal of reducing visceral fat. Women on the higher dose saw <strong style={{ color: COLORS.white }}>improved muscle mass and less pain.</strong>
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateY(${b2Y}px)`, borderLeft: `3px solid ${RED}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 10 }}>2026 Follow-Up</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 27, color: COLORS.greige, lineHeight: 1.5 }}>
          Weekly rapamycin <strong style={{ color: COLORS.white }}>blunted exercise gains</strong> in older adults — with more adverse events than placebo.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
