import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3BellyFatHormones: React.FC<Props> = ({ frame, captionChunks }) => {
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

  const bullets: { delay: number; label: string; text: string }[] = [
    { delay: 28, label: 'Cortisol:', text: 'chronic stress drives cortisol high — and cortisol specifically directs fat storage to the abdomen. You can eat perfectly and still accumulate visceral fat if your stress system is chronically activated.' },
    { delay: 44, label: 'Insulin:', text: 'elevated insulin locks fat in storage mode. When insulin is chronically high from poor diet and metabolic dysfunction, the body cannot access fat for fuel regardless of caloric deficit.' },
    { delay: 60, label: 'The combination:', text: 'high cortisol plus high insulin is the metabolic environment that makes visceral fat completely resistant to conventional dieting.' },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 20 }}>
        WHY DIET ALONE FAILS
      </div>

      {(['THE TWO HORMONES', 'MAKING VISCERAL FAT', 'ALMOST IMPOSSIBLE', 'TO SHIFT.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 88, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 24 }} />

      {bullets.map((b, i) => {
        const op = interpolate(frame, [b.delay, b.delay + 12], [0, 1], { extrapolateRight: 'clamp' });
        const x  = interpolate(frame, [b.delay, b.delay + 12], [-24, 0], { extrapolateRight: 'clamp' });
        return (
          <div key={i} style={{ opacity: op, transform: `translateX(${x}px)`, marginBottom: 22 }}>
            <BulletItem color="red" label={b.label} text={b.text} fontSize={19} />
          </div>
        );
      })}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
