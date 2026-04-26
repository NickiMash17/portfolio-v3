import { useEffect } from 'react';

const SEQUENCE = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a',
];

export const useKonami = (onUnlock: () => void) => {
  useEffect(() => {
    let buffer: string[] = [];
    const handler = (e: KeyboardEvent) => {
      buffer = [...buffer, e.key].slice(-SEQUENCE.length);
      if (buffer.join(',').toLowerCase() === SEQUENCE.join(',').toLowerCase()) {
        onUnlock();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onUnlock]);
};
