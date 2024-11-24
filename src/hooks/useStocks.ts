import { useQuery } from 'react-query';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../controllers/api';
import { CardInterface } from '../ts/Interfaces';
import { KOREA, OVERSEA } from '../ts/Constants';

export const useStocks = () => {
  const fetchStocks = async (): Promise<CardInterface[][][]> => {
    const hotStocks = Promise.all([fetchHotStocks(KOREA), fetchHotStocks(OVERSEA)]);
    const risingStocks = Promise.all([fetchRisingStocks(KOREA), fetchRisingStocks(OVERSEA)]);
    const descentStocks = Promise.all([fetchDescentStocks(KOREA), fetchDescentStocks(OVERSEA)]);

    return Promise.all([hotStocks, risingStocks, descentStocks]);
  };

  return useQuery<CardInterface[][][]>(['stocks'], fetchStocks, {
    suspense: true,
  });
};
