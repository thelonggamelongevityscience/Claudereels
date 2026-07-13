import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene4ZombieCellsResearch: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0,1], [40,0])}px)`,
    };
  };

  const statSpring = spring({ fps, frame: Math.max(0, frame - 28), config: { damping: 10, stiffness: 60 } });
  const statScale  = interpolate(statSpring, [0, 1], [0.6, 1]);
  const statOp     = interpolate(Math.max(0, frame - 28), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const db1Op = interpolate(frame, [32, 47], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [32, 47], [20, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [46, 61], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [46, 61], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 24 }}>
        THE RESEARCH
      </div>

      {(['WHAT HAPPENS', 'WHEN YOU', 'REMOVE THEM.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 110, lineHeight: 1.0, textTransform: 'uppercase', color: i === 2 ? COLORS.gold : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 12 }} />

      <div style={{ opacity: statOp, transform: `scale(${statScale})`, transformOrigin: 'left center', marginBottom: 16 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 140, color: COLORS.gold, lineHeight: 1.0 }}>+25%</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, marginTop: 4 }}>longer lifespan in mice — Mayo Clinic, 2016</div>
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 24, marginBottom: 18 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>MAYO CLINIC 2016</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: COLORS.greige, lineHeight: 1.5 }}>
          Mice engineered to clear senescent cells lived 25% longer. Delayed cancer onset, improved heart and kidney function, maintained muscle mass significantly longer.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 6 }}>THE IMPLICATION</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: COLORS.greige, lineHeight: 1.5 }}>
          Senescent cell accumulation is not just a symptom of ageing — it is a driver of it.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
