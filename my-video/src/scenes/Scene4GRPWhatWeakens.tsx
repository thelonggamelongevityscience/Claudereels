import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene4GRPWhatWeakens: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const li1Op = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const li1X  = interpolate(frame, [22, 38], [-20, 0], { extrapolateRight: 'clamp' });
  const li2Op = interpolate(frame, [40, 56], [0, 1], { extrapolateRight: 'clamp' });
  const li2X  = interpolate(frame, [40, 56], [-20, 0], { extrapolateRight: 'clamp' });
  const li3Op = interpolate(frame, [58, 74], [0, 1], { extrapolateRight: 'clamp' });
  const li3X  = interpolate(frame, [58, 74], [-20, 0], { extrapolateRight: 'clamp' });

  const items = [
    { label: 'No resistance training at all:', body: 'cardio alone does very little to preserve grip and overall muscle strength.', op: li1Op, x: li1X },
    { label: 'Inadequate protein intake:', body: 'muscle preservation needs enough raw material, especially as anabolic resistance increases with age.', op: li2Op, x: li2X },
    { label: 'Long periods of inactivity:', body: 'even short stretches of bed rest or sedentary behaviour measurably reduce grip strength in older adults.', op: li3Op, x: li3X },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        What Weakens It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        QUIETLY<br />ERODING<br />YOUR GRIP.
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ opacity: item.op, transform: `translateX(${item.x}px)`, display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 22 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.red, flexShrink: 0, marginTop: 8 }} />
          <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>
            <span style={{ color: COLORS.white, fontWeight: 500 }}>{item.label}</span> {item.body}
          </div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
