import { WordFrequency } from '@ts/Interfaces';
import { STOCK_COUNTRY } from '@ts/Types';
import { PERIOD_CODE, PopularStocks } from './api.Type';
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
} from './mock';

const baseURL = import.meta.env.VITE_BASE_URL;
// const baseURL = '/api';
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

const fetchSearchSymbolName = (symbolname: string, country: STOCK_COUNTRY) => {
  if (enableMock) return fetchSearchSymbolNameMock;
  return fetchData(`/stock/search/${symbolname}/${country}`);
};

const fetchRealStockInfo = (stockId: number, country: STOCK_COUNTRY) => {
  return fetchData(`/stock/${stockId}/info/${country}`);
};

const fetchKeywords = (country: string): Promise<string[]> => {
  if (enableMock) return Promise.resolve(fetchKeywordsMock);
  return fetchData(`/keyword/popular/${country}`);
};

const fetchStockTable = (category: string, country: string) => {
  return fetchData(`/stock/category/${category}/${country}`);
};

const fetchIndexScore = () => {
  if (enableMock) return fetchIndexScoreMock;
  return fetchData(`/score/index`);
};

// SearchTitle

const fetchStockSummary = (symbol: string, country: STOCK_COUNTRY) => {
  return fetchData(`/stock/summary/${symbol}/${country}`);
};

// WordCloud

const fetchSearchWordCloud = (symbol: string, country: string): Promise<WordFrequency[]> => {
  if (enableMock) return Promise.resolve(fetchSearchWordCloudMock);
  return fetchData(`/wordcloud/${symbol}/${country}`);
};

// Chart

const fetchStockChart = async (id: number, periodCode: PERIOD_CODE, startDate: string, endDate: string) => {
  if (enableMock) return fetchChartMock;
  return fetchData(`/stock/${id}/chart/{country}?periodCode=${periodCode}&startDate=${startDate}&endDate=${endDate}`);
};

// SearchBar

const fetchAutoComplete = (name: string) => {
  return fetchData(`/stock/autocomplete?keyword=${name}`);
};

const fetchSearchKeyword = (keywordName: string) => {
  return fetchData(`/keyword/${keywordName}/stocks`);
};

const fetchPopularStocks = (): Promise<PopularStocks[]> => {
  if (enableMock) return Promise.resolve(fetchPopularStocksMock as PopularStocks[]);
  return fetchData(`/stock/rankings/hot`);
};

const fetchPopularKeywords = (): Promise<string[]> => {
  return fetchData('/keyword/rankings');
};

// OAuth2

const fetchLoginKakao = (code: string, state: string) => {
  console.log(encodeURIComponent(code));
  console.log(encodeURIComponent(state));
  console.log(new Date().toDateString());
  return fetchData(`/auth/login/kakao?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`);
};

const fetchAuthRegister = async (
  email: string,
  nickname: string,
  birth_date: Date,
  marketing_agreement: boolean,
  provider: string,
) => {
  try {
    const url = `${baseURL}/auth/register`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        nickname,
        birth_date: `${birth_date.getFullYear()}-${String(birth_date.getMonth() + 1).padStart(2, '0')}-${String(birth_date.getDate()).padStart(2, '0')}`,
        marketing_agreement,
        provider,
      }),
      headers: Headers,
    });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    throw error;
  }
};

const fetchAuthWithdraw = async () => {
  console.log(3, localStorage.getItem('access_token'));
  try {
    const url = `${baseURL}/auth/withdraw`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...Headers,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    throw error;
  }
};

const fetchAuthLogout = async () => {
  try {
    const url = `${baseURL}/auth/logout`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'value = refresh_token': localStorage.getItem('refresh_token'),
      }),
      headers: {
        ...Headers,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    throw error;
  }
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
  fetchKeywords,
  fetchStockTable,
  fetchIndexScore,
  fetchSearchKeyword,
  fetchPopularStocks,
  fetchPopularKeywords,
  fetchStockSummary,
  fetchLoginKakao,
  fetchAuthRegister,
  fetchAuthLogout,
  fetchAuthWithdraw,
};
