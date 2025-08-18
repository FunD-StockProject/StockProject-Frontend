import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryOptions } from './common';
import { deleteBookmark, deleteHide, fetchBookmarkCount, fetchBookmarkList, postBookmark, postHide } from '@controllers/api/favorites';


// ----- Queries -----
export const useBookmarkListQuery = () => {
  return useQuery(['bookmarkList'], fetchBookmarkList, queryOptions);
};

export const useBookmarkCountQuery = () => {
  return useQuery<number>(['bookmarkCount'], fetchBookmarkCount, queryOptions);
};

// ----- Mutations -----
export const useAddBookmarkMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => postBookmark(stockId), {
    onSuccess: () => {
      qc.invalidateQueries(['bookmarkList']);
      qc.invalidateQueries(['bookmarkCount']);
    },
  });
};

export const useRemoveBookmarkMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => deleteBookmark(stockId), {
    onSuccess: () => {
      qc.invalidateQueries(['bookmarkList']);
      qc.invalidateQueries(['bookmarkCount']);
    },
  });
};

export const useAddHideMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => postHide(stockId), {
    onSuccess: () => {
      // 숨김 리스트를 따로 만들 경우 여기에 invalidate 추가
      qc.invalidateQueries(['bookmarkList']);
    },
  });
};

export const useRemoveHideMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => deleteHide(stockId), {
    onSuccess: () => {
      // 숨김 리스트를 따로 만들 경우 여기에 invalidate 추가
      qc.invalidateQueries(['bookmarkList']);
    },
  });
};
