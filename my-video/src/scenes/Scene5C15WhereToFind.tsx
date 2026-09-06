import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const TEAL = '#2DD4BF';
const BG   = '#050a09';

const BULLETS = [
  <><strong style={{ color: '#FFFFFF' }}>Whole-fat dairy</strong> — milk, cheese, and butter naturally contain it. Skim and low-fat versions largely strip it out.</>,
  <><strong style={{ color: '#FFFFFF' }}>Certain fish</strong> — trace amounts show up in some fatty fish alongside the omega-3s already covered this cycle.</>,
  <>This is likely part of why <strong style={{ color: '#FFFFFF' }}>full-fat dairy research</strong> has looked more favorable in recent years than decades-old guidance assumed.</>,
];

export const Scene5C15WhereToFind: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [24, 40], [0, 1], { extrapolateRight: 'clamp' });
  const b1X   = interpolate(frame, [24, 40], [-20, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const b2X   = interpolate(frame, [34, 50], [-20, 0], { extrapolateRight: 'clamp' });
  const b3Op  = interpolate(frame, [44, 60], [0, 1], { extrapolateRight: 'clamp' });
  const b3X   = interpolate(frame, [44, 60], [-20, 0], { extrapolateRight: 'clamp' });

  const bulletAnims = [
    { opacity: b1Op, transform: `translateX(${b1X}px)` },
    { opacity: b2Op, transform: `translateX(${b2X}px)` },
    { opacity: b3Op, transform: `translateX(${b3X}px)` },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: TEAL, marginBottom: 24 }}>
        Where {"It's"} Found
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 78, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 40 }}>
        FOODS YOU<br />ALREADY HAVE<br />AN OPINION<br />ABOUT.
      </div>

      {BULLETS.map((text, i) => (
        <div key={i} style={{ ...bulletAnims[i], display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 28 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: TEAL, flexShrink: 0, marginTop: 8 }} />
          <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>{text}</div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
