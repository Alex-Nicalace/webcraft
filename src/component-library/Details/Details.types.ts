import {
  DetailedHTMLProps,
  DetailsHTMLAttributes,
  HTMLAttributes,
} from 'react';

export type TDetailsProps = Omit<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  'children'
> & {
  summaryNode?: React.ReactNode | ((open: boolean) => React.ReactNode);
  contentNode?: React.ReactNode | ((open: boolean) => React.ReactNode);
  animationOptions?: {
    duration?: number;
    timingFunction?: string;
  };
  disabled?: boolean;
  closeOnOutsideClick?: boolean;
  unmountContentOnClose?: boolean;
  summaryProps?: Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    'children'
  >;
  contentProps?: Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    'children'
  >;
  onChange?: (open: boolean) => void;
  defaultOpen?: boolean;
};

export type TDetailsContentProps = HTMLAttributes<HTMLDivElement> & {
  onOutsideClick: (e: MouseEvent) => void;
  closeOnOutsideClick: boolean;
  refProp?:
    | string
    | ((node: HTMLElement | null) => void)
    | React.RefObject<HTMLElement>;
};
