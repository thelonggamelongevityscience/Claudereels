import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene1ZombieCellsHook: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });

  const w1s = spring({ fps, frame: Math.max(0, frame - 8),  config: { damping: 12, stiffness: 80 } });
  const w2s = spring({ fps, frame: Math.max(0, frame - 16), config: { damping: 12, stiffness: 80 } });
  const w3s = spring({ fps, frame: Math.max(0, frame - 24), config: { damping: 12, stiffness: 80 } });
  const w4s = spring({ fps, frame: Math.max(0, frame - 32), config: { damping: 12, stiffness: 80 } });

  const lineWidth = interpolate(frame, [35, 55], [0, 100], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' });
  const subY  = interpolate(frame, [45, 60], [16, 0], { extrapolateRight: 'clamp' });

  const hl = (s: number, delay: number) => ({
    opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(s, [0,1], [40,0])}px)`,
  });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GlowBg color="red" opacity={0.18} />
      <GridOverlay />

      <div style={{ opacity: tagOpacity, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.red, marginBottom: 28 }}>
        LONGEVITY SCIENCE
      </div>

      {([['YOUR BODY', w1s, 8], ['IS FULL OF', w2s, 16], ['ZOMBIE', w3s, 24], ['CELLS.', w4s, 32]] as [string, number, number][]).map(([text, s, delay], i) => (
        <div key={i} style={{ overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ ...hl(s, delay), fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 148, lineHeight: 1.0, textTransform: 'uppercase', color: text === 'ZOMBIE' ? COLORS.red : COLORS.white }}>
            {text}
          </div>
        </div>
      ))}

      <div style={{ width: `${lineWidth}%`, height: 3, backgroundColor: COLORS.red, margin: '20px 0 24px' }} />

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, fontFamily: FONTS.playfair, fontStyle: 'italic', fontSize: 34, color: COLORS.greige, lineHeight: 1.4 }}>
        They refused to die.<br />
        <strong style={{ color: COLORS.white, fontStyle: 'normal' }}>Now they are ageing you from the inside.</strong>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
