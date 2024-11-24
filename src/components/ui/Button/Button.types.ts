import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react';

export type TButtonProps = { variant?: 'menu-item' | 'button-secondary' } & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (LinkHTMLAttributes<HTMLAnchorElement> & { href: string })
);
