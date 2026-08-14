import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7HALLoopHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [24, 0], { extrapolateRight: 'clamp' });
  const lineW  = interpolate(frame, [26, 46], [0, 100], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [42, 58], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [42, 58], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="indigo" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.indigo, marginBottom: 14 }}>
        The Question
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 96, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 16 }}>
        WHICH<br />HALLMARK<br />DO YOU THINK<br />YOU'RE MANAGING<br />WORST?
      </div>

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.indigo, marginBottom: 20 }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.45 }}>
        Be honest with yourself.<br />
        <strong style={{ color: COLORS.white }}>Drop it below 👇</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
