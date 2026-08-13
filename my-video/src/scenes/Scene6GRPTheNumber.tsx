import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6GRPTheNumber: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const box1Op = interpolate(frame, [22, 40], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y  = interpolate(frame, [22, 40], [18, 0], { extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [42, 60], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y  = interpolate(frame, [42, 60], [18, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [64, 80], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [64, 80], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 14 }}>
        The Number That Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 24 }}>
        WHAT<br />COUNTS AS<br />STRONG?
      </div>

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, borderLeft: `3px solid ${COLORS.blue}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 6 }}>The General Benchmark</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Men below ~26 kg and women below ~16 kg is associated with meaningfully elevated risk in most population studies — though exact cutoffs vary by age.
        </div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>The Trend Matters More</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          A single measurement is useful, but tracking grip strength over years tells you far more about how you're actually ageing than one snapshot ever could.
        </div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 28, color: COLORS.greige, lineHeight: 1.45 }}>
        It sounds too simple to matter this much.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>The data says otherwise.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
