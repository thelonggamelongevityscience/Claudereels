import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const ROWS = [
  { month: 'January',  name: 'The Optimizer' },
  { month: 'February', name: 'The Steady One' },
  { month: 'March',    name: 'The Night Owl' },
  { month: 'April',    name: 'The Protocol Follower' },
  { month: 'May',      name: 'The Hydrated One' },
  { month: 'June',     name: 'The Perpetual Snoozer' },
];

export const Scene3LAJanJun: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const chartOp = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const chartY  = interpolate(frame, [10, 30], [24, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.05} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 28 }}>
        Jan – Jun
      </div>

      <div style={{ opacity: chartOp, transform: `translateY(${chartY}px)`, border: `1px solid rgba(255,209,102,0.25)`, backgroundColor: 'rgba(255,209,102,0.04)', padding: '24px 32px' }}>
        {ROWS.map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 28, color: 'rgba(255,255,255,0.45)' }}>{row.month}</span>
            <span style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.gold, fontWeight: 700 }}>{row.name}</span>
          </div>
        ))}
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
