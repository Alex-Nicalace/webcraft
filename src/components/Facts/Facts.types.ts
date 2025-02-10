import { HTMLAttributes } from 'react';
import { TPuzzleProps } from '../ui/Puzzle';

export type TFactsProps = HTMLAttributes<HTMLElement>;
export type TFact = { variant: TPuzzleProps['variant']; text: string };
