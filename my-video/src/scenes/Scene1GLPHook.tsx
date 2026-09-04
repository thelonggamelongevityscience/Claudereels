import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const STEEL = '#5B8DEF';

export const Scene1GLPHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const emojiOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0,  14], [20, 0], { extrapolateRight: 'clamp' });
  const hlOp    = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: 'clamp' });
  const hlY     = interpolate(frame, [12, 28], [20, 0], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [26, 42], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: '#07080c', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(91,141,239,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 110, lineHeight: 1, filter: 'drop-shadow(0 0 30px rgba(91,141,239,0.6))', marginBottom: 28 }}>
        💉
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 116, lineHeight: 0.88, textTransform: 'uppercase', color: COLORS.white, letterSpacing: '-0.02em', marginBottom: 28 }}>
        GLP-1S.<br />MYTH VS<br />REALITY.
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.4 }}>
        The most talked-about drugs in health right now.<br />
        <strong style={{ color: COLORS.white }}>{"Let's"} separate the two.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
