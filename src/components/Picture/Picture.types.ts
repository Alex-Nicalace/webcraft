import { ImgHTMLAttributes, SourceHTMLAttributes } from 'react';

export type TPictureProps = ImgHTMLAttributes<HTMLImageElement> & {
  sources?: Omit<SourceHTMLAttributes<HTMLSourceElement>, 'src'>[];
};
