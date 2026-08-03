import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3ARWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
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
    { delay: 28, label: 'Clears zombie cells:', text: 'removes senescent cell components before their SASP inflammatory signals can spread to surrounding tissue' },
    { delay: 40, label: 'Resolves inflammation:', text: 'degrades the very proteins that trigger NF-kB — the master inflammatory switch — breaking the cycle at the source' },
    { delay: 52, label: 'Protects brain cells:', text: 'neuronal autophagy clears amyloid and tau proteins that accumulate into the plaques behind Alzheimer\'s disease' },
    { delay: 64, label: 'Recycles mitochondria:', text: 'mitophagy removes dysfunctional mitochondria before they leak the free radicals that are the primary driver of cellular ageing' },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 24 }}>
        WHY IT MATTERS THIS WEEK
      </div>

      {(['AUTOPHAGY IS', 'THE ANSWER TO', 'BOTH PROBLEMS.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 106, lineHeight: 1.0, textTransform: 'uppercase', color: i === 0 ? COLORS.blue : COLORS.white }}>
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
            <BulletItem color="blue" label={b.label} text={b.text} fontSize={18} />
          </div>
        );
      })}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
