import { TLogoProps } from './Logo.types';
import './Logo.scss';

function Logo({ isSizeSmall, className }: TLogoProps): JSX.Element {
  return (
    <a
      className={['logo', className, isSizeSmall && 'logo_small']
        .filter(Boolean)
        .join(' ')}
      href="/"
    >
      Alex
    </a>
  );
}

export default Logo;
