import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { GridOverlay } from '../components/GridOverlay';
import { Caption, CaptionChunk } from '../components/Caption';

interface Props { frame: number; captionChunks?: CaptionChunk[]; }

const TEAL = '#2DD4BF';
const BG   = '#050a09';

export const Scene2C15BuildUp: React.FC<Props> = ({ frame, captionChunks }) => {
  const tagOp  = interpolate(frame, [0,  12], [0, 1], { extrapolateRight: 'clamp' });
  const tagY   = interpolate(frame, [0,  12], [10, 0], { extrapolateRight: 'clamp' });
  const hlOp   = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const hlY    = interpolate(frame, [10, 26], [20, 0], { extrapolateRight: 'clamp' });
  const db1Op  = interpolate(frame, [22, 38], [0, 1], { extrapolateRight: 'clamp' });
  const db1Y   = interpolate(frame, [22, 38], [16, 0], { extrapolateRight: 'clamp' });
  const db2Op  = interpolate(frame, [34, 50], [0, 1], { extrapolateRight: 'clamp' });
  const db2Y   = interpolate(frame, [34, 50], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}>
      <GridOverlay />

      <div style={{ opacity: tagOp, transform: `translateY(${tagY}px)`, fontFamily: FONTS.mono, fontSize: 20, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: TEAL, marginBottom: 24 }}>
        What "Essential" Actually Means
      </div>

      <div style={{ opacity: hlOp, transform: `translateY(${hlY}px)`, fontFamily: FONTS.barlow, fontWeight: 800, fontSize: 84, lineHeight: 0.9, textTransform: 'uppercase', color: COLORS.white, marginBottom: 36 }}>
        YOUR BODY<br />CAN{"'"}T MAKE IT.<br />YOU HAVE<br />TO EAT IT.
      </div>

      <div style={{ opacity: db1Op, transform: `translateY(${db1Y}px)`, borderLeft: `2px solid ${TEAL}`, paddingLeft: 24, marginBottom: 28 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: TEAL, marginBottom: 8 }}>The short list</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.55 }}>
          Only a small number of nutrients qualify as truly "essential." That list has barely changed in nearly a century.
        </div>
      </div>

      <div style={{ opacity: db2Op, transform: `translateY(${db2Y}px)`, borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 8 }}>Until now</div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.greige, lineHeight: 1.55 }}>
          A new candidate was hiding in plain sight, dismissed for decades as "just saturated fat."
        </div>
      </div>

      {captionChunks && captionChunks.length > 0 && <Caption frame={frame} chunks={captionChunks} />}
    </div>
  );
};
