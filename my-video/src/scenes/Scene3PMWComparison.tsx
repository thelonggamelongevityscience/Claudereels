import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const ORANGE = '#FF9800';
const BG     = '#0a0704';
const RED    = '#FF4D6D';
const GREEN  = '#00FF85';

export const Scene3PMWComparison: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });
  const chartOp = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });
  const redH   = interpolate(frame, [24, 54], [0, 100], { extrapolateRight: 'clamp' });
  const greenH = interpolate(frame, [30, 60], [0, 70],  { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,152,0,0.05) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: ORANGE, marginBottom: 24 }}>
        The Comparison
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 48 }}>
        POST-MEAL<br />BLOOD SUGAR<br />SPIKE.
      </div>

      <div style={{ opacity: chartOp, display: 'flex', gap: 80, alignItems: 'flex-end', justifyContent: 'center', height: 420 }}>
        {/* Red bar — Sitting */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: 220 }}>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 52, color: RED }}>+100%</div>
          <div style={{ width: 120, height: 280, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', flexDirection: 'column-reverse', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: `${redH}%`, background: `linear-gradient(to top, ${RED}, #ff8399)`, borderRadius: 8 }} />
          </div>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 28, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>Sitting After<br />The Meal</div>
        </div>

        {/* Green bar — Walking */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: 220 }}>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 52, color: GREEN }}>~30% Lower</div>
          <div style={{ width: 120, height: 280, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', flexDirection: 'column-reverse', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: `${greenH}%`, background: `linear-gradient(to top, ${GREEN}, #7dffc0)`, borderRadius: 8 }} />
          </div>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 28, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>Walking 2–5 Min<br />After The Meal</div>
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
