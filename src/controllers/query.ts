import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { CHART_MOVING_AVERAGE_COLOR, CHART_PRICE_FIELD } from '@ts/Constants';
import { STOCK_COUNTRY } from '@ts/Types';
import { formatDateISO, formatLocalDateToDate } from '@utils/Date';
import { StockType } from '@components/Common/Common.Type';
import {
  AutoCompleteItem,
  IndexInfo,
  PERIOD_CODE,
  PopularItems,
  StockInfo,
  StockTableInfo,
} from '@controllers/api.Type';
import {
  fetchDescentStocks,
  fetchHotStocks,
  fetchIndexScore,
  fetchKeywords,
  fetchPopularKeywords,
  fetchPopularStocks,
  fetchRelevant,
  fetchRisingStocks,
  fetchScore,
  fetchSearchKeyword,
  fetchSearchSymbolName,
  fetchSearchWordCloud,
  fetchStockChart,
  fetchStockSummary,
  fetchStockTable,
} from './api';
import { StockDetailInfo } from './api.Type';

export const getQueryOptions = (...params: any[]) => ({
  // retry: 5, // 실패 시 반복 횟수 - 기본 3
  staleTime: 1000, // 일정 시간 내 재요청 방지
  enabled: params.every((param) => param !== null && param !== undefined && param !== 0),
});

const StockFetchers = {
  HOT: fetchHotStocks,
  RISING: fetchRisingStocks,
  DESCENT: fetchDescentStocks,
};

// 📌 SymbolName 조회
export const SearchSymbolNameQuery = (name: string, country: STOCK_COUNTRY) => {
  return useQuery<StockDetailInfo>(
    ['symbolName', name, country],
<<<<<<< HEAD
    () => fetchSearchSymbolName(name, country),
    queryOptions,
=======
    async () => fetchSearchSymbolName(name, country),
    getQueryOptions(name, country),
>>>>>>> b3de1b4877a20fc89a873b2b9ea96a52b10a413a
  );
};

// 📌 주식 데이터 조회
export const StockFetchQuery = (type: StockType, country: STOCK_COUNTRY) => {
  return useQuery<StockInfo[]>(
    ['searchStocks', type, country],
    async () => StockFetchers[type](country),
    getQueryOptions(type, country),
  );
};

// 📌 점수 조회
export const ScoreQuery = (id: number, country: string) => {
<<<<<<< HEAD
  return useQuery<StockDetailInfo>(['score', id, country], () => fetchScore(id, country), queryOptions);
=======
  return useQuery<{ score: number }>(
    ['score', id, country],
    async () => fetchScore(id, country),
    getQueryOptions(id, country),
  );
>>>>>>> b3de1b4877a20fc89a873b2b9ea96a52b10a413a
};

// 📌 차트 조회
export const ChartQuery = (id: number, periodCode: PERIOD_CODE, startDate: string) => {
  return useQuery<StockDetailInfo>(
    ['chartInfo', id, periodCode, startDate],
    async () => fetchStockChart(id, periodCode, startDate, '2025-12-30'),
    getQueryOptions(id, periodCode, startDate),
  );
};

<<<<<<< HEAD
=======
// 📌 키워드 조회
>>>>>>> b3de1b4877a20fc89a873b2b9ea96a52b10a413a
export const KeywordsQuery = (country: string) => {
  return useQuery<string[]>(['keywords', country], async () => fetchKeywords(country), getQueryOptions(country));
};

// 📌 테이블 데이터 조회
export const StockTableQuery = (category: string, country: string) => {
  return useQuery<StockTableInfo[]>(
    ['stockTable', category, country],
    async () => fetchStockTable(category, country),
    getQueryOptions(category, country),
  );
};

// 📌 인덱스 점수 조회
export const IndexScoreQuery = () => {
  return useQuery<IndexInfo>(['indexScore'], async () => fetchIndexScore(), getQueryOptions(true));
};

// 📌 키워드 검색 조회
export const KeywordsStocksQuery = (keywordName: string) => {
<<<<<<< HEAD
  return useQuery<string[]>(['keywordsStocks', keywordName], () => fetchSearchKeyword(keywordName), queryOptions);
};

