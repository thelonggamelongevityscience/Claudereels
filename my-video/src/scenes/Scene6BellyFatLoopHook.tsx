import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6BellyFatLoopHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp  = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const lineW  = interpolate(frame, [50, 70], [0, 100], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [58, 76], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [58, 76], [14, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const lines = ['HAVE YOU BEEN', 'BLAMING YOUR', 'DIET WHEN IT', 'WAS YOUR', 'HORMONES?'];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 20 }}>
        THE QUESTION
      </div>

      {lines.map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 108, lineHeight: 0.92, textTransform: 'uppercase', color: i === 4 ? COLORS.red : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.red, margin: '22px 0 18px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 28, color: COLORS.greige, lineHeight: 1.45 }}>
        Most people have. Drop a yes below if this reframes it for you.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
