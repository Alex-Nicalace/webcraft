import AboutMe from '../../components/AboutMe';
import Greeting from '../../components/Greeting';
import './MainPage.scss';

// type TMainPageProps = { }
function MainPage(/*{ }: TMainPageProps*/): JSX.Element {
  return (
    <main className="main-page">
      <Greeting className="main-page__greeting" />
      <AboutMe className="main-page__about-me" />
    </main>
  );
}

export default MainPage;
