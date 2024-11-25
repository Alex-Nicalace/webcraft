import { ButtonHTMLAttributes } from 'react';

export type TButtonSliderProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  direction?: 'left' | 'right';
};
