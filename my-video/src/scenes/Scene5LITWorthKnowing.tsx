import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const RED     = '#FF4D6D';
const BG      = '#12040c';

export const Scene5LITWorthKnowing: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const dbOp   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const dbY    = interpolate(frame, [22, 38], [14, 0], { extrapolateRight: 'clamp' });
  const noteOp = interpolate(frame, [38, 54], [0, 1], { extrapolateRight: 'clamp' });
  const noteY  = interpolate(frame, [38, 54], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22,
        fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: 20 }}>
        Worth Knowing
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800,
        fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 40 }}>
        This Isn't A<br />Reason To<br />Dose Yourself.
      </div>

      <div style={{ opacity: dbOp, transform: `translateY(${dbY}px)`, borderLeft: `3px solid ${RED}`,
        paddingLeft: 28, marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: RED, marginBottom: 10 }}>The Catch</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          This is correlation from population data, not a controlled trial.{' '}
          <strong style={{ color: COLORS.white }}>Local water levels vary hugely</strong> and aren't
          something to replicate on your own.
        </div>
      </div>

      <div style={{ opacity: noteOp, transform: `translateY(${noteY}px)`, fontFamily: FONTS.playfair,
        fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.5 }}>
        The free levers still matter most:{' '}
        <strong style={{ color: COLORS.white }}>sleep, movement, diet, stress.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
