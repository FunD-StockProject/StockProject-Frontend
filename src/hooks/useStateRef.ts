import { useRef, useState } from 'react';

const useStateRef = <T>(initializer: T): [T, (value: T) => void, React.MutableRefObject<T>] => {
  const [state, setState] = useState<T>(initializer);
  const ref = useRef<T>(state);

  const setValue = (value: T) => {
    setState((ref.current = value));
  };

  return [state, setValue, ref];
};

export default useStateRef;
