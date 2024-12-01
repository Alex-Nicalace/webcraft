import './ProjectList.scss';
import { TProjectListProps } from './ProjectList.types';

function ProjectList({ className, children }: TProjectListProps): JSX.Element {
  return (
    <ol className={['project-list', className].filter(Boolean).join(' ')}>
      {children}
    </ol>
  );
}

export default ProjectList;
