import Container from '../Container';
import Button from '../ui/Button';
import ProjectList from '../ui/ProjectList';
import { PROJECTS } from './Portfolio.config';
import { TPortfolioProps } from './Portfolio.types';
import './Portfolio.scss';

function Portfolio({ className, ...props }: TPortfolioProps): JSX.Element {
  return (
    <Container
      tag="div"
      className={['portfolio', className].join(' ')}
      {...props}
    >
      <ProjectList className="portfolio__projects" data={PROJECTS} />
      <Button className="portfolio__contact-me" href="#my-contacts">
        Связаться со мной
      </Button>
    </Container>
  );
}

export default Portfolio;
