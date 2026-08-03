import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6ARTrilogy: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const db1Op = interpolate(frame, [36, 50], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [36, 50], [18, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [50, 64], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [50, 64], [18, 0], { extrapolateRight: 'clamp' });
  const db3Op = interpolate(frame, [64, 78], [0, 1], { extrapolateRight: 'clamp' });
  const db3Y  = interpolate(frame, [64, 78], [18, 0], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [78, 92], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [78, 92], [14, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 24 }}>
        THIS WEEK'S TRILOGY
      </div>

      {(['THREE PROBLEMS.', 'ONE UPSTREAM', 'SOLUTION.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 106, lineHeight: 1.0, textTransform: 'uppercase', color: i === 2 ? COLORS.blue : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 20 }} />

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.blue}`, paddingLeft: 24, marginBottom: 16 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 4 }}>TUESDAY · ZOMBIE CELLS</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.greige, lineHeight: 1.5 }}>Accumulate when autophagy fails to clear them.</div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 24, marginBottom: 16 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 4 }}>WEDNESDAY · INFLAMMATION</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.greige, lineHeight: 1.5 }}>Persists when autophagy fails to resolve it.</div>
      </div>

      <div style={{ opacity: db3Op, transform: `translateY(${db3Y}px)`, borderLeft: `3px solid ${COLORS.green}`, paddingLeft: 24, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 4 }}>FRIDAY · AUTOPHAGY</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.greige, lineHeight: 1.5 }}>The mechanism that fixes both. Activate it.</div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.5 }}>
        Fast. Move. Sleep.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Your cells will do the rest.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
