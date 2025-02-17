# WebCraft

WebCraft — это мой сайт-портфолио, разработанный на React + TypeScript, Vite. В нём представлены мои проекты, компетенции и информация обо мне.

Ссылкка — https://alex-webdev.ru/
![WebCraft Preview](public/img/og-preview.jpg)

## Установка и запуск

```bash
git clone https://github.com/Alex-Nicalace/webcraft.git
cd webcraft
npm install
npm run dev

```

## Удаленные данные

Данные загружаются с удалённых JSON-файлов, хранящихся на сервере, с помощью хука — [useFetch](src/hooks/useFetch.ts):

- `/data/about-me.json` — некоторый текст обо мне;
- `/data/competencies.json` — компетенции;
- `/data/credo.json` — кредо;
- `/data/facts.json` — факты обо мне.

## Observers

### IntersectionObserver

Данный АПИ использовал в компоненте Header. У хэдера меняется подложка как только появляется скролл. Можно было для этой задачи использовать window.addEventListener('scroll', ...) в колбэке отслеживал значение window.scrollY и колбэк обернул в throttle.ts Но решил попрактиковаться с IntersectionObserver и создал кастомный хук [useIntersectionObserver](src/hooks/useIntersectionObserver.ts)

### ResizeObserver

Использовал для создания кастомного хука [useResizeObserver](src/hooks/useResizeObserver.ts)

## Контекст

- [DeviceContext](./src/Context/DeviceContext)
  - Содержит некоторые характеристики устройства
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
- [useFetch](src/hooks/useFetch.ts)
  - Хук, который выполняет запрос к url.
  - В опциях можно задать:
    - transformResponseDataFn: мемоизированная функция, которая будет вызвана, когда данные будут получены; позволяет преобразовать ответ сервера к нужному типу,
  - Возвращает массив из двух элементов:
    - fetchState: объект, содержащий информацию о состоянии запроса:
      - responseData: данные, полученные в результате запроса,
      - isLoading: флаг, указывающий, является ли запрос в работе,
      - errorMessage: сообщение об ошибке, если она возникла
    - setFetchState: функция, которая позволяет обновлять fetchState
- [useIntersectionObserver](src/hooks/useIntersectionObserver.ts)
  - возвращающий информацию о пересечении viewport и HTML-элемента.
- [useRefs](src/hooks/useRefs.ts)
  - Хук из коробки `useRef` можно использовать когда нужно получить ссылку на конкретный элемент в DOM. А как быть когда нужно получить ссылки на все элементы, которые рендерется в цикле.
- [useResizeObserver](src/hooks/useResizeObserver.ts)
  - Хук, возвращающий массив размеров для предоставленного `HTMLElement` или массив `HTMLElement` или `Map<React.Key, HTMLElement>`.
  - Результат сохраняет порядок элементов из входного массива
