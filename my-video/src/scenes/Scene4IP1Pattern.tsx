import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const RED  = '#FF4D6D';
const GOLD = '#FFD166';
const BG   = '#0D0D0D';

export const Scene4IP1Pattern: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [18, 34], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y   = interpolate(frame, [18, 34], [14, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [160, 176], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y   = interpolate(frame, [160, 176], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 35%, rgba(255,209,102,0.06) 0%, transparent 65%)`,
        pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: GOLD, marginBottom: 20 }}>
        The Pattern
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow,
        fontWeight: 800, fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase',
        color: COLORS.white, marginBottom: 44 }}>
        Same Pattern.<br />Different<br />Diseases.
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`,
        borderLeft: `3px solid ${GOLD}`, paddingLeft: 28, marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>Linked to</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          <strong style={{ color: COLORS.white }}>Heart disease.</strong>{' '}
          <strong style={{ color: COLORS.white }}>Type 2 diabetes.</strong>{' '}
          <strong style={{ color: COLORS.white }}>Alzheimer's.</strong>{' '}
          Some cancers.
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateY(${b2Y}px)`,
        borderLeft: `3px solid ${RED}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: RED, marginBottom: 10 }}>The honest part</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Linked is not the same as the single cause.{' '}
          <strong style={{ color: COLORS.white }}>One factor among many.</strong>
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
