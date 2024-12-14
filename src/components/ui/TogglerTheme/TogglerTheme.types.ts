import { ButtonHTMLAttributes } from 'react';

export type TTogglerThemeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isDarkMode: boolean;
};
