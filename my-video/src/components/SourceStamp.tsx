import React from 'react';
import { COLORS, FONTS } from '../constants';

interface SourceStampProps {
  children: React.ReactNode;
  opacity?: number;
}

export const SourceStamp: React.FC<SourceStampProps> = ({
  children,
  opacity = 1,
}) => {
  return (
    <p
      style={{
        fontFamily: FONTS.mono,
        fontSize: 18,
        color: COLORS.green,
        opacity: opacity * 0.8,
        margin: 0,
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </p>
  );
};
