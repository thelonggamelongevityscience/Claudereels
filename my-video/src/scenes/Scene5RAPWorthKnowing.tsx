import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const INDIGO = '#6366F1';
const RED    = '#FF4D6D';
const BG     = '#050414';

export const Scene5RAPWorthKnowing: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const blOp  = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const blY   = interpolate(frame, [22, 38], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, rgba(99,102,241,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}>
        Worth Knowing
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 96, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 48 }}>
        This Is An<br />Off-Label<br />Prescription.
      </div>

      <div style={{ opacity: blOp, transform: `translateY(${blY}px)`, borderLeft: `3px solid ${RED}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 10 }}>The Catch</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 30, color: COLORS.greige, lineHeight: 1.55 }}>
          Not an over-the-counter supplement — it requires a prescription used off-label, real monitoring, and a conversation with a doctor who <strong style={{ color: COLORS.white }}>knows the research.</strong>
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
