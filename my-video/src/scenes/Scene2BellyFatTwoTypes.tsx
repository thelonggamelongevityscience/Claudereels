import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2BellyFatTwoTypes: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const db1Op = interpolate(frame, [32, 48], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [32, 48], [20, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [52, 68], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [52, 68], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 20 }}>
        TWO TYPES OF FAT
      </div>

      {(['NOT ALL BELLY FAT', 'IS THE SAME.', 'ONE IS FAR WORSE.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 96, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 28 }} />

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.green}`, paddingLeft: 24, marginBottom: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 8 }}>SUBCUTANEOUS FAT</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.5 }}>
          The soft fat just under the skin. Metabolically relatively inactive. Responds reasonably well to caloric deficit and exercise. Not particularly dangerous.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 8 }}>VISCERAL FAT</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: COLORS.greige, lineHeight: 1.5 }}>
          The fat packed around your organs — liver, pancreas, intestines. Metabolically active. Produces inflammatory cytokines continuously. Drives insulin resistance, cardiovascular disease, and hormonal disruption. This is the one that kills.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
