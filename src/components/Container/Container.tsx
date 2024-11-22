import { createElement } from 'react';
import { TContainerProps } from './Container.types';
import './Container.scss';

function Container<T extends keyof JSX.IntrinsicElements>({
  children,
  tag,
  className,
  ...props
}: TContainerProps<T>): JSX.Element {
  return createElement(
    tag,
    { ...props, className: [className, 'container'].filter(Boolean).join(' ') },
    children
  );
}

export default Container;
