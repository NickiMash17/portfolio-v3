import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playUISound, getSoundSettings, setSoundSettings } from '@/lib/sound';

export const SoundToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(55);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = getSoundSettings();
    setEnabled(current.enabled);
    setVolume(Math.round(current.volume * 100));
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleEnableToggle = () => {
    const nextEnabled = !enabled;
    setEnabled(nextEnabled);
    setSoundSettings({ enabled: nextEnabled, volume: volume / 100 });
    if (nextEnabled) {
      void playUISound('toggle');
    }
  };

  const handleVolumeChange = (nextValue: number) => {
    setVolume(nextValue);
    setSoundSettings({ enabled, volume: nextValue / 100 });
    if (enabled) {
      void playUISound('tap');
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          void playUISound('tap');
        }}
        className="relative glass hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/30 rounded-md h-11 w-11 inline-flex items-center justify-center"
        aria-label="Sound settings"
        aria-expanded={isOpen}
      >
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 glass border border-primary/20 rounded-lg p-3 shadow-xl z-[60]">
          <button
            type="button"
            onClick={handleEnableToggle}
            className={`w-full text-left text-xs font-medium rounded-md px-2 py-1.5 mb-2 transition-colors ${
              enabled ? 'bg-primary/15 text-primary' : 'bg-card/50 text-muted-foreground'
            }`}
          >
            {enabled ? 'Sound On' : 'Sound Off'}
          </button>

          <label htmlFor="sound-volume" className="block text-[11px] text-muted-foreground mb-1">
            Volume: {volume}%
          </label>
          <input
            id="sound-volume"
            type="range"
            min={0}
            max={100}
            step={5}
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      )}
    </div>
  );
};

