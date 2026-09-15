import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const CYAN  = '#00E5FF';
const GREEN = '#00FF85';
const RED   = '#FF4D6D';
const GOLD  = '#FFD166';
const BG    = '#040c10';

type Verdict = 'proven' | 'hyped' | 'mixed';

const CLAIMS: { text: string; label: string; verdict: Verdict }[] = [
  { text: 'Improves mood & alertness',  label: 'Proven',     verdict: 'proven' },
  { text: 'Burns significant fat',      label: 'Overhyped',  verdict: 'hyped'  },
  { text: 'Boosts immune function',     label: 'Mixed',      verdict: 'mixed'  },
  { text: 'Directly extends lifespan',  label: 'Not Proven', verdict: 'hyped'  },
  { text: 'Reduces workout soreness',   label: 'Mixed',      verdict: 'mixed'  },
];

const VERDICT_COLORS: Record<Verdict, { bg: string; border: string; text: string }> = {
  proven: { bg: 'rgba(0,255,133,0.12)',  border: 'rgba(0,255,133,0.4)',  text: GREEN },
  hyped:  { bg: 'rgba(255,77,109,0.12)', border: 'rgba(255,77,109,0.4)', text: RED   },
  mixed:  { bg: 'rgba(255,209,102,0.12)',border: 'rgba(255,209,102,0.4)',text: GOLD  },
};

export const Scene3CERClaimsRated: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 14], [10, 0], { extrapolateRight: 'clamp' });

  const rowAnim = (delay: number) => ({
    opacity: interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: 'clamp' }),
    transform: `translateX(${interpolate(frame, [delay, delay + 18], [-24, 0], { extrapolateRight: 'clamp' })}px)`,
  });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(0,229,255,0.06) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: CYAN, marginBottom: 40 }}>
        The Claims, Rated
      </div>

      {CLAIMS.map((claim, i) => {
        const vc = VERDICT_COLORS[claim.verdict];
        const isLast = i === CLAIMS.length - 1;
        return (
          <div key={i} style={{
            ...rowAnim(12 + i * 16),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            paddingBottom: isLast ? 0 : 28,
            marginBottom: isLast ? 0 : 28,
            borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.greige, lineHeight: 1.4, flex: 1 }}>
              {claim.text}
            </div>
            <div style={{
              fontFamily: FONTS.barlow,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '6px 18px',
              flexShrink: 0,
              whiteSpace: 'nowrap' as const,
              background: vc.bg,
              border: `1px solid ${vc.border}`,
              color: vc.text,
            }}>
              {claim.label}
            </div>
          </div>
        );
      })}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
