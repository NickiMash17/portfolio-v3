type UISound = 'tap' | 'toggle' | 'confirm';
export type SoundSettings = {
  enabled: boolean;
  volume: number;
};

let audioContext: AudioContext | null = null;
const SOUND_SETTINGS_KEY = 'ui-sound-settings';

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (audioContext) return audioContext;

  const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;

  audioContext = new Ctx();
  return audioContext;
};

const clampVolume = (value: number) => Math.min(1, Math.max(0, value));

const defaultSoundSettings = (): SoundSettings => {
  if (typeof window === 'undefined') {
    return { enabled: false, volume: 0.55 };
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return {
    enabled: !prefersReducedMotion,
    volume: 0.55,
  };
};

export const getSoundSettings = (): SoundSettings => {
  if (typeof window === 'undefined') return defaultSoundSettings();

  try {
    const raw = window.localStorage.getItem(SOUND_SETTINGS_KEY);
    if (!raw) return defaultSoundSettings();

    const parsed = JSON.parse(raw) as Partial<SoundSettings>;
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : defaultSoundSettings().enabled,
      volume: clampVolume(typeof parsed.volume === 'number' ? parsed.volume : defaultSoundSettings().volume),
    };
  } catch {
    return defaultSoundSettings();
  }
};

export const setSoundSettings = (next: Partial<SoundSettings>): SoundSettings => {
  const current = getSoundSettings();
  const merged: SoundSettings = {
    enabled: typeof next.enabled === 'boolean' ? next.enabled : current.enabled,
    volume: clampVolume(typeof next.volume === 'number' ? next.volume : current.volume),
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SOUND_SETTINGS_KEY, JSON.stringify(merged));
  }

  return merged;
};

const soundProfile: Record<UISound, { freq: number; duration: number; type: OscillatorType; gain: number }> = {
  tap: { freq: 520, duration: 0.045, type: 'sine', gain: 0.025 },
  toggle: { freq: 660, duration: 0.06, type: 'triangle', gain: 0.03 },
  confirm: { freq: 760, duration: 0.075, type: 'sine', gain: 0.035 },
};

export const playUISound = async (kind: UISound) => {
  const settings = getSoundSettings();
  if (!settings.enabled || settings.volume <= 0) return;

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
    gain.gain.linearRampToValueAtTime(profile.gain * settings.volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + profile.duration);
  } catch {
    // Ignore audio errors so UI interactions never fail.
  }
};
