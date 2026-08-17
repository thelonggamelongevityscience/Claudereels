import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2BONWhatsHappening: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const db1Op = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [26, 42], [14, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [46, 62], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [46, 62], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="sand" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.sand, marginBottom: 14 }}>
        What's Actually Happening
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 76, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        PEAK BONE MASS<br />HAPPENS EARLIER<br />THAN YOU'D THINK.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.sand}`, paddingLeft: 20, marginBottom: 22 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.sand, marginBottom: 6 }}>The Timeline</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Bone density peaks around age 30, then begins a slow, largely silent decline. For women, the decline accelerates sharply for 5 to 10 years after menopause due to falling oestrogen.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.sand}`, paddingLeft: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.sand, marginBottom: 6 }}>The Silence</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Bone loss produces no symptoms until a fracture happens. Osteoporosis is often called a silent disease — significant loss has usually already occurred by diagnosis.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
