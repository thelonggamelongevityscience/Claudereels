import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2MetabolicNumber: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp  = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [8, 22], [0, 1], { extrapolateRight: 'clamp' });
  const statY  = interpolate(frame, [8, 22], [40, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
    };
  };

  const dbOp = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' });
  const dbY  = interpolate(frame, [45, 60], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 8 }}>
        THE NUMBER
      </div>

      <div style={{ opacity: statOp, transform: `translateY(${statY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 240, color: COLORS.red, lineHeight: 0.8, letterSpacing: '-0.04em', textShadow: `0 0 80px rgba(255,77,109,0.35)` }}>
        88%
      </div>

      {(['OF AMERICANS FAIL', 'AT LEAST ONE MARKER', 'OF METABOLIC HEALTH.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8 + 20), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 64, lineHeight: 1.0, textTransform: 'uppercase', color: COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 24 }} />

      <div style={{ opacity: dbOp, transform: `translateY(${dbY}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 8 }}>THE FIVE MARKERS</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.greige, lineHeight: 1.5 }}>
          Blood pressure. Fasting glucose. Triglycerides. HDL cholesterol. Waist circumference. You need all five in range without medication. 88% do not make it.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
