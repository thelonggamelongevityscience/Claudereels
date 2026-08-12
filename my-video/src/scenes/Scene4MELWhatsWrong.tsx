import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene4MELWhatsWrong: React.FC<Props> = ({ frame, captionChunks }) => {
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

  const mistakes = [
    {
      num: '01',
      label: 'Sleeping Pill Mistake',
      text: 'Taking it right before bed treats melatonin like a sedative — that\'s not what it\'s designed to do.',
      op: m1Op, y: m1Y,
    },
    {
      num: '02',
      label: 'Mega-Dose Mistake',
      text: 'More melatonin doesn\'t mean a stronger signal. It can blunt receptor sensitivity with regular use.',
      op: m2Op, y: m2Y,
    },
    {
      num: '03',
      label: 'Light Cancellation',
      text: 'Scrolling your phone right after taking it sends a competing "stay awake" signal that overrides the supplement.',
      op: m3Op, y: m3Y,
    },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="purple" opacity={0.08} />
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.purple, marginBottom: 14 }}>
        What's Going Wrong
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 72, lineHeight: 0.92, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        THREE WAYS<br />PEOPLE GET IT<br />BACKWARDS.
      </div>

      {mistakes.map((m, i) => (
        <div key={i} style={{ opacity: m.op, transform: `translateY(${m.y}px)`, display: 'flex', alignItems: 'flex-start', marginBottom: 22 }}>
          <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 48, lineHeight: 1, color: COLORS.purple, marginRight: 20, flexShrink: 0, opacity: 0.5 }}>{m.num}</div>
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 15, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.purple, marginBottom: 5 }}>{m.label}</div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 21, color: COLORS.greige, lineHeight: 1.5 }}>{m.text}</div>
          </div>
        </div>
      ))}

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
