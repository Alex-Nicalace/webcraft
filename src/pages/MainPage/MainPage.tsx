import { useRef, useState } from 'react';
import AboutMe from '../../components/AboutMe';
import Competencies from '../../components/Competencies';
import Credo from '../../components/Credo/Credo';
import Facts from '../../components/Facts';
import Greeting, { TAnimateIntroFn } from '../../components/Greeting';
import Portfolio from '../../components/Portfolio';
import './MainPage.scss';
import { TMainPageProps } from './MainPage.types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const INTERSECTION_OPTIONS = { threshold: 0.00001 };

function MainPage({
  className,
  isVisableFirstSection = true,
  ...props
}: TMainPageProps): JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null);
  const { isIntersecting: isVisibleBox } = useIntersectionObserver(
    boxRef,
    INTERSECTION_OPTIONS
  );
  const [isAnimatedFirstSection, setIsAnimatedFirstSection] = useState(false);

  function handleAnimateIntro(): TAnimateIntroFn | undefined {
    if (isAnimatedFirstSection) return;

    return (state) => {
      setIsAnimatedFirstSection(state === 'end');
    };
  }
  const isShowBox =
    (isVisableFirstSection && isVisibleBox && isAnimatedFirstSection) ||
    (isVisableFirstSection && !isVisibleBox) ||
    (!isVisableFirstSection && isVisibleBox);

  return (
    <main
      className={['main-page', className].filter(Boolean).join(' ')}
      {...props}
    >
      <Greeting
        className={[
          'main-page__greeting',
          !isVisableFirstSection && 'main-page__greeting_transparent',
        ]
          .filter(Boolean)
          .join(' ')}
        onAnimateIntro={handleAnimateIntro()}
      />
      <div
        ref={boxRef}
        className={[
          'main-page__box',
          !isShowBox && 'main-page__box_transparent',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <AboutMe className="main-page__about-me" id="about-me" />
        <Competencies className="main-page__competencies" />
        <Credo className="main-page__credo" />
        <Portfolio className="main-page__portfolio" id="portfolio" />
        <Facts className="main-page__facts" id="facts" />
      </div>
    </main>
  );
}

export default MainPage;
