import Container from '../Container';
import Button from '../ui/Button';
import ProjectList, { TProjectListProps } from '../ui/ProjectList';
import { TPortfolioProps } from './Portfolio.types';
import './Portfolio.scss';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';

function Portfolio({ className, ...props }: TPortfolioProps): JSX.Element {
  const [{ responseData: projects, isLoading, errorMessage }] = useFetch<
    TProjectListProps['data']
  >('/assets/projects/projects.json');

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
        <ProjectList className="portfolio__projects" data={projects || []} />
      )}
      <Button className="portfolio__contact-me" href="#my-contacts">
        Связаться со мной
      </Button>
    </Container>
  );
}

export default Portfolio;
