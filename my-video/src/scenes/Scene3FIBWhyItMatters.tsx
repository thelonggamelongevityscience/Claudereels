import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3FIBWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
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
    { label: 'Every 8 grams counts:', body: 'linked to meaningfully lower risk of cardiovascular disease, type 2 diabetes, and colorectal cancer.', op: li1Op, x: li1X },
    { label: 'Blunts blood sugar spikes:', body: 'slows glucose absorption — one of the most powerful dietary levers for metabolic health.', op: li2Op, x: li2X },
    { label: 'Drives microbiome diversity:', body: 'the strongest dietary predictor of gut diversity and 90% of your serotonin production.', op: li3Op, x: li3X },
    { label: 'Powerful satiety lever:', body: 'high-fiber meals reduce total daily calorie intake without conscious restriction.', op: li4Op, x: li4X },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 14 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 24 }}>
        ONE NUTRIENT.<br />ENORMOUS<br />DATA.
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
