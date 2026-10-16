import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const RED = '#FF4D6D';
const BG  = '#0D0D0D';

export const Scene3IP1Quiet: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [8,  24], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [18, 34], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y   = interpolate(frame, [18, 34], [14, 0], { extrapolateRight: 'clamp' });
  const noteOp = interpolate(frame, [50, 66], [0, 1], { extrapolateRight: 'clamp' });
  const noteY  = interpolate(frame, [50, 66], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 35%, rgba(255,77,109,0.08) 0%, transparent 65%)`,
        pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono,
        fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: RED, marginBottom: 20 }}>
        The Confession
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow,
        fontWeight: 900, fontSize: 96, lineHeight: 0.88, textTransform: 'uppercase',
        color: COLORS.white, marginBottom: 44 }}>
        Chronic<br />Inflammation<br />Is Quiet.
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`,
        borderLeft: `3px solid ${RED}`, paddingLeft: 28, marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: RED, marginBottom: 10 }}>The difference</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Acute inflammation is the swelling after an injury. Chronic, low-grade inflammation
          can run for <strong style={{ color: COLORS.white }}>years with no symptoms.</strong>
        </div>
      </div>

      <div style={{ opacity: noteOp, transform: `translateY(${noteY}px)`, fontFamily: FONTS.mono,
        fontSize: 24, color: COLORS.greige, lineHeight: 1.5 }}>
        You can only see it in a blood test.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
