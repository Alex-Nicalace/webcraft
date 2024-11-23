import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react';

export type TButtonProps = { variant?: 'menu-item' } & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (LinkHTMLAttributes<HTMLAnchorElement> & { href: string })
);
