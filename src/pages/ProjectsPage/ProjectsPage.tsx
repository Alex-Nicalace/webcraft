import { useOutletContext } from 'react-router-dom';

import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useScroll } from '../../hooks/useScroll';
import Portfolio from '../../components/Portfolio';
import { OutletContextType } from '../../components/AppLayout';
import { TProjectsPageProps } from './ProjectsPage.types';
import './ProjectsPage.scss';

function ProjectsPage({ className }: TProjectsPageProps): JSX.Element {
  const { setWindowScrollState: onChangeStateFirstSection } =
    useOutletContext<OutletContextType>();
  const documentSize = useResizeObserver(document.documentElement);

  useScroll(undefined, {
    keepState: false,
    onScroll: ({ scrollY }) => {
      if (!documentSize?.height) return;

      if (scrollY > documentSize.height) {
        onChangeStateFirstSection('showBackToTop');
      } else if (scrollY > 100) {
        onChangeStateFirstSection('scrolled');
      } else {
        onChangeStateFirstSection('atTop');
      }
    },
  });

  return (
    <main
      className={['projects-page page', className].filter(Boolean).join(' ')}
    >
      <Portfolio className="projects-page__portfolio" isViewAll />
    </main>
  );
}

export default ProjectsPage;
