import Icon from '../Icon';
import './ContactPuzzle.scss';
import { TContactPuzzleProps } from './ContactPuzzle.types';
import SvgMaskOuter from '../../../assets/img/puzzles/puzzle-footer-inner-1.svg?react';
import SvgMaskInner from '../../../assets/img/puzzles/puzzle-footer-outer-1.svg?react';

function ContactPuzzle({
  className,
  variant,
  children,
  ...props
}: TContactPuzzleProps): JSX.Element {
  return (
    <a
      className={['contact-puzzle', `contact-puzzle_${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="contact-puzzle__text text-competencies">{children}</span>
      <Icon
        className="contact-puzzle__arrow"
        name="ArrowRight"
        width={32}
        height={32}
      />
      <SvgMaskOuter className="contact-puzzle__mask" />
      <SvgMaskInner className="contact-puzzle__mask" />
    </a>
  );
}

export default ContactPuzzle;
