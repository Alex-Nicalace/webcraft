import { Link } from 'react-router-dom';
import { TButtonProps } from './Button.types';
import Icon from '../Icon';
import './Button.scss';

function Button({ className, variant, ...props }: TButtonProps): JSX.Element {
  const classes = [
    className,
    variant === 'menu-item' && 'menu-item text-menu-item',
    variant !== 'menu-item' && 'button text-button',
    variant === 'button-secondary' && 'button_secondary',
  ]
    .filter(Boolean)
    .join(' ');
  const isButtonVariant = variant !== 'menu-item';
  const children = isButtonVariant ? (
    <span className="button__wrapper">
      <span className="button__dot"></span>
      <span className="button__text">{props.children}</span>
      <Icon
        className="button__arrow"
        height={24}
        width={24}
        name="ArrowRight"
      />
    </span>
  ) : (
    props.children
  );

  if (props.to !== undefined) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
