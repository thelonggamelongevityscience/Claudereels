import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';

interface BulletItemProps {
  text: string;
  frame: number;
  delay?: number;
  accentColor?: 'red' | 'green';
}

export const BulletItem: React.FC<BulletItemProps> = ({
  text,
  frame,
  delay = 0,
  accentColor = 'red',
}) => {
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  const slideSpring = spring({
    fps,
    frame: localFrame,
    config: { damping: 14, stiffness: 90 },
  });

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const translateX = interpolate(slideSpring, [0, 1], [-40, 0]);

  const dot = accentColor === 'red' ? COLORS.red : COLORS.green;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        opacity,
        transform: `translateX(${translateX}px)`,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: dot,
          marginTop: 10,
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontFamily: FONTS.mono,
          fontSize: 22,
          color: COLORS.white,
          lineHeight: 1.55,
          margin: 0,
          opacity: 0.88,
        }}
      >
        {text}
      </p>
    </div>
  );
};
