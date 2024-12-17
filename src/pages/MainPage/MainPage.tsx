import Greeting from '../../components/Greeting';
import './MainPage.scss';

// type TMainPageProps = { }
function MainPage(/*{ }: TMainPageProps*/): JSX.Element {
  return (
    <main className="main-page">
      <Greeting className="main-page__greeting" />
    </main>
  );
}

export default MainPage;
