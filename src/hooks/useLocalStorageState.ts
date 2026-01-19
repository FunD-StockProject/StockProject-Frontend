import { useEffect, useState } from 'react';

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
  const readValue = (): T | undefined => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return initialValue;
    }
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      // JSON 파싱 실패 시 string으로 간주
      return storedValue as T;
    }
  };

  const [state, setState] = useState<T | undefined>(readValue);

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setState(readValue());
      }
    };

    // 같은 탭에서의 변경사항을 감지하기 위한 커스텀 이벤트
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setState(readValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange' as any, handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange' as any, handleCustomStorageChange);
    };
  }, [key]);

  const setLocalStorageState = (value: T) => {
    setState(value);
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    // 같은 탭에서 변경사항을 알리기 위한 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key } }));
  };

  const removeLocalStorageState = () => {
    setState(undefined);
    localStorage.removeItem(key);
    // 같은 탭에서 변경사항을 알리기 위한 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key } }));
  };

  return [state, setLocalStorageState, removeLocalStorageState];
};

export default useLocalStorageState;
