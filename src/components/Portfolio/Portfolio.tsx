import Container from '../Container';
import Button from '../ui/Button';
import ProjectList from '../ui/ProjectList';
import { PROJECTS } from './Portfolio.config';
import { TPortfolioProps } from './Portfolio.types';
import './Portfolio.scss';

function Portfolio({ className, ...props }: TPortfolioProps): JSX.Element {
  return (
    <Container
      tag="section"
      className={['portfolio decor-blured decor-blured_4', className].join(' ')}
      {...props}
    >
      <h2 className="portfolio__heading">Портфолио</h2>
      <ProjectList className="portfolio__projects" data={PROJECTS} />
      <Button className="portfolio__contact-me" href="#my-contacts">
        Связаться со мной
      </Button>
    </Container>
  );
}

export default Portfolio;
