import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene1BONHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  16], [0, 1], { extrapolateRight: 'clamp' });
  const h1Op    = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const h1Y     = interpolate(frame, [8,  22], [24, 0], { extrapolateRight: 'clamp' });
  const h2Op    = interpolate(frame, [16, 30], [0, 1], { extrapolateRight: 'clamp' });
  const h2Y     = interpolate(frame, [16, 30], [24, 0], { extrapolateRight: 'clamp' });
  const h3Op    = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: 'clamp' });
  const h3Y     = interpolate(frame, [24, 38], [24, 0], { extrapolateRight: 'clamp' });
  const h4Op    = interpolate(frame, [32, 46], [0, 1], { extrapolateRight: 'clamp' });
  const h4Y     = interpolate(frame, [32, 46], [24, 0], { extrapolateRight: 'clamp' });
  const h5Op    = interpolate(frame, [40, 54], [0, 1], { extrapolateRight: 'clamp' });
  const h5Y     = interpolate(frame, [40, 54], [24, 0], { extrapolateRight: 'clamp' });
  const h6Op    = interpolate(frame, [48, 62], [0, 1], { extrapolateRight: 'clamp' });
  const h6Y     = interpolate(frame, [48, 62], [24, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [62, 82], [0, 100], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [76, 92], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [76, 92], [16, 0], { extrapolateRight: 'clamp' });

  const hlLines = [
    { text: 'YOUR BONES', op: h1Op, y: h1Y },
    { text: 'ARE ALREADY', op: h2Op, y: h2Y },
    { text: 'SHRINKING.', op: h3Op, y: h3Y },
    { text: 'MOST FIND', op: h4Op, y: h4Y },
    { text: 'OUT TOO', op: h5Op, y: h5Y },
    { text: 'LATE.', op: h6Op, y: h6Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="sand" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, fontSize: 96, lineHeight: 1, marginBottom: 20, filter: `drop-shadow(0 0 32px ${COLORS.sand}99)` }}>🦴</div>

      {hlLines.map((l, i) => (
        <div key={i} style={{ opacity: l.op, transform: `translateY(${l.y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 128, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 2 }}>
          {l.text}
        </div>
      ))}

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.sand, margin: '18px 0 16px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.45 }}>
        Bone density peaks around 30.<br />
        <strong style={{ color: COLORS.white }}>It's mostly downhill from there.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
