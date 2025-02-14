import ProjectLink from '../ProjectLink';
import './ProjectList.scss';
import { TProjectListProps } from './ProjectList.types';

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
      {data.map(({ url, title, popupData }) => (
        <ProjectLink
          key={url}
          href={url}
          popupData={popupData}
          target="_blank"
          rel="noopener noreferrer"
          isHover={isHover}
        >
          {title}
        </ProjectLink>
      ))}
    </ol>
  );
}

export default ProjectList;
