import { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';
import ErrorComponent from '@components/Common/ErrorComponent';
import LoadingComponent from '@components/Common/LoadingComponent';

export const useQueryComponent = <T,>({ query }: { query: UseQueryResult<T> }) => {
  const { data, isLoading, isError } = query;

  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) return [null, isDeferred && <LoadingComponent />] as const;
  if (isError) return [null, <ErrorComponent />] as const;

  return [data] as const;
};
