import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5ARActivate: React.FC<Props> = ({ frame, captionChunks }) => {
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
    { delay: 28, label: 'Fast 16–18 hours:', text: 'autophagy begins meaningfully around 14 to 16 hours without food — the primary reason time-restricted eating extends lifespan in model organisms' },
    { delay: 40, label: 'Zone 2 exercise:', text: 'aerobic training at conversational pace strongly induces autophagy in muscle, liver, and brain tissue simultaneously' },
    { delay: 52, label: 'Black coffee:', text: 'caffeine and polyphenols independently activate autophagy — one of the key mechanisms behind coffee\'s longevity data' },
    { delay: 64, label: 'Deep sleep:', text: 'protect your slow wave sleep at all costs — it is when the brain runs its autophagy cycle and clears the debris that builds into neurodegeneration' },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.12} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 24 }}>
        HOW TO SWITCH IT ON
      </div>

      {(['FOUR WAYS TO', 'ACTIVATE YOUR', 'SELF-CLEANING MODE.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 96, lineHeight: 1.0, textTransform: 'uppercase', color: i === 2 ? COLORS.green : COLORS.white }}>
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
            <BulletItem color="green" label={b.label} text={b.text} fontSize={18} />
          </div>
        );
      })}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
