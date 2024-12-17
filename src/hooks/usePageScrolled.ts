import { useEffect, useState } from 'react';

export function usePageScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(function manageScrolledState() {
    // Первоначально реализовал с помощью window.addEventListener('scroll', ...)
    // в колбэке отслеживал значение window.scrollY и колбэк обернул в throttle.ts
    // Но решил попрактиковаться с IntersectionObserver
    const options = {
      root: null, // Наблюдаем за viewport
      threshold: 0.01, // Пересечение фиксируется мгновенно
      // Область наблюдения. Верхнюю границу поднял примерно на высоту хедера
      // а нижнюю поднял на всю высоту экрана вверх.
      // Т.о. получилась область наблюдения вне видимой части экрана сверху полосой в 60px
      rootMargin: '60px 0px -100% 0px',
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setScrolled(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    // Ищем первый элемент после хедера, т.к. после него контент котрый и будет скроллиться
    const contentElem = document.querySelector('.header + *');
    if (contentElem) observer.observe(contentElem);

    return () => {
      if (contentElem) observer.unobserve(contentElem);
    };
  });

  return scrolled;
}
