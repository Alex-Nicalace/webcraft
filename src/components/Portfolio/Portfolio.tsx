import { useEffect } from 'react';
import { useDevice } from '../../Context/DeviceContext';
import { useApi } from '../../hooks/useApi';
import { getProjects } from '../../service';

import Button from '../ui/Button';
import Container from '../Container';
import ErrorMessage from '../ErrorMessage';
import Loader from '../ui/Loader';
import ProjectList from '../ui/ProjectList';

import { TPortfolioProps } from './Portfolio.types';
import './Portfolio.scss';

function Portfolio({
  className,
  isViewAll,
  ...props
}: TPortfolioProps): JSX.Element {
  const [{ data: projects, isLoading, errorMessage }, fetchData] =
    useApi(getProjects);
  const { isPointer, isLessPC } = useDevice();
  const isHover = !isLessPC && isPointer;

  useEffect(
    function load() {
      const controller = new AbortController();
      fetchData(isViewAll || false)({ signal: controller.signal });
      return () => controller.abort();
    },
    [fetchData, isViewAll]
  );

  return (
    <Container
      tag="section"
      className={['portfolio decor-blured decor-blured_4', className].join(' ')}
      {...props}
    >
      <h2 className="portfolio__heading">Портфолио</h2>
      {isLoading && <Loader />}
      {errorMessage && !isLoading && (
        <ErrorMessage message="Проекты не загрузились" />
      )}

      {!errorMessage && !isLoading && (
        <ProjectList
          className="portfolio__projects"
          data={projects || []}
          isHover={isHover}
        />
      )}

      {!isViewAll && (
        <Button
          className="portfolio__contact-me"
          to="/projects"
          variant="button-secondary"
        >
          Смотреть все
        </Button>
      )}
    </Container>
  );
}

export default Portfolio;
