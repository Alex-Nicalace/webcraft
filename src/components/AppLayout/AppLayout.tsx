import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import MainPage from '../../pages/MainPage';
import Footer from '../Footer';
import Header from '../Header';
import ScrollUp from '../ScrollUp';

const INTERSECTION_OPTIONS = {
  rootMargin: '-120px 0px 0px 0px',
};

function AppLayout(): JSX.Element {
  const { isIntersecting: isVisibleFirstScreen } = useIntersectionObserver(
    '.greeting-spacer',
    INTERSECTION_OPTIONS
  );

  return (
    <>
      <Header isUseBlurBg={!isVisibleFirstScreen} />
      <MainPage isVisableFirstSection={isVisibleFirstScreen} />
      <Footer id="my-contacts" />
      <ScrollUp isRender={!isVisibleFirstScreen} />
    </>
  );
}

export default AppLayout;
