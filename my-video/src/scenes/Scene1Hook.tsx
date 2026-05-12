import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';

interface Scene1Props {
  frame: number;
}

export const Scene1Hook: React.FC<Scene1Props> = ({ frame }) => {
  const { fps } = useVideoConfig();

  // Tag animation
  const tagOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });

  // Headline words animate in staggered
  const word1Spring = spring({ fps, frame: Math.max(0, frame - 8), config: { damping: 12, stiffness: 80 } });
  const word2Spring = spring({ fps, frame: Math.max(0, frame - 16), config: { damping: 12, stiffness: 80 } });
  const word3Spring = spring({ fps, frame: Math.max(0, frame - 24), config: { damping: 12, stiffness: 80 } });

  const word1Y = interpolate(word1Spring, [0, 1], [40, 0]);
  const word2Y = interpolate(word2Spring, [0, 1], [40, 0]);
  const word3Y = interpolate(word3Spring, [0, 1], [40, 0]);

  const word1Op = interpolate(Math.max(0, frame - 8), [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const word2Op = interpolate(Math.max(0, frame - 16), [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const word3Op = interpolate(Math.max(0, frame - 24), [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // Red divider line
  const lineWidth = interpolate(frame, [35, 55], [0, 100], { extrapolateRight: 'clamp' });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleY = interpolate(frame, [50, 65], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <GlowBg color="red" opacity={0.22} />
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
        <div
          style={{
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 700,
              fontSize: 22,
              color: COLORS.red,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            MOVEMENT SCIENCE
          </span>
        </div>

        {/* Headline */}
        <div style={{ marginBottom: 32, overflow: 'hidden' }}>
          {[
            { text: 'SITTING 8', opacity: word1Op, translateY: word1Y },
            { text: 'HOURS A DAY', opacity: word2Op, translateY: word2Y },
            { text: 'KILLS YOU', opacity: word3Op, translateY: word3Y },
          ].map(({ text, opacity, translateY }, i) => (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.barlow,
                  fontWeight: 900,
                  fontSize: 118,
                  color: COLORS.white,
                  lineHeight: 0.95,
                  display: 'block',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Red divider */}
        <div
          style={{
            height: 3,
            backgroundColor: COLORS.red,
            width: `${lineWidth}%`,
            marginBottom: 28,
            borderRadius: 2,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.playfair,
              fontStyle: 'italic',
              fontSize: 34,
              color: COLORS.greige,
              lineHeight: 1.5,
              margin: 0,
              opacity: 0.9,
            }}
          >
            Faster than smoking.
            <br />
            Your doctor isn&apos;t telling you this.
          </p>
        </div>
      </div>

      <Caption
        frame={frame}
        chunks={[
          { text: 'Sitting for 8 hours', startFrame: 0,  endFrame: 26 },
          { text: 'a day is killing you', startFrame: 26, endFrame: 51 },
          { text: 'faster than smoking.', startFrame: 51, endFrame: 75 },
          { text: "Your doctor isn't", startFrame: 75, endFrame: 90 },
          { text: 'telling you this.', startFrame: 90, endFrame: 102 },
        ]}
      />
    </div>
  );
};
