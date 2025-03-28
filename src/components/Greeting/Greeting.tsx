import { forwardRef, useState } from 'react';
import './Greeting.scss';
import Container from '../Container';
import { TGreetingProps } from './Greeting.types';
import PuzzleSvg from '../../assets/img/puzzles/puzzle-main-screen.svg?react';
import HeadingSvg from '../../assets/img/puzzles/puzzle-main-screen-text-bg.svg?react';
import Button from '../ui/Button';
import { CODE_ANIMATED, CODE_STATIC } from './codeDecor';
import Dawn from '../ui/Dawn';
import { useDarkMode } from '../../Context/DarkModeContext';
import { useDevice } from '../../Context/DeviceContext';

const BALL_COUNT = 3;

const Greeting = forwardRef<HTMLDivElement, TGreetingProps>(
  ({ className, onAnimateIntro, ...props }, ref) => {
    const { isDarkMode } = useDarkMode();
    const { isLessPC } = useDevice();
    const [isAnimatedDecor, setIsAnimatedDecor] = useState(false);
    const [isStopedAnimatePuzzle, setIsStopedAnimatePuzzle] = useState(false);
    const [animationType, setAnimationType] = useState<'ball' | 'code'>('ball');
    const codeAnimated = !isLessPC ? CODE_ANIMATED : CODE_ANIMATED.slice(0, 2);

    function handleToggleAnimatePuzzle() {
      setIsStopedAnimatePuzzle((prev) => !prev);
    }

    function handleToggleAnimationType(
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
      if (e.target !== e.currentTarget || isDarkMode) return;
      setAnimationType((prev) => (prev === 'ball' ? 'code' : 'ball'));
      setIsStopedAnimatePuzzle(false);
    }

    function handleAnimationStart() {
      if (!onAnimateIntro) return;

      return (e: React.AnimationEvent<HTMLElement>) => {
        if (e.animationName === 'puzzleMainScreen') {
          onAnimateIntro?.('start');
        }
      };
    }

    function handleAnimationEnd() {
      if (!onAnimateIntro) return;

      return (e: React.AnimationEvent<HTMLElement>) => {
        if (e.animationName === 'puzzleMainScreen') {
          onAnimateIntro?.('end');
        }
      };
    }

    return (
      <Container
        ref={ref}
        tag="section"
        className={['greeting', 'decor-blured decor-blured_1', className]
          .filter(Boolean)
          .join(' ')}
        onAnimationStart={handleAnimationStart()}
        onAnimationEnd={handleAnimationEnd()}
        {...props}
      >
        <div className="greeting__wrapper">
          <h1 className="greeting__heading heading-greeting heading-liquid">
            <span className="heading-greeting__shadow"></span>
            <span className="heading-greeting__text">
              <span>Я — frontend-разработчик.</span>
              <span>Меня зовут Александр.</span>
              <span>И это моё портфолио.</span>
            </span>
          </h1>
          <p className="greeting__text heading-additional-liquid">
            <span>Привет!</span>
          </p>
          <div
            className={[
              'greeting__puzzle',
              isStopedAnimatePuzzle && 'greeting__puzzle_stoped-animation',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={handleToggleAnimationType}
          >
            {animationType === 'code' && !isDarkMode
              ? codeAnimated.map((code, i) => (
                  <pre
                    key={i}
                    className={`greeting__animated-code greeting__animated-code_${i + 1}`}
                    onClick={handleToggleAnimatePuzzle}
                  >
                    <code>{code}</code>
                  </pre>
                ))
              : Array(BALL_COUNT)
                  .fill(null)
                  .map((_, index) => (
                    <span
                      key={index}
                      className={`greeting__ball greeting__ball_${index + 1}`}
                      onClick={handleToggleAnimatePuzzle}
                    ></span>
                  ))}
            <PuzzleSvg className="clip-path" />
            <HeadingSvg className="clip-path" />
          </div>
          {!isAnimatedDecor && (
            <div
              className="greeting__decor"
              onAnimationEnd={() => setIsAnimatedDecor(true)}
            >
              {CODE_STATIC.map((code, i) => (
                <pre
                  key={i}
                  className={`greeting__code greeting__code_${i + 1}`}
                >
                  <code>{code}</code>
                </pre>
              ))}
              <Dawn className="greeting__icon-dawn" isBig />
            </div>
          )}
        </div>
        <Button
          to="#portfolio"
          className="greeting__button"
          variant="button-secondary"
        >
          Смотреть портфолио
        </Button>
      </Container>
    );
  }
);
// Устанавливаем displayName без этого ESLint ругается, т.к.
// без этого во время отладки имя компонента станвится ForwardRef
Greeting.displayName = 'Greeting';

export default Greeting;
