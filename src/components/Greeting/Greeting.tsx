import './Greeting.scss';
import Container from '../Container';
import { TGreetingProps } from './Greeting.types';
import PuzzleSvg from '../../assets/img/puzzles/puzzle-main-screen.svg?react';
import HeadingSvg from '../../assets/img/puzzles/puzzle-main-screen-text-bg.svg?react';
import Button from '../ui/Button';

function Greeting({ className }: TGreetingProps): JSX.Element {
  const BallCount = 3;

  return (
    <Container
      tag="section"
      className={['greeting', className].filter(Boolean).join(' ')}
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
                className={`greeting__ball greeting__ball_${index + 1}`}
              ></span>
            ))}
          <PuzzleSvg className="greeting__mask" />
          <HeadingSvg className="greeting__mask" />
        </div>
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
