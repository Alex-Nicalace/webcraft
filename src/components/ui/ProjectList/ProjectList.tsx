import ProjectLink from '../ProjectLink';
import './ProjectList.scss';
import { TProjectListProps } from './ProjectList.types';

function ProjectList({ className, data }: TProjectListProps): JSX.Element {
  return (
    <ol className={['project-list', className].filter(Boolean).join(' ')}>
      {data.map(({ url, title, popupData }) => (
        <ProjectLink key={url} href={url} popupData={popupData}>
          {title}
        </ProjectLink>
      ))}
    </ol>
  );
}

export default ProjectList;
