import React from 'react';
import { interpolate } from 'remotion';

export interface CaptionChunk {
  text: string;
  startFrame: number;
  endFrame: number;
}

interface CaptionProps {
  chunks: CaptionChunk[];
  frame: number;
}

export const Caption: React.FC<CaptionProps> = ({ chunks, frame }) => {
  const active = chunks.find((c) => frame >= c.startFrame && frame < c.endFrame);
  if (!active) return null;

  const fadeIn = interpolate(frame, [active.startFrame, active.startFrame + 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [active.endFrame - 4, active.endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 140,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        opacity,
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.55)',
          borderRadius: 8,
          padding: '12px 24px',
          maxWidth: 900,
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 52,
            color: '#FFFFFF',
            lineHeight: 1.2,
            textAlign: 'center',
            display: 'block',
            letterSpacing: '0.01em',
          }}
        >
          {active.text}
        </span>
      </div>
    </div>
  );
};
