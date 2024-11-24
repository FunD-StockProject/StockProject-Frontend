import { useQuery } from 'react-query';
import { StockType } from '../ts/Types';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../controllers/api';
import { CardInterface } from '../ts/Interfaces';
import { KOREA, OVERSEA } from '../ts/Constants';

export const useStocks = (type: StockType) => {
  const fetchStocks = async (type: StockType): Promise<CardInterface[][]> => {
    const stockFetchers: Record<StockType, Promise<CardInterface[][]>> = {
      hot: Promise.all([fetchHotStocks(KOREA), fetchHotStocks(OVERSEA)]),
      rising: Promise.all([fetchRisingStocks(KOREA), fetchRisingStocks(OVERSEA)]),
      descent: Promise.all([fetchDescentStocks(KOREA), fetchDescentStocks(OVERSEA)]),
    };

    return stockFetchers[type];
  };
  return useQuery<CardInterface[][]>([type], () => fetchStocks(type), {
    suspense: true,
  });
};
