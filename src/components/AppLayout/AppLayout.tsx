import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import MainPage from '../../pages/MainPage';
import Footer from '../Footer';
import Header from '../Header';
import ScrollUp from '../ScrollUp';

function AppLayout(): JSX.Element {
  const isVisibleFirstScreen = useIntersectionObserver('.greeting-spacer', {
    rootMargin: '-120px 0px 0px 0px',
  });

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
