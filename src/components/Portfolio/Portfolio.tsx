import { useFetch } from '../../hooks/useFetch';
import { useDevice } from '../../Context/DeviceContext';

import Button from '../ui/Button';
import Container from '../Container';
import ErrorMessage from '../ErrorMessage';
import Loader from '../ui/Loader';
import ProjectList, { TProjectListProps } from '../ui/ProjectList';

import { TPortfolioProps } from './Portfolio.types';
import './Portfolio.scss';

const DATA_URL = '/data/projects.json';
const DATA_URL_ALL = '/data/projects-all.json';

function Portfolio({
  className,
  isViewAll,
  ...props
}: TPortfolioProps): JSX.Element {
  const url = isViewAll ? DATA_URL_ALL : DATA_URL;
  const [{ responseData: projects, isLoading, errorMessage }] =
    useFetch<TProjectListProps['data']>(url);
  const { isPointer, isLessPC } = useDevice();
  const isHover = !isLessPC && isPointer;

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
