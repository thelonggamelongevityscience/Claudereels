import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene3MELWhyItMatters: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const b1Op   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const b1Y    = interpolate(frame, [22, 38], [16, 0], { extrapolateRight: 'clamp' });
  const b2Op   = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const b2Y    = interpolate(frame, [34, 50], [16, 0], { extrapolateRight: 'clamp' });
  const b3Op   = interpolate(frame, [46, 62], [0, 1], { extrapolateRight: 'clamp' });
  const b3Y    = interpolate(frame, [46, 62], [16, 0], { extrapolateRight: 'clamp' });
  const b4Op   = interpolate(frame, [58, 74], [0, 1], { extrapolateRight: 'clamp' });
  const b4Y    = interpolate(frame, [58, 74], [16, 0], { extrapolateRight: 'clamp' });

  const bullets = [
    { text: 'Most OTC melatonin is 3–10mg — several multiples of what your body naturally produces or needs to signal sleep.', op: b1Op, y: b1Y },
    { text: 'Megadoses can desensitize your melatonin receptors over time, making the signal weaker, not stronger.', op: b2Op, y: b2Y },
    { text: 'Timing matters more than dose — taken too late, it can\'t shift your clock forward.', op: b3Op, y: b3Y },
    { text: 'It\'s a clock-shifter, not a sedative — which is why it works for jet lag and poorly for general insomnia.', op: b4Op, y: b4Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="purple" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.purple, marginBottom: 14 }}>
        Why It Matters
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 64, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        YOUR BOTTLE IS<br />10 TO 30 TIMES<br />TOO STRONG.
      </div>

      {bullets.map((b, i) => (
        <div key={i} style={{ opacity: b.op, transform: `translateY(${b.y}px)`, display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.purple, flexShrink: 0, marginTop: 8, marginRight: 18 }} />
          <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: COLORS.greige, lineHeight: 1.5 }}>{b.text}</div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
