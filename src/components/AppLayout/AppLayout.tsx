import MainPage from '../../pages/MainPage';
import Footer from '../Footer';
import Header from '../Header';
import ScrollUp from '../ScrollUp';

// type TAppLayoutProps = { }
function AppLayout(/*{ }: TAppLayoutProps*/): JSX.Element {
  return (
    <>
      <Header />
      <MainPage />
      <Footer id="my-contacts" />
      <ScrollUp triggerSelector=".greeting" />
    </>
  );
}

export default AppLayout;
