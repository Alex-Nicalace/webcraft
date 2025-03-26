import { useRef } from 'react';
import Icon from '../Icon';
import Picture from '../../Picture';
import Details from '../../../component-library/Details';
import { TProjectLinkProps } from './ProjectLink.types';
import './ProjectLink.scss';

function ProjectLink({
  className,
  children,
  popupData,
  isHover = true,
  stack,
  description,
  ...props
}: TProjectLinkProps): JSX.Element {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { title, imageUrl } = popupData || {};
  const stackString = stack?.join(', ');

  function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    if (e.target instanceof Element && e.target.closest('summary')) return;

    linkRef.current?.click();
  }

  return (
    <li
      className={['project-link', className].filter(Boolean).join(' ')}
      onClick={handleClick}
    >
      <a ref={linkRef} className="project-link__link" {...props}>
        <span className="project-link__wrap-text">
          <span className="project-link__text">{children}</span>
        </span>
      </a>
      <div className="project-link__icon">
        <Icon name="ArrowRight" width={32} height={32} />
        {isHover && popupData && (
          <div className="project-link__popup-wrapper">
            <figure className="project-link__popup">
              <Picture
                className="project-link__picture"
                {...imageUrl}
                imgProps={{
                  className: 'project-link__img',
                  alt: `Скриншот проекта - ${title}`,
                  width: 310,
                  height: 185,
                }}
              />
              {title && (
                <figcaption className="project-link__title text-typing">
                  {title}
                </figcaption>
              )}
            </figure>
          </div>
        )}
      </div>
      <div className="project-link__stack">
        <div className="project-link__stack-title project-link__label">
          Стек:
        </div>
        <div className="project-link__stack-list" title={stackString}>
          {stackString}
        </div>
      </div>
      <Details
        className="project-link__description"
        summaryProps={{
          className: 'project-link__description-title project-link__label',
        }}
        summaryNode={
          <>
            <span>Описание</span>
            <Icon name="ArrowDown" />
          </>
        }
        contentProps={{
          className: 'project-link__description-text',
        }}
        contentNode={description}
        unmountContentOnClose={false}
        disabled={!description}
        title={!description ? 'Нет описания' : undefined}
      />
    </li>
  );
}

export default ProjectLink;
