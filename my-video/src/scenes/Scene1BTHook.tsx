import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const BLUE = '#4DA6FF';
const BG   = '#050810';

export const Scene1BTHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0,  14], [20, 0], { extrapolateRight: 'clamp' });
  const headOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const headY   = interpolate(frame, [10, 26], [24, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [22, 38], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(77,166,255,0.09) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 96, lineHeight: 1, filter: 'drop-shadow(0 0 32px rgba(77,166,255,0.6))', marginBottom: 28 }}>
        🌡️
      </div>

      <div style={{ opacity: headOp, transform: `translateY(${headY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 112, color: COLORS.white, lineHeight: 0.88, textTransform: 'uppercase', marginBottom: 28 }}>
        YOUR<br />BEDROOM<br />IS PROBABLY<br />TOO WARM<br />TO SLEEP<br />WELL.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.45 }}>
        Not too dark. Not too quiet.<br />
        <strong style={{ color: COLORS.white }}>Too warm.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
