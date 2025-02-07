import Dawn from '../Dawn';
import './Loader.scss';
import { TLoaderProps } from './Loader.types';

function Loader({ className }: TLoaderProps): JSX.Element {
  return (
    <div className={['loader', className].filter(Boolean).join(' ')}>
      <Dawn className="loader__dawn" isBig />
    </div>
  );
}

export default Loader;
