import MainPage from '../../pages/MainPage';
import Footer from '../Footer';
import Header from '../Header';

// type TAppLayoutProps = { }
function AppLayout(/*{ }: TAppLayoutProps*/): JSX.Element {
  return (
    <>
      <Header />
      <MainPage />
      <Footer />
    </>
  );
}

export default AppLayout;
