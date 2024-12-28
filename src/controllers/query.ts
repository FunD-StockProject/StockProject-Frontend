import { useQuery } from 'react-query';
import { KOREA, OVERSEA } from '@ts/Constants';
import { StockType } from '@ts/Types';
import { PERIOD_CODE, RevelantStockInfo } from '@controllers/api.Type';
import {
  fetchDescentStocks,
  fetchHotStocks,
  fetchKeywords,
  fetchRealStockInfo,
  fetchRelevant,
  fetchRisingStocks,
  fetchScore,
  fetchSearchSymbolName,
  fetchStockChart,
  fetchStockTable,
} from './api';
import { StockInfo } from './api.Type';

export const queryOptions = {
  // retry: 5, // 실패 시 반복 횟수 - 기본 3
  staleTime: 1000, // 다시 fetch 보내려 할때 해당 시간 이내이면 굳이 fetch 다시 하지 않음
};

export const SearchSymbolNameQuery = (name: string, country: string) => {
  return useQuery<StockInfo>(['searchSymbolByName', name], () => fetchSearchSymbolName(name, country), queryOptions);
};

export const StockRelevantQuery = (id: number) => {
  return useQuery<RevelantStockInfo>(['searchRelevangStockById', id], () => fetchRelevant(id), queryOptions);
};

const StockFetchers = {
  HOT: fetchHotStocks,
  RISING: fetchRisingStocks,
  DESCENT: fetchDescentStocks,
};

export const StockFetchQuery = (type: StockType, index: number) => {
  return useQuery<any>([type + ' ' + index], () => StockFetchers[type](!index ? KOREA : OVERSEA), queryOptions);
};

export const ScoreQuery = (id: number, country: string) => {
  return useQuery<StockInfo>(['searchSymbolByName', id, country], () => fetchScore(id, country), queryOptions);
};

export const ChartQuery = (id: number, periodCode: PERIOD_CODE, startDate: string) => {
  return useQuery<StockInfo>(['chartInfo', id, periodCode, startDate], () => fetchStockChart(id, periodCode, startDate), queryOptions);
};

export const RealStockInfoQuery = (id: number, country: string) => {
  return useQuery<StockInfo>(['realStockInfo', id, country], () => fetchRealStockInfo(id, country), queryOptions);
};

export const KeywordsQuery = () => {
  return useQuery<string[]>(['keywords'], () => fetchKeywords(), queryOptions);
};

export const StockTableQuery = () => {
  return useQuery<any>(['stockTable'], () => fetchStockTable(), queryOptions);
  // 추후 타입 픽스되면 수정 필요
};
