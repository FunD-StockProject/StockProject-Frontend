import { useMutation, useQuery, useQueryClient } from 'react-query';
import { StockCountryKey } from '@ts/StockCountry';
import { fetchExperiment, fetchReport, fetchResult, postBuyExperiment } from '@controllers/api/portfolio';
import { queryOptions } from './common';

export const useExperimentQuery = () => {
  return useQuery(['bookmarkList'], fetchExperiment, queryOptions);
};

export const useReportQuery = () => {
  return useQuery(['bookmarkList'], fetchReport, queryOptions);
};

export const useResultQuery = () => {
  return useQuery(['bookmarkList'], fetchResult, queryOptions);
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
