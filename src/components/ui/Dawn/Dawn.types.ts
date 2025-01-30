export type TDawnProps = Omit<
  React.SVGProps<SVGSVGElement>,
  'name' | 'rotate'
> & {
  isBig?: boolean;
  stopAnimation?: boolean;
};
