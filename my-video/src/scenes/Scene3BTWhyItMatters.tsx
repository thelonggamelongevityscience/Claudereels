import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const BLUE = '#4DA6FF';
const BG   = '#050810';

const Bullet: React.FC<{ frame: number; delay: number; text: React.ReactNode }> = ({ frame, delay, text }) => {
  const op = interpolate(frame, [delay, delay + 16], [0, 1], { extrapolateRight: 'clamp' });
  const x  = interpolate(frame, [delay, delay + 16], [-24, 0], { extrapolateRight: 'clamp' });
  return (
    <div style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 32 }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: BLUE, flexShrink: 0, marginTop: 8 }} />
      <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.greige, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
};

export const Scene3BTWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8, 24], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(77,166,255,0.05) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: BLUE, marginBottom: 20 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 40 }}>
        THE ROOM<br />NOBODY<br />THINKS TO<br />CHECK.
      </div>

      <Bullet frame={frame} delay={22} text={<>Sleep researchers point to <strong style={{ color: COLORS.white }}>65–68°F (18–20°C)</strong> as optimal — warmer measurably disrupts deep sleep.</>} />
      <Bullet frame={frame} delay={36} text={<>Deep sleep is when the most repair happens — <strong style={{ color: COLORS.white }}>temperature disruption cuts into this stage specifically.</strong></>} />
      <Bullet frame={frame} delay={50} text={<>Most people obsess over light and noise and <strong style={{ color: COLORS.white }}>never think to check the thermostat.</strong></>} />

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
