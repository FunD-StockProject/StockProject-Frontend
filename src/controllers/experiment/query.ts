import { useMutation, useQuery, useQueryClient } from 'react-query';
import { StockCountryKey } from '@ts/StockCountry';
import { queryOptions } from '@controllers/query';
import { fetchBuyExperiment, fetchExperimentDetail, fetchExperimentReport, fetchExperimentStatus } from './api';

// ----- Queries -----
export const useExperimentStatusQuery = () => {
  return useQuery(['experimentStatus'], fetchExperimentStatus, {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

export const useExperimentDetailQuery = (experimentId: number) => {
  return useQuery(['experimentDetail', experimentId], () => fetchExperimentDetail(experimentId), {
    ...queryOptions,
    enabled: !!experimentId && !!localStorage.getItem('access_token'),
  });
};

export const useExperimentReportQuery = () => {
  return useQuery(['experimentReport'], fetchExperimentReport, {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

// ----- Mutations -----
export const useBuyExperimentMutation = () => {
  const qc = useQueryClient();
  return useMutation(
    ({ stockId, country }: { stockId: number; country: StockCountryKey }) => fetchBuyExperiment(stockId, country),
    {
      onSettled: () => {
        qc.invalidateQueries({ queryKey: ['experiment'] });
      },
    },
  );
};
