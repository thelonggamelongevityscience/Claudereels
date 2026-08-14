import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6HALWhyThisMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [28, 44], [14, 0], { extrapolateRight: 'clamp' });
  const db2Op  = interpolate(frame, [48, 64], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y   = interpolate(frame, [48, 64], [14, 0], { extrapolateRight: 'clamp' });
  const subOp  = interpolate(frame, [70, 86], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [70, 86], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="indigo" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.indigo, marginBottom: 14 }}>
        Why This Matters For You
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        ONE FRAMEWORK.<br />EVERY POST<br />YOU'VE READ.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.indigo}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.indigo, marginBottom: 6 }}>The Pattern</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Every reel and carousel this cycle has been one piece of this twelve-part puzzle — cortisol, insulin, zombie cells, autophagy, inflammation, sleep architecture, all of it.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>The Takeaway</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          You don't need twelve separate strategies. A handful of core habits — sleep, movement, real food, stress management — influence nearly all twelve hallmarks at once.
        </div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 28, color: COLORS.greige, lineHeight: 1.45 }}>
        This is the actual science behind longevity content.<br />
        <strong style={{ color: COLORS.white }}>Not marketing. Not hacks. Biology.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
