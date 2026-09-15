import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const VIOLET = '#A855F7';
const VIOLET2 = '#7c2fd4';
const BG      = '#0a0714';

const ROWS = [
  { time: '0 hr',  pct: 8,   label: 'Minimal' },
  { time: '8 hr',  pct: 25,  label: 'Beginning' },
  { time: '12 hr', pct: 50,  label: 'Rising' },
  { time: '16 hr', pct: 75,  label: 'Meaningfully up' },
  { time: '24 hr', pct: 100, label: 'Peak activity' },
];

export const Scene3ARRTimeline: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const chartOp = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const chartY  = interpolate(frame, [20, 34], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(168,85,247,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VIOLET, marginBottom: 24 }}>
        The Timeline
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 52, color: COLORS.white, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 40 }}>
        Autophagy Activity<br />Since Your Last Meal.
      </div>

      <div style={{ opacity: chartOp, transform: `translateY(${chartY}px)`, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {ROWS.map(row => (
          <div key={row.time} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 26, color: 'rgba(255,255,255,0.6)', width: 100, flexShrink: 0, textAlign: 'right' }}>{row.time}</span>
            <div style={{ flex: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${row.pct}%`, background: `linear-gradient(to right, ${VIOLET2}, ${VIOLET})`, borderRadius: 14 }} />
            </div>
            <span style={{ fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(255,255,255,0.45)', width: 160, flexShrink: 0 }}>{row.label}</span>
          </div>
        ))}
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
