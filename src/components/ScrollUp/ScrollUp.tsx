import { TScrollUpProps } from './ScrollUp.types';
import './ScrollUp.scss';
import Icon from '../ui/Icon';

function ScrollUp({
  className,
  isNotAnimated = false,
  isRender,
}: TScrollUpProps) {
  if (!isRender) return null;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: isNotAnimated ? 'instant' : 'smooth',
    });
  }

  return (
    <button
      className={['scroll-up', className].filter(Boolean).join(' ')}
      onClick={scrollToTop}
      aria-label="Прокрутить вверх"
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
