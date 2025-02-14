import { AnchorHTMLAttributes } from 'react';
import { TPictureProps } from '../../Picture';

export type TProjectLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  popupData?: {
    title?: string;
    imageUrl: Pick<TPictureProps, 'src' | 'sources'>;
  };
  isHover?: boolean;
};
