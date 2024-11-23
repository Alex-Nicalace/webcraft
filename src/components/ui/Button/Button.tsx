import { TButtonProps } from './Button.types';
import './Button.scss';

function Button({ className, variant, ...props }: TButtonProps): JSX.Element {
  const classes = [className, variant ? `${variant} text-menu-item` : 'button']
    .filter(Boolean)
    .join(' ');

  if (props.href !== undefined) {
    return (
      <a className={classes} {...props}>
        {props.children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
