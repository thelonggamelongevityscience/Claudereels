import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5CRPHowToLowerIt: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const li1Op = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const li1X  = interpolate(frame, [26, 42], [-20, 0], { extrapolateRight: 'clamp' });
  const li2Op = interpolate(frame, [50, 66], [0, 1], { extrapolateRight: 'clamp' });
  const li2X  = interpolate(frame, [50, 66], [-20, 0], { extrapolateRight: 'clamp' });
  const li3Op = interpolate(frame, [74, 90], [0, 1], { extrapolateRight: 'clamp' });
  const li3X  = interpolate(frame, [74, 90], [-20, 0], { extrapolateRight: 'clamp' });
  const li4Op = interpolate(frame, [98, 114], [0, 1], { extrapolateRight: 'clamp' });
  const li4X  = interpolate(frame, [98, 114], [-20, 0], { extrapolateRight: 'clamp' });

  const items = [
    { label: 'Anti-inflammatory whole foods:', body: 'olive oil, fatty fish, and leafy greens measurably lower hs-CRP within weeks.', op: li1Op, x: li1X },
    { label: 'Regular movement,', body: 'especially Zone 2 cardio, is one of the most reliable ways to reduce systemic inflammation.', op: li2Op, x: li2X },
    { label: 'Sleep quality', body: 'directly lowers inflammatory markers — this is not optional.', op: li3Op, x: li3X },
    { label: 'Losing visceral fat specifically,', body: 'not just total weight, drives the biggest hs-CRP improvements.', op: li4Op, x: li4X },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 14 }}>
        How To Lower It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.green, marginBottom: 28 }}>
        THE PROTOCOL<br />THAT ACTUALLY<br />MOVES THE NUMBER.
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ opacity: item.op, transform: `translateX(${item.x}px)`, display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 22 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.green, flexShrink: 0, marginTop: 8 }} />
          <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>
            <span style={{ color: COLORS.white, fontWeight: 500 }}>{item.label}</span> {item.body}
          </div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
