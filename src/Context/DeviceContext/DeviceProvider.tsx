import { useMemo } from 'react';
import useMatchMedia from '../../hooks/useMatchMedia';
import { DeviceContext } from './DeviceContext';

const MEDIAQUERIES = [
  '(max-width: 1280px)',
  '(max-width: 991.98px)',
  '(max-width: 768.98px)',
  '(max-width: 559.98px)',
  '(max-width: 479.98px)',
  '(pointer: fine)',
];

function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [
    isLessPC,
    isLessTablet,
    isLessMobile,
    isLessMobileMd,
    isLessMobileSmall,
    isPointer,
  ] = useMatchMedia(MEDIAQUERIES);
  const value = useMemo(
    () => ({
      isLessPC,
      isLessTablet,
      isLessMobile,
      isLessMobileMd,
      isLessMobileSmall,
      isPointer,
    }),
    [
      isLessPC,
      isLessTablet,
      isLessMobile,
      isLessMobileMd,
      isLessMobileSmall,
      isPointer,
    ]
  );

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export default DeviceProvider;
