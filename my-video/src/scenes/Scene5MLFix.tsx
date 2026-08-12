import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { BulletItem } from '../components/BulletItem';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5MLFix: React.FC<Props> = ({ frame, captionChunks }) => {
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
      <GlowBg color="green" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 14 }}>
        How To Fix It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.green, marginBottom: 32 }}>
        THE PROTOCOL.<br />NON-NEGOTIABLE.<br />TWO MINUTES.
      </div>

      <BulletItem opacity={b1Op} translateX={b1X} color="green" label="Get outside within 30 minutes of waking" body="no sunglasses, no window glass in between — direct outdoor light only" />
      <BulletItem opacity={b2Op} translateX={b2X} color="green" label="5 to 10 minutes is enough" body="even on a cloudy day, outdoor light is dramatically brighter than anything indoors" />
      <BulletItem opacity={b3Op} translateX={b3X} color="green" label="Consistency beats duration" body="the same time every day trains the clock faster than one long session" />
      <BulletItem opacity={b4Op} translateX={b4X} color="green" label="Pair it with movement" body="a short walk does double duty for circadian anchoring and cortisol regulation" />

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
