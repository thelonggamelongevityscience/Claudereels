import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';

interface Scene7Props {
  frame: number;
}

export const Scene7LoopHook: React.FC<Scene7Props> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const DURATION = 90;

  // Tag
  const tagOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [0, 10], [10, 0], { extrapolateRight: 'clamp' });

  // Headline lines
  const h1Spring = spring({ fps, frame: Math.max(0, frame - 8), config: { damping: 11, stiffness: 75 } });
  const h2Spring = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 11, stiffness: 75 } });
  const h3Spring = spring({ fps, frame: Math.max(0, frame - 28), config: { damping: 11, stiffness: 75 } });

  const h1Y = interpolate(h1Spring, [0, 1], [40, 0]);
  const h2Y = interpolate(h2Spring, [0, 1], [40, 0]);
  const h3Y = interpolate(h3Spring, [0, 1], [40, 0]);

  const h1Op = interpolate(Math.max(0, frame - 8), [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const h2Op = interpolate(Math.max(0, frame - 18), [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const h3Op = interpolate(Math.max(0, frame - 28), [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // Green divider
  const lineWidth = interpolate(frame, [40, 60], [0, 100], { extrapolateRight: 'clamp' });

  // Subtitle
  const subOpacity = interpolate(frame, [56, 70], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [56, 70], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Subtle red glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 700px 500px at 40% 35%, ${COLORS.red}16 0%, transparent 65%)`,
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
        <div style={{ opacity: tagOpacity, transform: `translateY(${tagY}px)`, marginBottom: 24 }}>
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 700,
              fontSize: 22,
              color: COLORS.red,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            The Question
          </span>
        </div>

        {/* Headline */}
        <div style={{ marginBottom: 32 }}>
          {[
            { text: 'How Long', opacity: h1Op, y: h1Y },
            { text: 'Did You Sit', opacity: h2Op, y: h2Y },
            { text: 'Today?', opacity: h3Op, y: h3Y, highlight: true },
          ].map(({ text, opacity, y, highlight }, i) => (
            <div key={i} style={{ opacity, transform: `translateY(${y}px)` }}>
              <span
                style={{
                  fontFamily: FONTS.barlow,
                  fontWeight: 900,
                  fontSize: 96,
                  color: highlight ? COLORS.green : COLORS.white,
                  lineHeight: 0.95,
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

        {/* Green divider */}
        <div
          style={{
            height: 3,
            backgroundColor: COLORS.green,
            width: `${lineWidth}%`,
            marginBottom: 28,
            borderRadius: 2,
          }}
        />

        {/* Subtitle */}
        <div style={{ opacity: subOpacity, transform: `translateY(${subY}px)` }}>
          <p
            style={{
              fontFamily: FONTS.playfair,
              fontStyle: 'italic',
              fontSize: 32,
              color: COLORS.greige,
              lineHeight: 1.55,
              margin: 0,
              opacity: 0.88,
            }}
          >
            Most people have no idea.
            <br />
            Track it once. The number
            <br />
            will surprise you.
          </p>
        </div>
      </div>

      <Caption
        text="How long did you sit today? Most people have no idea. Track it once. The number will surprise you."
        frame={frame}
        totalDuration={DURATION}
      />
    </div>
  );
};
