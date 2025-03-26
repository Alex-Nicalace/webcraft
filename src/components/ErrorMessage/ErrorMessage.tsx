import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { TErrorProps } from './ErrorMessage.types';
import './ErrorMessage.scss';

function ErrorMessage({ className, message }: TErrorProps): JSX.Element {
  // хук возвращает все, что было создано во время действия, загрузчика или рендеринга.
  const error = useRouteError();
  console.error(error);

  return (
    <div className={['error', className].filter(Boolean).join(' ')}>
      <h3 className="error__title">Упс!</h3>
      {!message && (
        <>
          <p>К сожалению, произошла непредвиденная ошибка.</p>
          <p>
            {isRouteErrorResponse(error) && <i>{error.statusText}</i>}
            {error instanceof Error && <i>{error.message}</i>}
          </p>
        </>
      )}
      {message && (
        <p>
          ⚠️Ошибка: <i>{message}</i>
        </p>
      )}
    </div>
  );
}

export default ErrorMessage;
