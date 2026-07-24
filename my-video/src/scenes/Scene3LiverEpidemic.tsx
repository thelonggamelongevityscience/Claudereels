import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3LiverEpidemic: React.FC<Props> = ({ frame, captionChunks }) => {
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
    { delay: 28, label: '1 in 4 adults globally', text: 'now has NAFLD — most have no idea because there are no symptoms in the early stages' },
    { delay: 40, label: 'You do not have to drink alcohol', text: 'to develop fatty liver — excess fructose and refined carbs are equally damaging' },
    { delay: 52, label: 'Fatty liver drives insulin resistance', text: '— the liver stops responding to insulin signals, cascading into metabolic syndrome' },
    { delay: 64, label: 'Standard liver tests miss it', text: '— ALT and AST only elevate once damage is already significant' },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 20 }}>
        THE SILENT EPIDEMIC
      </div>

      {(['NON-ALCOHOLIC', 'FATTY LIVER', 'IS NOW', 'EVERYWHERE.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 105, lineHeight: 1.0, textTransform: 'uppercase', color: i === 3 ? COLORS.red : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 24 }} />

      {bullets.map((b, i) => {
        const op = interpolate(frame, [b.delay, b.delay + 12], [0, 1], { extrapolateRight: 'clamp' });
        const x  = interpolate(frame, [b.delay, b.delay + 12], [-24, 0], { extrapolateRight: 'clamp' });
        return (
          <div key={i} style={{ opacity: op, transform: `translateX(${x}px)`, marginBottom: 20 }}>
            <BulletItem color="red" label={b.label} text={b.text} fontSize={21} />
          </div>
        );
      })}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
