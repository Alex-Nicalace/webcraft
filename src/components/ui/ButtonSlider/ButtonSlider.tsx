import './ButtonSlider.scss';
import Icon from '../Icon';
import { TButtonSliderProps } from './ButtonSlider.types';

function ButtonSlider({
  className,
  direction,
  ...props
}: TButtonSliderProps): JSX.Element {
  return (
    <button
      className={[
        'button-slider',
        className,
        direction === 'left' && 'button-slider_left',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Icon
        className="button-slider__icon"
        name="ArrowRight"
        width={32}
        height={32}
      />
    </button>
  );
}

export default ButtonSlider;
