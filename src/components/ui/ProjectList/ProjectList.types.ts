import { OlHTMLAttributes } from 'react';
import { TProjectLinkProps } from '../ProjectLink';

export type TProjectListProps = OlHTMLAttributes<HTMLOListElement> & {
  data: {
    url: string;
    title: string;
    popupData?: TProjectLinkProps['popupData'];
  }[];
  isHover?: boolean;
};
