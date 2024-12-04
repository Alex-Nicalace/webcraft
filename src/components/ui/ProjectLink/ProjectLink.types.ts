import { AnchorHTMLAttributes } from 'react';

export type TProjectLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  popupData?: {
    title?: string;
    imageUrl: string;
  };
};
