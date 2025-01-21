import { RefObject, useEffect, useState } from 'react';

type UseIntersectionObserverOptions = IntersectionObserverInit & {
  once?: boolean; // Отменить после первого пересечения
  cancelIfAbove?: boolean; // Отменить, если элемент выше вьюпорта на момент инициализации
};

type InitialPosition = 'above' | 'below' | 'inside';

export function useIntersectionObserver(
  target: RefObject<HTMLElement> | string | null | undefined,
  options?: UseIntersectionObserverOptions
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [initialPosition, setInitialPosition] = useState<InitialPosition>();
  const ignore = options?.once && isIntersecting;

  useEffect(
    function manageStateIntersecting() {
      if (!target || ignore) return;

      const { once, cancelIfAbove, ...rest } = options ?? {};

      const element =
        typeof target === 'string'
          ? document.querySelector(target)
          : target.current;

      if (!element) {
        console.warn('Target element not found for useIntersectionObserver.');
        return;
      }

      const targetRect = element.getBoundingClientRect();
      const viewportHeight = document.documentElement.clientHeight;

      const computedInitialPosition: InitialPosition =
        targetRect.top < 0
          ? 'above'
          : targetRect.bottom > viewportHeight
            ? 'below'
            : 'inside';

      setInitialPosition(
        (prevInitialPosition) => prevInitialPosition || computedInitialPosition
      );

      if (cancelIfAbove && computedInitialPosition === 'above') return;

      const callback: IntersectionObserverCallback = (entries, observer) => {
        // для 1-го наблюдаемого объекта может быть несколько записей,
        // если он пересекает несколько порогов за короткое время => буру последнюю запись
        const [entryLast] = entries.slice(-1);
        setIsIntersecting(entryLast.isIntersecting);

        if (once && entryLast.isIntersecting) {
          observer.unobserve(element);
          observer.disconnect();
        }
      };

      const observer = new IntersectionObserver(callback, rest);
      observer.observe(element);

      return () => {
        observer.unobserve(element);
        observer.disconnect();
      };
    },
    [target, options, ignore]
  );

  return { isIntersecting, initialPosition };
}
