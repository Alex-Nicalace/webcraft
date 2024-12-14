import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * Хук создает состояние, которое сохраняется в локальное хранилище браузера.
 *
 * @param initialState - начальное значение состояния
 * @param key - ключ для сохранения в локальное хранилище
 * @return массив, содержащий текущее значение состояния и функцию для его обновления
 */
export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
