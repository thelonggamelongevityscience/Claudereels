import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const GOLD    = '#FFD166';
const BG      = '#12040c';

export const Scene2TRRStudy: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 24], [18, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [20, 34], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [20, 34], [14, 0], { extrapolateRight: 'clamp' });
  const db2Op  = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y   = interpolate(frame, [30, 44], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 16 }}>
        The Study
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 64, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        THEY WEREN'T<br />EVEN TRYING TO<br />REVERSE AGING.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `2px solid ${MAGENTA}`, paddingLeft: 18, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 6 }}>The TRIIM Trial</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.5 }}>
          A small pilot study combining growth hormone, DHEA, and metformin — originally designed to test thymus regeneration, not aging reversal.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `2px solid ${GOLD}`, paddingLeft: 18 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>The Surprise</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.5 }}>
          Researchers measured participants' epigenetic age before and after. What they found wasn't in the original hypothesis at all.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
