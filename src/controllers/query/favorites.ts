import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FavoriteStock } from '@controllers/api.Type';
import {
  deleteBookmark,
  deleteHide,
  fetchBookmarkCount,
  fetchBookmarkList,
  fetchStockPreference,
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

export const useStockPreferenceQuery = (stockId: number) => {
  return useQuery(['stockPreference', stockId], () => fetchStockPreference(stockId), {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

// ----- Mutations -----
export const useAddBookmarkMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number | string) => postBookmark(stockId), {
    onSuccess: (_data, stockId) => {
      // 낙관적 업데이트: stockPreference 즉시 반영
      qc.setQueryData(['stockPreference', stockId], (old: any) => ({
        ...old,
        isBookmarked: true,
      }));
    },
    onSettled: (_data, _error, stockId) => {
      qc.invalidateQueries({ queryKey: ['bookmarkList'] });
      qc.invalidateQueries({ queryKey: ['bookmarkCount'] });
      qc.invalidateQueries({ queryKey: ['stockPreference', stockId] });
    },
  });
};

export const useDeleteBookmarkMutation = () => {
  const qc = useQueryClient();

  return useMutation((stockId: number | string) => deleteBookmark(stockId), {
    // 1) 낙관적 업데이트: UI 즉시 반영
    onMutate: async (stockId) => {
      await qc.cancelQueries(['bookmarkList']);
      await qc.cancelQueries(['stockPreference', stockId]);

      const previousList = qc.getQueryData<FavoriteStock[]>(['bookmarkList']);
      const previousCount = qc.getQueryData<number>(['bookmarkCount']);
      const previousPreference = qc.getQueryData(['stockPreference', stockId]);

      // 리스트에서 해당 아이템 제거
      qc.setQueryData<FavoriteStock[]>(['bookmarkList'], (old = []) =>
        old.filter((s) => s.stockId !== Number(stockId)),
      );

      // 카운트도 함께 줄이기(있다면)
      if (typeof previousCount === 'number') {
        qc.setQueryData(['bookmarkCount'], Math.max(0, previousCount - 1));
      }

      // stockPreference도 즉시 업데이트
      qc.setQueryData(['stockPreference', stockId], (old: any) => ({
        ...old,
        isBookmarked: false,
      }));

      return { previousList, previousCount, previousPreference };
    },

    // 2) 실패 시 롤백
    onError: (_err, stockId, ctx) => {
      if (ctx?.previousList) qc.setQueryData(['bookmarkList'], ctx.previousList);
      if (typeof ctx?.previousCount === 'number') qc.setQueryData(['bookmarkCount'], ctx.previousCount);
      if (ctx?.previousPreference) qc.setQueryData(['stockPreference', stockId], ctx.previousPreference);
    },

    // 3) 성공/실패 상관없이 서버 정합성 맞추기
    onSettled: (_data, _error, stockId) => {
      qc.invalidateQueries({ queryKey: ['bookmarkList'] });
      qc.invalidateQueries({ queryKey: ['bookmarkCount'] });
      qc.invalidateQueries({ queryKey: ['stockPreference', stockId] });
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
    onMutate: async (stockId) => {
      await qc.cancelQueries(['stockPreference', stockId]);
      const previousPreference = qc.getQueryData(['stockPreference', stockId]);

      // 낙관적 업데이트: 알림 상태 즉시 토글
      qc.setQueryData(['stockPreference', stockId], (old: any) => ({
        ...old,
        isNotificationOn: !old?.isNotificationOn,
      }));

      return { previousPreference };
    },
    onError: (_err, stockId, ctx) => {
      // 실패 시 롤백
      if (ctx?.previousPreference) {
        qc.setQueryData(['stockPreference', stockId], ctx.previousPreference);
      }
    },
    onSuccess: (_data, stockId) => {
      qc.invalidateQueries(['bookmarkList']);
      qc.invalidateQueries(['stockPreference', stockId]);
    },
  });
};
