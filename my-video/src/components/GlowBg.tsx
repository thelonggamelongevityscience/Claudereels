import React from 'react';
import { COLORS } from '../constants';

interface GlowBgProps {
  color?: 'red' | 'green';
  opacity?: number;
}

export const GlowBg: React.FC<GlowBgProps> = ({
  color = 'red',
  opacity = 0.18,
}) => {
  const glowColor = color === 'red' ? COLORS.red : COLORS.green;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 900px 700px at 50% 30%, ${glowColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
