import { ButtonHTMLAttributes } from 'react';

export type TBurgerButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  pressed?: boolean;
};
