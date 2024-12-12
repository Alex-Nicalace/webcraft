import useMatchMedia from '../hooks/useMatchMedia';
import { ScreenWidthContext } from './ScreenWidthContext';

const MEDIAQUERIES = [
  '(max-width: 1280px )',
  '(max-width: 991.98px )',
  '(max-width: 768.98px )',
  '(max-width: 559.98px )',
  '(max-width: 479.98px )',
];

function ScreenWidthProvider({ children }: { children: React.ReactNode }) {
  const [
    isLessPC,
    isLessTablet,
    isLessMobile,
    isLessMobileMd,
    isLessMobileSmall,
  ] = useMatchMedia(MEDIAQUERIES);
  return (
    <ScreenWidthContext.Provider
      value={{
        isLessPC,
        isLessTablet,
        isLessMobile,
        isLessMobileMd,
        isLessMobileSmall,
      }}
    >
      {children}
    </ScreenWidthContext.Provider>
  );
}

export default ScreenWidthProvider;
