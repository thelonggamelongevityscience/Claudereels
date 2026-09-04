import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene1CRPHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0, 12], [12, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [8, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [8, 24], [20, 0], { extrapolateRight: 'clamp' });
  const lineOp  = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [28, 52], [0, 100], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [44, 60], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [44, 60], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 80, lineHeight: 1, marginBottom: 16, filter: 'drop-shadow(0 0 28px rgba(0,207,255,0.6))' }}>
        🔥
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 80, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, letterSpacing: '-0.01em', marginBottom: 18 }}>
        THE BLOOD<br />MARKER THAT<br />PREDICTS<br />HEART<br />ATTACKS<br />BETTER.
      </div>

      <div style={{ opacity: lineOp, height: 2, backgroundColor: COLORS.blue, width: `${lineW}%`, marginBottom: 18 }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 26, color: COLORS.greige, lineHeight: 1.45 }}>
        It's not cholesterol.<br />
        <strong style={{ color: COLORS.white }}>It's a number almost nobody's been told about.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
