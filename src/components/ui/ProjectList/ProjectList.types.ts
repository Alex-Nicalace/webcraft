import { TProjectLinkProps } from '../ProjectLink';

export type TProjectListProps = {
  className?: string;
  data: {
    url: string;
    title: string;
    popupData?: TProjectLinkProps['popupData'];
  }[];
};
