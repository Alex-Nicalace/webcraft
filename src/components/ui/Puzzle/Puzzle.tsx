import './Puzzle.scss';
import SvgDekor from '../../../assets/img/puzzles/dekor.svg?react';
import { VARIANTS_PUZZLE } from './variantsPuzzleConfig';
import { TPuzzleProps } from './Puzzle.types';
import Icon from '../Icon';

function Puzzle({
  className,
  text,
  variant,
  isOpen,
}: TPuzzleProps): JSX.Element {
  const { SvgMaskOuter, SvgMaskInner } = VARIANTS_PUZZLE[variant];
  const isPuzzleCredo =
    typeof variant === 'number' && variant >= 3 && variant <= 7;
  const isPuzzleFact = typeof variant === 'string' && variant.includes('fact');

  return (
    <div
      className={[
        'puzzle',
        `puzzle_${variant}`,
        isOpen && 'puzzle_opened',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="puzzle__content">
        {!isPuzzleFact && <SvgDekor className="puzzle__dekor" />}
        <div
          className={[
            'puzzle__text',
            isPuzzleCredo && 'text-credo',
            isPuzzleFact && 'text-typing',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {isPuzzleFact && (
            <Icon
              className="puzzle__icon-text"
              name="Dawn"
              width={18}
              height={18}
            />
          )}
          {isPuzzleCredo && text}
          {isPuzzleFact && <span>{text}</span>}
        </div>
      </div>
      <SvgMaskOuter className="clip-path" />
      <SvgMaskInner className="clip-path" />
    </div>
  );
}

export default Puzzle;
