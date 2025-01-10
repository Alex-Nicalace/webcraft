import Container from '../Container';
import Puzzle from '../ui/Puzzle';
import { TCredoProps } from './Credo.types';
import './Credo.scss';

const CREDO_PUZZLE: { text: string; variant: 3 | 4 | 5 | 6 | 7 }[] = [
  { text: 'Каждая строчка кода,', variant: 3 },
  { text: 'как деталь пазла,', variant: 4 },
  { text: 'должна быть на своём месте,', variant: 5 },
  { text: 'чтобы получился', variant: 6 },
  { text: 'ожидаемый результат.', variant: 7 },
];

function Credo({ className, ...props }: TCredoProps): JSX.Element {
  const isOpenPuzzle = false;

  return (
    <Container tag="div" className={['credo', className].join(' ')} {...props}>
      <div className="credo__wrapper">
        {CREDO_PUZZLE.map(({ text, variant }, index) => (
          <Puzzle
            key={index}
            variant={variant}
            text={text}
            isOpen={isOpenPuzzle}
          />
        ))}
      </div>
    </Container>
  );
}

export default Credo;
