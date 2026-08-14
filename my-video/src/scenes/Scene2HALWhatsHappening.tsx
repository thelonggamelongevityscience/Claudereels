import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2HALWhatsHappening: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [26, 42], [14, 0], { extrapolateRight: 'clamp' });
  const db2Op  = interpolate(frame, [46, 62], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y   = interpolate(frame, [46, 62], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="indigo" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.indigo, marginBottom: 14 }}>
        What's Actually Happening
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 32 }}>
        AGEING ISN'T<br />ONE THING.<br />IT'S TWELVE<br />THINGS.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.indigo}`, paddingLeft: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.indigo, marginBottom: 6 }}>The Framework</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          In 2013, researchers formally defined the Hallmarks of Ageing — twelve distinct, interconnected biological mechanisms that drive ageing at the cellular level.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.indigo}`, paddingLeft: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.indigo, marginBottom: 6 }}>Why It Matters Here</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Nearly everything covered this cycle — zombie cells, chronic inflammation, autophagy, insulin resistance — is one of these twelve in disguise.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
