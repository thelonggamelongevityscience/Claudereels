import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const VIOLET = '#A855F7';
const GOLD   = '#FFD166';
const BG     = '#0a0714';

export const Scene2ARRMechanism: React.FC<Props> = ({ frame, captionChunks }) => {
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
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(168,85,247,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: VIOLET, marginBottom: 24 }}>
        What It Actually Is
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, color: COLORS.white, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 36 }}>
        Your Cells Have<br />A Recycling<br />System.
      </div>

      {dataBlock(db1Op, db1Y, VIOLET, 'The Name', 'Autophagy, literally "self-eating" in Greek — cells break down and recycle their own damaged components.')}
      {dataBlock(db2Op, db2Y, GOLD,   'The Discovery', 'Yoshinori Ohsumi won the 2016 Nobel Prize in Medicine for mapping out exactly how this process works.')}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
