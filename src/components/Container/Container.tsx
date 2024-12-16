import { createElement, forwardRef } from 'react';
import { TContainerProps } from './Container.types';
import './Container.scss';

const Container = forwardRef(
  <T extends keyof JSX.IntrinsicElements>(
    { children, tag, className, ...props }: TContainerProps<T>,
    ref: React.Ref<
      T extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[T]
        : SVGElement
    > // Типизация ref
  ) => {
    return createElement(
      tag,
      {
        ...props,
        className: [className, 'container'].filter(Boolean).join(' '),
        ref, // Передача ref
      },
      children
    );
  }
);
// Устанавливаем displayName без этого ESLint ругается, т.к.
// без этого во время отладки имя компонента станвится ForwardRef
Container.displayName = 'Container';

export default Container;
