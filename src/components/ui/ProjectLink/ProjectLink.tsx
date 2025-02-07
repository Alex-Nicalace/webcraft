import './ProjectLink.scss';
import Icon from '../Icon';
import { TProjectLinkProps } from './ProjectLink.types';
import Picture from '../../Picture';

function ProjectLink({
  className,
  children,
  popupData,
  ...props
}: TProjectLinkProps): JSX.Element {
  const { title, imageUrl } = popupData || {};

  return (
    <li className={['project-link', className].filter(Boolean).join(' ')}>
      <a className="project-link__link" {...props}>
        <span className="project-link__text text-portfolio">{children}</span>
        <span className="project-link__icon">
          <Icon name="ArrowRight" width={32} height={32} />
        </span>
      </a>
      {popupData && (
        <div className="project-link__popup-wrapper">
          <figure className="project-link__popup">
            <Picture
              className="project-link__project-img"
              {...imageUrl}
              alt={`Скриншот проекта - ${title}`}
              width={310}
              height={185}
            />
            {title && (
              <figcaption className="project-link__title text-typing">
                {title}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </li>
  );
}

export default ProjectLink;
