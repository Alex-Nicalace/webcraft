import { useEffect, useState } from 'react';

export function useIntersectionObserver(
  target: Element | null | string | undefined,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(function manageScrolledState() {
    if (!target) return;
    const element =
      typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  });

  return isIntersecting;
}
