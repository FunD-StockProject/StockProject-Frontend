import { WordFrequency } from '@ts/Interfaces';
import { STOCK_COUNTRY } from '@ts/Types';
import { PERIOD_CODE, PopularStocks, StockDetailInfo } from '../api.Type';
import {
  fetchChartMock,
  fetchIndexScoreMock,
  fetchKeywordsMock,
  fetchPopularStocksMock,
  fetchRelevantMock,
  fetchScoreCardMock,
  fetchScoreMock,
  fetchSearchSymbolNameMock,
  fetchSearchWordCloudMock,
} from '../mock';
import { enableMock, fetchData } from './base';

export const fetchScore = async (id: number, country: string) => {
  if (enableMock) return fetchScoreMock;
  return fetchData(`/${id}/score/${country}`);
};

export const fetchRelevant = async (id: number) => {
  if (enableMock) return fetchRelevantMock;
  return fetchData(`/stock/${id}/relevant`);
};

export const fetchHotStocks = async (country: string) => {
  return fetchData(`/stock/hot/${country}`);
};

export const fetchRisingStocks = async (country: string) => {
  if (enableMock) return fetchScoreCardMock;
  return fetchData(`/stock/rising/${country}`);
};

export const fetchDescentStocks = async (country: string) => {
  if (enableMock) return fetchScoreCardMock;
  return fetchData(`/stock/descent/${country}`);
};

export const fetchSearchSymbolName = (symbolname: string, country: STOCK_COUNTRY): Promise<StockDetailInfo> => {
  if (enableMock) return Promise.resolve(fetchSearchSymbolNameMock);
  return fetchData(`/stock/search/${symbolname}/${country}`);
};

export const fetchRealStockInfo = (stockId: number, country: STOCK_COUNTRY) => {
  return fetchData(`/stock/${stockId}/info/${country}`);
};

export const fetchKeywords = (country: string): Promise<string[]> => {
  if (enableMock) return Promise.resolve(fetchKeywordsMock);
  return fetchData(`/keyword/popular/${country}`);
};

export const fetchStockTable = (category: string, country: string) => {
  return fetchData(`/stock/category/${category}/${country}`);
};

export const fetchIndexScore = () => {
  if (enableMock) return fetchIndexScoreMock;
  return fetchData(`/score/index`);
};

export const fetchStockSummary = (symbol: string, country: STOCK_COUNTRY) => {
  return fetchData(`/stock/summary/${symbol}/${country}`);
};

export const fetchSearchWordCloud = (symbol: string, country: string): Promise<WordFrequency[]> => {
  if (enableMock) return Promise.resolve(fetchSearchWordCloudMock);
  return fetchData(`/wordcloud/${symbol}/${country}`);
};

export const fetchStockChart = async (id: number, periodCode: PERIOD_CODE, startDate: string, endDate: string) => {
  if (enableMock) return fetchChartMock;
  return fetchData(`/stock/${id}/chart/{country}?periodCode=${periodCode}&startDate=${startDate}&endDate=${endDate}`);
};

export const fetchAutoComplete = (name: string) => {
  return fetchData(`/stock/autocomplete?keyword=${name}`);
};

export const fetchSearchKeyword = (keywordName: string) => {
  return fetchData(`/keyword/${keywordName}/stocks`);
};

export const fetchPopularStocks = (): Promise<PopularStocks[]> => {
  if (enableMock) return Promise.resolve(fetchPopularStocksMock as PopularStocks[]);
  return fetchData(`/stock/rankings/hot`);
};

export const fetchPopularKeywords = (): Promise<string[]> => {
  return fetchData('/keyword/rankings');
};
