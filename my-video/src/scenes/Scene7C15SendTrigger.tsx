import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const TEAL = '#2DD4BF';
const BG   = '#050a09';

export const Scene7C15SendTrigger: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY  = interpolate(frame, [24, 38], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(45,212,191,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: TEAL, marginBottom: 24 }}>
        Before You Scroll On
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 88, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 36 }}>
        SEND THIS TO<br />SOMEONE WHO<br />THINKS THEY<br />KNOW EVERY<br />NUTRIENT<br />THERE IS.
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,255,133,0.1)', border: '1px solid rgba(0,255,133,0.35)', padding: '16px 28px', alignSelf: 'flex-start' }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.green, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>📤 Tap Send</span>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
