import './ErrorMessage.scss';
import { TErrorProps } from './ErrorMessage.types';

function ErrorMessage({ className, message }: TErrorProps): JSX.Element {
  return (
    <div className={['error', className].filter(Boolean).join(' ')}>
      ⚠️Ошибка: {message}
    </div>
  );
}

export default ErrorMessage;
