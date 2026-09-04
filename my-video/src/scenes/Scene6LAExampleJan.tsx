import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6LAExampleJan: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [10, 24], [10, 0], { extrapolateRight: 'clamp' });
  const boxOp  = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });
  const boxY   = interpolate(frame, [20, 36], [20, 0], { extrapolateRight: 'clamp' });
  const descOp = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const descY  = interpolate(frame, [34, 50], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.06} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 24 }}>
        Another One
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 36, color: COLORS.greige, marginBottom: 24 }}>
        Born in January?
      </div>

      <div style={{ opacity: boxOp, transform: `translateY(${boxY}px)`, border: `2px solid ${COLORS.gold}`, backgroundColor: 'rgba(255,209,102,0.06)', padding: '36px 40px', marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>You Are</div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 88, color: COLORS.gold, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.9 }}>THE<br />OPTIMIZER</div>
      </div>

      <div style={{ opacity: descOp, transform: `translateY(${descY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.5 }}>
        You already track everything.<br />
        <strong style={{ color: COLORS.white }}>Your biggest lever: doing less, better.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
