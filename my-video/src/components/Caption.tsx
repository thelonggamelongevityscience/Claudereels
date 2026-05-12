import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';

interface CaptionProps {
  text: string;
  frame: number;
  totalDuration: number;
}

export const Caption: React.FC<CaptionProps> = ({ text, frame, totalDuration }) => {
  const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(
    frame,
    [totalDuration - 12, totalDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 120,
        left: 40,
        right: 40,
        opacity,
        zIndex: 20,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.72)',
          borderRadius: 8,
          padding: '14px 20px',
        }}
      >
        <p
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            color: COLORS.white,
            lineHeight: 1.5,
            margin: 0,
            textAlign: 'center',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
