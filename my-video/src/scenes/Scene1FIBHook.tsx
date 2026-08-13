import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene1FIBHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const h1Op    = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const h1Y     = interpolate(frame, [8,  22], [24, 0], { extrapolateRight: 'clamp' });
  const h2Op    = interpolate(frame, [16, 30], [0, 1], { extrapolateRight: 'clamp' });
  const h2Y     = interpolate(frame, [16, 30], [24, 0], { extrapolateRight: 'clamp' });
  const h3Op    = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: 'clamp' });
  const h3Y     = interpolate(frame, [24, 38], [24, 0], { extrapolateRight: 'clamp' });
  const h4Op    = interpolate(frame, [32, 46], [0, 1], { extrapolateRight: 'clamp' });
  const h4Y     = interpolate(frame, [32, 46], [24, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [46, 64], [0, 100], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [58, 74], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [58, 74], [16, 0], { extrapolateRight: 'clamp' });

  const hlLines = [
    { text: "ISN'T",    op: h1Op, y: h1Y },
    { text: 'PROTEIN.',  op: h2Op, y: h2Y },
    { text: "IT'S THIS.", op: h3Op, y: h3Y },
    { text: '🫘',        op: h4Op, y: h4Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 16, filter: `drop-shadow(0 0 24px ${COLORS.green}99)` }}>
        The Most Underrated Longevity Nutrient
      </div>

      {hlLines.map((l, i) => (
        <div key={i} style={{ opacity: l.op, transform: `translateY(${l.y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 128, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 2 }}>
          {l.text}
        </div>
      ))}

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.green, margin: '18px 0 16px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.45 }}>
        It's the one nearly everyone is quietly running short on.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
