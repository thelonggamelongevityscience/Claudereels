import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const RED     = '#FF4D6D';
const GREEN   = '#00FF85';
const BG      = '#12040c';

export const Scene3LITResult: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp   = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY    = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const cardsOp = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const cardsY  = interpolate(frame, [22, 38], [14, 0], { extrapolateRight: 'clamp' });
  const noteOp  = interpolate(frame, [140, 156], [0, 1], { extrapolateRight: 'clamp' });
  const noteY   = interpolate(frame, [140, 156], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22,
        fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 20 }}>
        The Result
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800,
        fontSize: 82, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 40 }}>
        A Pattern That<br />Held Everywhere<br />They Looked.
      </div>

      <div style={{ opacity: cardsOp, transform: `translateY(${cardsY}px)`, display: 'flex',
        alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          padding: '28px 32px', borderRadius: 12,
          background: 'rgba(255,77,109,0.08)', border: '1.5px solid rgba(255,77,109,0.35)', flex: 1 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: RED }}>Low Trace Lithium</div>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 42, color: COLORS.white,
            textAlign: 'center', lineHeight: 1.1 }}>Higher<br />Suicide Rate</div>
        </div>

        <div style={{ fontSize: 56, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>→</div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          padding: '28px 32px', borderRadius: 12,
          background: 'rgba(0,255,133,0.08)', border: '1.5px solid rgba(0,255,133,0.35)', flex: 1 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: GREEN }}>High Trace Lithium</div>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 42, color: GREEN,
            textAlign: 'center', lineHeight: 1.1 }}>Lower<br />Suicide Rate</div>
        </div>
      </div>

      <div style={{ opacity: noteOp, transform: `translateY(${noteY}px)`, fontFamily: FONTS.playfair,
        fontStyle: 'italic', fontSize: 32, color: COLORS.greige, lineHeight: 1.5, textAlign: 'center' }}>
        A separate study out of Japan linked the same trace levels to{' '}
        <strong style={{ color: COLORS.white }}>lower dementia rates</strong> too.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
