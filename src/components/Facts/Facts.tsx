import { Fragment, useState } from 'react';

import { useFetch } from '../../hooks/useFetch';
import { pluralize } from '../../utils';

import Container from '../Container';
import Dawn from '../ui/Dawn';
import ErrorMessage from '../ui/ErrorMessage';
import Loader from '../ui/Loader';
import Puzzle from '../ui/Puzzle';

import { TFact, TFactsProps } from './Facts.types';
import './Facts.scss';

const ALIGNED_TO_BOTTOM_IDS = new Set([9, 10]);

function Facts({ className, ...props }: TFactsProps): JSX.Element {
  const [{ responseData: facts, isLoading, errorMessage }] =
    useFetch<TFact[]>('/data/facts.json');
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
        <div
          className={['facts__list', openedFact !== -1 && 'facts__list_opened']
            .filter(Boolean)
            .join(' ')}
        >
          {doubledFacts.map(({ variant, text, num }, index) => (
            <Fragment key={index}>
              <Puzzle
                className={[
                  'facts__item',
                  ALIGNED_TO_BOTTOM_IDS.has(num) && 'facts__item_bottom',
                ]
                  .filter(Boolean)
                  .join(' ')}
                variant={variant}
                text={text}
                isOpen={openedFact === index}
                num={num}
                onPointerDown={handlePointerDownPuzzle(index)}
                onPointerUp={handlePointerUpPuzzle(index)}
                onLostPointerCapture={handlePointerUpPuzzle(index)}
              />
              <Dawn className="facts__dawn" stopAnimation={openedFact > -1} />
            </Fragment>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Facts;
