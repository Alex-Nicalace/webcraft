import './Puzzle.scss';
import SvgDekor from '../../../assets/img/puzzles/dekor.svg?react';
import { VARIANTS_PUZZLE } from './variantsPuzzleConfig';

type TPuzzleProps = {
  className?: string;
  variant: 3;
  text?: string;
  isOpen?: boolean;
};
function Puzzle({
  className,
  text,
  variant,
  isOpen,
}: TPuzzleProps): JSX.Element {
  const { bgImg, SvgMaskOuter, SvgMaskInner } = VARIANTS_PUZZLE[variant];

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
      <img
        className="puzzle__bg"
        src={bgImg}
        alt={`фон пазла №${variant} - абстракция`}
      />
      <div className="puzzle__content">
        <SvgDekor className="puzzle__dekor" />
        <div className="puzzle__text text-credo">{text}</div>
      </div>
      <SvgMaskOuter className="puzzle__mask" />
      <SvgMaskInner className="puzzle__mask" />
    </div>
  );
}

export default Puzzle;
