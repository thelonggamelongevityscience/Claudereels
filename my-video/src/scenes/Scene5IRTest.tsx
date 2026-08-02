import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5IRTest: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp  = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [48, 62], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [48, 62], [20, 0], { extrapolateRight: 'clamp' });
  const db2Op  = interpolate(frame, [62, 76], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y   = interpolate(frame, [62, 76], [20, 0], { extrapolateRight: 'clamp' });

  const statSpring = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 10, stiffness: 60 } });
  const statScale  = interpolate(statSpring, [0, 1], [0.6, 1]);
  const statOp     = interpolate(Math.max(0, frame - 30), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 24 }}>
        THE TEST NOBODY ORDERS
      </div>

      {(['THERE IS A TEST', 'FOR THIS.', 'MOST DOCTORS', 'NEVER ORDER IT.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 88, lineHeight: 1.0, textTransform: 'uppercase', color: i === 1 ? COLORS.orange : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 12 }} />

      <div style={{ opacity: statOp, transform: `scale(${statScale})`, transformOrigin: 'left center', marginBottom: 8 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 160, color: COLORS.orange, lineHeight: 0.85, letterSpacing: '-0.04em' }}>hs-CRP</div>
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.orange}`, paddingLeft: 24, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 8 }}>HIGH-SENSITIVITY C-REACTIVE PROTEIN</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.55 }}>
          Predicts cardiovascular disease more powerfully than LDL cholesterol. Almost never on a standard panel. Ask your doctor to add it.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 8 }}>TARGET RANGES</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.7 }}>
          <span style={{ color: COLORS.green }}>{'< 1.0 mg/L'}</span> — optimal<br />
          <span style={{ color: COLORS.gold }}>1.0–3.0 mg/L</span> — elevated risk<br />
          <span style={{ color: COLORS.red }}>{'> 3.0 mg/L'}</span> — high risk
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
