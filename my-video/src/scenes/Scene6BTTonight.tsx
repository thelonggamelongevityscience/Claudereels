import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const BLUE = '#4DA6FF';
const BG   = '#050810';

export const Scene6BTTonight: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [10, 26], [22, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [22, 52], [0, 936], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [28, 44], [14, 0], { extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [38, 52], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY  = interpolate(frame, [38, 52], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(77,166,255,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: BLUE, marginBottom: 24 }}>
        Tonight
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 104, color: COLORS.white, lineHeight: 0.88, textTransform: 'uppercase', marginBottom: 28 }}>
        CHECK YOUR<br />THERMOSTAT<br />BEFORE BED.
      </div>

      <div style={{ width: lineW, height: 2, backgroundColor: BLUE, marginBottom: 28 }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.5, marginBottom: 36 }}>
        One setting. Zero cost. Tonight.<br />
        <strong style={{ color: COLORS.white }}>{"What's"} your bedroom set to right now?</strong>
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,255,133,0.1)', border: '1px solid rgba(0,255,133,0.35)', padding: '16px 28px', alignSelf: 'flex-start' }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.green, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>📤 Send To Someone Who Complains About Bad Sleep</span>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
