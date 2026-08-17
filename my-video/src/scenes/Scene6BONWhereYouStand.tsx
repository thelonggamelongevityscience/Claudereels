import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene6BONWhereYouStand: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const db1Op = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [28, 44], [14, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [48, 64], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [48, 64], [14, 0], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [70, 86], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [70, 86], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="sand" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.sand, marginBottom: 14 }}>
        Where Do You Stand
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        THE TEST ALMOST<br />NOBODY GETS<br />BEFORE 50.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.sand}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.sand, marginBottom: 6 }}>A DEXA Scan</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          A quick, low-radiation scan that measures bone mineral density directly — the gold standard for knowing where you actually stand, not guessing.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 }}>Why Earlier Matters</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Catching low bone density in your 30s or 40s gives you years to intervene before menopause or age-related decline compounds the problem.
        </div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 26, color: COLORS.greige, lineHeight: 1.45 }}>
        One of the few longevity markers you can meaningfully influence.<br />
        <strong style={{ color: COLORS.white }}>Almost nobody checks it early enough.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
