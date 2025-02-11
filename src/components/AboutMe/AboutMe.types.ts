import { HTMLAttributes } from 'react';
export type TAboutMeProps = HTMLAttributes<HTMLElement>;
export type TRangeOptions = {
  from: number;
  end?: number;
  concatenate?: boolean;
};

export type TDevice =
  | 'pc'
  | 'tablet'
  | 'mobile'
  | 'mobileSmall'
  | 'mobileUltraSmall';

export type TRangeOptionsSet = TRangeOptions | TRangeOptionsSet[];

export type TParagraphs = string | TParagraphs[];

export type TParagraphsByScreenSizeScheme = Record<TDevice, TRangeOptionsSet>;

export type TParagraphsByScreenSize = Record<TDevice, TParagraphs[]>;

export type TResponsedData = {
  hunks: string[];
  paragraphsByScreenSize: TParagraphsByScreenSizeScheme;
};
