import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2LiverWhatItDoes: React.FC<Props> = ({ frame, captionChunks }) => {
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

  const db1Op = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [30, 45], [20, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [50, 65], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 20 }}>
        WHAT YOUR LIVER DOES
      </div>

      {(['YOUR LIVER IS', 'RUNNING 500', 'FUNCTIONS', 'RIGHT NOW.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 105, lineHeight: 1.0, textTransform: 'uppercase', color: i === 3 ? COLORS.gold : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 24 }} />

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 24, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 8 }}>THE ROLE</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.5 }}>
          Filtering every toxin from your blood. Producing bile for fat digestion. Regulating blood sugar between meals. Processing every drug and alcohol molecule you consume.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 8 }}>THE PROBLEM</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.5 }}>
          When the liver becomes overburdened it begins storing fat inside its own cells. This is how NAFLD begins. Silently. Without a single symptom.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
