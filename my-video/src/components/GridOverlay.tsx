import React from 'react';

export const GridOverlay: React.FC = () => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
    backgroundImage: [
      'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '64px 64px',
  }} />
);
