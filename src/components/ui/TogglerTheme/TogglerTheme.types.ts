import { ButtonHTMLAttributes } from 'react';

export type TTogglerThemeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  currentTheme: 'light-mode' | 'dark-mode';
};
