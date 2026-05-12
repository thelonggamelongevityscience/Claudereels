import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';
import { SourceStamp } from '../components/SourceStamp';

interface Scene2Props {
  frame: number;
}

export const Scene2Stat: React.FC<Scene2Props> = ({ frame }) => {
  const { fps } = useVideoConfig();

  // Tag
  const tagOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [0, 10], [10, 0], { extrapolateRight: 'clamp' });

  // Giant number scale-in
  const numSpring = spring({ fps, frame: Math.max(0, frame - 8), config: { damping: 10, stiffness: 60 } });
  const numScale = interpolate(numSpring, [0, 1], [0.5, 1]);
  const numOpacity = interpolate(Math.max(0, frame - 8), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Subhead
  const subOpacity = interpolate(frame, [30, 44], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [30, 44], [20, 0], { extrapolateRight: 'clamp' });

  // Divider
  const lineWidth = interpolate(frame, [42, 62], [0, 100], { extrapolateRight: 'clamp' });

  // Body
  const bodyOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateRight: 'clamp' });
  const bodyY = interpolate(frame, [55, 70], [14, 0], { extrapolateRight: 'clamp' });

  // Source
  const srcOpacity = interpolate(frame, [72, 82], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <GlowBg color="red" opacity={0.20} />
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
              fontSize: 18,
              color: COLORS.red,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            ANNALS OF INTERNAL MEDICINE · 2015
          </span>
        </div>

        {/* Giant 40% */}
        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            transformOrigin: 'left center',
            marginBottom: 0,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 900,
              fontSize: 200,
              color: COLORS.red,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              display: 'block',
            }}
          >
            40%
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
            Higher death
            <br />
            risk
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 3,
            backgroundColor: COLORS.red,
            width: `${lineWidth}%`,
            marginBottom: 24,
            borderRadius: 2,
          }}
        />

        {/* Body */}
        <div style={{ opacity: bodyOpacity, transform: `translateY(${bodyY}px)`, marginBottom: 20 }}>
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
            Sitting 11+ hours/day vs 4 hours/day.
            <br />
            Even in people who exercise regularly.
            <br />
            The Active Couch Potato is real.
          </p>
        </div>

        {/* Source */}
        <div style={{ opacity: srcOpacity }}>
          <SourceStamp>★ Biswas et al., Annals of Internal Medicine 2015</SourceStamp>
        </div>
      </div>

      <Caption
        frame={frame}
        chunks={[
          { text: 'A 40 percent',                            startFrame: 0,   endFrame: 55  },
          { text: 'higher risk of death.',                  startFrame: 55,  endFrame: 118 },
          { text: 'From sitting.',                          startFrame: 136, endFrame: 172 },
          { text: 'Even in people who go',                  startFrame: 193, endFrame: 261 },
          { text: 'to the gym.',                            startFrame: 261, endFrame: 305 },
          { text: 'This is the Active Couch Potato effect.', startFrame: 305, endFrame: 401 },
        ]}
      />
    </div>
  );
};
