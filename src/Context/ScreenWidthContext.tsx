import { createContext, useContext } from 'react';

export const ScreenWidthContext = createContext({
  isLessPC: false,
  isLessTablet: false,
  isLessMobile: false,
  isLessMobileMd: false,
  isLessMobileSmall: false,
});

export function useScreenWidth() {
  const context = useContext(ScreenWidthContext);
  if (context === undefined) {
    throw new Error(
      'ScreenWidthContext must be used within a ScreenWidthProvider'
    );
  }
  return context;
}
