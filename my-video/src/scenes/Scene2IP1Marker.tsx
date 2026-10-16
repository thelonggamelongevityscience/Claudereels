import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const GREEN = '#00FF85';
const BG    = '#0D0D0D';

export const Scene2IP1Marker: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y   = interpolate(frame, [20, 36], [14, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [90, 106], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y   = interpolate(frame, [90, 106], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, rgba(0,255,133,0.07) 0%, transparent 65%)`,
        pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: GREEN, marginBottom: 20 }}>
        The Marker
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow,
        fontWeight: 800, fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase',
        color: COLORS.white, marginBottom: 44 }}>
        hs-CRP.<br />The Number<br />Most People<br />Never See.
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`,
        borderLeft: `3px solid ${GREEN}`, paddingLeft: 28, marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: GREEN, marginBottom: 10 }}>What it is</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          A blood marker of inflammation. Not always part of{' '}
          <strong style={{ color: COLORS.white }}>routine blood work.</strong>
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateY(${b2Y}px)`,
        borderLeft: `3px solid ${GREEN}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: GREEN, marginBottom: 10 }}>Why it matters</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          In about <strong style={{ color: COLORS.white }}>160,000 people,</strong> higher CRP went
          with more heart attacks and strokes.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
