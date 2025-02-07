import { HTMLAttributes } from 'react';

export type TErrorProps = HTMLAttributes<HTMLDivElement> & {
  message?: string;
};
