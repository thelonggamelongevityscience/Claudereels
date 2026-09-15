import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const CYAN = '#00E5FF';
const GOLD = '#FFD166';
const BG   = '#040c10';

export const Scene2CERMechanism: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [20, 34], [12, 0], { extrapolateRight: 'clamp' });
  const db2Op  = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y   = interpolate(frame, [30, 44], [12, 0], { extrapolateRight: 'clamp' });

  const dataBlock = (op: number, y: number, color: string, label: string, body: string) => (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, borderLeft: `2px solid ${color}`, paddingLeft: 20, marginBottom: 20 }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.5 }}>{body}</div>
    </div>
  );

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(0,229,255,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: CYAN, marginBottom: 24 }}>
        What's Actually Happening
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, color: COLORS.white, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 36 }}>
        Cold Shock Spikes<br />One Hormone<br />Hard.
      </div>

      {dataBlock(db1Op, db1Y, CYAN, 'The Mechanism', 'Cold exposure triggers a sharp spike in norepinephrine — linked to alertness, mood, and focus. The best-documented effect by far.')}
      {dataBlock(db2Op, db2Y, GOLD, 'Everything Else', 'Most other claims are built on much thinner or more mixed evidence. Let\'s rate them one by one.')}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
