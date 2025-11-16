import { StockCountryKey } from '@ts/StockCountry';
import { fetchAuthData } from './base';

export const postBuyExperiment = (stockId: number | string, country: StockCountryKey) =>
  fetchAuthData(`/experiment/${stockId}/buy/${country}`, { method: 'POST' });

export const fetchExperiment = () => fetchAuthData(`/experiment`);

export const fetchReport = () => fetchAuthData('portfolio/report');

export const fetchResult = () => fetchAuthData('portfolio/result');
