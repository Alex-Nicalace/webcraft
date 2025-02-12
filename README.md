# WebCraft

## IntersectionObserver

Данный АПИ использовал в компоненте Header. У хэдера меняется подложка как только появляется скролл. Можно было для этой задачи использовать window.addEventListener('scroll', ...) в колбэке отслеживал значение window.scrollY и колбэк обернул в throttle.ts Но решил попрактиковаться с IntersectionObserver

## Контекст

- [ScreenWidthContext](./src/Context/ScreenWidthContext)
  - Содержит логические значения соответствия ширины вьюпорта
- [DarkModeContext](./src/Context/DarkModeContext)
  - Содержит логическое значение темная ли тема
  - Колбэк для изменения темы

## Компоненты, кот. можно применить в других проектах

- [Container](./src/components/Container/Container.tsx)
  - Компонент, который ограничивает контент.
  - В чистом виде переносить в другой проект не получится.
    - Надо изменять под новый проект стили.
  - Принимает пропсом какого типа должен быть HTML тег
- [ErrorBoundary](./src/components/ErrorBoundary.tsx)
  - В случае ошибки во время рендера экран будет пуст
  - Этот компонет вместо пустого экрана позвояет показывать некое содержимое.
- [Picture](./src/components/Picture/Picture.tsx)
  - Компонент для рендера конструкции:
    ```html
    <picture>
      <source media="(max-width: 400px)" srcset="img/main_photo-min.jpg" />
      <!-- и т.д. -->
      <img src="img/main_photo.jpg" alt="my photo" class="image" />
    </picture>
    ```
  - Принимает пропсы:
    - `src` — для тега `<img>`
    - `sources` — массив для рендера тегов `<source>`

## Хуки

### Кастомные хуки

- [useMatchMedia.ts](./src/hooks/useMatchMedia.ts)
  - Хук получает массив с медиа запросами, результат массив логических значений, обозначающих удовлетворяется ли медиа запрос.
- [useLocalStorageState.ts](./src/hooks/useLocalStorageState.ts)
  - Хук создает состояние, которое сохраняется в локальное хранилище браузера
- [useOutsideClick.ts](./src/hooks/useOutsideClick.ts)
  - Хук получает колбэк, который будет обработан при клике вне элемента.
