import React from 'react';

export type TContainerProps<T extends keyof JSX.IntrinsicElements> = {
  children: React.ReactNode;
  tag: T; // Ограничение по ключам JSX.IntrinsicElements
} & JSX.IntrinsicElements[T]; // Атрибуты соответствующего элемента
