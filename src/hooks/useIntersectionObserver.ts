import { RefObject, useEffect, useState } from 'react';

type UseIntersectionObserverOptions = IntersectionObserverInit & {
  once?: boolean; // Отменить после первого пересечения
  cancelIfAbove?: boolean; // Отменить, если элемент выше вьюпорта на момент инициализации
  onIntersecting?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
};

type InitialPosition = 'above' | 'below' | 'inside';

/**
 * Hook React, возвращающий информацию о пересечении viewport и HTML-элемента.
 * @param target - Ссылка на HTML-элемент или CSS-селектор к нему.
 * @param options - Опции IntersectionObserver.
 * @returns Объект, содержащий значения:
 *  - isIntersecting: boolean - флаг, указывающий, находится ли элемент в зоне видимости.
 *  - initialPosition: 'above' | 'below' | 'inside' - изначальное положение элемента
 *    относительно viewport.
 */
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

      const { once, cancelIfAbove, onIntersecting, ...rest } = options ?? {};

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
        onIntersecting?.(entryLast, observer);

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
