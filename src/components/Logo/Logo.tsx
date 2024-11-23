import { TLogoProps } from './Logo.types';
import './Logo.scss';

function Logo({ size, className }: TLogoProps): JSX.Element {
  return (
    <a
      className={['logo', className, size && `logo_${size}`]
        .filter(Boolean)
        .join(' ')}
      href="/"
    >
      Alex
    </a>
  );
}

export default Logo;
