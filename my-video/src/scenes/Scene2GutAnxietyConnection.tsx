import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

export const Scene2GutAnxietyConnection: React.FC<Props> = ({ frame, captionChunks }) => {
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY  = interpolate(frame, [0, 12], [10, 0], { extrapolateRight: 'clamp' });

  const mk = (delay: number) => {
    const s = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 12, stiffness: 80 } });
    return {
      opacity: interpolate(Math.max(0, frame - delay), [0, 12], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const statSpring = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, stiffness: 60 } });
  const statScale  = interpolate(statSpring, [0, 1], [0.6, 1]);
  const statOp     = interpolate(Math.max(0, frame - 20), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const db1Op = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y  = interpolate(frame, [30, 45], [20, 0], { extrapolateRight: 'clamp' });
  const db2Op = interpolate(frame, [44, 59], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y  = interpolate(frame, [44, 59], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: COLORS.black, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.barlow, fontWeight: 700, fontSize: 22, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 20 }}>
        THE CONNECTION
      </div>

      <div style={{ opacity: statOp, transform: `scale(${statScale})`, transformOrigin: 'left center', marginBottom: 16 }}>
        <div style={{ fontFamily: FONTS.barlow, fontWeight: 900, fontSize: 160, color: COLORS.green, lineHeight: 1.0 }}>90%</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, marginTop: 4 }}>of your serotonin is made in your gut</div>
      </div>

      <div style={{ ...mk(28), fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 88, lineHeight: 1.0, textTransform: 'uppercase', color: COLORS.white, marginBottom: 28 }}>
        YOUR GUT RUNS<br />YOUR MOOD.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `3px solid ${COLORS.green}`, paddingLeft: 24, marginBottom: 20 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.green, marginBottom: 8 }}>THE MECHANISM</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.greige, lineHeight: 1.5 }}>
          The vagus nerve runs directly between your gut and your brain. 80% of its signals travel upward — from gut to brain. Your gut bacteria produce neurotransmitters, regulate inflammation, and influence your stress response around the clock.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, fontFamily: FONTS.mono, fontSize: 20, color: COLORS.grey, lineHeight: 1.6 }}>
        When your microbiome is disrupted, serotonin falls, inflammation rises, and the brain receives signals that trigger anxiety — independently of what is happening in your life.
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
