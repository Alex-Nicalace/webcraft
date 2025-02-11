import {
  TParagraphsByScreenSizeScheme,
  TParagraphsByScreenSize,
  TRangeOptionsSet,
  TParagraphs,
} from './AboutMe.types';

export class ResponsedDataManager {
  constructor(public hunks: string[]) {}
  get({
    from,
    to,
    isConcat = false,
  }: {
    from: number;
    to?: number;
    isConcat?: boolean;
  }) {
    const subArray = this.hunks.slice(from, to);
    return isConcat ? subArray.join(' ') : subArray;
  }
  getParagraphsByScreenSize(schema: TParagraphsByScreenSizeScheme) {
    return Object.fromEntries(
      Object.entries(schema).map(([key, value]) => [
        key,
        this.transformToParagraph(value),
      ])
    ) as TParagraphsByScreenSize;
  }
  transformToParagraph(value: TRangeOptionsSet): TParagraphs {
    return Array.isArray(value)
      ? value.map((item) => this.transformToParagraph(item))
      : this.get(value);
  }
}
