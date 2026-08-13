import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene4VO2RiskGap: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const statOp  = interpolate(frame, [8,  26], [0, 1], { extrapolateRight: 'clamp' });
  const statY   = interpolate(frame, [8,  26], [24, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [26, 44], [0, 100], { extrapolateRight: 'clamp' });
  const box1Op  = interpolate(frame, [38, 56], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y   = interpolate(frame, [38, 56], [18, 0], { extrapolateRight: 'clamp' });
  const box2Op  = interpolate(frame, [54, 72], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y   = interpolate(frame, [54, 72], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="orange" opacity={0.1} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 14 }}>
        The Risk Gap
      </div>

      <div style={{ opacity: statOp, transform: `translateY(${statY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 160, lineHeight: 0.85, color: COLORS.orange, marginBottom: 4 }}>
        5×
      </div>
      <div style={{ opacity: statOp, transform: `translateY(${statY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 36, lineHeight: 1.1, textTransform: 'uppercase', color: COLORS.white, marginBottom: 10 }}>
        Higher mortality risk<br />in the bottom 25%
      </div>

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.orange, margin: '16px 0 20px' }} />

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, borderLeft: `3px solid ${COLORS.orange}`, paddingLeft: 20, marginBottom: 18 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 5 }}>The Gap</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>
          The bottom twenty-five percent carries five times the mortality risk of the top group — more than any single traditional risk factor.
        </div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, borderLeft: `3px solid ${COLORS.orange}`, paddingLeft: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 5 }}>The Upside</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>
          Where you sit isn't fixed. It's one of the most trainable biomarkers you have.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
