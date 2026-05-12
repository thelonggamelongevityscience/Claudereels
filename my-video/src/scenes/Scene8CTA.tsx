import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GlowBg } from '../components/GlowBg';
import { GridOverlay } from '../components/GridOverlay';
import { Caption } from '../components/Caption';

interface Scene8Props {
  frame: number;
}

export const Scene8CTA: React.FC<Scene8Props> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const DURATION = 120;

  // Brand name entrance
  const brandSpring = spring({ fps, frame: Math.max(0, frame - 6), config: { damping: 11, stiffness: 70 } });
  const brandY = interpolate(brandSpring, [0, 1], [50, 0]);
  const brandOp = interpolate(Math.max(0, frame - 6), [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  // Divider
  const lineWidth = interpolate(frame, [26, 46], [0, 100], { extrapolateRight: 'clamp' });

  // Tag
  const tagOp = interpolate(frame, [42, 54], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [42, 54], [10, 0], { extrapolateRight: 'clamp' });

  // CTA boxes
  const cta1Op = interpolate(frame, [54, 66], [0, 1], { extrapolateRight: 'clamp' });
  const cta1Y = interpolate(frame, [54, 66], [20, 0], { extrapolateRight: 'clamp' });
  const cta2Op = interpolate(frame, [64, 76], [0, 1], { extrapolateRight: 'clamp' });
  const cta2Y = interpolate(frame, [64, 76], [20, 0], { extrapolateRight: 'clamp' });

  // Hashtags
  const hashOp = interpolate(frame, [80, 92], [0, 1], { extrapolateRight: 'clamp' });

  // Pulse animation on CTA boxes
  const pulseVal = interpolate(
    Math.sin((frame / fps) * Math.PI * 1.5),
    [-1, 1],
    [0.85, 1.0]
  );

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <GlowBg color="green" opacity={0.22} />
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
        {/* Brand lockup */}
        <div style={{ opacity: brandOp, transform: `translateY(${brandY}px)`, marginBottom: 8 }}>
          <span
            style={{
              fontFamily: FONTS.playfair,
              fontStyle: 'italic',
              fontSize: 30,
              color: COLORS.greige,
              display: 'block',
              lineHeight: 1.1,
              opacity: 0.8,
            }}
          >
            the
          </span>
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 900,
              fontSize: 108,
              color: COLORS.white,
              lineHeight: 0.88,
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            LONG
            <br />
            GAME
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 3,
            backgroundColor: COLORS.green,
            width: `${lineWidth}%`,
            marginBottom: 20,
            borderRadius: 2,
          }}
        />

        {/* Tag */}
        <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, marginBottom: 36 }}>
          <span
            style={{
              fontFamily: FONTS.barlow,
              fontWeight: 700,
              fontSize: 22,
              color: COLORS.green,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Longevity Science
          </span>
        </div>

        {/* CTA Box 1 — Save this */}
        <div
          style={{
            opacity: cta1Op,
            transform: `translateY(${cta1Y}px)`,
            width: '100%',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              border: `2px solid ${COLORS.green}`,
              borderRadius: 8,
              padding: '20px 28px',
              opacity: pulseVal,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.barlow,
                fontWeight: 800,
                fontSize: 36,
                color: COLORS.green,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              → Save this
            </span>
          </div>
        </div>

        {/* CTA Box 2 — Follow */}
        <div
          style={{
            opacity: cta2Op,
            transform: `translateY(${cta2Y}px)`,
            width: '100%',
            marginBottom: 32,
          }}
        >
          <div
            style={{
              border: `2px solid rgba(255,255,255,0.28)`,
              borderRadius: 8,
              padding: '20px 28px',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.barlow,
                fontWeight: 700,
                fontSize: 36,
                color: COLORS.white,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0.75,
              }}
            >
              → Follow for more
            </span>
          </div>
        </div>

        {/* Hashtags */}
        <div style={{ opacity: hashOp }}>
          <p
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              color: COLORS.green,
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.65,
              letterSpacing: '0.04em',
            }}
          >
            #sittingdisease #longevity #sedentary
            <br />
            #movementismedicine #healthspan
          </p>
        </div>
      </div>

      <Caption
        text="Follow The Long Game for daily longevity science. Save this — set your 30-minute alarm before you close this app."
        frame={frame}
        totalDuration={DURATION}
      />
    </div>
  );
};
