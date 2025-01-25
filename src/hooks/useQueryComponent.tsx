import { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';
import ErrorComponent from '@components/Common/ErrorComponent';
import LoadingComponent from '@components/Common/LoadingComponent';

export const useQueryComponent = ({ children, query }: { children?: React.ReactNode; query: UseQueryResult }) => {
  const { data, isLoading, isError }: { data: any; isLoading: any; isError: any } = query;

  //로딩창 안띄우는 시간
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) return [null, isDeferred && <LoadingComponent />];
  if (isError) return [null, <ErrorComponent />];
  return [data, children];
};
