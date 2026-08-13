import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene5VO2HowToTest: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const step1Op = interpolate(frame, [20, 38], [0, 1], { extrapolateRight: 'clamp' });
  const step1Y  = interpolate(frame, [20, 38], [18, 0], { extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [38, 56], [0, 1], { extrapolateRight: 'clamp' });
  const step2Y  = interpolate(frame, [38, 56], [18, 0], { extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [56, 74], [0, 1], { extrapolateRight: 'clamp' });
  const step3Y  = interpolate(frame, [56, 74], [18, 0], { extrapolateRight: 'clamp' });

  const steps = [
    { num: '01', label: 'The Test', body: 'The Cooper Run — free, no equipment needed.' },
    { num: '02', label: 'The Protocol', body: 'Run as far as possible in exactly 12 minutes.' },
    { num: '03', label: 'The Result', body: 'Plug the distance into the formula and compare to norms for your age and sex.' },
  ];
  const ops = [
    { op: step1Op, y: step1Y },
    { op: step2Op, y: step2Y },
    { op: step3Op, y: step3Y },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="orange" opacity={0.07} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 14 }}>
        How To Test It
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 80, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        FREE.<br />12 MINUTES.<br />RIGHT NOW.
      </div>

      {steps.map((s, i) => (
        <div key={i} style={{ opacity: ops[i].op, transform: `translateY(${ops[i].y}px)`, display: 'flex', alignItems: 'flex-start', marginBottom: 20, gap: 16 }}>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 48, color: COLORS.orange, lineHeight: 1, minWidth: 60 }}>{s.num}</div>
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.orange, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>{s.body}</div>
          </div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
