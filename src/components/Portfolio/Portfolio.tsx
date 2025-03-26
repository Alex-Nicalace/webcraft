import Container from '../Container';
import Button from '../ui/Button';
import ProjectList, { TProjectListProps } from '../ui/ProjectList';
import { TPortfolioProps } from './Portfolio.types';
import './Portfolio.scss';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../ui/Loader';
import ErrorMessage from '../ErrorMessage';
import { useDevice } from '../../Context/DeviceContext';

function Portfolio({ className, ...props }: TPortfolioProps): JSX.Element {
  const [{ responseData: projects, isLoading, errorMessage }] = useFetch<
    TProjectListProps['data']
  >('/data/projects.json');
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
      <Button
        className="portfolio__contact-me"
        to="/projects"
        variant="button-secondary"
      >
        Смотреть все
      </Button>
    </Container>
  );
}

export default Portfolio;
