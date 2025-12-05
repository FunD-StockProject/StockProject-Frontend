import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryOptions } from '@controllers/common/query';
import {
  BookmarkItem,
  PreferenceStockResponse,
  fetchAddBookmark,
  fetchBookmarkCount,
  fetchBookmarkList,
  fetchDeleteBookmark,
  fetchHideStock,
  fetchStockPreference,
  fetchToggleNotification,
  fetchUnhideStock,
} from './api';

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
  return useQuery<PreferenceStockResponse>(['stockPreference', stockId], () => fetchStockPreference(stockId!), {
    ...queryOptions,
    enabled: !!stockId && !!localStorage.getItem('access_token'),
  });
};

// ----- Mutations -----

export const useAddBookmarkMutation = () => {
  const qc = useQueryClient();

  return useMutation((stockId: number | string) => fetchAddBookmark(stockId), {
    // 1) 낙관적 업데이트: UI 즉시 반영
    onMutate: async (stockId) => {
      await qc.cancelQueries(['bookmarkList']);
      await qc.cancelQueries(['stockPreference', stockId]);

      const previousList = qc.getQueryData<BookmarkItem[]>(['bookmarkList']);
      const previousCount = qc.getQueryData<number>(['bookmarkCount']);
      const previousPreference = qc.getQueryData(['stockPreference', stockId]);

      // stockPreference 즉시 업데이트
      qc.setQueryData(['stockPreference', stockId], (old: any) => ({
        ...old,
        isBookmarked: true,
      }));

      // 카운트 증가 (있다면)
      if (typeof previousCount === 'number') {
        qc.setQueryData(['bookmarkCount'], previousCount + 1);
      }

      // 리스트에 추가 (기본 정보만 - 서버에서 정확한 데이터는 onSettled에서 받아옴)
      // 주의: BookmarkItem의 모든 필드를 모르면 부분적으로만 추가
      // qc.setQueryData<BookmarkItem[]>(['bookmarkList'], (old = []) => [
      //   ...old,
      //   {
      //     stockId: Number(stockId),
      //     ...other fields...
      //   },
      // ]);

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

export const useDeleteBookmarkMutation = () => {
  const qc = useQueryClient();

  return useMutation((stockId: number | string) => fetchDeleteBookmark(stockId), {
    // 1) 낙관적 업데이트: UI 즉시 반영
    onMutate: async (stockId) => {
      await qc.cancelQueries(['bookmarkList']);
      await qc.cancelQueries(['stockPreference', stockId]);

      const previousList = qc.getQueryData<BookmarkItem[]>(['bookmarkList']);
      const previousCount = qc.getQueryData<number>(['bookmarkCount']);
      const previousPreference = qc.getQueryData(['stockPreference', stockId]);

      // 리스트에서 해당 아이템 제거
      qc.setQueryData<BookmarkItem[]>(['bookmarkList'], (old = []) => old.filter((s) => s.stockId !== Number(stockId)));

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

export const useHideStockMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => fetchHideStock(stockId), {
    onSuccess: () => {
      // 숨김 리스트를 따로 만들 경우 여기에 invalidate 추가
      qc.invalidateQueries({ queryKey: ['hideStocks'] });
    },
  });
};

export const useUnhideStockMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => fetchUnhideStock(stockId), {
    onSuccess: () => {
      // 숨김 리스트를 따로 만들 경우 여기에 invalidate 추가
      qc.invalidateQueries(['hideStocks']);
    },
  });
};

export const useToggleNotificationMutation = () => {
  const qc = useQueryClient();

  return useMutation((stockId: number) => fetchToggleNotification(stockId), {
    onMutate: async (stockId) => {
      await qc.cancelQueries(['stockPreference', stockId]);
      const previousPreference = qc.getQueryData(['stockPreference', stockId]);

      // 낙관적 업데이트: 알림 상태 즉시 토글
      qc.setQueryData(['stockPreference', stockId], (old: any) => ({
        ...old,
        isNotificationOn: !old?.isNotificationOn,
      }));

      qc.setQueryData(['bookmarkList'], (old: any) =>
        old.map((e: BookmarkItem) => (e.stockId === stockId ? { ...e, isNotificationOn: !e.isNotificationOn } : e)),
      );

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
