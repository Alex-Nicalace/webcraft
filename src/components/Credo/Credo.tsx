import { useRef, useState } from 'react';
import Container from '../Container';
import Puzzle from '../ui/Puzzle';
import { TCredoProps } from './Credo.types';
import './Credo.scss';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const CREDO_PUZZLE: { text: string; variant: 3 | 4 | 5 | 6 | 7 }[] = [
  { text: 'Каждая строчка кода,', variant: 3 },
  { text: 'как деталь пазла,', variant: 4 },
  { text: 'должна быть на своём месте,', variant: 5 },
  { text: 'чтобы получился', variant: 6 },
  { text: 'ожидаемый результат.', variant: 7 },
];

function Credo({ className, ...props }: TCredoProps): JSX.Element {
  const [completedAnimationPuzzles, setCompletedAnimationPuzzles] = useState<
    number[]
  >([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisibleWrapper = useIntersectionObserver(wrapperRef, {
    rootMargin: '0px 0px -60% 0px',
    once: true,
  });

  const hundleAnimationEnd = (index: number) => () => {
    setCompletedAnimationPuzzles((prev) => [...prev, index]);
  };

  function handleReplayAnimation() {
    const wrapperEl = wrapperRef.current;
    if (!wrapperEl) return;
    wrapperEl.classList.remove('credo__wrapper_animated');
    // Ждём следующего кадра, чтобы применить анимацию снова
    requestAnimationFrame(() => {
      wrapperEl.classList.add('credo__wrapper_animated');
    });
    setCompletedAnimationPuzzles([]);
  }

  return (
    <Container
      tag="div"
      className={['credo decor-blured decor-blured_3', className].join(' ')}
      onDoubleClick={handleReplayAnimation}
      {...props}
    >
      <div
        ref={wrapperRef}
        className={[
          'credo__wrapper credo__wrapper_animated',
          !isVisibleWrapper && 'credo__wrapper_animated_paused',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {CREDO_PUZZLE.map(({ text, variant }, index) => (
          <Puzzle
            key={index}
            variant={variant}
            text={text}
            isOpen={completedAnimationPuzzles.includes(index)}
            onAnimationEnd={
              completedAnimationPuzzles.includes(index)
                ? undefined
                : hundleAnimationEnd(index)
            }
          />
        ))}
      </div>
    </Container>
  );
}

export default Credo;
