import React from 'react';
import { COLORS, FONTS } from '../constants';

export interface CaptionChunk {
  text: string;
  startFrame: number;
  endFrame: number;
}

interface Props {
  frame: number;
  chunks: CaptionChunk[];
}

export const Caption: React.FC<Props> = ({ frame, chunks }) => {
  const active = chunks.find(c => frame >= c.startFrame && frame <= c.endFrame);
  if (!active) return null;

  return (
    <div style={{
      position: 'absolute', bottom: 140, left: 0, right: 0,
      textAlign: 'center', padding: '0 48px', zIndex: 100,
    }}>
      <span style={{
        fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 52,
        color: COLORS.white, lineHeight: 1.1,
        textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8)',
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: '6px 16px', borderRadius: 4,
      }}>
        {active.text}
      </span>
    </div>
  );
};
