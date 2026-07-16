import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const HormoneCard: React.FC<{ name: string; role: string; body: string; style?: React.CSSProperties }> = ({ name, role, body, style }) => (
  <div style={{
    background: 'rgba(196,160,255,0.06)',
    border: '1px solid rgba(196,160,255,0.2)',
    padding: '24px 28px',
    marginBottom: 20,
    ...style,
  }}>
    <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 44, color: COLORS.purple, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{name}</div>
    <div style={{ fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{role}</div>
    <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>{body}</div>
  </div>
);

export const Scene2HormonesCortisolInsulin: React.FC<Props> = ({ frame, captionChunks }) => {
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

  const card1Op = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' });
  const card1Y  = interpolate(frame, [30, 45], [24, 0], { extrapolateRight: 'clamp' });
  const card2Op = interpolate(frame, [48, 63], [0, 1], { extrapolateRight: 'clamp' });
  const card2Y  = interpolate(frame, [48, 63], [24, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.purple, marginBottom: 20 }}>
        THE FOUR THAT CONTROL EVERYTHING
      </div>

      {(['FOUR HORMONES', 'ARE DECIDING', 'YOUR DAY.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 110, lineHeight: 1.0, textTransform: 'uppercase', color: i === 2 ? COLORS.purple : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 32 }} />

      <div style={{ opacity: card1Op, transform: `translateY(${card1Y}px)` }}>
        <HormoneCard
          name="Cortisol"
          role="The Threat Detector"
          body="Controls your energy, inflammation, blood sugar, sleep architecture, and immune response. When chronically elevated it dismantles everything else."
        />
      </div>

      <div style={{ opacity: card2Op, transform: `translateY(${card2Y}px)` }}>
        <HormoneCard
          name="Insulin"
          role="The Storage Manager"
          body="Decides whether calories become energy or fat. When resistant, it locks the door to your own fuel supply."
        />
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
