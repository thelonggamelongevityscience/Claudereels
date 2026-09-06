import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const BG = '#050a09';

export const Scene6C15TheCatch: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const boxOp = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const boxY  = interpolate(frame, [22, 38], [18, 0], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [36, 52], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [36, 52], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(45,212,191,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 24 }}>
        The Catch
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 36 }}>
        A SUPPLEMENT<br />INDUSTRY IS<br />ALREADY<br />FORMING.
      </div>

      <div style={{ opacity: boxOp, transform: `translateY(${boxY}px)`, borderLeft: `2px solid ${COLORS.red}`, paddingLeft: 28, marginBottom: 32 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 10 }}>Move slower than the hype</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          The moment a nutrient gets buzz, supplements appear. The research on C15:0 is genuinely early — promising, but nowhere near the level of evidence behind vitamin D or omega-3s.
        </div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 30, color: COLORS.greige, lineHeight: 1.5 }}>
        Whole-fat dairy has existed the whole time.<br />
        <strong style={{ color: COLORS.white }}>You {"don't"} need a bottle to try it.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
