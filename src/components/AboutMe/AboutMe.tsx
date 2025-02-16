import { useState } from 'react';

import Container from '../Container';
import Button from '../ui/Button';
import ButtonSlider from '../ui/ButtonSlider';

import { useDevice } from '../../Context/DeviceContext';
import { useRefs } from '../../hooks/useRefs';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useFetch } from '../../hooks/useFetch';

import { TAboutMeProps } from './AboutMe.types';
import {
  TResponsedData,
  TParagraphsByScreenSize,
  TDevice,
} from './AboutMe.types';

import { CODE } from './codeDecor';
import { ResponsedDataManager } from './ResponsedDataManager';

import PuzzleSvgPC from '../../assets/img/puzzles/puzzle-second-screen.svg?react';
import PuzzleSvgTablet from '../../assets/img/puzzles/puzzle-second-screen-tablet.svg?react';
import PuzzleSvgMobile from '../../assets/img/puzzles/puzzle-second-screen-mobile.svg?react';
import PuzzleSvgMobileSm from '../../assets/img/puzzles/puzzle-second-screen-mobile-sm.svg?react';

import './AboutMe.scss';

const DEVISES: TDevice[] = [
  'pc',
  'tablet',
  'mobile',
  'mobileSmall',
  'mobileUltraSmall',
];

function transformResponseDataFn(data: unknown) {
  const aboutMeData = data as TResponsedData;
  return new ResponsedDataManager(aboutMeData.hunks).getParagraphsByScreenSize(
    aboutMeData.paragraphsByScreenSize
  );
}

function AboutMe({ className, ...props }: TAboutMeProps) {
  const [{ responseData: paragraphsByScreenSize }] =
    useFetch<TParagraphsByScreenSize>('/data/about-me.json', {
      transformResponseDataFn,
    });

  const { isLessPC, isLessTablet, isLessMobile, isLessMobileSmall } =
    useDevice();
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesRef, setSlidesRef] = useRefs<HTMLDivElement>();

  const deviceIndex =
    Number(isLessPC) +
    Number(isLessTablet) +
    Number(isLessMobile) +
    Number(isLessMobileSmall);
  const typeDevice = DEVISES[deviceIndex];

  const grupedParagraphs = paragraphsByScreenSize
    ? paragraphsByScreenSize[typeDevice]
    : [];
  const grupedParagraphsModified = grupedParagraphs.map((item) =>
    Array.isArray(item) ? item : [item]
  );
  const isUseSlider = ['mobileSmall', 'mobileUltraSmall'].includes(typeDevice);
  const sizeSlides = useResizeObserver(isUseSlider ? slidesRef.current : null);

  const maxHeightSlide = Math.max(
    ...sizeSlides.map((sizeSlide) => sizeSlide?.height ?? 0)
  );
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
            className={`${isUseSlider ? 'about-me__slider' : 'about-me__content'}`}
            style={{ height: isUseSlider ? `${maxHeightSlide}px` : '' }}
          >
            {grupedParagraphsModified.map((paragraphs, index) => (
              <div
                key={index}
                ref={(node) => setSlidesRef(index, node)}
                className={`${
                  isUseSlider
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
      {isUseSlider && (
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
