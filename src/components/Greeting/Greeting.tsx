import './Greeting.scss';
import Container from '../Container';
import { TGreetingProps } from './Greeting.types';
import PuzzleSvg from '../../assets/img/puzzles/puzzle-main-screen.svg?react';
import HeadingSvg from '../../assets/img/puzzles/puzzle-main-screen-text-bg.svg?react';
import Button from '../ui/Button';
import { CODE_DEKOR } from './codeDekor';
import Dawn from '../ui/Dawn';
import { useState } from 'react';

function Greeting({ className }: TGreetingProps): JSX.Element {
  const [isAnimatedDecor, setIsAnimatedDecor] = useState(false);
  const [isStopAnimateBall, setIsStopAnimateBall] = useState(false);
  const BallCount = 3;

  function handleToggleAnimateBall() {
    setIsStopAnimateBall((prev) => !prev);
  }

  return (
    <Container
      tag="section"
      className={['greeting decor-blured decor-blured_1', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="greeting__wrapper">
        <h1 className="greeting__heading heading-liquid">
          <span>Я — frontend-разработчик.</span>
          <span>Меня зовут Александр.</span>
          <span>И это моё портфолио.</span>
        </h1>
        <p className="greeting__text heading-additional-liquid">
          <span>Привет!</span>
        </p>
        <div className="greeting__puzzle">
          {Array(BallCount)
            .fill(null)
            .map((_, index) => (
              <span
                key={index}
                className={[
                  `greeting__ball greeting__ball_${index + 1}`,
                  isStopAnimateBall && 'greeting__ball_stoped',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={handleToggleAnimateBall}
              ></span>
            ))}
          <PuzzleSvg className="greeting__mask" />
          <HeadingSvg className="greeting__mask" />
        </div>
        {!isAnimatedDecor && (
          <div
            className="greeting__decor"
            onAnimationEnd={() => setIsAnimatedDecor(true)}
          >
            {CODE_DEKOR.map((code, i) => (
              <pre
                key={i}
                className={`greeting__code greeting__code_${i + 1} text-typing`}
              >
                <code>{code}</code>
              </pre>
            ))}
            <Dawn className="greeting__icon-dawn" isBig />
          </div>
        )}
      </div>
      <Button
        href="#portfolio"
        className="greeting__button"
        variant="button-secondary"
      >
        Смотреть портфолио
      </Button>
    </Container>
  );
}

export default Greeting;
