import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2CRPWhatsHappening: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const db1Op = interpolate(frame, [26, 42], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [26, 42], [14, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [50, 66], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [50, 66], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 14 }}>
        What's Actually Happening
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 68, lineHeight: 0.90, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        YOUR BODY IS<br />EITHER INFLAMED<br />OR IT ISN'T.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.blue}`, paddingLeft: 20, marginBottom: 22 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 6 }}>The Marker</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          hs-CRP (high-sensitivity C-reactive protein) measures systemic inflammation circulating in your blood right now — the same inflammation driving heart disease.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.blue}`, paddingLeft: 20 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.blue, marginBottom: 6 }}>The Finding</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          Multiple large studies found it predicts future heart attacks and strokes as well as, or better than, LDL cholesterol — the number your doctor has tracked for decades.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
