import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2ZCRStat: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const statSpring = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 10, stiffness: 60 } });
  const statScale  = interpolate(statSpring, [0, 1], [0.6, 1]);
  const statOp     = interpolate(Math.max(0, frame - 30), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const subOp  = interpolate(frame, [42, 56], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [42, 56], [14, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [52, 66], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [52, 66], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 24 }}>
        THE RESEARCH THAT CHANGED EVERYTHING
      </div>

      {(['SCIENTISTS CLEARED', 'ZOMBIE CELLS', 'FROM MICE.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 100, lineHeight: 1.0, textTransform: 'uppercase', color: i === 1 ? COLORS.gold : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 16 }} />

      <div style={{ opacity: statOp, transform: `scale(${statScale})`, transformOrigin: 'left center', marginBottom: 8 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 200, color: COLORS.green, lineHeight: 0.85, letterSpacing: '-0.04em' }}>+25%</div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 52, color: COLORS.green, textTransform: 'uppercase', marginBottom: 20 }}>
        Longer Lifespan.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 8 }}>MAYO CLINIC · 2016</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Delayed cancer onset. Preserved heart and kidney function. Maintained muscle mass far longer than controls. One intervention. All of this.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
