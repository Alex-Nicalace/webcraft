import { TIconProps } from './Icon.types';
import * as Icons from './icons';

function Icon({ name, rotate, ...props }: TIconProps): JSX.Element {
  const SvgIcon = Icons[name];

  return (
    <SvgIcon
      {...props}
      style={{ ...(rotate && { transform: `rotate(${rotate}deg)` }) }}
    />
  );
}

export default Icon;
