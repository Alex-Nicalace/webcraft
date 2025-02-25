import './Dawn.scss';
import Icon from '../Icon';
import { TDawnProps } from './Dawn.types';

function Dawn({
  className,
  isBig,
  stopAnimation,
  ...props
}: TDawnProps): JSX.Element {
  return (
    <Icon
      className={[
        'dawn',
        isBig && 'dawn_big',
        stopAnimation && 'dawn_stop',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      name="Dawn"
      {...props}
    />
  );
}

export default Dawn;
