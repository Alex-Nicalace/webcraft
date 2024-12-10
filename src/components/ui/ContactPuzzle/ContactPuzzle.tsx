import { createElement } from 'react';
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
  const isContactDesigner = variant === 6;
  const classes = ['contact-puzzle', `contact-puzzle_${variant}`, className]
    .filter(Boolean)
    .join(' ');
  const tag = isContactDesigner ? 'span' : 'a';

  return createElement(
    tag,
    { className: classes, ...(!isContactDesigner && props) },
    <span className="contact-puzzle__content">
      {!isContactDesigner ? (
        <>
          <span className="contact-puzzle__text text-competencies">
            {children}
          </span>
          <Icon
            className="contact-puzzle__arrow"
            name="ArrowRight"
            width={32}
            height={32}
          />
        </>
      ) : (
        <a className="contact-puzzle__link text-typing" {...props}>
          {children}
        </a>
      )}
      <SvgMaskOuter className="contact-puzzle__mask" />
      <SvgMaskInner className="contact-puzzle__mask" />
    </span>
  );
}

export default ContactPuzzle;
