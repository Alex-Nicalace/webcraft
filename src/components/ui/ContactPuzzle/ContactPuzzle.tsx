import { createElement } from 'react';
import Icon from '../Icon';
import './ContactPuzzle.scss';
import { TContactPuzzleProps } from './ContactPuzzle.types';
import { VARIANTS_PUZZLE } from './variantsPuzzleConfig';
import { VARIANTS_PUZZLE_SINGLEROW } from './variantsPuzzleSingleRowConfig';

function ContactPuzzle({
  className,
  variant,
  children,
  isSingleRow,
  isNotUseClipContainer,
  ...props
}: TContactPuzzleProps): JSX.Element {
  const variantsPuzzle = isSingleRow
    ? VARIANTS_PUZZLE_SINGLEROW
    : VARIANTS_PUZZLE;
  const { SvgMaskOuter, SvgMaskInner } = variantsPuzzle[variant];
  const isContactDesigner = variant === 6;
  const classes = [
    'contact-puzzle',
    `contact-puzzle_${isSingleRow ? 'single-row_' : ''}${variant}`,
    isNotUseClipContainer && 'contact-puzzle_not-clip',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const tag = isContactDesigner ? 'span' : 'a';

  return (
    <span className={classes}>
      {createElement(
        tag,
        {
          className: 'contact-puzzle__puzzle',
          ...(!isContactDesigner && props),
        },
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
          <SvgMaskOuter className="clip-path" />
          <SvgMaskInner className="clip-path" />
        </span>
      )}
    </span>
  );
}

export default ContactPuzzle;
