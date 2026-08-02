import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3ZCRWhatTheyAre: React.FC<Props> = ({ frame, captionChunks }) => {
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

  const db1Op = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [30, 44], [18, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [52, 66], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [52, 66], [18, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="green" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 24 }}>
        WHAT THEY ACTUALLY ARE
      </div>

      {(['DAMAGED CELLS', 'THAT STOP DIVIDING', 'BUT REFUSE TO DIE.'] as const).map((text, i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...mk((i + 1) * 8), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 98, lineHeight: 1.0, textTransform: 'uppercase', color: i === 2 ? COLORS.green : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ height: 24 }} />

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.green}`, paddingLeft: 24, marginBottom: 22 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 17, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 8 }}>THE MECHANISM</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.55 }}>
          When a cell is too damaged to divide safely it enters senescence — a permanent state of arrest. It should be cleared by your immune system. When it is not, it stays alive and releases a toxic cocktail called the SASP.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, backgroundColor: 'rgba(0,255,133,0.06)', border: `1px solid rgba(0,255,133,0.2)`, padding: '18px 24px' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
          SASP stands for <span style={{ color: COLORS.green }}>Senescence-Associated Secretory Phenotype</span>. It is how zombie cells turn healthy neighbours into zombie cells — spreading the damage outward.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
