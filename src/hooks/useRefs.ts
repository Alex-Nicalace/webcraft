import { useCallback, useRef } from 'react';

/**
 * Возвращает массив из двух элементов:
 * 1. ссылки на Map, хранящий ссылки на DOM-элементы,
 *    по которым можно обратиться по ключу.
 *    Ключ - это React.Key, по которому можно найти элемент.
 *    map.current.get(key) - получить ссылку на DOM-элемент.
 * 2. функцию setRef, которая позволяет добавить/удалить
 *    ссылки на DOM-элементы в Map.
 *    setRef(key, node) - добавить/удалить ссылку на DOM-элемент.
 *    key - React.Key, по которому можно найти элемент.
 *    node - DOM-элемент, на который нужно добавить ссылку
 *          (если null, то ссылка будет удалена).
 */
export function useRefs<T extends HTMLElement>() {
  const itemsRef = useRef<Map<React.Key, T> | null>(null);

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  const setRef = useCallback((key: React.Key, node: T | null) => {
    const map = getMap();
    if (node) {
      map.set(key, node);
    } else {
      map.delete(key);
    }
  }, []);

  return [itemsRef, setRef] as const;
}
