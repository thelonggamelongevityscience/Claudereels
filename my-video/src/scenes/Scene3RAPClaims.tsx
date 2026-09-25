import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const INDIGO = '#6366F1';
const GREEN  = '#00FF85';
const RED    = '#FF4D6D';
const GOLD   = '#FFD166';
const BG     = '#050414';

type TagStyle = 'proven' | 'hyped' | 'mixed';

const TAG_STYLES: Record<TagStyle, { bg: string; border: string; color: string }> = {
  proven: { bg: 'rgba(0,255,133,0.12)',  border: 'rgba(0,255,133,0.4)',  color: GREEN },
  hyped:  { bg: 'rgba(255,77,109,0.12)', border: 'rgba(255,77,109,0.4)', color: RED   },
  mixed:  { bg: 'rgba(255,209,102,0.12)',border: 'rgba(255,209,102,0.4)',color: GOLD  },
};

const CLAIMS = [
  { text: 'Extends lifespan in mice',                    tag: 'Proven',           style: 'proven' as TagStyle },
  { text: 'Extends human lifespan',                      tag: 'Not Proven',       style: 'hyped'  as TagStyle },
  { text: "Reduces visceral fat (its own trial's goal)", tag: 'Missed',           style: 'hyped'  as TagStyle },
  { text: 'Improves immune aging markers at low dose',   tag: 'Promising Signal', style: 'mixed'  as TagStyle },
  { text: 'Safe with no real downsides',                 tag: 'Overstated',       style: 'mixed'  as TagStyle },
];

export const Scene3RAPClaims: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });
  const rowDelays = [8, 18, 28, 40, 52];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, rgba(99,102,241,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: INDIGO, marginBottom: 32 }}>
        The Claims, Rated
      </div>

      {CLAIMS.map((claim, i) => {
        const d = rowDelays[i];
        const op = interpolate(frame, [d, d + 14], [0, 1], { extrapolateRight: 'clamp' });
        const tx = interpolate(frame, [d, d + 14], [-28, 0], { extrapolateRight: 'clamp' });
        const ts = TAG_STYLES[claim.style];
        const isLast = i === CLAIMS.length - 1;
        return (
          <div key={i} style={{
            opacity: op, transform: `translateX(${tx}px)`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20,
            marginBottom: isLast ? 0 : 28, paddingBottom: isLast ? 0 : 28,
            borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.greige, lineHeight: 1.4, flex: 1 }}>{claim.text}</div>
            <div style={{ fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 24, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '8px 18px', flexShrink: 0, whiteSpace: 'nowrap', background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{claim.tag}</div>
          </div>
        );
      })}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
