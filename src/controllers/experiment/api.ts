import { StockCountryKey } from '@ts/StockCountry';
import { fetchAuthData } from '@controllers/api';

interface BuyExperimentResponse {
  success: boolean;
  message: string;
  price: number;
}

// POST /experiment/{stockId}/buy/{country}
export const fetchBuyExperiment = (stockId: number, country: StockCountryKey): Promise<BuyExperimentResponse> => {
  return fetchAuthData(`/experiment/${stockId}/buy/${country}`, { method: 'POST' });
};
