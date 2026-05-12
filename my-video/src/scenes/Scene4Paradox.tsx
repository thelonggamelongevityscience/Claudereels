import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';
import { DataBlock } from '../components/DataBlock';
import { SourceStamp } from '../components/SourceStamp';

interface Scene4Props {
  frame: number;
}

export const Scene4Paradox: React.FC<Scene4Props> = ({ frame }) => {
  const { fps } = useVideoConfig();

  // Tag
  const tagOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Headline words
  const h1Spring = spring({ fps, frame: Math.max(0, frame - 6), config: { damping: 12, stiffness: 80 } });
  const h2Spring = spring({ fps, frame: Math.max(0, frame - 14), config: { damping: 12, stiffness: 80 } });
  const h3Spring = spring({ fps, frame: Math.max(0, frame - 22), config: { damping: 12, stiffness: 80 } });

  const h1Y = interpolate(h1Spring, [0, 1], [30, 0]);
  const h2Y = interpolate(h2Spring, [0, 1], [30, 0]);
  const h3Y = interpolate(h3Spring, [0, 1], [30, 0]);

  const h1Op = interpolate(Math.max(0, frame - 6), [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const h2Op = interpolate(Math.max(0, frame - 14), [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const h3Op = interpolate(Math.max(0, frame - 22), [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Data block
  const dataOpacity = interpolate(frame, [38, 52], [0, 1], { extrapolateRight: 'clamp' });
  const dataX = interpolate(frame, [38, 52], [-30, 0], { extrapolateRight: 'clamp' });

  // Body text
  const bodyOpacity = interpolate(frame, [60, 74], [0, 1], { extrapolateRight: 'clamp' });
  const bodyY = interpolate(frame, [60, 74], [12, 0], { extrapolateRight: 'clamp' });

  // Source
  const srcOpacity = interpolate(frame, [82, 92], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 700px 600px at 60% 40%, ${COLORS.red}14 0%, transparent 70%)`,
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
        <div style={{ opacity: tagOpacity, marginBottom: 20 }}>
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
            The Active Couch Potato Problem
          </span>
        </div>

        {/* Headline */}
        <div style={{ marginBottom: 32 }}>
          {[
            { text: 'Exercise does', opacity: h1Op, y: h1Y },
            { text: 'NOT cancel', opacity: h2Op, y: h2Y, highlight: true },
            { text: 'sitting.', opacity: h3Op, y: h3Y },
          ].map(({ text, opacity, y, highlight }, i) => (
            <div key={i} style={{ opacity, transform: `translateY(${y}px)` }}>
              <span
                style={{
                  fontFamily: FONTS.barlow,
                  fontWeight: 800,
                  fontSize: 72,
                  color: highlight ? COLORS.red : COLORS.white,
                  lineHeight: 1.0,
                  display: 'block',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Data block */}
        <div
          style={{
            opacity: dataOpacity,
            transform: `translateX(${dataX}px)`,
            width: '100%',
            marginBottom: 24,
          }}
        >
          <DataBlock accentColor="red">
            One hour of exercise cannot offset the metabolic damage of 8–10 hours of continuous
            sitting. Sedentary time is an independent risk factor — not cancelled by gym sessions.
          </DataBlock>
        </div>

        {/* Body */}
        <div style={{ opacity: bodyOpacity, transform: `translateY(${bodyY}px)`, marginBottom: 20 }}>
          <p
            style={{
              fontFamily: FONTS.playfair,
              fontStyle: 'italic',
              fontSize: 30,
              color: COLORS.greige,
              lineHeight: 1.5,
              margin: 0,
              opacity: 0.9,
            }}
          >
            You can be fit and sedentary.
            <br />
            Both are true. Both matter.
          </p>
        </div>

        {/* Source */}
        <div style={{ opacity: srcOpacity }}>
          <SourceStamp>★ Katzmarzyk et al., Medicine &amp; Science in Sports &amp; Exercise 2009</SourceStamp>
        </div>
      </div>

      <Caption
        frame={frame}
        chunks={[
          { text: 'One hour of exercise',            startFrame: 0,  endFrame: 22 },
          { text: 'cannot cancel 8 hours',           startFrame: 22, endFrame: 44 },
          { text: 'of sitting.',                     startFrame: 44, endFrame: 56 },
          { text: 'Sedentary time',                  startFrame: 56, endFrame: 67 },
          { text: 'is an independent risk factor.',  startFrame: 67, endFrame: 85 },
          { text: 'Both things are true.',           startFrame: 85, endFrame: 102 },
        ]}
      />
    </div>
  );
};
