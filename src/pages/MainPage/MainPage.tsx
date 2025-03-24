import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useResizeObserver } from '../../hooks/useResizeObserver';

import AboutMe from '../../components/AboutMe';
import Competencies from '../../components/Competencies';
import Credo from '../../components/Credo/Credo';
import Facts from '../../components/Facts';
import Greeting, { TAnimateIntroFn } from '../../components/Greeting';
import Portfolio from '../../components/Portfolio';
import { TMainPageProps } from './MainPage.types';
import { OutletContextType } from '../../components/AppLayout';
import './MainPage.scss';

function MainPage({ className, ...props }: TMainPageProps): JSX.Element {
  const { onChangeStateFirstSection } = useOutletContext<OutletContextType>();

  const [isAnimatedFirstSection, setIsAnimatedFirstSection] = useState(false);
  const [isFirstScreenOverflow, setIsFirstScreenOverflow] = useState(false);

  const firstScreenRef = useRef<HTMLDivElement>(null);
  const [firstScreenSize] = useResizeObserver(firstScreenRef.current);
  const { height: firstScreenHeight } = firstScreenSize || {};
  const useParallax = !isFirstScreenOverflow;

  useIntersectionObserver(!useParallax ? firstScreenRef : null, {
    rootMargin: '10px 0px -100% 0px',
    threshold: 0.00001,
    onIntersecting: (entry) => {
      onChangeStateFirstSection?.(
        entry.isIntersecting
          ? 'scrolled'
          : entry.boundingClientRect.top < 0
            ? 'invisible'
            : 'normal'
      );
    },
  });

  const spacerRef = useRef<HTMLDivElement>(null);
  const { isIntersecting: isIntersectingSpacer } = useIntersectionObserver(
    useParallax ? spacerRef : null,
    {
      rootMargin: '-120px 0px 0px 0px',
      onIntersecting: (entry) => {
        onChangeStateFirstSection?.(
          entry.isIntersecting ? 'normal' : 'invisible'
        );
      },
    }
  );

  const boxRef = useRef<HTMLDivElement>(null);
  const { isIntersecting: isIntersectingBox } = useIntersectionObserver(
    useParallax ? boxRef : null,
    { threshold: 0.00001 }
  );

  useEffect(() => {
    if (!firstScreenHeight) return;
    setIsFirstScreenOverflow(firstScreenHeight > window.innerHeight);
  }, [firstScreenHeight]);

  function handleAnimateIntro(): TAnimateIntroFn | undefined {
    if (isAnimatedFirstSection) return;

    return (state) => {
      setIsAnimatedFirstSection(state === 'end');
    };
  }

  // Решает проблему когда виден 1-й и 2-экраны, чтобы 2-й экран стал виден после анимации 1-го
  const isShowBox =
    (isIntersectingSpacer && isIntersectingBox && isAnimatedFirstSection) ||
    (isIntersectingSpacer && !isIntersectingBox) ||
    (!isIntersectingSpacer && isIntersectingBox);

  const content = (
    <>
      <AboutMe className="main-page__about-me" id="about-me" />
      <Competencies className="main-page__competencies" />
      <Credo className="main-page__credo" />
      <Portfolio className="main-page__portfolio" id="portfolio" />
      <Facts className="main-page__facts" id="facts" />
    </>
  );

  return (
    <main
      className={[
        'main-page',
        isFirstScreenOverflow && 'main-page_wide',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Greeting
        ref={firstScreenRef}
        className={[
          'main-page__greeting',
          !isFirstScreenOverflow &&
            !isIntersectingSpacer &&
            'main-page__greeting_transparent',
        ]
          .filter(Boolean)
          .join(' ')}
        onAnimateIntro={handleAnimateIntro()}
      />
      {useParallax ? (
        <>
          <div
            ref={spacerRef}
            className="main-page__spacer"
            style={{ height: `${firstScreenSize?.height}px` }}
          ></div>
          <div
            ref={boxRef}
            className={[
              'main-page__box',
              !isShowBox && 'main-page__box_transparent',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {content}
          </div>
        </>
      ) : (
        content
      )}
    </main>
  );
}

export default MainPage;
