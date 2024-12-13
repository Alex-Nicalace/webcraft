import './BurgerButton.scss';
import { TBurgerButtonProps } from './BurgerButton.types';

function BurgerButton({
  className,
  pressed,
  ...props
}: TBurgerButtonProps): JSX.Element {
  return (
    <button
      className={['burger', pressed && 'burger_pressed', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="burger__icon">
        <span></span>
      </span>
    </button>
  );
}

export default BurgerButton;
