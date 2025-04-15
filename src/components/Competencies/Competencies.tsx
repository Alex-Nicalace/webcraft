import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { getCompetencies } from '../../service';
import Container from '../Container';
import Loader from '../ui/Loader';
import ErrorMessage from '../ErrorMessage';
import { TCompetenciesProps } from './Competencies.types';
import './Competencies.scss';

function Competencies({
  className,
  ...props
}: TCompetenciesProps): JSX.Element {
  const [{ data: competencies, isLoading, errorMessage }, fetchData] =
    useApi(getCompetencies);

  useEffect(
    function load() {
      const controller = new AbortController();
      fetchData()({ signal: controller.signal });
      return () => controller.abort();
    },
    [fetchData]
  );

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
