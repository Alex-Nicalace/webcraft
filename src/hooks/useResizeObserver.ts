import { useEffect, useState } from 'react';

type TSize = {
  contentWidth: number;
  contentHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  width: number;
  height: number;
} | null;

type TParam<T> = T | T[] | Map<React.Key, T> | null;

/**
 * Трансформирует аргумент в массив элементов HTMLElement
 * @param arg - Аргумент, который нужно преобразовать в массив элементов HTMLElement
 * @return Массив элементов HTMLElement
 */
function transformToElements<T extends HTMLElement>(arg: TParam<T>) {
  return arg
    ? Array.isArray(arg)
      ? arg
      : arg instanceof Map
        ? Array.from(arg.values())
        : [arg]
    : [];
}

/**
 * Hook, который позволяет отслеживать изменения размеров элементов.
 * Массив размеров элементов будет обновляться при изменении размеров.
 * @param param - HTMLElement или массив HTMLElement или Map<React.Key, HTMLElement>
 * @return Массив размеров, где каждый размер - это объект с полями contentWidth, contentHeight, scrollWidth, scrollHeight, width, height
 */
export function useResizeObserver<T extends HTMLElement>(param: TParam<T>) {
  // Массив размеров
  const [sizes, setSizes] = useState<TSize[]>([]);

  useEffect(() => {
    if (!param) return;

    const elements = transformToElements(param);
    const elementsMap = new Map<Element | null, TSize>(
      elements.map((element) => [element, null])
    );

    /**
     * Функция, которая будет срабатывать при изменении размеров элементов.
     * Обновляет состояние размеров на основе предоставленного массива ResizeObserverEntry.
     * @param entries - Массив записей ResizeObserverEntry, представляющих элементы, размеры которых изменились.
     */
    const handleResize = (entries: ResizeObserverEntry[]) => {
      entries.forEach(
        ({
          contentRect: { width: contentWidth, height: contentHeight },
          borderBoxSize,
          target,
        }) => {
          const scrollHeight = target.scrollHeight;
          const scrollWidth = target.scrollWidth;
          const size = borderBoxSize.reduce(
            (acum, { blockSize, inlineSize }) => ({
              height: acum.height + blockSize,
              width: acum.width + inlineSize,
            }),
            { height: 0, width: 0 }
          );
          elementsMap.set(target, {
            contentWidth,
            contentHeight,
            scrollHeight,
            scrollWidth,
            ...size,
          });
        }
      );
      setSizes(Array.from(elementsMap.values()));
    };

    // Создаем наблюдателя на изменения размеров элементов
    const resizeObserver = new ResizeObserver(handleResize);
    // Настройка наблюдателя на основе предоставленных ссылок
    elements.forEach((element) => {
      if (!element) return;
      resizeObserver.observe(element);
    });

    // Очистка наблюдателя при размонтировании или изменении refs
    return () => {
      elements.forEach((element) => {
        if (!element) return;
        resizeObserver.unobserve(element);
      });
      resizeObserver.disconnect();
    };
  }, [param]);

  return sizes;
}
