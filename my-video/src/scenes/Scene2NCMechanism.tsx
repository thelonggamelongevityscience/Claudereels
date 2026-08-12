import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2NCMechanism: React.FC<Props> = ({ frame, captionChunks }) => {
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
      <GlowBg color="red" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        What's Actually Happening
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        ALCOHOL KNOCKS<br />YOU OUT. YOUR<br />SLEEP FALLS APART.
      </div>

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 6 }}>The Sedative Effect</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Alcohol is a sedative — it knocks you out fast, which is why you fall asleep quicker. But it suppresses REM sleep almost completely during the first several hours.
        </div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 6 }}>The REM Rebound</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Then as your body metabolizes it, you get a REM rebound that fragments the second half of your night — lighter sleep, more wake-ups, less recovery.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
