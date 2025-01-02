import Container from '../Container';
import './AboutMe.scss';
import { TAboutMeProps } from './AboutMe.types';
import PuzzleSvgPC from '../../assets/img/puzzles/puzzle-second-screen.svg?react';
import PuzzleSvgTablet from '../../assets/img/puzzles/puzzle-second-screen-tablet.svg?react';
import Button from '../ui/Button';
import { paragraphsByScreenSize } from './AboutMe.text';
import { useScreenWidth } from '../../Context/ScreenWidthContext';

function AboutMe({ className }: TAboutMeProps): JSX.Element {
  const { isLessPC } = useScreenWidth();
  const devices = Object.keys(
    paragraphsByScreenSize
  ) as (keyof typeof paragraphsByScreenSize)[];
  const deviceIndex = Number(isLessPC);
  const grupedParagraphs = paragraphsByScreenSize[devices[deviceIndex]];
  const grupedParagraphsModified = grupedParagraphs.map((item) =>
    Array.isArray(item) ? item : [item]
  );

  return (
    <Container tag="section" className={['about-me', className].join(' ')}>
      <div className="about-me__wrapper">
        <h2 className="about-me__heading heading">Обо мне</h2>
        <div className="about-me__box">
          <div className="about-me__content text-typing">
            {grupedParagraphsModified.map((paragraphs, index) => (
              <div key={index} className="about-me__item-text">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="about-me__box-button">
            <Button className="about-me__button" variant="button-secondary">
              Смотреть портфолио
            </Button>
          </div>
        </div>
      </div>
      {deviceIndex === 0 && <PuzzleSvgPC className="clip-path" />}
      {deviceIndex === 1 && <PuzzleSvgTablet className="clip-path" />}
    </Container>
  );
}

export default AboutMe;
