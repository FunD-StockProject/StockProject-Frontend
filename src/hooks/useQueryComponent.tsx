import { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';
import ErrorComponent from '@components/Common/ErrorComponent';
import LoadingComponent from '@components/Common/LoadingComponent';

export const useQueryComponent = ({ query }: { query: UseQueryResult }) => {
  const { data, isLoading, isError }: { data: any; isLoading: boolean; isError: boolean } = query;

  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) return [null, isDeferred && <LoadingComponent />];
  if (isError) return [null, <ErrorComponent />];

  return [data];
};
