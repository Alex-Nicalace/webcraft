import { HTMLAttributes } from 'react';

export type TAnimateIntroFn = (state: 'start' | 'end') => void;

export type TGreetingProps = HTMLAttributes<HTMLElement> & {
  onAnimateIntro?: TAnimateIntroFn;
};
