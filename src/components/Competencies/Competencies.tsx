import { useFetch } from '../../hooks/useFetch';
import { TCompetenciesProps } from './Competencies.types';
import Container from '../Container';
import Loader from '../ui/Loader';
import ErrorMessage from '../ErrorMessage';
import './Competencies.scss';

function Competencies({
  className,
  ...props
}: TCompetenciesProps): JSX.Element {
  const [{ responseData: competencies, isLoading, errorMessage }] = useFetch<
    string[]
  >('/data/competencies.json');

  return (
    <Container
      tag="section"
      className={['competencies', className].join(' ')}
      {...props}
    >
      <h2 className="competencies__heading heading">Мои компетенции</h2>
      {isLoading && <Loader />}
      {errorMessage && !isLoading && (
        <ErrorMessage message="Компетенции не загрузились" />
      )}
      {!errorMessage && !isLoading && (
        <ul className="competencies__list">
          {(competencies ?? []).map((item, index) => (
            <li key={index} className="competencies__item text-competencies">
              <div className="competencies__competence">{item}</div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default Competencies;
