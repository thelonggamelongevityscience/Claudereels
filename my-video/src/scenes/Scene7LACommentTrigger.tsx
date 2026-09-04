import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7LACommentTrigger: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp    = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY     = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp     = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY      = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const badgeOp  = interpolate(frame, [24, 40], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY   = interpolate(frame, [24, 40], [12, 0], { extrapolateRight: 'clamp' });
  const subOp    = interpolate(frame, [36, 52], [0, 1], { extrapolateRight: 'clamp' });
  const subY     = interpolate(frame, [36, 52], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="gold" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 24 }}>
        Your Turn
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 96, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 36 }}>
        WHAT MONTH<br />WERE YOU<br />BORN?
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,255,133,0.1)', border: '1px solid rgba(0,255,133,0.35)', padding: '16px 28px', marginBottom: 32, alignSelf: 'flex-start' }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.green, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>💬 Comment Your Month Below</span>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.5 }}>
        {"I'll"} reply with your archetype<br />
        <strong style={{ color: COLORS.white }}>and one thing to work on.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
