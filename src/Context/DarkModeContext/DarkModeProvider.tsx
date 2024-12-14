import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { DarkModeContext } from './DarkModeContext';

export default function DarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }

    return () => {
      document.documentElement.classList.remove('dark-mode', 'light-mode');
    };
  }, [isDarkMode]);

  const handleToggleMode = useCallback(
    function handleToggleMode(value?: boolean) {
      setIsDarkMode((prevValue) => value ?? !prevValue);
    },
    [setIsDarkMode]
  );

  const value = useMemo(
    () => ({ isDarkMode, toggleMode: handleToggleMode }),
    [isDarkMode, handleToggleMode]
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}
