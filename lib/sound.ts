"use client";

// Tactile Web Audio Synthesizer (0kb audio assets, zero network requests)
let audioCtx: AudioContext | null = null;
let sfxEnabled = false;

export function initSound(enabled = false) {
  sfxEnabled = enabled;
}

export function toggleSound(): boolean {
  sfxEnabled = !sfxEnabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio-sfx", sfxEnabled ? "true" : "false");
  }
  if (sfxEnabled) {
    playClick(800, 0.04);
  }
  return sfxEnabled;
}

export function isSoundEnabled(): boolean {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("portfolio-sfx");
    if (saved !== null) return saved === "true";
  }
  return sfxEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playClick(freq = 640, duration = 0.03, type: OscillatorType = "sine") {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio context errors gracefully
  }
}

export function playKeystroke() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const randomFreq = 480 + Math.random() * 140;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {}
}

export function playSuccess() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.05, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.12);
    });
  } catch {}
}
