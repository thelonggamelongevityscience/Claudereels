import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3MLWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  22], [20, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const b1X   = interpolate(frame, [20, 34], [-20, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const b2X   = interpolate(frame, [30, 44], [-20, 0], { extrapolateRight: 'clamp' });
  const b3Op  = interpolate(frame, [40, 54], [0, 1], { extrapolateRight: 'clamp' });
  const b3X   = interpolate(frame, [40, 54], [-20, 0], { extrapolateRight: 'clamp' });
  const b4Op  = interpolate(frame, [50, 64], [0, 1], { extrapolateRight: 'clamp' });
  const b4X   = interpolate(frame, [50, 64], [-20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 14 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        ONE SIGNAL<br />CONTROLS YOUR<br />ENTIRE NIGHT.
      </div>

      <BulletItem opacity={b1Op} translateX={b1X} color="gold" label="Cortisol timing" body="morning light triggers the healthy cortisol spike that should happen at wake-up — not at 11pm, keeping you wired" />
      <BulletItem opacity={b2Op} translateX={b2X} color="gold" label="Melatonin onset" body="the time you get light in the morning directly shifts the time your body is ready to release melatonin at night" />
      <BulletItem opacity={b3Op} translateX={b3X} color="gold" label="Sleep depth" body="a properly anchored circadian rhythm produces measurably deeper, less fragmented sleep than one running on artificial light alone" />
      <BulletItem opacity={b4Op} translateX={b4X} color="gold" label="Mood and energy" body="the same pathway regulates serotonin — which is why morning light affects how you feel by 3pm" />

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
