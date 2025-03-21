import { OlHTMLAttributes } from 'react';
import { TProjectLinkProps } from '../ProjectLink';

export type TProjectListProps = OlHTMLAttributes<HTMLOListElement> & {
  data: (Pick<TProjectLinkProps, 'popupData' | 'stack' | 'description'> & {
    url: string;
    title: string;
  })[];
  isHover?: boolean;
};
