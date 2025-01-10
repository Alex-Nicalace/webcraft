import AboutMe from '../../components/AboutMe';
import Competencies from '../../components/Competencies';
import Credo from '../../components/Credo/Credo';
import Greeting from '../../components/Greeting';
import Portfolio from '../../components/Portfolio';
import './MainPage.scss';

// type TMainPageProps = { }
function MainPage(/*{ }: TMainPageProps*/): JSX.Element {
  return (
    <main className="main-page">
      <Greeting className="main-page__greeting" />
      <AboutMe className="main-page__about-me" />
      <Competencies className="main-page__competencies" />
      <Credo className="main-page__credo" />
      <Portfolio className="main-page__portfolio" />
    </main>
  );
}

export default MainPage;
