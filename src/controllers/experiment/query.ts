import { useMutation, useQuery, useQueryClient } from 'react-query';
import { StockCountryKey } from '@ts/StockCountry';
import { StockSectorKey } from '@ts/StockSector';
import { queryOptions } from '@controllers/common/query';
import {
  fetchBuyExperiment,
  fetchExperimentDetail,
  fetchExperimentReport,
  fetchExperimentStatus,
  fetchPortfolioResult,
  fetchSectorRecommend,
} from './api';

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

export const usePortfolioResultQuery = () => {
  return useQuery(['portfolioResult'], fetchPortfolioResult, {
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
        qc.invalidateQueries({ queryKey: ['experiment', 'experimentStatus'] });
      },
    },
  );
};

export const useSectorRecommendQuery = (country: StockCountryKey, sectorKey: StockSectorKey | undefined) => {
  return useQuery(['sectorRecommend', country, sectorKey], () => fetchSectorRecommend(country, sectorKey!), {
    ...queryOptions,
    enabled: !!country && !!sectorKey && !!localStorage.getItem('access_token'),
  });
};
