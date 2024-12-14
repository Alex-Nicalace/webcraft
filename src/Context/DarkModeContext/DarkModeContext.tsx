import { createContext, useContext } from 'react';
import { IDarkModeContext } from './DarkModeContext.types';

export const DarkModeContext = createContext<IDarkModeContext>({
  isDarkMode: false,
  toggleMode: () => {},
});

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      'DarkModeContext must be used within a DarkModeProvider!!!'
    );
  }
  return context;
}
