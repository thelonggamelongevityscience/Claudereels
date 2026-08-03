import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2ARWhatIs: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp  = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [44, 58], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [44, 58], [20, 0], { extrapolateRight: 'clamp' });
  const db2Op  = interpolate(frame, [60, 74], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y   = interpolate(frame, [60, 74], [20, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 24 }}>
        WHAT IS AUTOPHAGY
      </div>

      {(['YOUR CELLS EAT', 'THEIR OWN', 'DAMAGED PARTS.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 104, lineHeight: 1.0, textTransform: 'uppercase', color: i === 0 ? COLORS.blue : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 20 }} />

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.blue}`, paddingLeft: 24, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 8 }}>THE MECHANISM</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.55 }}>
          Autophagy — from the Greek for self-eating — identifies damaged proteins, dysfunctional organelles, and cellular debris, packages them up, and breaks them down for recycling. Your body's built-in quality control system.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 8 }}>THE DISCOVERY · NOBEL PRIZE 2016</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.55 }}>
          Yoshinori Ohsumi won the Nobel Prize in Medicine for mapping this mechanism. The science establishment called it one of the most important biological discoveries of the century.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
