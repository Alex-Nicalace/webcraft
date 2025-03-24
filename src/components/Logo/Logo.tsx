import { Link } from 'react-router-dom';
import { TLogoProps } from './Logo.types';
import './Logo.scss';

function Logo({ isSizeSmall, className }: TLogoProps): JSX.Element {
  return (
    <Link
      className={['logo', className, isSizeSmall && 'logo_small']
        .filter(Boolean)
        .join(' ')}
      to="/"
    >
      Alex
    </Link>
  );
}

export default Logo;
