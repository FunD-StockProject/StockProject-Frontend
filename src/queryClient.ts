import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: unknown) => {
        const typedError = error as Error;
        console.error('Global Error Handler:', typedError.message);

        // alert(`An error occurred: ${typedError.message}`);
      },
      retry: 1, // 쿼리 실패 시 재시도 횟수
      refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    },
    mutations: {
      onError: (error: unknown) => {
        const typedError = error as Error;
        console.error('Mutation Error:', typedError.message);
      },
    },
  },
});

export default queryClient;
