import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3HALWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const li1Op = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const li1X  = interpolate(frame, [26, 42], [-20, 0], { extrapolateRight: 'clamp' });
  const li2Op = interpolate(frame, [46, 62], [0, 1], { extrapolateRight: 'clamp' });
  const li2X  = interpolate(frame, [46, 62], [-20, 0], { extrapolateRight: 'clamp' });
  const li3Op = interpolate(frame, [66, 82], [0, 1], { extrapolateRight: 'clamp' });
  const li3X  = interpolate(frame, [66, 82], [-20, 0], { extrapolateRight: 'clamp' });
  const li4Op = interpolate(frame, [86, 102], [0, 1], { extrapolateRight: 'clamp' });
  const li4X  = interpolate(frame, [86, 102], [-20, 0], { extrapolateRight: 'clamp' });

  const items = [
    { label: 'Genomic instability & telomere shortening:', body: 'DNA damage accumulates and the protective caps on your chromosomes wear down over time.', op: li1Op, x: li1X },
    { label: 'Cellular senescence:', body: 'the zombie cells covered earlier this cycle, refusing to die and spreading inflammatory signals.', op: li2Op, x: li2X },
    { label: 'Mitochondrial dysfunction:', body: "your cells' energy factories become less efficient, driving compounding fatigue.", op: li3Op, x: li3X },
    { label: 'Dysregulated nutrient sensing:', body: 'the inflammation and insulin resistance mechanisms covered across multiple posts.', op: li4Op, x: li4X },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="indigo" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.indigo, marginBottom: 14 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        TWELVE<br />MECHANISMS.<br />INTERCONNECTED.
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ opacity: item.op, transform: `translateX(${item.x}px)`, display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.indigo, flexShrink: 0, marginTop: 8 }} />
          <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: COLORS.greige, lineHeight: 1.5 }}>
            <span style={{ color: COLORS.white, fontWeight: 500 }}>{item.label}</span> {item.body}
          </div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
