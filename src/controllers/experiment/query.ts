import { useMutation, useQueryClient } from 'react-query';
import { StockCountryKey } from '@ts/StockCountry';
import { fetchBuyExperiment } from './api';

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
