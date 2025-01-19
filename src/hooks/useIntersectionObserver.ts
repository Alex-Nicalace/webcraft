import { RefObject, useEffect, useState } from 'react';

type UseIntersectionObserverOptions = IntersectionObserverInit & {
  once?: boolean;
};

export function useIntersectionObserver(
  target: RefObject<HTMLElement> | string | null | undefined,
  options?: UseIntersectionObserverOptions
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { once, ...rest } = options ?? {};
  const ignore = once && isIntersecting;

  useEffect(
    function manageStateIntersecting() {
      if (!target || ignore) return;

      const element =
        typeof target === 'string'
          ? document.querySelector(target)
          : target.current;

      if (!element) {
        console.warn('Target element not found for useIntersectionObserver.');
        return;
      }

      const callback: IntersectionObserverCallback = (entries, observer) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);

        if (once && entry.isIntersecting) {
          observer.unobserve(element);
        }
      };

      const observer = new IntersectionObserver(callback, rest);
      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    },
    [target, ignore, once, rest]
  );

  return isIntersecting;
}
