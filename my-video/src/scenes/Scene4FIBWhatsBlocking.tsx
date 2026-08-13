import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene4FIBWhatsBlocking: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const li1Op  = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const li1X   = interpolate(frame, [22, 38], [-20, 0], { extrapolateRight: 'clamp' });
  const li2Op  = interpolate(frame, [38, 54], [0, 1], { extrapolateRight: 'clamp' });
  const li2X   = interpolate(frame, [38, 54], [-20, 0], { extrapolateRight: 'clamp' });
  const li3Op  = interpolate(frame, [54, 70], [0, 1], { extrapolateRight: 'clamp' });
  const li3X   = interpolate(frame, [54, 70], [-20, 0], { extrapolateRight: 'clamp' });

  const items = [
    { label: 'Refined carbs replaced whole ones:', body: 'white bread, rice, and pasta strip out the fiber that used to come standard.', op: li1Op, x: li1X },
    { label: 'Protein-first eating crowded it out:', body: 'fewer vegetables, legumes, and whole grains on the plate.', op: li2Op, x: li2X },
    { label: 'Fear of bloating stops people first:', body: 'a real short-term effect, but one that resolves within a couple of weeks of gradual increase.', op: li3Op, x: li3X },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        What's Blocking It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        WHY ALMOST<br />NOBODY HITS<br />THE TARGET.
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ opacity: item.op, transform: `translateX(${item.x}px)`, display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
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
