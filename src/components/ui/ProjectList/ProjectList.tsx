import ProjectLink from '../ProjectLink';
import './ProjectList.scss';
import { TProjectListProps } from './ProjectList.types';

function ProjectList({
  className,
  data,
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
        >
          {title}
        </ProjectLink>
      ))}
    </ol>
  );
}

export default ProjectList;
