import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const MAGENTA = '#E0339C';
const GOLD    = '#FFD166';
const BG      = '#12040c';

export const Scene2LITDiscovery: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp  = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY   = interpolate(frame, [10, 26], [16, 0], { extrapolateRight: 'clamp' });
  const b1Op  = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y   = interpolate(frame, [20, 36], [14, 0], { extrapolateRight: 'clamp' });
  const b2Op  = interpolate(frame, [310, 326], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y   = interpolate(frame, [310, 326], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, rgba(224,51,156,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 22,
        fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: MAGENTA, marginBottom: 20 }}>
        The Discovery
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800,
        fontSize: 88, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 40 }}>
        It Started With<br />A Map, Not<br />A Trial.
      </div>

      <div style={{ opacity: b1Op, transform: `translateY(${b1Y}px)`, borderLeft: `3px solid ${MAGENTA}`,
        paddingLeft: 28, marginBottom: 36 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: MAGENTA, marginBottom: 10 }}>The Observation</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          Researchers comparing suicide rates across <strong style={{ color: COLORS.white }}>1,286 cities</strong> kept
          seeing a pattern with no obvious cause — until they cross-referenced local water supplies.
        </div>
      </div>

      <div style={{ opacity: b2Op, transform: `translateY(${b2Y}px)`, borderLeft: `3px solid ${GOLD}`,
        paddingLeft: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>The Data</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 26, color: COLORS.greige, lineHeight: 1.55 }}>
          A review of <strong style={{ color: COLORS.white }}>415 studies (1946–2018)</strong> across seven countries
          kept showing the same thing.
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
