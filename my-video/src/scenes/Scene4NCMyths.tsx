import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene4NCMyths: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  14], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  14], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [8,  24], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [8,  24], [20, 0], { extrapolateRight: 'clamp' });
  const m1Op   = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const m1Y    = interpolate(frame, [22, 38], [16, 0], { extrapolateRight: 'clamp' });
  const m2Op   = interpolate(frame, [38, 54], [0, 1], { extrapolateRight: 'clamp' });
  const m2Y    = interpolate(frame, [38, 54], [16, 0], { extrapolateRight: 'clamp' });
  const m3Op   = interpolate(frame, [54, 70], [0, 1], { extrapolateRight: 'clamp' });
  const m3Y    = interpolate(frame, [54, 70], [16, 0], { extrapolateRight: 'clamp' });

  const myths = [
    {
      myth: '"It helps me fall asleep"',
      verdict: 'TRUE — AND IRRELEVANT',
      rebuttal: 'Sedation is not the same as sleep quality. You fall asleep faster and wake up worse.',
      op: m1Op, y: m1Y,
    },
    {
      myth: '"Just one drink is harmless"',
      verdict: 'FALSE',
      rebuttal: 'Even one drink measurably reduces REM. There is no dose without effect.',
      op: m2Op, y: m2Y,
    },
    {
      myth: '"My tolerance protects my sleep"',
      verdict: 'WRONG',
      rebuttal: 'Tolerance only changes how sedated you feel. The sleep architecture damage remains.',
      op: m3Op, y: m3Y,
    },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 14 }}>
        The Myths
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        WHAT PEOPLE<br />TELL THEMSELVES.
      </div>

      {myths.map((m, i) => (
        <div key={i} style={{ opacity: m.op, transform: `translateY(${m.y}px)`, borderLeft: `3px solid ${COLORS.red}`, paddingLeft: 20, marginBottom: 22 }}>
          <div style={{ fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 24, color: COLORS.greige, marginBottom: 4 }}>{m.myth}</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 15, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 5 }}>→ {m.verdict}</div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 20, color: `${COLORS.white}BB`, lineHeight: 1.45 }}>{m.rebuttal}</div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
