import React from 'react';
import { interpolate } from 'remotion';
import { COLORS, SCENES, TOTAL_FRAMES } from '../constants';

interface ProgressBarProps {
  frame: number;
}

const sceneKeys = Object.keys(SCENES) as (keyof typeof SCENES)[];

export const ProgressBar: React.FC<ProgressBarProps> = ({ frame }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        display: 'flex',
        zIndex: 100,
      }}
    >
      {sceneKeys.map((key, i) => {
        const scene = SCENES[key];
        const segmentWidth = (scene.duration / TOTAL_FRAMES) * 100;
        const sceneFrame = frame - scene.start;
        const filled = Math.min(1, Math.max(0, sceneFrame / scene.duration));

        return (
          <div
            key={key}
            style={{
              width: `${segmentWidth}%`,
              height: '100%',
              position: 'relative',
              marginRight: i < sceneKeys.length - 1 ? 2 : 0,
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${filled * 100}%`,
                backgroundColor: frame >= scene.start ? COLORS.green : 'transparent',
                transition: 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
