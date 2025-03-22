import ProjectLink from '../ProjectLink';
import { TProjectListProps } from './ProjectList.types';
import './ProjectList.scss';

function ProjectList({
  className,
  data,
  isHover = true,
  ...props
}: TProjectListProps): JSX.Element {
  return (
    <ol
      className={['project-list', className].filter(Boolean).join(' ')}
      {...props}
    >
      {data.map(({ url, title, ...otherProps }) => (
        <ProjectLink
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          isHover={isHover}
          title={title}
          {...otherProps}
        >
          {title}
        </ProjectLink>
      ))}
    </ol>
  );
}

export default ProjectList;
