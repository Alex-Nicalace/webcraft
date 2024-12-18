import './Greeting.scss';
import Container from '../Container';
import { TGreetingProps } from './Greeting.types';
import PuzzleSvg from '../../assets/img/puzzles/puzzle-main-screen.svg?react';
import HeadingSvg from '../../assets/img/puzzles/puzzle-main-screen-text-bg.svg?react';
import Button from '../ui/Button';

function Greeting({ className }: TGreetingProps): JSX.Element {
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
        <p className="greeting__text heading-additional-liquid">Привет!</p>
        <div className="greeting__puzzle">
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
