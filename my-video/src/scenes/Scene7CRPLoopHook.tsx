import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7CRPLoopHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const lineOp = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const lineW  = interpolate(frame, [30, 54], [0, 100], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [44, 60], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [44, 60], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.09} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 22 }}>
        The Question
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.blue, marginBottom: 32 }}>
        HAVE YOU<br />EVER HAD<br />YOUR HS-CRP<br />TESTED?
      </div>

      <div style={{ opacity: lineOp, height: 2, backgroundColor: COLORS.blue, width: `${lineW}%`, marginBottom: 32 }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.45 }}>
        Most people have not.<br />
        <strong style={{ color: COLORS.white }}>Drop a yes or no below 👇</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
