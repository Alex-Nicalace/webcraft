import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type TAnimateIntroFn = (state: 'start' | 'end') => void;

export type TGreetingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  onAnimateIntro?: TAnimateIntroFn;
};
