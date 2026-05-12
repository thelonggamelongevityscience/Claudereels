import React from 'react';
import { COLORS, FONTS } from '../constants';

interface DataBlockProps {
  children: React.ReactNode;
  accentColor?: 'red' | 'green';
  style?: React.CSSProperties;
}

export const DataBlock: React.FC<DataBlockProps> = ({
  children,
  accentColor = 'red',
  style,
}) => {
  const accent = accentColor === 'red' ? COLORS.red : COLORS.green;

  return (
    <div
      style={{
        borderLeft: `3px solid ${accent}`,
        paddingLeft: 24,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        backgroundColor: `${accent}11`,
        borderRadius: '0 6px 6px 0',
        ...style,
      }}
    >
      <p
        style={{
          fontFamily: FONTS.mono,
          fontSize: 22,
          color: COLORS.white,
          lineHeight: 1.6,
          margin: 0,
          opacity: 0.9,
        }}
      >
        {children}
      </p>
    </div>
  );
};
