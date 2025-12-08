import { useQuery } from 'react-query';
import { queryOptions } from '@controllers/common/query';
import { fetchIndexScore } from './api';

export const useIndexScoreQuery = () => {
  return useQuery(['indexScore'], () => fetchIndexScore(), {
    ...queryOptions,
  });
};
