import { createContext, useContext } from 'react';

export const DeviceContext = createContext({
  isLessPC: false,
  isLessTablet: false,
  isLessMobile: false,
  isLessMobileMd: false,
  isLessMobileSmall: false,
  isPointer: false,
});

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error(
      'ScreenWidthContext must be used within a ScreenWidthProvider'
    );
  }
  return context;
}
