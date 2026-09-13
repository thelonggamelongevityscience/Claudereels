import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const PINK = '#FF6B9D';
const BG   = '#0a0508';

export const Scene6SCProtocol: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op   = interpolate(frame, [18, 32], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y    = interpolate(frame, [18, 32], [12, 0], { extrapolateRight: 'clamp' });
  const b2Op   = interpolate(frame, [26, 40], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y    = interpolate(frame, [26, 40], [12, 0], { extrapolateRight: 'clamp' });
  const b3Op   = interpolate(frame, [34, 48], [0, 1], { extrapolateRight: 'clamp' });
  const b3Y    = interpolate(frame, [34, 48], [12, 0], { extrapolateRight: 'clamp' });

  const bullet = (op: number, y: number, text: string) => (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
      <span style={{ fontFamily: FONTS.mono, fontSize: 28, color: PINK, flexShrink: 0, marginTop: 2 }}>→</span>
      <span style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 38, color: COLORS.white, lineHeight: 1.15 }}>{text}</span>
    </div>
  );

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,107,157,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: PINK, marginBottom: 24 }}>
        The Protocol
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 52, color: COLORS.white, lineHeight: 1.1, marginBottom: 36 }}>
        It's not about how many friends you have.
      </div>

      {bullet(b1Op, b1Y, 'A handful of close relationships beats a wide social circle.')}
      {bullet(b2Op, b2Y, 'Regular contact beats occasional deep conversations.')}
      {bullet(b3Op, b3Y, 'Showing up consistently matters more than grand gestures.')}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
