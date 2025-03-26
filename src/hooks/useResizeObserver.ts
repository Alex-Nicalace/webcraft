import { useEffect, useState } from 'react';

type TSize = {
  contentWidth: number;
  contentHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  width: number;
  height: number;
} | null;

type UseResizeObserverParam =
  | HTMLElement
  | HTMLElement[]
  | Map<React.Key, HTMLElement>
  | null;
type UseResizeObserverReturn<T> = T extends HTMLElement[]
  ? TSize[]
  : T extends Map<React.Key, HTMLElement>
    ? TSize[]
    : TSize;

/**
 * Трансформирует аргумент в массив элементов HTMLElement
 * @param arg - Аргумент, который нужно преобразовать в массив элементов HTMLElement
 * @return Массив элементов HTMLElement
 */
function transformToElements(arg: UseResizeObserverParam) {
  return arg
    ? Array.isArray(arg)
      ? arg
      : arg instanceof Map
        ? Array.from(arg.values())
        : [arg]
    : [];
}

/**
 * Возвращает информацию о размерах элементов.
 * @param param - Ссылки на HTML-элементы, размеры которых нужно отслеживать.
 *    Это может быть элемент, массив элементов, Map от ключа к элементу.
 * @return Массив размеров, если было передано несколько элементов,
 *         или объект размеров, если было передан только один элемент.
 *         Если было передано null, то возвращается null.
 */
export function useResizeObserver<T extends UseResizeObserverParam>(
  param: T
): UseResizeObserverReturn<T> {
  // Массив размеров
  const [sizes, setSizes] = useState<TSize[]>([null]);

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

  return (
    param instanceof Map || Array.isArray(param) ? sizes : sizes[0]
  ) as UseResizeObserverReturn<T>;
}
