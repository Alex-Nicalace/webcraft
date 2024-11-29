import Icon from '../Icon';
import './ProjectLink.scss';
import { TProjectLinkProps } from './ProjectLink.types';

function ProjectLink({
  className,
  children,
  ...props
}: TProjectLinkProps): JSX.Element {
  return (
    <a
      className={['project-link', className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="project-link__text text-portfolio">{children}</span>
      <span className="project-link__icon">
        <Icon name="ArrowRight" width={32} height={32} />
      </span>
    </a>
  );
}

export default ProjectLink;
