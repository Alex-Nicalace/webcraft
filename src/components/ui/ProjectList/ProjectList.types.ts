import { ReactElement } from 'react';
import { TProjectLinkProps } from '../ProjectLink';

export type TProjectListProps = {
  className?: string;
  children: ReactElement<TProjectLinkProps> | ReactElement<TProjectLinkProps>[];
};
