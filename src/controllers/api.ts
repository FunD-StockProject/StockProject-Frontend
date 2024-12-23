import { PERIOD_CODE } from './api.Type';
import {
  fetchChartMock,
  fetchRelevantMock,
  fetchScoreCardMock,
  fetchScoreMock,
  fetchSearchSymbolNameMock,
  fetchSearchWordCloudMock,
} from './mock';

const baseURL = import.meta.env.VITE_BASE_URL;

const Headers = { 'content-type': 'application/json' };

const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

const enableMock = false;

const fetchData = async (path: string) => {
  try {
    const url = `${baseURL}${path}`;
    const res = await fetch(url, { method: 'GET', headers: Headers });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchScore = async (id: number, country: string) => {
  if (enableMock) return fetchScoreMock;
  return fetchData(`/${id}/score/${country}`);
};

const fetchRelevant = async (id: number) => {
  if (enableMock) return fetchRelevantMock;
  return fetchData(`/stock/${id}/relevant`);
};

const fetchStockChart = async (id: number, periodCode: PERIOD_CODE, startDate: string) => {
  if (enableMock) return fetchChartMock;
  return fetchData(`/stock/${id}/chart/{country}?periodCode=${periodCode}&startDate=${startDate}`);
};

const fetchHotStocks = async (country: string) => {
  // return fetchScoreCardMock;
  return fetchData(`/stock/hot/${country}`);
};

const fetchRisingStocks = async (country: string) => {
  if (enableMock) return fetchScoreCardMock;
  return fetchData(`/stock/rising/${country}`);
};

const fetchDescentStocks = async (country: string) => {
  if (enableMock) return fetchScoreCardMock;
  return fetchData(`/stock/descent/${country}`);
};
// Additional stock-related API calls
const fetchAutoComplete = (name: string) => {
  return fetchData(`/stock/autocomplete?keyword=${name}`);
};

const fetchSearchSymbolName = (symbolname: string, country: string) => {
  if (enableMock) return fetchSearchSymbolNameMock;
  console.log(country);
  return fetchData(`/stock/search/${symbolname}/${country}`);
};

const fetchSearchWordCloud = (symbol: string, country: string) => {
  if (enableMock) return fetchSearchWordCloudMock;
  return fetchData(`/wordcloud/${symbol}/${country}`);
};

const fetchRealStockInfo = (stockId: number, country: string) => {
  return fetchData(`/stock/${stockId}/info/${country}`);
};

export {
  fetchScore,
  fetchRelevant,
  fetchStockChart,
  fetchHotStocks,
  fetchRisingStocks,
  fetchDescentStocks,
  fetchAutoComplete,
  fetchSearchSymbolName,
  fetchSearchWordCloud,
  fetchRealStockInfo,
};
