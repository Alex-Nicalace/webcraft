import { HTMLAttributes, ImgHTMLAttributes, SourceHTMLAttributes } from 'react';

export type TPictureProps = HTMLAttributes<HTMLPictureElement> & {
  sources?: Omit<SourceHTMLAttributes<HTMLSourceElement>, 'src'>[];
  src?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;
};
