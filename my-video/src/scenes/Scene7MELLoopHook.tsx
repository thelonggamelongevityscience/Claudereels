import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7MELLoopHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 14], [10, 0], { extrapolateRight: 'clamp' });
  const h1Op  = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const h1Y   = interpolate(frame, [8,  22], [20, 0], { extrapolateRight: 'clamp' });
  const h2Op  = interpolate(frame, [16, 30], [0, 1], { extrapolateRight: 'clamp' });
  const h2Y   = interpolate(frame, [16, 30], [20, 0], { extrapolateRight: 'clamp' });
  const h3Op  = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: 'clamp' });
  const h3Y   = interpolate(frame, [24, 38], [20, 0], { extrapolateRight: 'clamp' });
  const h4Op  = interpolate(frame, [32, 46], [0, 1], { extrapolateRight: 'clamp' });
  const h4Y   = interpolate(frame, [32, 46], [20, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [48, 68], [0, 100], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [58, 74], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [58, 74], [14, 0], { extrapolateRight: 'clamp' });

  const hlLines = [
    { text: 'WHAT DOSE',  op: h1Op, y: h1Y },
    { text: 'IS ON YOUR', op: h2Op, y: h2Y },
    { text: 'MELATONIN', op: h3Op, y: h3Y },
    { text: 'BOTTLE?',   op: h4Op, y: h4Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="purple" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.purple, marginBottom: 20 }}>
        The Question
      </div>

      {hlLines.map((l, i) => (
        <div key={i} style={{ opacity: l.op, transform: `translateY(${l.y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 120, lineHeight: 0.97, textTransform: 'uppercase', color: COLORS.white, marginBottom: 4 }}>
          {l.text}
        </div>
      ))}

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.purple, margin: '20px 0 18px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.5 }}>
        Go check right now.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Drop the number below 👇</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
