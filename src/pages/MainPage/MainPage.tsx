import AboutMe from '../../components/AboutMe';
import Competencies from '../../components/Competencies';
import Greeting from '../../components/Greeting';
import './MainPage.scss';

// type TMainPageProps = { }
function MainPage(/*{ }: TMainPageProps*/): JSX.Element {
  return (
    <main className="main-page">
      <Greeting className="main-page__greeting" />
      <AboutMe className="main-page__about-me" />
      <Competencies className="main-page__competencies" />
    </main>
  );
}

export default MainPage;
