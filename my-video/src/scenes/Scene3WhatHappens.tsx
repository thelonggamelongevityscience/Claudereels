import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';
import { BulletItem } from '../components/BulletItem';
import { SourceStamp } from '../components/SourceStamp';

interface Scene3Props {
  frame: number;
}

const bullets = [
  'Telomere shortening — sedentary individuals show biological aging equivalent to +8 years',
  'Insulin resistance — glucose metabolism impairs within 3 hours of continuous sitting',
  'Lymphatic stagnation — immune cell circulation requires muscle movement to function',
  'Lipoprotein lipase drops 90% — fat-clearing enzyme nearly shuts off when seated',
];

export const Scene3WhatHappens: React.FC<Scene3Props> = ({ frame }) => {

  // Tag
  const tagOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [0, 10], [10, 0], { extrapolateRight: 'clamp' });

  // Headline
  const headOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateRight: 'clamp' });
  const headY = interpolate(frame, [8, 20], [20, 0], { extrapolateRight: 'clamp' });

  // Source
  const srcOpacity = interpolate(frame, [90, 100], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Subtle red tint at top */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 800px 500px at 50% 10%, ${COLORS.red}18 0%, transparent 65%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <GridOverlay />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 72px',
          zIndex: 10,
        }}
      >
        {/* Tag */}
        <div style={{ opacity: tagOpacity, transform: `translateY(${tagY}px)`, marginBottom: 20 }}>
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 700,
              fontSize: 20,
              color: COLORS.red,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            What prolonged sitting does
          </span>
        </div>

        {/* Headline */}
        <div style={{ opacity: headOpacity, transform: `translateY(${headY}px)`, marginBottom: 36 }}>
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 800,
              fontSize: 52,
              color: COLORS.white,
              lineHeight: 1.1,
              display: 'block',
              textTransform: 'uppercase',
            }}
          >
            Inside your body,
            <br />
            right now:
          </span>
        </div>

        {/* Bullet items */}
        <div style={{ width: '100%', marginBottom: 28 }}>
          {bullets.map((text, i) => (
            <BulletItem
              key={i}
              text={text}
              frame={frame}
              delay={24 + i * 12}
              accentColor="red"
            />
          ))}
        </div>

        {/* Source */}
        <div style={{ opacity: srcOpacity }}>
          <SourceStamp>★ Hamilton et al., Diabetes 2007 · Biswas et al. 2015</SourceStamp>
        </div>
      </div>

      <Caption
        frame={frame}
        chunks={[
          { text: "Here's what's actually",          startFrame: 0,  endFrame: 22 },
          { text: 'happening inside your body',       startFrame: 22, endFrame: 48 },
          { text: 'during prolonged sitting.',        startFrame: 48, endFrame: 73 },
          { text: 'And none of it is good.',          startFrame: 73, endFrame: 102 },
        ]}
      />
    </div>
  );
};
