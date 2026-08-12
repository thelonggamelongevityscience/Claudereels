import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3NCWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const r1Op   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const r1Y    = interpolate(frame, [22, 38], [16, 0], { extrapolateRight: 'clamp' });
  const r2Op   = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const r2Y    = interpolate(frame, [34, 50], [16, 0], { extrapolateRight: 'clamp' });
  const r3Op   = interpolate(frame, [46, 62], [0, 1], { extrapolateRight: 'clamp' });
  const r3Y    = interpolate(frame, [46, 62], [16, 0], { extrapolateRight: 'clamp' });
  const r4Op   = interpolate(frame, [58, 74], [0, 1], { extrapolateRight: 'clamp' });
  const r4Y    = interpolate(frame, [58, 74], [16, 0], { extrapolateRight: 'clamp' });

  const rows = [
    { icon: '🧠', label: 'Memory', desc: "REM is where the day gets processed. Suppress it and you wake up having slept but not recovered.", op: r1Op, y: r1Y },
    { icon: '📉', label: 'Deep Sleep', desc: 'Deep sleep drops too — the phase that repairs tissue and regulates hormones.', op: r2Op, y: r2Y },
    { icon: '💔', label: 'Fragmentation', desc: 'More wake-ups in the second half means lighter, less restorative sleep overall.', op: r3Op, y: r3Y },
    { icon: '😶‍🌫️', label: 'Next Day', desc: 'That disrupted REM is directly linked to the anxious, foggy feeling the day after.', op: r4Op, y: r4Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        REM SLEEP IS<br />WHERE MEMORY<br />CONSOLIDATES.
      </div>

      {rows.map((r, i) => (
        <div key={i} style={{ opacity: r.op, transform: `translateY(${r.y}px)`, display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ fontSize: 28, marginRight: 16, flexShrink: 0, lineHeight: 1 }}>{r.icon}</div>
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 4 }}>{r.label}</div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.5 }}>{r.desc}</div>
          </div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
