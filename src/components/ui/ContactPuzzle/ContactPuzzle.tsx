import Icon from '../Icon';
import './ContactPuzzle.scss';
import { TContactPuzzleProps } from './ContactPuzzle.types';
import { VARIANTS_PUZZLE } from './variantsPuzzleConfig';

function ContactPuzzle({
  className,
  variant,
  children,
  ...props
}: TContactPuzzleProps): JSX.Element {
  const { SvgMaskOuter, SvgMaskInner } = VARIANTS_PUZZLE[variant];

  return (
    <a
      className={['contact-puzzle', `contact-puzzle_${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="contact-puzzle__content">
        <span className="contact-puzzle__text text-competencies">
          {children}
        </span>
        <Icon
          className="contact-puzzle__arrow"
          name="ArrowRight"
          width={32}
          height={32}
        />
      </span>
      <SvgMaskOuter className="contact-puzzle__mask" />
      <SvgMaskInner className="contact-puzzle__mask" />
    </a>
  );
}

export default ContactPuzzle;
