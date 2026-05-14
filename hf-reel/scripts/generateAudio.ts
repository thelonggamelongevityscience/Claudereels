// scripts/generateAudio.ts
// Run with: npx ts-node scripts/generateAudio.ts
// Outputs: public/audio.mp3 + public/timings.json

import * as fs from "fs";
import * as path from "path";
import axios from "axios";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!;
const VOICE_ID = "N2lVS1w7w7YCOu9C6kH1"; // Brian — professional American male

// ── FULL VOICEOVER SCRIPT (from Reel #1: The Sitting Death Sentence) ──────────
const FULL_SCRIPT = `Sitting for 8 hours a day is killing you faster than smoking. Your doctor isn't telling you this.
A 40 percent higher risk of death. From sitting. Even in people who go to the gym.
Here's what happens inside your body. Blood pools in your legs. Your metabolism shuts down. Insulin stops working.
The paradox? You can exercise every day and still die early. If you sit for the other 23 hours.
The fix isn't a gym membership. It's movement snacks. Two minutes of walking every 30 minutes resets everything.
People who break up sitting live 4 years longer on average. Four years. From standing up.
You already knew sitting too much was bad. Now you know it's as dangerous as a pack of cigarettes a day.
Follow for one evidence-based habit a week. Your future self will thank you.`;

// ── SLIDE-TO-SCRIPT MAPPING ────────────────────────────────────────────────────
// Maps each slide index to the substring of FULL_SCRIPT it corresponds to.
// We'll use character positions from the timings response to find slide boundaries.
export const SLIDE_SCRIPTS = [
  "Sitting for 8 hours a day is killing you faster than smoking. Your doctor isn't telling you this.",
  "A 40 percent higher risk of death. From sitting. Even in people who go to the gym.",
  "Here's what happens inside your body. Blood pools in your legs. Your metabolism shuts down. Insulin stops working.",
  "The paradox? You can exercise every day and still die early. If you sit for the other 23 hours.",
  "The fix isn't a gym membership. It's movement snacks. Two minutes of walking every 30 minutes resets everything.",
  "People who break up sitting live 4 years longer on average. Four years. From standing up.",
  "You already knew sitting too much was bad. Now you know it's as dangerous as a pack of cigarettes a day.",
  "Follow for one evidence-based habit a week. Your future self will thank you.",
];

async function generateAudioWithTimestamps() {
  console.log("🎙️  Calling ElevenLabs with-timestamps endpoint...");

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream/with-timestamps`,
    {
      text: FULL_SCRIPT,
      model_id: "eleven_turbo_v2",
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.85,
        style: 0.0,
        use_speaker_boost: true,
      },
    },
    {
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json", // IMPORTANT: JSON, not audio/mpeg
      },
      responseType: "text",
    }
  );

  // ── PARSE NDJSON RESPONSE ──────────────────────────────────────────────────
  // The endpoint streams newline-delimited JSON chunks.
  // Each chunk has { audio_base64, alignment: { characters, character_start_times_seconds, character_end_times_seconds } }

  const lines = (response.data as string)
    .split("\n")
    .filter((l: string) => l.trim());

  const audioChunks: Buffer[] = [];
  const allCharacters: string[] = [];
  const allStartTimes: number[] = [];
  const allEndTimes: number[] = [];

  for (const line of lines) {
    try {
      const chunk = JSON.parse(line);
      if (chunk.audio_base64) {
        audioChunks.push(Buffer.from(chunk.audio_base64, "base64"));
      }
      if (chunk.alignment) {
        allCharacters.push(...chunk.alignment.characters);
        allStartTimes.push(...chunk.alignment.character_start_times_seconds);
        allEndTimes.push(...chunk.alignment.character_end_times_seconds);
      }
    } catch {
      // skip malformed lines
    }
  }

  // ── WRITE AUDIO FILE ────────────────────────────────────────────────────────
  const audioBuffer = Buffer.concat(audioChunks);
  const audioPath = path.join(process.cwd(), "public", "audio.mp3");
  fs.mkdirSync(path.join(process.cwd(), "public"), { recursive: true });
  fs.writeFileSync(audioPath, audioBuffer);
  console.log(`✅  Audio written to public/audio.mp3 (${audioBuffer.length} bytes)`);

  // ── COMPUTE SLIDE START TIMES FROM CHARACTER POSITIONS ─────────────────────
  const fullText = allCharacters.join("");
  const slideTimings: { slideIndex: number; startTime: number; endTime: number }[] = [];

  let searchFrom = 0;
  for (let i = 0; i < SLIDE_SCRIPTS.length; i++) {
    const slideText = SLIDE_SCRIPTS[i];
    // Find where this slide's first word begins in the character array
    const charIndex = fullText.indexOf(slideText.slice(0, 20), searchFrom);
    if (charIndex === -1) {
      console.warn(`⚠️  Could not locate slide ${i} in character stream`);
      continue;
    }
    const startTime = allStartTimes[charIndex] ?? 0;

    // Find where this slide ends (last character of its text)
    const endCharIndex = charIndex + slideText.length - 1;
    const endTime = allEndTimes[Math.min(endCharIndex, allEndTimes.length - 1)] ?? startTime + 3;

    slideTimings.push({ slideIndex: i, startTime, endTime });
    searchFrom = charIndex + slideText.length;
  }

  // ── WRITE TIMINGS JSON ──────────────────────────────────────────────────────
  const timingsPath = path.join(process.cwd(), "public", "timings.json");
  const timingsOutput = {
    totalDuration: allEndTimes[allEndTimes.length - 1] ?? 32,
    slides: slideTimings,
    wordLevel: {
      characters: allCharacters,
      startTimes: allStartTimes,
      endTimes: allEndTimes,
    },
  };
  fs.writeFileSync(timingsPath, JSON.stringify(timingsOutput, null, 2));
  console.log(`✅  Timings written to public/timings.json`);
  console.log("\n📊 Slide timing summary:");
  slideTimings.forEach(({ slideIndex, startTime, endTime }) => {
    console.log(
      `  Slide ${slideIndex + 1}: ${startTime.toFixed(2)}s → ${endTime.toFixed(2)}s (${(endTime - startTime).toFixed(2)}s)`
    );
  });
}

generateAudioWithTimestamps().catch(console.error);
