import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { queryOptions } from '@controllers/common/query';
import { ShortViewItem, fetchShortview } from './api';
import { mockShortViewItems } from './mock';

const SHORTVIEW_ITEMS_KEY = ['shortview'] as const;
const SHORTVIEW_IDX_KEY = ['shortview', 'currentIdx'] as const;
const SHORTVIEW_SEEN_KEY = ['shortview', 'seen'] as const;

export const useShortViewQuery = ({ useMock = false }: { useMock?: boolean }) => {
  const queryClient = useQueryClient();

  const [currentIdx, _setCurrentIdx] = useState<number>(() => {
    return queryClient.getQueryData<number>(SHORTVIEW_IDX_KEY) ?? 0;
  });

  const setCurrentIdx = useCallback(
    (updater: number | ((prev: number) => number), len: number) => {
      _setCurrentIdx((prev) => {
        const rawNext = typeof updater === 'function' ? (updater as (p: number) => number)(prev) : updater;
        const next = Math.max(0, Math.min(rawNext, len)); // ✅ 0~len inclusive
        queryClient.setQueryData(SHORTVIEW_IDX_KEY, next);
        return next;
      });
    },
    [queryClient],
  );

  // ===== items query(초기 로딩 + 캐시 배열 유지) =====
  const enabled = useMock ? true : !!localStorage.getItem('access_token');

  const query = useQuery<ShortViewItem[]>(
    SHORTVIEW_ITEMS_KEY,
    () => (useMock ? mockShortViewItems : fetchShortview()),
    {
      ...queryOptions,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      enabled: useMock ? true : !!localStorage.getItem('access_token'),
      onSuccess: (data) => {
        queryClient.setQueryData<ShortViewItem[]>(SHORTVIEW_ITEMS_KEY, (prev = []) => {
          const seen = new Set(prev.map((x) => x.stockId));
          const next = [...prev];

          for (const item of data) {
            if (seen.has(item.stockId)) continue;
            seen.add(item.stockId);
            next.push(item);
          }

          queryClient.setQueryData<Set<number>>(SHORTVIEW_SEEN_KEY, (prev = new Set<number>()) => {
            return new Set([...prev, ...seen]);
          });

          return next;
        });
      },
    },
  );

  const items: ShortViewItem[] = query.data ?? [];
  const len = items.length;

  const setNextIndex = useCallback(() => {
    setCurrentIdx((prev) => (prev < len ? prev + 1 : prev), len);
  }, [len, setCurrentIdx]);

  const setPrevIndex = useCallback(() => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : prev), len);
  }, [len, setCurrentIdx]);

  const isFetchTarget = len === 0 ? false : currentIdx >= len - 2;

  const removeItem = useCallback(() => {
    console.log('remove');
    queryClient.setQueryData<ShortViewItem[] | undefined>(SHORTVIEW_ITEMS_KEY, (prev) => {
      const list = prev ? [...prev] : [];
      if (list.length === 0) return list;

      const idx = currentIdx;
      if (idx < 0 || idx >= list.length) return list;

      list.splice(idx, 1);
      return list;
    });
  }, [currentIdx, queryClient]);

  const appendItem = useCallback(
    (item: ShortViewItem) => {
      queryClient.setQueryData<ShortViewItem[] | undefined>(SHORTVIEW_ITEMS_KEY, (prev) => {
        const list = prev ? [...prev] : [];
        list.splice(currentIdx, 0, item);

        return list;
      });
    },
    [currentIdx, queryClient],
  );

  // ===== fetchMore: 최대 10번 재시도, unique 1개라도 나오면 append하고 종료 =====
  const fetchingRef = useRef(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const TRYS = 10;

  const fetchMore = useCallback(async () => {
    if (!enabled) return { added: 0, tries: 0 };
    if (fetchingRef.current) return { added: 0, tries: 0 };

    fetchingRef.current = true;
    setIsFetchingMore(true);

    try {
      let tries = 0;

      while (tries < TRYS) {
        tries++;

        const raw = useMock ? mockShortViewItems : await fetchShortview();

        // 현재 캐시 기준으로 seen 만들기
        const current = queryClient.getQueryData<ShortViewItem[]>(SHORTVIEW_ITEMS_KEY) ?? [];
        const seen = queryClient.getQueryData<Set<number>>(SHORTVIEW_SEEN_KEY) ?? new Set<number>();

        // 새로 받은 것 중 중복 아닌 것만 남김
        const unique = raw.filter((it) => !seen.has(it.stockId));

        if (unique.length > 0) {
          queryClient.setQueryData<ShortViewItem[]>(SHORTVIEW_ITEMS_KEY, [...current, ...unique]);
          queryClient.setQueryData<Set<number>>(SHORTVIEW_SEEN_KEY, (prev = new Set<number>()) => {
            return new Set([...prev, ...unique.map((x) => x.stockId)]);
          });
          return { added: unique.length, tries };
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      return { added: 0, tries: TRYS };
    } finally {
      fetchingRef.current = false;
      setIsFetchingMore(false);
    }
  }, [enabled, queryClient, useMock]);

  useEffect(() => {
    if (!isFetchTarget) return;

    fetchMore();
  }, [isFetchTarget]);

  const isAtEnd = currentIdx >= items.length - 1;

  // 컴포넌트에서 쓰기 편하게 current item도 제공(선택)
  const currentItem = useMemo(() => {
    if (currentIdx < 0 || currentIdx >= items.length) return null;
    return items[currentIdx];
  }, [currentIdx, items]);

  return {
    ...query,
    data: items,

    currentIdx,
    currentItem,
    isAtEnd,

    setNextIndex,
    setPrevIndex,

    removeItem,
    appendItem,

    fetchMore, // ✅ 버튼으로 강제 호출
    isFetchingMore, // ✅ 버튼 disabled 등에 사용
  };
};
