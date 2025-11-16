import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FavoriteStock } from '@controllers/api.Type';
import {
  deleteBookmark,
  deleteHide,
  fetchBookmarkCount,
  fetchBookmarkList,
  patchNotification,
  postBookmark,
  postHide,
} from '@controllers/api/favorites';
import { queryOptions } from './common';

// ----- Queries -----
export const useBookmarkListQuery = () => {
  return useQuery(['bookmarkList'], fetchBookmarkList, {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

export const useBookmarkCountQuery = () => {
  return useQuery<number>(['bookmarkCount'], fetchBookmarkCount, {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

// ----- Mutations -----
export const useAddBookmarkMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number | string) => postBookmark(stockId), {
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['bookmarkList'] });
      qc.invalidateQueries({ queryKey: ['bookmarkCount'] });
    },
  });
};

export const useDeleteBookmarkMutation = () => {
  const qc = useQueryClient();

  return useMutation((stockId: number | string) => deleteBookmark(stockId), {
    // 1) 낙관적 업데이트: UI 즉시 반영
    onMutate: async (stockId) => {
      await qc.cancelQueries(['bookmarkList']);

      const previousList = qc.getQueryData<FavoriteStock[]>(['bookmarkList']);
      const previousCount = qc.getQueryData<number>(['bookmarkCount']);

      // 리스트에서 해당 아이템 제거
      qc.setQueryData<FavoriteStock[]>(['bookmarkList'], (old = []) =>
        old.filter((s) => s.stockId !== Number(stockId)),
      );

      // 카운트도 함께 줄이기(있다면)
      if (typeof previousCount === 'number') {
        qc.setQueryData(['bookmarkCount'], Math.max(0, previousCount - 1));
      }

      return { previousList, previousCount };
    },

    // 2) 실패 시 롤백
    onError: (_err, _stockId, ctx) => {
      if (ctx?.previousList) qc.setQueryData(['bookmarkList'], ctx.previousList);
      if (typeof ctx?.previousCount === 'number') qc.setQueryData(['bookmarkCount'], ctx.previousCount);
    },

    // 3) 성공/실패 상관없이 서버 정합성 맞추기
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['bookmarkList'] });
      qc.invalidateQueries({ queryKey: ['bookmarkCount'] });
    },
  });
};

export const useAddHideMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => postHide(stockId), {
    onSuccess: () => {
      // 숨김 리스트를 따로 만들 경우 여기에 invalidate 추가
      qc.invalidateQueries({ queryKey: ['hideStocks'] });
    },
  });
};

export const useRemoveHideMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => deleteHide(stockId), {
    onSuccess: () => {
      // 숨김 리스트를 따로 만들 경우 여기에 invalidate 추가
      qc.invalidateQueries(['hideStocks']);
    },
  });
};

export const useToggleNotificationMutation = () => {
  const qc = useQueryClient();

  return useMutation((stockId: number) => patchNotification(stockId), {
    onSuccess: () => {
      qc.invalidateQueries(['bookmarkList']);
    },
  });
};
