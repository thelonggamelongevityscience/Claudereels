import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5FIBHowToClose: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const li1Op  = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const li1X   = interpolate(frame, [22, 38], [-20, 0], { extrapolateRight: 'clamp' });
  const li2Op  = interpolate(frame, [36, 52], [0, 1], { extrapolateRight: 'clamp' });
  const li2X   = interpolate(frame, [36, 52], [-20, 0], { extrapolateRight: 'clamp' });
  const li3Op  = interpolate(frame, [50, 66], [0, 1], { extrapolateRight: 'clamp' });
  const li3X   = interpolate(frame, [50, 66], [-20, 0], { extrapolateRight: 'clamp' });
  const li4Op  = interpolate(frame, [64, 80], [0, 1], { extrapolateRight: 'clamp' });
  const li4X   = interpolate(frame, [64, 80], [-20, 0], { extrapolateRight: 'clamp' });

  const items = [
    { label: 'Add one legume serving daily:', body: 'beans, lentils, or chickpeas add 6–8 grams in a single half-cup.', op: li1Op, x: li1X },
    { label: 'Keep the skin on:', body: 'apples, potatoes, and cucumbers lose a significant share of fiber when peeled.', op: li2Op, x: li2X },
    { label: 'Increase gradually over 2–3 weeks:', body: 'the single biggest factor in avoiding the bloating that stops most people.', op: li3Op, x: li3X },
    { label: 'Pair it with water:', body: 'fiber needs fluid to do its job properly, especially as intake increases.', op: li4Op, x: li4X },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 14 }}>
        How To Close The Gap
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.green, marginBottom: 24 }}>
        SMALL ADDS.<br />BIG COMPOUND<br />EFFECT.
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
