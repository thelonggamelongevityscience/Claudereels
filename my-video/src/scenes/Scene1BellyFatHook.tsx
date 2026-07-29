import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene1BellyFatHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp  = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const lineW  = interpolate(frame, [52, 72], [0, 100], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [60, 78], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [60, 78], [14, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const lines = ['THE BELLY FAT', 'IS NOT A', 'DIET PROBLEM.', 'IT IS A', 'HORMONE PROBLEM.'];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 20 }}>
        METABOLIC HEALTH
      </div>

      {lines.map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 2 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 112, lineHeight: 0.92, textTransform: 'uppercase', color: i === 4 ? COLORS.red : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.red, margin: '20px 0 18px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.4 }}>
        That is why cutting calories alone never works.{' '}
        <span style={{ color: COLORS.white, fontStyle: 'normal', fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 26 }}>
          Here is what is actually happening.
        </span>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
