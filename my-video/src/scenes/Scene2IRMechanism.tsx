import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2IRMechanism: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp  = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const box1Op = interpolate(frame, [44, 58], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y  = interpolate(frame, [44, 58], [20, 0], { extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [58, 72], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y  = interpolate(frame, [58, 72], [20, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="orange" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 24 }}>
        THE IMMUNE SYSTEM
      </div>

      {(['INFLAMMATION', 'WAS BUILT TO', 'SAVE YOU.', 'NOW IT IS KILLING YOU.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: i === 3 ? 72 : 100, lineHeight: 1.0, textTransform: 'uppercase', color: i === 3 ? COLORS.red : i === 0 ? COLORS.orange : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 24 }} />

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, border: `2px solid ${COLORS.orange}`, padding: '20px 24px', marginBottom: 16 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 8 }}>ACUTE INFLAMMATION · GOOD</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.55 }}>
          Heals wounds. Fights infections. Resolves in days. Exactly what it was designed for.
        </div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, border: `2px solid ${COLORS.red}`, padding: '20px 24px' }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 8 }}>CHRONIC INFLAMMATION · DEADLY</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.55 }}>
          Same response. Stuck permanently at low grade. No wound to heal. A continuous internal fire slowly damaging everything it touches.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
