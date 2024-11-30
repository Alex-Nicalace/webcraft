import { AnchorHTMLAttributes } from 'react';

export type TProjectLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  projectData?: {
    title?: string;
    imageUrl: string;
  };
};
