import { useState } from 'react';
import Container from '../Container';
import './AboutMe.scss';
import { TAboutMeProps } from './AboutMe.types';
import PuzzleSvgPC from '../../assets/img/puzzles/puzzle-second-screen.svg?react';
import PuzzleSvgTablet from '../../assets/img/puzzles/puzzle-second-screen-tablet.svg?react';
import PuzzleSvgMobile from '../../assets/img/puzzles/puzzle-second-screen-mobile.svg?react';
import PuzzleSvgMobileSm from '../../assets/img/puzzles/puzzle-second-screen-mobile-sm.svg?react';
import Button from '../ui/Button';
import { paragraphsByScreenSize } from './AboutMe.text';
import { useScreenWidth } from '../../Context/ScreenWidthContext';
import ButtonSlider from '../ui/ButtonSlider';
import { CODE } from './codeDecor';

function AboutMe({ className, ...props }: TAboutMeProps): JSX.Element {
  const { isLessPC, isLessTablet, isLessMobile, isLessMobileSmall } =
    useScreenWidth();
  const [slideIndex, setSlideIndex] = useState(0);

  const devices = Object.keys(
    paragraphsByScreenSize
  ) as (keyof typeof paragraphsByScreenSize)[];
  const deviceIndex =
    Number(isLessPC) +
    Number(isLessTablet) +
    Number(isLessMobile) +
    Number(isLessMobileSmall);
  const typeDevice = devices[deviceIndex];
  const grupedParagraphs = paragraphsByScreenSize[typeDevice];
  const grupedParagraphsModified = grupedParagraphs.map((item) =>
    Array.isArray(item) ? item : [item]
  );
  const useSlider = ['mobileSmall', 'mobileUltraSmall'].includes(typeDevice);
  const quantitySlides = grupedParagraphsModified.length;
  const code = !isLessMobile ? CODE : CODE.slice(1, 4);

  function handleChangeSlide(index: number) {
    if (index < 0 || index > quantitySlides - 1) return;
    setSlideIndex(index);
  }

  return (
    <Container
      tag="section"
      className={['about-me decor-blured decor-blured_2', className].join(' ')}
      {...props}
    >
      <div className="about-me__wrapper">
        <h2 className="about-me__heading heading">Обо мне</h2>
        <div className="about-me__box">
          <div
            className={`${useSlider ? 'about-me__slider' : 'about-me__content'} text-typing`}
          >
            {grupedParagraphsModified.map((paragraphs, index) => (
              <div
                key={index}
                className={`${
                  useSlider
                    ? [
                        'about-me__slide',
                        index < slideIndex && 'about-me__slide_prev',
                        index === slideIndex && 'about-me__slide_active',
                      ]
                        .filter(Boolean)
                        .join(' ')
                    : 'about-me__item-text'
                }`}
              >
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="about-me__box-button">
            <Button
              href="#portfolio"
              className="about-me__button"
              variant="button-secondary"
            >
              Смотреть портфолио
            </Button>
          </div>
        </div>
        <div className="about-me__decor">
          {code.map((code, i) => (
            <pre
              key={i}
              className={`about-me__code about-me__code_${i + 1} text-typing`}
            >
              <code>{code}</code>
            </pre>
          ))}
        </div>
      </div>
      {useSlider && (
        <div className="about-me__slider-buttons">
          <ButtonSlider
            direction="left"
            onClick={() => handleChangeSlide(slideIndex - 1)}
            disabled={slideIndex === 0}
          />
          <ButtonSlider
            direction="right"
            onClick={() => handleChangeSlide(slideIndex + 1)}
            disabled={slideIndex === quantitySlides - 1}
          />
        </div>
      )}
      {typeDevice === 'pc' && <PuzzleSvgPC className="clip-path" />}
      {typeDevice === 'tablet' && <PuzzleSvgTablet className="clip-path" />}
      {['mobile', 'mobileSmall'].includes(typeDevice) && (
        <PuzzleSvgMobile className="clip-path" />
      )}
      {typeDevice === 'mobileUltraSmall' && (
        <PuzzleSvgMobileSm className="clip-path" />
      )}
    </Container>
  );
}

export default AboutMe;
