import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3IRDiseases: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const boxOp = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' });
  const boxY  = interpolate(frame, [60, 75], [20, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const diseases = [
    { label: 'Heart Disease', color: COLORS.red },
    { label: 'Type 2 Diabetes', color: COLORS.orange },
    { label: "Alzheimer's", color: COLORS.red },
    { label: 'Cancer', color: COLORS.red },
    { label: 'Arthritis', color: COLORS.orange },
    { label: 'Depression', color: COLORS.orange },
    { label: 'Obesity', color: COLORS.red },
    { label: 'NAFLD', color: COLORS.orange },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 24 }}>
        THE ROOT CAUSE
      </div>

      {(['EVERY MAJOR', 'DISEASE OF', 'AGEING SHARES', 'ONE ROOT.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 100, lineHeight: 1.0, textTransform: 'uppercase', color: i === 3 ? COLORS.red : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 20 }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        {diseases.map((d, i) => {
          const op = interpolate(frame, [28 + i * 6, 42 + i * 6], [0, 1], { extrapolateRight: 'clamp' });
          const y  = interpolate(frame, [28 + i * 6, 42 + i * 6], [12, 0], { extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${y}px)`, border: `1px solid ${d.color}`, padding: '8px 18px' }}>
              <span style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, textTransform: 'uppercase', color: d.color }}>{d.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ opacity: boxOp, transform: `translateY(${boxY}px)`, borderLeft: `3px solid ${COLORS.orange}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 8 }}>THE UPSTREAM FIX</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.55 }}>
          Put out the fire and you reduce the risk of all of them simultaneously. Not separate treatments. One root.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
