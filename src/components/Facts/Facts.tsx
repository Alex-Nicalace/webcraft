import { useState } from 'react';
import { pluralize } from '../../utils';
import Container from '../Container';
import Puzzle from '../ui/Puzzle';
import { FACTS } from './Facts.config';
import { TFactsProps } from './Facts.types';
import './Facts.scss';
import Dawn from '../ui/Dawn';

function Facts({ className, ...props }: TFactsProps): JSX.Element {
  const [openedFact, setOpenedFact] = useState(-1);
  const quantityFacts = FACTS.length;
  const facts = FACTS.map((item, index) => ({ ...item, num: ++index }));
  const factsDouble = facts.concat(facts);

  function handlePointerDownPuzzle(indexPuzzle: number) {
    return function (e: React.PointerEvent<HTMLDivElement>) {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setOpenedFact(indexPuzzle);
    };
  }

  function handlePointerUpPuzzle(indexPuzzle: number) {
    if (indexPuzzle !== openedFact) return;

    return function () {
      setOpenedFact(-1);
    };
  }

  return (
    <Container
      tag="section"
      className={['facts', className].join(' ')}
      {...props}
    >
      <h2 className="facts__heading">
        {pluralize(quantityFacts, 'факт', 'факта', 'фактов')}
      </h2>
      <p className="facts__explain">
        зажмите любой из пазлов, удерживайте и читайте
      </p>
      <ul
        className={['facts__list', openedFact !== -1 && 'facts__list_opened']
          .filter(Boolean)
          .join(' ')}
      >
        {factsDouble.map(({ variant, text, num }, index) => (
          <li key={index} className="facts__item">
            <Puzzle
              className="facts__puzzle"
              variant={variant}
              text={text}
              isOpen={openedFact === index}
              num={num}
              onPointerDown={handlePointerDownPuzzle(index)}
              onPointerUp={handlePointerUpPuzzle(index)}
              onLostPointerCapture={handlePointerUpPuzzle(index)}
            />
            <Dawn className="facts__dawn" stopAnimation={openedFact > -1} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Facts;
