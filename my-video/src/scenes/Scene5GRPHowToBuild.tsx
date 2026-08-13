import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5GRPHowToBuild: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const li1Op = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const li1X  = interpolate(frame, [22, 38], [-20, 0], { extrapolateRight: 'clamp' });
  const li2Op = interpolate(frame, [38, 54], [0, 1], { extrapolateRight: 'clamp' });
  const li2X  = interpolate(frame, [38, 54], [-20, 0], { extrapolateRight: 'clamp' });
  const li3Op = interpolate(frame, [54, 70], [0, 1], { extrapolateRight: 'clamp' });
  const li3X  = interpolate(frame, [54, 70], [-20, 0], { extrapolateRight: 'clamp' });
  const li4Op = interpolate(frame, [70, 86], [0, 1], { extrapolateRight: 'clamp' });
  const li4X  = interpolate(frame, [70, 86], [-20, 0], { extrapolateRight: 'clamp' });

  const items = [
    { label: 'Resistance train 2–3× per week:', body: "compound movements like deadlifts, rows, and carries build grip strength as a byproduct.", op: li1Op, x: li1X },
    { label: 'Add direct grip work:', body: "farmer's carries and dead hangs are simple, low-equipment ways to train it specifically.", op: li2Op, x: li2X },
    { label: 'Hit your protein target:', body: 'muscle-building signals don\'t work without adequate amino acids available.', op: li3Op, x: li3X },
    { label: 'Test it periodically:', body: 'grip dynamometers are inexpensive, and tracking the trend over time tells you if you\'re ageing well.', op: li4Op, x: li4X },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 14 }}>
        How To Build It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.green, marginBottom: 24 }}>
        TRAIN IT<br />LIKE YOU'D<br />TRAIN<br />ANYTHING.
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ opacity: item.op, transform: `translateX(${item.x}px)`, display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.green, flexShrink: 0, marginTop: 8 }} />
          <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: COLORS.greige, lineHeight: 1.5 }}>
            <span style={{ color: COLORS.white, fontWeight: 500 }}>{item.label}</span> {item.body}
          </div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
