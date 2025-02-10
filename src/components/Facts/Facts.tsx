import { useState } from 'react';
import { pluralize } from '../../utils';
import Container from '../Container';
import Puzzle from '../ui/Puzzle';
import { TFact, TFactsProps } from './Facts.types';
import './Facts.scss';
import Dawn from '../ui/Dawn';
import { useFetch } from '../../hooks/useFetch';
import ErrorMessage from '../ui/ErrorMessage';
import Loader from '../ui/Loader';

function Facts({ className, ...props }: TFactsProps): JSX.Element {
  const [{ responseData: facts, isLoading, errorMessage }] = useFetch<TFact[]>(
    '/assets/facts/facts.json'
  );
  const [openedFact, setOpenedFact] = useState(-1);
  const quantityFacts = facts?.length ?? 0;
  const factsWithNum = (facts ?? []).map((item, index) => ({
    ...item,
    num: ++index,
  }));
  const doubledFacts = factsWithNum.concat(factsWithNum);

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

      {isLoading && <Loader />}
      {errorMessage && !isLoading && (
        <ErrorMessage message="Факты не загрузились!" />
      )}
      {!errorMessage && !isLoading && (
        <ul
          className={['facts__list', openedFact !== -1 && 'facts__list_opened']
            .filter(Boolean)
            .join(' ')}
        >
          {doubledFacts.map(({ variant, text, num }, index) => (
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
      )}
    </Container>
  );
}

export default Facts;
