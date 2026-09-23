import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const YELLOW = '#FFC53D';
const GREEN  = '#00FF85';
const BG     = '#0e0a02';

export const Scene7VDSendThis: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [22, 36], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY  = interpolate(frame, [22, 36], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,197,61,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: YELLOW, marginBottom: 24 }}>
        Before You Scroll On
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 86, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, marginBottom: 36 }}>
        SEND THIS TO<br />SOMEONE WHO<br />SKIPS THEIR<br />VITAMIN D TEST.
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(0,255,133,0.10)', border: '1px solid rgba(0,255,133,0.35)', padding: '12px 24px' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: GREEN, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>📤 Tap Send</div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
