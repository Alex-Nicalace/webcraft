import Container from '../Container';
import { TCompetenciesProps } from './Competencies.types';
import './Competencies.scss';

const COMPETENCIES = [
  'Javascript',
  'React JS',
  'Typescript',
  'html',
  'css',
  'scss',
];

function Competencies({ className }: TCompetenciesProps): JSX.Element {
  return (
    <Container tag="section" className={['competencies', className].join(' ')}>
      <h2 className="competencies__heading heading">Мои компетенции</h2>
      <ul className="competencies__list">
        {COMPETENCIES.map((item, index) => (
          <li key={index} className="competencies__item text-competencies">
            <div className="competencies__competence">{item}</div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Competencies;
