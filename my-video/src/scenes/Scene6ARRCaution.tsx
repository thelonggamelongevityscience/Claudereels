import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const RED = '#FF4D6D';
const BG  = '#0a0714';

export const Scene6ARRCaution: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const dbOp   = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const dbY    = interpolate(frame, [20, 34], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,77,109,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}>
        Worth Knowing
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, color: COLORS.white, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 36 }}>
        You Don't Need<br />Extreme Fasting.
      </div>

      <div style={{ opacity: dbOp, transform: `translateY(${dbY}px)`, borderLeft: `2px solid ${RED}`, paddingLeft: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 10 }}>Keep It Reasonable</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.5 }}>Most of the research uses moderate windows, not prolonged extreme fasting. Talk to a doctor before attempting extended fasts, especially with any underlying condition.</div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
