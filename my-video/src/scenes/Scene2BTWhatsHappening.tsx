import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const BLUE = '#4DA6FF';
const BG   = '#050810';

export const Scene2BTWhatsHappening: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const blk1Op = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const blk1Y  = interpolate(frame, [22, 38], [18, 0], { extrapolateRight: 'clamp' });
  const blk2Op = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const blk2Y  = interpolate(frame, [34, 50], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(77,166,255,0.05) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: BLUE, marginBottom: 24 }}>
        What's Actually Happening
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 36 }}>
        YOUR CORE<br />TEMPERATURE<br />HAS TO DROP<br />TO SLEEP.
      </div>

      <div style={{ opacity: blk1Op, transform: `translateY(${blk1Y}px)`, borderLeft: `2px solid ${BLUE}`, paddingLeft: 28, marginBottom: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: 8 }}>The mechanism</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.55 }}>
          Your body needs to drop its core temperature by 1–2°F to initiate and maintain sleep — a hardwired signal that tells your brain it's time to sleep.
        </div>
      </div>

      <div style={{ opacity: blk2Op, transform: `translateY(${blk2Y}px)`, borderLeft: `2px solid ${BLUE}`, paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: 8 }}>The problem</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.55 }}>
          A warm bedroom fights this directly. Sleep onset delays and deep sleep gets cut short — even when everything else is perfect.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
