import { useState, useEffect } from 'react';

export const useSystemTheme = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent): void => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDarkMode;
};
