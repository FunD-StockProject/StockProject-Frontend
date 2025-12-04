import { useEffect, useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import { StockCountryKey } from '@ts/StockCountry';
import { StockSectorKey } from '@ts/StockSector';
import { StockDetailInfo } from '@controllers/api.Type';
import { queryOptions } from '@controllers/query/common';
import { fetchAutoCompleteStock, fetchSectorRecommend, fetchStockInfo } from './api';

export const useStockInfoQuery = (stockId: number, country: StockCountryKey) => {
  return useQuery(['stockInfo', stockId, country], () => fetchStockInfo(stockId, country), {
    ...queryOptions,
    enabled: !!stockId && !!country,
  });
};

export const stockInfoQueries = (stocks: StockDetailInfo[]) => {
  return useQueries(
    (stocks ?? []).map((stock) => ({
      queryKey: ['stockInfo', stock.stockId, stock.country],
      queryFn: () => fetchStockInfo(stock.stockId, stock.country), // API 함수 직접 사용
      enabled: !!stock,
    })),
  );
};

// 디바운스 훅
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 값이 바뀌면 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useAutoCompleteStockQuery = (input: string) => {
  const value = input.trim();

  // 1초(1000ms) 디바운스
  const debouncedValue = useDebounce(value, 250);

  return useQuery(['autocomplete', debouncedValue], () => fetchAutoCompleteStock(debouncedValue), {
    ...queryOptions,
    staleTime: 60000,
    cacheTime: 10000,
    enabled: !!debouncedValue,
    keepPreviousData: true,
  });
};

export const useSectorRecommendQuery = (country: StockCountryKey, sectorKey: StockSectorKey | undefined) => {
  return useQuery(['sectorRecommend', country, sectorKey], () => fetchSectorRecommend(country, sectorKey!), {
    ...queryOptions,
    enabled: !!country && !!sectorKey && !!localStorage.getItem('access_token'),
  });
};
