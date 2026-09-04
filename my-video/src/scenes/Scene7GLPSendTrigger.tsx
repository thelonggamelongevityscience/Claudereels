import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene7GLPSendTrigger: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp    = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY     = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp     = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY      = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const subOp    = interpolate(frame, [24, 38], [0, 1], { extrapolateRight: 'clamp' });
  const subY     = interpolate(frame, [24, 38], [12, 0], { extrapolateRight: 'clamp' });
  const badgeOp  = interpolate(frame, [34, 48], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY   = interpolate(frame, [34, 48], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: '#07080c', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(91,141,239,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#5B8DEF', marginBottom: 22 }}>
        Before You Scroll On
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 88, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        SEND THIS TO<br />SOMEONE WITH<br />AN OPINION<br />ON OZEMPIC.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.45, marginBottom: 32 }}>
        Everyone has one. Not everyone has the facts.
      </div>

      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,255,133,0.1)', border: '1px solid rgba(0,255,133,0.35)', padding: '16px 28px', alignSelf: 'flex-start' }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.green, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>📤 Tap Send</span>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
