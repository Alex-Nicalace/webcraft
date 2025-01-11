import { pluralize } from '../../utils';
import Container from '../Container';
import Puzzle from '../ui/Puzzle';
import { FACTS } from './Facts.config';
import { TFactsProps } from './Facts.types';
import './Facts.scss';
import Dawn from '../ui/Dawn';

function Facts({ className, ...props }: TFactsProps): JSX.Element {
  const quantityFacts = FACTS.length;
  const facts = FACTS.map((item, index) => ({ ...item, num: ++index }));
  const factsDouble = facts.concat(facts);

  return (
    <Container
      tag="section"
      className={['facts', className].join(' ')}
      {...props}
    >
      <h2 className="facts__heading heading">
        {pluralize(quantityFacts, 'факт', 'факта', 'фактов')}
      </h2>
      <p className="facts__explain">
        зажмите любой из пазлов, удерживайте и читайте
      </p>
      <ul className="facts__list">
        {factsDouble.map(({ variant, text, num }, index) => (
          <li key={index} className="facts__item">
            <Puzzle
              className="facts__puzzle"
              variant={variant}
              text={text}
              isOpen={false}
              num={num}
            />
            <Dawn className="facts__dawn" />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Facts;
