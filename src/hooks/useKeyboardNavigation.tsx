import { useEffect } from 'react';

export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if (
        (e.target as HTMLElement).tagName === 'INPUT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA' ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Scroll to top with 'K' key
      if (e.key.toLowerCase() === 'k' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Scroll to bottom with 'J' key
      if (e.key.toLowerCase() === 'j' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }

      // Section navigation with number keys (1-6)
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const keyIndex = parseInt(e.key);
      if (!isNaN(keyIndex) && keyIndex >= 1 && keyIndex <= sections.length && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const section = document.getElementById(sections[keyIndex - 1]);
        if (section) {
          const offset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
};
