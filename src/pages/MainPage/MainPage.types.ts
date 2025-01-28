import { HTMLAttributes } from 'react';

export type TStateFirstSection = 'normal' | 'scrolled' | 'invisible';
export type TMainPageProps = HTMLAttributes<HTMLElement> & {
  isVisableFirstSection?: boolean;
  onChangeStateFirstSection?: (state: TStateFirstSection) => void;
};
