import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6ZombieCellsProtocol: React.FC<Props> = ({ frame, captionChunks }) => {
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

  const bullets: { delay: number; color: 'green' | 'gold'; label: string; text: string }[] = [
    { delay: 28, color: 'green', label: 'Fasting:', text: "16–24 hour fasts trigger autophagy — your body's cellular cleanup system" },
    { delay: 40, color: 'green', label: 'Zone 2 exercise:', text: 'aerobic training is the most potent natural senolytic — clears zombie cells and reduces SASP signals' },
    { delay: 52, color: 'green', label: 'Quercetin and fisetin:', text: 'plant compounds with early senolytic evidence — found in onions, apples, and strawberries' },
    { delay: 64, color: 'gold', label: 'Reduce inflammation:', text: 'anti-inflammatory diet removes the primary driver of ongoing senescence accumulation' },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.12} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 24 }}>
        THE PROTOCOL
      </div>

      {(['HOW TO CLEAR', 'ZOMBIE CELLS', 'NATURALLY.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 110, lineHeight: 1.0, textTransform: 'uppercase', color: i === 1 ? COLORS.white : COLORS.green }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 28 }} />

      {bullets.map((b, i) => {
        const op = interpolate(frame, [b.delay, b.delay + 12], [0, 1], { extrapolateRight: 'clamp' });
        const x  = interpolate(frame, [b.delay, b.delay + 12], [-24, 0], { extrapolateRight: 'clamp' });
        return (
          <div key={i} style={{ opacity: op, transform: `translateX(${x}px)`, marginBottom: 22 }}>
            <BulletItem color={b.color} label={b.label} text={b.text} fontSize={22} />
          </div>
        );
      })}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
