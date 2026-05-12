import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';

interface Scene6Props {
  frame: number;
}

export const Scene6StatPunch: React.FC<Scene6Props> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const DURATION = 90;

  // Tag
  const tagOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Giant number
  const numSpring = spring({ fps, frame: Math.max(0, frame - 6), config: { damping: 10, stiffness: 55 } });
  const numScale = interpolate(numSpring, [0, 1], [0.4, 1]);
  const numOpacity = interpolate(Math.max(0, frame - 6), [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  // Subhead
  const subOpacity = interpolate(frame, [24, 36], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [24, 36], [18, 0], { extrapolateRight: 'clamp' });

  // Divider
  const lineWidth = interpolate(frame, [36, 54], [0, 100], { extrapolateRight: 'clamp' });

  // Body
  const bodyOpacity = interpolate(frame, [50, 64], [0, 1], { extrapolateRight: 'clamp' });
  const bodyY = interpolate(frame, [50, 64], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <GlowBg color="green" opacity={0.20} />
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
              fontSize: 22,
              color: COLORS.green,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Key Data Point
          </span>
        </div>

        {/* Giant 30% */}
        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            transformOrigin: 'left center',
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 900,
              fontSize: 180,
              color: COLORS.green,
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              display: 'block',
            }}
          >
            30%
          </span>
        </div>

        {/* Subhead */}
        <div style={{ opacity: subOpacity, transform: `translateY(${subY}px)`, marginBottom: 24 }}>
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 800,
              fontSize: 64,
              color: COLORS.white,
              lineHeight: 1.05,
              display: 'block',
              textTransform: 'uppercase',
            }}
          >
            Lower blood
            <br />
            sugar
          </span>
        </div>

        {/* Green divider */}
        <div
          style={{
            height: 3,
            backgroundColor: COLORS.green,
            width: `${lineWidth}%`,
            marginBottom: 24,
            borderRadius: 2,
          }}
        />

        {/* Body */}
        <div style={{ opacity: bodyOpacity, transform: `translateY(${bodyY}px)` }}>
          <p
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              color: COLORS.white,
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.85,
            }}
          >
            From 2-minute walking breaks every 30 minutes
            <br />
            vs uninterrupted sitting. The intervention is
            <br />
            almost embarrassingly simple.
          </p>
        </div>
      </div>

      <Caption
        text="Thirty percent. Lower blood sugar. From two-minute walking breaks. The intervention is almost embarrassingly simple."
        frame={frame}
        totalDuration={DURATION}
      />
    </div>
  );
};
