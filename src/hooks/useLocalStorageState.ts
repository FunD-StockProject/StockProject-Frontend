import { useState } from 'react';

type LocalStorageKey =
  | 'access_token'
  | 'refresh_token'
  | 'user_info'
  | 'before_login_depth'
  | 'recent_stocks'
  | 'tutorial_watched_shortview'
  | 'recent_provider'
  | 'last_visit_page';

const useLocalStorageState = <T>(
  key: LocalStorageKey,
  initialValue?: T,
): [T | undefined, (value: T) => void, () => void] => {
  const [state, setState] = useState<T | undefined>(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return initialValue;
    }
    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue ?? initialValue;
    }
  });

  const setLocalStorageState = (value: T) => {
    setState(value);
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  };

  const removeLocalStorageState = () => {
    setState(undefined);
    localStorage.removeItem(key);
  };

  return [state, setLocalStorageState, removeLocalStorageState];
};

export default useLocalStorageState;
