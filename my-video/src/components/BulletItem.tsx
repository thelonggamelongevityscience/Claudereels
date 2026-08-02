import React from 'react';
import { COLORS, FONTS } from '../constants';

type BulletColor = 'red' | 'green' | 'gold' | 'orange';

const DOT_MAP: Record<BulletColor, string> = {
  red:   COLORS.red,
  green: COLORS.green,
  gold:  COLORS.gold,
  orange: COLORS.orange,
};

interface Props {
  color: BulletColor;
  label: string;
  text: string;
  fontSize?: number;
}

export const BulletItem: React.FC<Props> = ({ color, label, text, fontSize = 22 }) => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    <div style={{
      width: 12, height: 12, borderRadius: '50%',
      backgroundColor: DOT_MAP[color], flexShrink: 0, marginTop: 6,
    }} />
    <div style={{ fontFamily: FONTS.mono, fontSize, color: COLORS.greige, lineHeight: 1.5 }}>
      <strong style={{ color: COLORS.white }}>{label}</strong>{' '}{text}
    </div>
  </div>
);