// SearchTitle
export const StockSummaryQuery = (symbol: string, country: STOCK_COUNTRY) => {
  const { data = [] } = useQuery<string[]>(
    ['stockSummary', symbol, country],
    () => fetchStockSummary(symbol, country),
    queryOptions,
=======
  return useQuery<string[]>(
    ['keywordsStocks', keywordName],
    async () => fetchSearchKeyword(keywordName),
    getQueryOptions(keywordName),
>>>>>>> b3de1b4877a20fc89a873b2b9ea96a52b10a413a
  );
};

<<<<<<< HEAD
// SearchRelevant
export const StockRelevantQuery = (id: number) => {
  const { data } = useQuery<StockInfo[]>(['relevant', id], () => fetchRelevant(id), {
    ...queryOptions,
    enabled: id != undefined,
  });

  return [data];
=======
// 📌 종목 요약 조회
export const StockSummaryQuery = (symbol: string, country: STOCK_COUNTRY) => {
  return useQuery<string[]>(
    ['stockSummary', symbol, country],
    async () => fetchStockSummary(symbol, country),
    getQueryOptions(symbol, country),
  );
};

// 📌 연관 종목 조회
export const StockRelevantQuery = (id?: number) => {
  return useQuery<StockInfo[]>(['relevant', id], async () => (id ? fetchRelevant(id) : []), getQueryOptions(id));
>>>>>>> b3de1b4877a20fc89a873b2b9ea96a52b10a413a
};

// WordCloud

const WordCloudWorker = new Worker(new URL('@utils/worker/GenerateWordCloud.ts', import.meta.url), {
  type: 'module',
});

export const WordCloudQuery = (symbol: string, country: STOCK_COUNTRY, { width, height }: any, isMobile: boolean) => {
  const [wordCloud, setWordCloud] = useState<any>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(['WordCloudQuery', symbol, 0, 0], []);
    WordCloudWorker.onmessage = ({ data: { symbol, layouts, height, width } }: any) => {
      queryClient.setQueryData(['WordCloudQuery', symbol, width, height], layouts);
      setWordCloud(layouts);
    };
  }, []);

  useEffect(() => {
    const queryData = queryClient.getQueryData(['WordCloudQuery', symbol, width, height]);

    if (!queryData) {
      fetchSearchWordCloud(symbol, country).then((res) => {
        WordCloudWorker.postMessage({
          symbol,
          data: res,
          width,
          height,
          isMobile,
        });
      });

      return;
    }
    setWordCloud(queryData);
  }, [symbol, width, height]);

  return [wordCloud];
};

// StockChart

