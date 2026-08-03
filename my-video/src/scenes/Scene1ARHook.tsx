import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene1ARHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const emojiOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const emojiY  = interpolate(frame, [0, 12], [20, 0], { extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [42, 62], [0, 100], { extrapolateRight: 'clamp' });
  const subOp   = interpolate(frame, [52, 68], [0, 1], { extrapolateRight: 'clamp' });
  const subY    = interpolate(frame, [52, 68], [16, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const lines: [string, boolean][] = [
    ['YOUR BODY', false],
    ['HAS A', false],
    ['SELF-', true],
    ['CLEANING', true],
    ['MODE.', false],
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="blue" opacity={0.12} />
      <GridOverlay />

      <div style={{ opacity: emojiOp, transform: `translateY(${emojiY}px)`, fontSize: 96, lineHeight: 1, marginBottom: 16, filter: `drop-shadow(0 0 32px ${COLORS.blue}88)` }}>
        ♻️
      </div>

      {lines.map(([text, blue], i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 2 }}>
          <div style={{ ...mk((i + 1) * 7), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 148, lineHeight: 1.0, textTransform: 'uppercase', color: blue ? COLORS.blue : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ width: `${lineW}%`, height: 3, backgroundColor: COLORS.blue, margin: '20px 0 18px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.45 }}>
        Most people never activate it.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Here is how it works.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
