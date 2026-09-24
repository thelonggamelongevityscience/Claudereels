import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const RED     = '#FF4D6D';
const BG      = '#12040c';

export const Scene5TRRWorthKnowing: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 24], [18, 0], { extrapolateRight: 'clamp' });
  const dbOp  = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const dbY   = interpolate(frame, [20, 34], [14, 0], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [32, 46], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [32, 46], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,77,109,0.06) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: 16 }}>
        Worth Knowing
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        THIS ISN'T A<br />PROTOCOL<br />TO COPY.
      </div>

      <div style={{ opacity: dbOp, transform: `translateY(${dbY}px)`, borderLeft: `2px solid ${RED}`, paddingLeft: 18, marginBottom: 22 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 6 }}>The Catch</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.5 }}>
          Nine participants. Prescription drugs with real side-effect risk, taken under medical supervision. This is science-in-progress, not a DIY stack.
        </div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 26, color: COLORS.greige, lineHeight: 1.45 }}>
        The free levers still matter most: <strong style={{ color: COLORS.white }}>sleep, movement, diet, stress.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
