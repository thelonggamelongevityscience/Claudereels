import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene8CRPCTA: React.FC<Props> = ({ frame, captionChunks }) => {
  const logoOp = interpolate(frame, [0,  16], [0, 1], { extrapolateRight: 'clamp' });
  const logoY  = interpolate(frame, [0,  16], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [12, 28], [16, 0], { extrapolateRight: 'clamp' });
  const tagOp  = interpolate(frame, [30, 46], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [30, 46], [12, 0], { extrapolateRight: 'clamp' });
  const hashOp = interpolate(frame, [50, 66], [0, 1], { extrapolateRight: 'clamp' });
  const hashY  = interpolate(frame, [50, 66], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 28, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 20 }}>
        THE LONG GAME
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 76, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        DAILY LONGEVITY<br />SCIENCE FOR<br />PEOPLE WHO PLAN<br />AHEAD.
      </div>

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 28, color: COLORS.greige, lineHeight: 1.5, marginBottom: 36 }}>
        Follow for more and save this<br />
        <strong style={{ color: COLORS.blue }}>before your next blood draw.</strong>
      </div>

      <div style={{ opacity: hashOp, transform: `translateY(${hashY}px)`, fontFamily: FONTS.mono, fontSize: 18, color: COLORS.grey, lineHeight: 1.8 }}>
        #hscrp #inflammation #hearthealth<br />
        #longevity #labs
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
