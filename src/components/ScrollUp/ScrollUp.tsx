import './ScrollUp.scss';
import Icon from '../ui/Icon';
import { TScrollUpProps } from './ScrollUp.types';

function ScrollUp({
  className,
  isNotAnimated = false,
}: TScrollUpProps): JSX.Element {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: isNotAnimated ? 'instant' : 'smooth' });
  }

  return (
    <button
      className={['scroll-up', className].filter(Boolean).join(' ')}
      onClick={scrollToTop}
    >
      <Icon
        className="scroll-up__icon"
        name="ArrowRight"
        width={40}
        height={40}
        rotate={-90}
        strokeWidth={3}
      />
    </button>
  );
}

export default ScrollUp;
