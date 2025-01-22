import { TButtonlUpProps } from './ButtonUp.types';
import './ButtonUp.scss';
import Icon from '../Icon';

function ButtonUp({ className, ...props }: TButtonlUpProps) {
  return (
    <button
      className={['button-up', className].filter(Boolean).join(' ')}
      {...props}
    >
      <Icon
        className="button-up__icon"
        name="ArrowRight"
        width={40}
        height={40}
        rotate={-90}
        strokeWidth={3}
      />
    </button>
  );
}

export default ButtonUp;
