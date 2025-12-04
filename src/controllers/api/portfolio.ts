import { StockCountryKey } from '@ts/StockCountry';
import { fetchAuthData } from './base';

export const postBuyExperiment = (stockId: number | string, country: StockCountryKey) =>
  fetchAuthData(`/experiment/${stockId}/buy/${country}`, { method: 'POST' });

export const fetchExperiment = () => fetchAuthData(`/experiment/status`);

export const fetchExperimentStatusDetail = (experimentId: number) =>
  fetchAuthData(`/experiment/status/${experimentId}/detail`);


export const fetchReport = () => fetchAuthData('/experiment/report');

export const fetchSectorRecommend = (country: StockCountryKey, sector: string) => fetchAuthData(`/stock/sector/${country === 'KOREA' ? 'domestic' : 'overseas'}/${sector}/recommend`);