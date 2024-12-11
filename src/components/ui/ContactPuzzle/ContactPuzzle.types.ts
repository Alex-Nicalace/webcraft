import { AnchorHTMLAttributes } from 'react';
import { NumericRange } from '../../../types';

export type TContactPuzzleProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant: NumericRange<1, 6>;
  isSingleRow?: boolean;
};
