import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7GRPLoopHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const h1Op  = interpolate(frame, [8,  22], [0, 1], { extrapolateRight: 'clamp' });
  const h1Y   = interpolate(frame, [8,  22], [24, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [28, 46], [0, 100], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [40, 56], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [40, 56], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 14 }}>
        The Question
      </div>

      <div style={{ opacity: h1Op, transform: `translateY(${h1Y}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 96, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 8 }}>
        WHEN DID<br />YOU LAST<br />TEST YOUR<br />GRIP<br />STRENGTH?
      </div>

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.blue, margin: '18px 0 16px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.45 }}>
        Most people never have.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Drop your guess below 👇</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
