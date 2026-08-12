import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2MLMechanism: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const box1Op = interpolate(frame, [20, 38], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y  = interpolate(frame, [20, 38], [18, 0], { extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [34, 52], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y  = interpolate(frame, [34, 52], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 14 }}>
        What's Actually Happening
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        LIGHT HITS YOUR<br />EYES. YOUR CLOCK<br />RESETS INSTANTLY.
      </div>

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>The Mechanism</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Specialized cells in your retina detect light and send a direct signal to the suprachiasmatic nucleus — your brain's master clock. This isn't vision. It's a separate light-sensing pathway that exists purely to set your circadian rhythm.
        </div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>The Domino Effect</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          That single signal sets a countdown. Roughly 14 to 16 hours later, your brain releases the melatonin that puts you to sleep. Miss the signal and the countdown starts late — or doesn't start cleanly at all.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
