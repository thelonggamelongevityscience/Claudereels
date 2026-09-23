import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props {
  frame: number;
  counter: string;
  mythText: string;
  realityContent: React.ReactNode;
  captionChunks?: CaptionChunk[];
}

const YELLOW = '#FFC53D';
const RED    = '#FF4D6D';
const GREEN  = '#00FF85';
const BG     = '#0e0a02';

export const SceneVDMythReality: React.FC<Props> = ({ frame, counter, mythText, realityContent, captionChunks }) => {
  const ctrOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const ctrY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const mythOp = interpolate(frame, [6,  20], [0, 1], { extrapolateRight: 'clamp' });
  const mythY  = interpolate(frame, [6,  20], [16, 0], { extrapolateRight: 'clamp' });
  const realOp = interpolate(frame, [16, 30], [0, 1], { extrapolateRight: 'clamp' });
  const realY  = interpolate(frame, [16, 30], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,197,61,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      {/* Counter */}
      <div style={{ opacity: ctrOp, transform: `translateY(${ctrY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: YELLOW, marginBottom: 36 }}>
        Myth {counter}
      </div>

      {/* Myth block */}
      <div style={{ opacity: mythOp, transform: `translateY(${mythY}px)`, border: `1.5px solid ${RED}`, padding: '24px 28px', marginBottom: 20, background: 'rgba(255,77,109,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED }}>✕ Myth</div>
        </div>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 38, color: 'rgba(255,255,255,0.55)', lineHeight: 1.15, textDecoration: 'line-through', textDecorationColor: `rgba(255,77,109,0.7)` }}>
          {mythText}
        </div>
      </div>

      {/* Reality block */}
      <div style={{ opacity: realOp, transform: `translateY(${realY}px)`, border: `1.5px solid ${GREEN}`, padding: '24px 28px', background: 'rgba(0,255,133,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN }}>✓ Reality</div>
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.white, lineHeight: 1.45 }}>
          {realityContent}
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
