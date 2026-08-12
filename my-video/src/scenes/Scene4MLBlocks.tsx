import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene4MLBlocks: React.FC<Props> = ({ frame, captionChunks }) => {
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
      <GlowBg color="red" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        What Blocks It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        FOUR THINGS<br />SABOTAGING YOUR<br />MORNING SIGNAL.
      </div>

      <BulletItem opacity={b1Op} translateX={b1X} color="red" label="Phone before sunlight" body="scrolling in bed sends your brain a weak, wrong-spectrum light signal before it gets the real one" />
      <BulletItem opacity={b2Op} translateX={b2X} color="red" label="Blackout curtains left closed" body="if the first light you see is a lamp, your master clock is still waiting for the signal" />
      <BulletItem opacity={b3Op} translateX={b3X} color="red" label="Sunglasses immediately" body="putting them on the second you step outside blocks the exact signal you just went out for" />
      <BulletItem opacity={b4Op} translateX={b4X} color="red" label="Coffee before light" body="caffeine doesn't fix a late-set clock — it just masks the tiredness while the delay compounds" />

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
