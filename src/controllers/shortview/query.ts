import { useInfiniteQuery, useQueryClient } from 'react-query';
import { queryOptions } from '@controllers/common/query';
import { ShortViewItem, fetchShortview } from './api';
import { mockShortViewItems } from './mock';

export const useShortViewQuery = ({ useMock = false }: { useMock?: boolean }) => {
  const queryClient = useQueryClient();

  const result = useInfiniteQuery<ShortViewItem[]>(
    ['shortview'],
    () => (useMock ? Promise.resolve(mockShortViewItems) : fetchShortview()),
    {
      ...queryOptions,
      enabled: useMock ? true : !!localStorage.getItem('access_token'),
      getNextPageParam: () => true, // 항상 다음 페이지 있음 (무한 호출 가능)
    },
  );

  const removeItem = (index: number) => {
    queryClient.setQueryData<typeof result.data>(['shortview'], (oldData) => {
      if (!oldData) return oldData;

      // 더 간단한 방법: flat → filter → 다시 chunk
      const allItems = oldData.pages.flat();
      const filtered = allItems.filter((_, i) => i !== index);

      // 원래 페이지 사이즈 유지하면서 다시 분할
      const pageSize = oldData.pages[0]?.length || 5;
      const newPagesSimple: ShortViewItem[][] = [];
      for (let i = 0; i < filtered.length; i += pageSize) {
        newPagesSimple.push(filtered.slice(i, i + pageSize));
      }

      return {
        ...oldData,
        pages: newPagesSimple.length > 0 ? newPagesSimple : [[]],
      };
    });
  };

  const appendItem = (index: number, item: ShortViewItem) => {
    queryClient.setQueryData<typeof result.data>(['shortview'], (oldData) => {
      if (!oldData) return oldData;

      const allItems = oldData.pages.flat();
      allItems.splice(index, 0, item);

      // 원래 페이지 사이즈 유지하면서 다시 분할
      const pageSize = oldData.pages[0]?.length || 5;
      const newPagesSimple: ShortViewItem[][] = [];
      for (let i = 0; i < allItems.length; i += pageSize) {
        newPagesSimple.push(allItems.slice(i, i + pageSize));
      }

      return {
        ...oldData,
        pages: newPagesSimple.length > 0 ? newPagesSimple : [[]],
      };
    });
  };

  return {
    ...result,
    // 모든 페이지 데이터를 flat하게 합쳐서 반환
    data: result.data?.pages.flat(),
    removeItem,
    appendItem,
  };
};
