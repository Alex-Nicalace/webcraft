import { useEffect, useState } from 'react';

type TSize =
  | {
      contentWidth: number;
      contentHeight: number;
      scrollWidth: number;
      scrollHeight: number;
      width: number;
      height: number;
    }
  | undefined;

/**
 * Возвращает массив HTMLElement из React-объектов ref к элементам HTMLElement
 * @param refs - Массив React-объектов ref к элементам HTMLElement или React-объект ref, содержащий Map для доступа к элементам HTMLElement
 * @return Массив HTMLElement
 */
function getElementsFromRefs<T extends HTMLElement>(
  refs: React.RefObject<T>[] | React.MutableRefObject<Map<React.Key, T>>
) {
  return Array.isArray(refs)
    ? refs.map((ref) => ref.current)
    : Array.from(refs.current?.values() || []);
}

/**
 * Хук React, возвращающий массив размеров для предоставленных React-объектов ref к элементам HTMLElement.
 * Результат сохраняет порядок элементов из входного массива refs
 * ! Если в качестве аргумента предается массив, то необходимо мемоизировать
 * @param refs - Массив React-объектов ref к элементам HTMLElement или React-объект ref, содержащий Map для доступа к элементам HTMLElement
 * @return Массив размеров для предоставленных ref. Если элемент не существует, возвращается undefined.
 */
export function useResizeObserver<T extends HTMLElement>(
  refs: React.RefObject<T>[] | React.MutableRefObject<Map<React.Key, T>>
) {
  // Массив размеров
  const [sizes, setSizes] = useState<TSize[]>([]);

  useEffect(() => {
    const elements = getElementsFromRefs(refs);
    const elementsMap = new Map<Element | null, TSize>(
      elements.map((element) => [element, undefined])
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
  }, [refs]);

  return sizes;
}
