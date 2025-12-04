import { useMutation, useQuery, useQueryClient } from 'react-query';
import { StockCountryKey } from '@ts/StockCountry';
import { StockDetailInfo } from '@controllers/api.Type';

import {
  fetchExperiment,
  fetchExperimentStatusDetail,
  fetchReport,
  fetchSectorRecommend,
  postBuyExperiment,
} from '@controllers/api/portfolio';
import { queryOptions } from './common';

export const useExperimentQuery = () => {
  return useQuery(['experiment'], fetchExperiment, queryOptions);
};

export const useExperimentStatusDetailQuery = (experimentId: number) => {
  return useQuery(['experimentDetail', experimentId], () => fetchExperimentStatusDetail(experimentId), queryOptions);
};

export const useReportQuery = () => {
  return useQuery(['bookmarkList'], fetchReport, queryOptions);
};

export const useSectorRecommendQuery = (country: StockCountryKey, sector: string) => {
  return useQuery<StockDetailInfo[]>(['sectorRecommend', country, sector], () => fetchSectorRecommend(country, sector), queryOptions);
};

// ----- Mutations -----
export const useBuyExperimentMutation = () => {
  const qc = useQueryClient();
  return useMutation(
    ({ stockId, country }: { stockId: number | string; country: StockCountryKey }) =>
      postBuyExperiment(stockId, country),
    {
      onSettled: () => {
        qc.invalidateQueries({ queryKey: ['experiment'] });
        qc.invalidateQueries({ queryKey: ['experiment'] });
      },
    },
  );
};
