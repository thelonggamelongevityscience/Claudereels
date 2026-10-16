import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const RED = '#FF4D6D';
const BG  = '#0D0D0D';

export const Scene1IP1Hook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emoOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const emoY   = interpolate(frame, [0,  14], [14, 0], { extrapolateRight: 'clamp' });
  const tagOp  = interpolate(frame, [6,  18], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [6,  18], [10, 0], { extrapolateRight: 'clamp' });
  const titOp  = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const titY   = interpolate(frame, [12, 28], [18, 0], { extrapolateRight: 'clamp' });
  const lineW  = interpolate(frame, [28, 50], [0, 100], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [48, 62], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [48, 62], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 60%, rgba(255,77,109,0.08) 0%, transparent 65%)`,
        pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emoOp, transform: `translateY(${emoY}px)`, fontSize: 96, lineHeight: 1,
        filter: 'drop-shadow(0 0 22px rgba(255,77,109,0.55))', marginBottom: 20 }}>
        🩸
      </div>

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: RED, marginBottom: 24 }}>
        Longevity Science
      </div>

      <div style={{ opacity: titOp, transform: `translateY(${titY}px)`, fontFamily: FONTS.barlow,
        fontWeight: 900, fontSize: 100, lineHeight: 0.88, textTransform: 'uppercase',
        color: COLORS.white, letterSpacing: '-0.02em', marginBottom: 28 }}>
        ALMOST EVERY<br />DISEASE THAT<br />WILL KILL YOU<br />HAS THIS<br />IN COMMON.
      </div>

      <div style={{ height: 2, backgroundColor: RED, width: `${lineW}%`, marginBottom: 24 }} />

      <div style={{ opacity: subOp, transform: `translateY(${subOp}px)`, fontFamily: FONTS.playfair,
        fontStyle: 'italic', fontSize: 38, color: COLORS.greige, lineHeight: 1.4 }}>
        Chronic inflammation.<br />
        <strong style={{ color: COLORS.white }}>Silent. Slow. Measurable.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
