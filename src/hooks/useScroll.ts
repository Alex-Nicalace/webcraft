import { useEffect, useState } from 'react';

type ScrollOptions = {
  /** Колбэк при скролле */
  onScroll?: (params: { scrollY: number; scrollX: number }) => void;
  /** Сохранять ли внутреннее состояние (по умолчанию true) */
  keepState?: boolean;
};

/**
 * Хук для отслеживания изменений прокрутки на указанном элементе.
 *
 * @param element - HTML-элемент, на котором нужно отслеживать прокрутку. Если не указан,
 *                  используется окно (window).
 * @param options - Настройки прокрутки.
 *   - onScroll: Функция, вызываемая при изменении прокрутки. Получает объект с текущими
 *               значениями scrollY и scrollX.
 *   - keepState: Определяет, следует ли сохранять внутреннее состояние прокрутки
 *                (по умолчанию true).
 *
 * @returns Объект с текущими значениями scrollY и scrollX, если keepState установлен в true,
 *          иначе null.
 */

export function useScroll(
  element?: HTMLElement | null,
  options?: ScrollOptions
) {
  const { onScroll, keepState = true } = options ?? {};
  const [scroll, setScroll] = useState(() =>
    keepState ? { scrollY: 0, scrollX: 0 } : null
  );

  useEffect(() => {
    if (element === null) return;

    const target = element ?? window;

    let animationFrameId: number;

    const handleScroll = () => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = 0;
        const scrollParams =
          target instanceof Window
            ? { scrollY: window.scrollY, scrollX: window.scrollX }
            : { scrollY: target.scrollTop, scrollX: target.scrollLeft };

        // Вызываем колбэк если есть
        onScroll?.(scrollParams);

        // Обновляем стейт если нужно
        if (keepState) {
          setScroll(scrollParams);
        }
      });
    };

    target.addEventListener('scroll', handleScroll);

    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [element, onScroll, keepState]);

  return scroll;
}
