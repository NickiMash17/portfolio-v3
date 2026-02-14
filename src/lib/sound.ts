type UISound = 'tap' | 'toggle' | 'confirm';

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (audioContext) return audioContext;

  const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;

  audioContext = new Ctx();
  return audioContext;
};

const soundProfile: Record<UISound, { freq: number; duration: number; type: OscillatorType; gain: number }> = {
  tap: { freq: 520, duration: 0.045, type: 'sine', gain: 0.025 },
  toggle: { freq: 660, duration: 0.06, type: 'triangle', gain: 0.03 },
  confirm: { freq: 760, duration: 0.075, type: 'sine', gain: 0.035 },
};

export const playUISound = async (kind: UISound) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const profile = soundProfile[kind];
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = profile.type;
    osc.frequency.setValueAtTime(profile.freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(profile.gain, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + profile.duration);
  } catch {
    // Ignore audio errors so UI interactions never fail.
  }
};

