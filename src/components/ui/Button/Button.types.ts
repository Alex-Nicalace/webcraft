import { LinkProps } from 'react-router-dom';
import { ButtonHTMLAttributes } from 'react';

export type TButtonProps = { variant?: 'menu-item' | 'button-secondary' } & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { to?: never })
  | LinkProps
);
