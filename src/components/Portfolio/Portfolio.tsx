import Container from '../Container';
import ProjectList from '../ui/ProjectList';
import { PROJECTS } from './Portfolio.config';
import { TPortfolioProps } from './Portfolio.types';

function Portfolio({ className, ...props }: TPortfolioProps): JSX.Element {
  return (
    <Container
      tag="div"
      className={['portfolio', className].join(' ')}
      {...props}
    >
      <ProjectList className="portfolio__projects" data={PROJECTS} />
    </Container>
  );
}

export default Portfolio;
