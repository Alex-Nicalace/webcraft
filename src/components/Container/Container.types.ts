export type TContainerProps<T extends keyof JSX.IntrinsicElements> = {
  tag: T; // Ограничение по ключам JSX.IntrinsicElements
} & JSX.IntrinsicElements[T]; // Атрибуты соответствующего элемента
