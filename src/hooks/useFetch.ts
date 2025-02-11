import { useEffect, useState } from 'react';

type TFetch<T> = {
  responseData: T | null;
  isLoading: boolean;
  errorMessage: string;
};

/**
 * Хук, который выполняет запрос к url.
 * Возвращает массив из двух элементов:
 * - fetchState: объект, содержащий информацию о состоянии запроса:
 *   - responseData: данные, полученные в результате запроса,
 *   - isLoading: флаг, указывающий, является ли запрос в работе,
 *   - errorMessage: сообщение об ошибке, если она возникла
 * - setFetchState: функция, которая позволяет обновлять fetchState
 *
 * @param url - адрес, к которому будет выполнен запрос
 * @param options - объект, содержащий дополнительные параметры:
 *   - transformResponseDataFn: мемоизированная функция, которая будет вызвана,
 *     когда данные будут получены; позволяет преобразовать ответ
 *     сервера к нужному типу,
 * @returns массив, содержащий fetchState и setFetchState
 */
export function useFetch<T>(
  url?: string,
  options?: {
    transformResponseDataFn?: (responseData: unknown) => T;
  }
): [TFetch<T | null>, React.Dispatch<React.SetStateAction<TFetch<T>>>] {
  const { transformResponseDataFn } = options ?? {};
  const [fetchState, setFetchState] = useState<TFetch<T>>(() => ({
    responseData: null,
    isLoading: !!url,
    errorMessage: '',
  }));

  useEffect(
    function () {
      if (!url) return;
      const controller = new AbortController();

      (async function () {
        try {
          const response = await fetch(url, {
            signal: controller.signal,
          });
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
          const responseData = await response.json();
          setFetchState((prev) => ({
            ...prev,
            responseData: transformResponseDataFn
              ? transformResponseDataFn(responseData)
              : responseData,
            isLoading: false,
          }));
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            const errorMsg = error.message;
            console.error(errorMsg);
            setFetchState((prev) => ({
              ...prev,
              errorMessage: errorMsg,
              isLoading: false,
            }));
          }
        }
      })();

      return function () {
        controller.abort();
      };
    },
    [url, transformResponseDataFn]
  );

  return [fetchState, setFetchState];
}
