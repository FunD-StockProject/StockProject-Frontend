import { STOCK_TYPE } from '@ts/Types';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../api';

export const queryOptions = {
  // retry: 5,
  staleTime: 1000,
};

export const STOCK_FETCH_FUNCTIONS: Record<STOCK_TYPE, (country: string) => Promise<any>> = {
  HOT: fetchHotStocks,
  RISING: fetchRisingStocks,
  DESCENT: fetchDescentStocks,
  RELATED: () => Promise.resolve([]),
};
