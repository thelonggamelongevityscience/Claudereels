import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6MLLuxGap: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const box1Op = interpolate(frame, [22, 40], [0, 1], { extrapolateRight: 'clamp' });
  const box1Y  = interpolate(frame, [22, 40], [18, 0], { extrapolateRight: 'clamp' });
  const box2Op = interpolate(frame, [36, 54], [0, 1], { extrapolateRight: 'clamp' });
  const box2Y  = interpolate(frame, [36, 54], [18, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [52, 68], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [52, 68], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 14 }}>
        The Light You're Missing
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        INDOORS IS<br />DARKER THAN<br />YOU THINK.
      </div>

      <div style={{ opacity: box1Op, transform: `translateY(${box1Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>Typical Indoor Lighting</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Around 200 to 500 lux — nowhere near enough to trigger a strong circadian signal, no matter how bright the room looks to your eyes.
        </div>
      </div>

      <div style={{ opacity: box2Op, transform: `translateY(${box2Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 20, marginBottom: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>Outdoor Light — Even Overcast</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          1,000 to 2,000+ lux. A cloudy morning outside still delivers several times the signal strength of any indoor lighting.
        </div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 28, color: COLORS.greige, lineHeight: 1.5 }}>
        Your brain isn't judging brightness the way it looks to you.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>It's measuring lux. Go outside.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
