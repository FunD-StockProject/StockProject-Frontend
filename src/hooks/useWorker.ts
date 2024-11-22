// useWorker.ts
import { useEffect, useState, useRef, useCallback } from 'react';

type UseWorkerResult = [result: any, postMessage: (message: any) => void];

const useWorker = ({ worker }: { worker: Worker }): UseWorkerResult => {
  const [result, setResult] = useState(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    console.log(worker);
    workerRef.current = worker;

    console.log(workerRef);

    workerRef.current.onmessage = (e) => {
      setResult(e.data);
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [worker]);

  const postMessage = useCallback((message: any) => {
    if (workerRef.current) workerRef.current.postMessage(message);
  }, []);

  return [result, postMessage];
};

export default useWorker;
