import { useQuery } from 'react-query';
import { StockType } from '@components/Common/Common.Type';
import { StockScore } from '@controllers/api.Type';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../controllers/api';

export const useStocks = (type: StockType) => {
  const fetchStocks = async (type: StockType): Promise<StockScore[][]> => {
    const stockFetchers: Record<StockType, Promise<StockScore[][]>> = {
      HOT: Promise.all([fetchHotStocks('KOREA'), fetchHotStocks('OVERSEA')]),
      RISING: Promise.all([fetchRisingStocks('KOREA'), fetchRisingStocks('OVERSEA')]),
      DESCENT: Promise.all([fetchDescentStocks('KOREA'), fetchDescentStocks('OVERSEA')]),
    };

    return stockFetchers[type];
  };
  return useQuery<StockScore[][]>([type], () => fetchStocks(type), {
    suspense: true,
  });
};
