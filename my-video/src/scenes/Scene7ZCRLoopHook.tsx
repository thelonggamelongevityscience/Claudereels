import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7ZCRLoopHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0, 14], [10, 0], { extrapolateRight: 'clamp' });
  const hl1Op  = interpolate(frame, [8, 22], [0, 1], { extrapolateRight: 'clamp' });
  const hl1Y   = interpolate(frame, [8, 22], [20, 0], { extrapolateRight: 'clamp' });
  const hl2Op  = interpolate(frame, [16, 30], [0, 1], { extrapolateRight: 'clamp' });
  const hl2Y   = interpolate(frame, [16, 30], [20, 0], { extrapolateRight: 'clamp' });
  const hl3Op  = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: 'clamp' });
  const hl3Y   = interpolate(frame, [24, 38], [20, 0], { extrapolateRight: 'clamp' });
  const hl4Op  = interpolate(frame, [32, 46], [0, 1], { extrapolateRight: 'clamp' });
  const hl4Y   = interpolate(frame, [32, 46], [20, 0], { extrapolateRight: 'clamp' });
  const lineW  = interpolate(frame, [44, 64], [0, 100], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [54, 70], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [54, 70], [14, 0], { extrapolateRight: 'clamp' });

  const hlLines = [
    { text: 'WHICH OF THESE', op: hl1Op, y: hl1Y },
    { text: 'FOUR ARE YOU', op: hl2Op, y: hl2Y },
    { text: 'ALREADY DOING', op: hl3Op, y: hl3Y },
    { text: 'TO CLEAR THEM?', op: hl4Op, y: hl4Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 24 }}>
        THE QUESTION
      </div>

      {hlLines.map((l, i) => (
        <div key={i} style={{ opacity: l.op, transform: `translateY(${l.y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 108, lineHeight: 1.0, textTransform: 'uppercase', color: COLORS.white, marginBottom: 6 }}>
          {l.text}
        </div>
      ))}

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.green, margin: '22px 0 20px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.5 }}>
        Fasting. Zone 2. Quercetin. Anti-inflammatory diet.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Drop your number below.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
