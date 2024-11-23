import * as Icons from './icons';

type IconName = keyof typeof Icons;

export type TIconProps = {
  name: IconName;
  rotate?: number;
} & React.SVGProps<SVGSVGElement>;