export const StockChartQuery = (stockId: number, period: string) => {
  const [chartData, setChartData] = useState<any>([]);
  const [lastDate, setLastDate] = useState<string>('');
  const firstDate = '1970-01-01';

  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData<{
    lastDate: string;
    priceInfos: any[];
    chartData: any[];
  }>(['StockChart', stockId, period]);

  const formatChartData = (priceInfos: any[], chartData: any[], length: number) => {
    const newChartData = [
      ...Array.from(
        {
          length: length,
        },
        () => ({}),
      ),
      ...chartData,
    ];
    const updateLength = length + Object.keys(CHART_MOVING_AVERAGE_COLOR).reduce((acc, e) => Math.max(acc, ~~e), 0);

    priceInfos.some((e, i, arr) => {
      if (i >= updateLength) return;
      newChartData[i] = {
        date: formatLocalDateToDate(e.localDate),
        price: Object.fromEntries(
          Object.entries(CHART_PRICE_FIELD).map(([key, value]) => [
            key,
            {
              value: Number(e[value.key]),
              delta: i ? Number(e[value.key]) / Number(arr[i - 1].closePrice) - 1 : 0,
            },
          ]),
        ),
        SMA: Object.fromEntries(
          Object.keys(CHART_MOVING_AVERAGE_COLOR).map((range) => [
            range,
            {
              price:
                Array.from(
                  {
                    length: Math.min(~~range, i + 1),
                  },
                  (_, j) => Number(arr[i - j].closePrice),
                ).reduce((acc, e) => acc + e) / Math.min(~~range, i + 1),
            },
          ]),
        ),
        score: {
          value: e.score,
          delta: e.diff,
        },
        trading: {
          value: e.accumulatedTradingValue,
          volume: e.accumulatedTradingVolume,
          delta: i ? Number(e.accumulatedTradingVolume) / Number(arr[i - 1].accumulatedTradingVolume) - 1 : 0,
        },
      };
    });

    return newChartData;
  };

  const fetchData = async ({
    lastDate,
    priceInfos,
    chartData,
  }: {
    lastDate: string;
    priceInfos: any[];
    chartData: any[];
  }) => {
    fetchStockChart(stockId, period as PERIOD_CODE, firstDate, lastDate).then((e) => {
      const newPriceInfos = [...[...e.priceInfos].reverse(), ...priceInfos];
      const lastPriceDate = formatLocalDateToDate(newPriceInfos[0].localDate);
      if (['D', 'W'].includes(period)) lastPriceDate.setDate(lastPriceDate.getDate() - 1);
      else if (period == 'M') {
        lastPriceDate.setMonth(lastPriceDate.getMonth() - 1);
      }
      const newChartData = formatChartData(newPriceInfos, chartData, e.priceInfos.length);

      queryClient.setQueryData(['StockChart', stockId, period], {
        lastDate: formatDateISO(lastPriceDate),
        priceInfos: newPriceInfos,
        chartData: newChartData,
      });

      setChartData(newChartData);
    });
  };

  useEffect(() => {
    if (!queryData) {
      fetchData({
        lastDate: formatDateISO(new Date()),
        priceInfos: [],
        chartData: [],
      });
      return;
    }
    setChartData(queryData.chartData);
  }, [stockId, period]);

  useEffect(() => {
    if (queryData) fetchData(queryData);
  }, [lastDate]);

  return [chartData, setLastDate];
};

// SearchBar

export const PopularStocksQuery = () => {
  const { data = [] } = useQuery(
    ['PopularStocksQuery'],
    async () => {
      const popularStocks = await Promise.resolve(fetchPopularStocks());
      return popularStocks.map((stock) => ({
        ...stock,
        value: stock.symbolName,
      })) as PopularItems[];
    },
    {
      ...getQueryOptions(),
      placeholderData: [],
    },
  );

  return [data];
};

export const PopularKeywordsQuery = () => {
  const { data = [] } = useQuery(
    ['PopularKeywordsQuery'],
    async () => {
      const popularKeywords = await Promise.resolve(fetchPopularKeywords());
      return popularKeywords.map((keyword) => ({
        value: keyword,
      })) as PopularItems[];
    },
    {
      ...getQueryOptions(),
      placeholderData: [],
    },
  );

  return [data];
};

export const useAutoComplete = (
  fetchQuery: (input: string) => Promise<AutoCompleteItem[]>,
  key: string,
): [AutoCompleteItem[], (input: string) => Promise<void>] => {
  const [{ results, value }, setSearchState] = useState<{
    value: string;
    results: AutoCompleteItem[];
  }>({
    value: '',
    results: [],
  });

  const { data = [] } = useQuery<AutoCompleteItem[]>(['AutoComplete', value, key], () => results, {
    placeholderData: [],
  });

  const queryClient = useQueryClient();

  const fetchData = async (input: string): Promise<void> => {
    const cached = queryClient.getQueryData<AutoCompleteItem[]>(['AutoComplete', input, key]);
    if (cached || !input.length) {
      return setSearchState({
        value: input,
        results: cached || [],
      });
    }

    await fetchQuery(input)
      .then((res) => {
        if (!res.length) throw new Error('No results found');
        setSearchState({
          value: input,
          results: res.map((item) => ({
            ...item,
            value: item[key].toUpperCase(),
          })),
        });
      })
      .catch((err) => {
        err;
      });
    return;
  };

  return [data, fetchData];
};
