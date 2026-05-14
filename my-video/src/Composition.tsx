// src/Composition.tsx
import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ── SLIDE CONTENT (visual layer — keep your existing styles) ──────────────────
const SLIDES = [
  {
    headline: "SITTING IS KILLING YOU",
    sub: "Faster than smoking.",
    caption: "Sitting for 8 hours a day is killing you faster than smoking.",
  },
  {
    headline: "40% HIGHER RISK OF DEATH",
    sub: "Even if you go to the gym.",
    caption: "A 40 percent higher risk of death. From sitting.",
  },
  {
    headline: "WHAT HAPPENS INSIDE",
    sub: "Blood pools. Metabolism shuts down.",
    caption: "Blood pools in your legs. Your metabolism shuts down. Insulin stops working.",
  },
  {
    headline: "THE PARADOX",
    sub: "Exercise daily. Still die early.",
    caption: "You can exercise every day and still die early if you sit for the other 23 hours.",
  },
  {
    headline: "MOVEMENT SNACKS",
    sub: "2 min every 30 min. That's it.",
    caption: "Two minutes of walking every 30 minutes resets everything.",
  },
  {
    headline: "4 EXTRA YEARS",
    sub: "Just from standing up more.",
    caption: "People who break up sitting live 4 years longer on average.",
  },
  {
    headline: "AS DANGEROUS AS SMOKING",
    sub: "Your doctor won't say this.",
    caption: "It's as dangerous as a pack of cigarettes a day.",
  },
  {
    headline: "FOLLOW FOR MORE",
    sub: "One evidence-based habit. Every week.",
    caption: "Follow for one evidence-based habit a week.",
  },
];

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface SlideTiming {
  slideIndex: number;
  startTime: number;
  endTime: number;
}
interface Timings {
  totalDuration: number;
  slides: SlideTiming[];
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function secondsToFrames(seconds: number, fps: number) {
  return Math.round(seconds * fps);
}

// ── COMPOSITION ───────────────────────────────────────────────────────────────
export const SittingReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [timings, setTimings] = useState<Timings | null>(null);
  const [handle] = useState(() => delayRender("Loading timings.json"));

  useEffect(() => {
    fetch(staticFile("timings.json"))
      .then((r) => r.json())
      .then((data: Timings) => {
        setTimings(data);
        continueRender(handle);
      })
      .catch((e) => {
        console.error("Failed to load timings.json", e);
        continueRender(handle);
      });
  }, [handle]);

  if (!timings) return null;

  // ── DETERMINE ACTIVE SLIDE FROM CURRENT FRAME ────────────────────────────
  const currentSec = frame / fps;

  let activeSlide = 0;
  for (let i = 0; i < timings.slides.length; i++) {
    const { startTime, endTime } = timings.slides[i];
    if (currentSec >= startTime && currentSec < endTime) {
      activeSlide = timings.slides[i].slideIndex;
      break;
    }
    if (i === timings.slides.length - 1 && currentSec >= endTime) {
      activeSlide = timings.slides[i].slideIndex;
    }
  }

  const slide = SLIDES[activeSlide];

  const activeCaption = slide?.caption ?? "";

  const currentSlideStart = timings.slides[activeSlide]
    ? secondsToFrames(timings.slides[activeSlide].startTime, fps)
    : 0;
  const framesSinceStart = frame - currentSlideStart;
  const opacity = Math.min(1, framesSinceStart / 6);

  return (
    <AbsoluteFill style={{ background: "#0D0D0D", fontFamily: "sans-serif" }}>
      {/* ── AUDIO ── */}
      <Audio src={staticFile("audio.mp3")} />

      {/* ── SLIDE CONTENT ── */}
      <AbsoluteFill
        style={{
          opacity,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 60px",
        }}
      >
        {/* Replace the JSX below with your existing styled slide components */}
        <h1
          style={{
            color: "#00FF85",
            fontSize: 80,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          {slide?.headline}
        </h1>
        <p
          style={{
            color: "#FFFFFF",
            fontSize: 40,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          {slide?.sub}
        </p>

        {/* ── CAPTIONS ── */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 60,
            right: 60,
            background: "rgba(0,0,0,0.7)",
            borderRadius: 12,
            padding: "16px 24px",
          }}
        >
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 32,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {activeCaption}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
