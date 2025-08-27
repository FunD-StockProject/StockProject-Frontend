import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryOptions } from './common';
import { fetchShortviewFeed, postShortViewBuy, postShortViewHide } from '@controllers/api/shortview';

export const useBookmarkCountQuery = () => {
  return useQuery(['shortview'], fetchShortviewFeed, {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

export const useShortViewHideMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => postShortViewHide(stockId), {
    onSuccess: () => {
      qc.invalidateQueries(['shortview']);
    },
  });
};

export const useShortViewBuyMutation = () => {
  const qc = useQueryClient();
  return useMutation((stockId: number) => postShortViewBuy(stockId), {
    onSuccess: () => {
      qc.invalidateQueries(['shortview']);
    },
  });
};
