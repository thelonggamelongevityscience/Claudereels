import React from 'react';
import { COLORS } from '../constants';

type GlowColor = 'red' | 'green' | 'gold' | 'purple' | 'orange' | 'blue' | 'indigo' | 'ember' | 'sand';

const COLOR_MAP: Record<GlowColor, string> = {
  red:    COLORS.red,
  green:  COLORS.green,
  gold:   COLORS.gold,
  purple: COLORS.purple,
  orange: COLORS.orange,
  blue:   COLORS.blue,
  indigo: COLORS.indigo,
  ember:  COLORS.ember,
  sand:   COLORS.sand,
};

interface Props {
  color: GlowColor;
  opacity?: number;
}

export const GlowBg: React.FC<Props> = ({ color, opacity = 0.15 }) => {
  const c = COLOR_MAP[color];
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `radial-gradient(ellipse at 50% 60%, ${c}${Math.round(opacity * 255).toString(16).padStart(2,'0')} 0%, transparent 65%)`,
    }} />
  );
};
