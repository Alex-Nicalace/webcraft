import { useEffect, useState } from 'react';
import { TScrollUpProps } from './ScrollUp.types';
import './ScrollUp.scss';
import Icon from '../ui/Icon';

function ScrollUp({
  className,
  isNotAnimated = false,
  triggerSelector,
}: TScrollUpProps) {
  const [isNotRender, setIsNotRender] = useState(false);

  useEffect(
    function observeTriggerElem() {
      if (!triggerSelector) return;

      const elem = document.querySelector(triggerSelector);
      if (!elem) return;

      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsNotRender(entry.isIntersecting);
        });
      };

      const observer = new IntersectionObserver(callback);
      observer.observe(elem);

      return () => {
        if (elem) observer.unobserve(elem);
      };
    },
    [triggerSelector]
  );

  if (isNotRender) return null;

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
