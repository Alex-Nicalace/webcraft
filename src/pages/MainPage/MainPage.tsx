import AboutMe from '../../components/AboutMe';
import Competencies from '../../components/Competencies';
import Credo from '../../components/Credo/Credo';
import Facts from '../../components/Facts';
import Greeting from '../../components/Greeting';
import Portfolio from '../../components/Portfolio';
import './MainPage.scss';
import { TMainPageProps } from './MainPage.types';

function MainPage({
  className,
  isVisableFirstSection = true,
  ...props
}: TMainPageProps): JSX.Element {
  return (
    <main
      className={['main-page', className].filter(Boolean).join(' ')}
      {...props}
    >
      <Greeting
        className={[
          'main-page__greeting',
          !isVisableFirstSection && 'main-page__greeting_hide',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <div className="main-page__box">
        <AboutMe className="main-page__about-me" id="about-me" />
        <Competencies className="main-page__competencies" />
        <Credo className="main-page__credo" />
        <Portfolio className="main-page__portfolio" id="portfolio" />
        <Facts className="main-page__facts" id="facts" />
      </div>
    </main>
  );
}

export default MainPage;
