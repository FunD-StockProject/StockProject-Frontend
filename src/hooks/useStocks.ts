import { useQuery } from 'react-query';
import { StockType } from '@ts/Types';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../controllers/api';
import { CardInterface } from '../ts/Interfaces';

export const useStocks = (type: StockType) => {
  const fetchStocks = async (type: StockType): Promise<CardInterface[][]> => {
    const stockFetchers: Record<StockType, Promise<CardInterface[][]>> = {
      HOT: Promise.all([fetchHotStocks('KOREA'), fetchHotStocks('OVERSEA')]),
      RISING: Promise.all([fetchRisingStocks('KOREA'), fetchRisingStocks('OVERSEA')]),
      DESCENT: Promise.all([fetchDescentStocks('KOREA'), fetchDescentStocks('OVERSEA')]),
    };

    return stockFetchers[type];
  };
  return useQuery<CardInterface[][]>([type], () => fetchStocks(type), {
    suspense: true,
  });
};
