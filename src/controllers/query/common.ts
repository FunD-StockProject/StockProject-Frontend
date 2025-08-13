import { StockType } from '@components/Common/Common.Type';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../api';

export const queryOptions = {
  // retry: 5,
  staleTime: 1000,
};

export const STOCK_FETCH_FUNCTIONS: Record<StockType, (country: string) => Promise<any>> = {
  HOT: fetchHotStocks,
  RISING: fetchRisingStocks,
  DESCENT: fetchDescentStocks,
};


