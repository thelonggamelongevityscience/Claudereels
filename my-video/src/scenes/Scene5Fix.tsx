import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';
import { DataBlock } from '../components/DataBlock';
import { BulletItem } from '../components/BulletItem';
import { SourceStamp } from '../components/SourceStamp';

interface Scene5Props {
  frame: number;
}

const bullets = [
  'Set a 30-minute phone alarm',
  'Walk to water, walk a call, stand at desk',
  "Doesn't need to be intense — light movement is enough",
];

export const Scene5Fix: React.FC<Scene5Props> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const DURATION = 120;

  // Tag
  const tagOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Headline
  const h1Spring = spring({ fps, frame: Math.max(0, frame - 8), config: { damping: 12, stiffness: 80 } });
  const h2Spring = spring({ fps, frame: Math.max(0, frame - 16), config: { damping: 12, stiffness: 80 } });

  const h1Y = interpolate(h1Spring, [0, 1], [30, 0]);
  const h2Y = interpolate(h2Spring, [0, 1], [30, 0]);
  const h1Op = interpolate(Math.max(0, frame - 8), [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const h2Op = interpolate(Math.max(0, frame - 16), [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Data block
  const dataOpacity = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: 'clamp' });
  const dataX = interpolate(frame, [28, 42], [-24, 0], { extrapolateRight: 'clamp' });

  // Source
  const srcOpacity = interpolate(frame, [105, 115], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <GlowBg color="green" opacity={0.18} />
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
              color: COLORS.green,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            The 2-minute movement protocol
          </span>
        </div>

        {/* Headline */}
        <div style={{ marginBottom: 28 }}>
          {[
            { text: 'Break Every', opacity: h1Op, y: h1Y },
            { text: '30 Minutes.', opacity: h2Op, y: h2Y, highlight: true },
          ].map(({ text, opacity, y, highlight }, i) => (
            <div key={i} style={{ opacity, transform: `translateY(${y}px)` }}>
              <span
                style={{
                  fontFamily: FONTS.barlow,
                  fontWeight: 800,
                  fontSize: 76,
                  color: highlight ? COLORS.green : COLORS.white,
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
            marginBottom: 28,
          }}
        >
          <DataBlock accentColor="green">
            2 minutes of light walking every 30 minutes reduces blood sugar spikes by 30%, restores
            lipoprotein lipase activity, and measurably reduces all-cause mortality risk.
          </DataBlock>
        </div>

        {/* Bullets */}
        <div style={{ width: '100%', marginBottom: 20 }}>
          {bullets.map((text, i) => (
            <BulletItem
              key={i}
              text={text}
              frame={frame}
              delay={52 + i * 10}
              accentColor="green"
            />
          ))}
        </div>

        {/* Source */}
        <div style={{ opacity: srcOpacity }}>
          <SourceStamp>★ Dunstan et al., Diabetes Care 2012</SourceStamp>
        </div>
      </div>

      <Caption
        text="Two minutes of light walking every 30 minutes. That's the protocol. It reduces blood sugar spikes by 30% and restores the fat-clearing enzymes sitting shuts down."
        frame={frame}
        totalDuration={DURATION}
      />
    </div>
  );
};
