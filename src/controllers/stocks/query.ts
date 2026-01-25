import { useEffect, useState } from 'react';
import { useQueries, useQuery, useQueryClient } from 'react-query';
import { CHART_MOVING_AVERAGE_COLOR, CHART_PRICE_FIELD } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_TYPE } from '@ts/Types';
import { formatDateISO, formatLocalDateToDate } from '@utils/Date';
import { STOCK_FETCH_FUNCTIONS, queryOptions } from '../common/query';
import {
  fetchAutoComplete,
  fetchKeywordRankings,
  fetchPopularKeywords,
  fetchPopularStocks,
  fetchRelevant,
  fetchScore,
  fetchSearchKeyword,
  fetchSearchSymbolName,
  fetchSearchWordCloud,
  fetchStockChart,
  fetchStockInfo,
  fetchStockSummary,
  fetchStockTable,
} from './api';
import { AutoCompleteItem, PERIOD_CODE, PopularItems, StockDetailInfo, StockInfo, StockTableInfo } from './types';

export const useSymbolNameSearchQuery = (name: string, country: StockCountryKey) => {
  return useQuery<StockDetailInfo>(
    ['symbolNameSearch', name, country],
    () => fetchSearchSymbolName(name, country),
    queryOptions,
  );
};

export const useStockIdSearchQuery = (stockId: number, country: StockCountryKey) => {
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

export const useHomeStockFetchQuery = (type: STOCK_TYPE, country: StockCountryKey) => {
  return useQuery(['homeStockFetch', type, country], () => STOCK_FETCH_FUNCTIONS[type](country), queryOptions);
};

export const useScoreQuery = (id: number, country: StockCountryKey) => {
  return useQuery(['score', id, country], () => fetchScore(id, country), queryOptions);
};

export const useChartInfoQuery = (id: number, periodCode: PERIOD_CODE, startDate: string) => {
  return useQuery(
    ['chartInfo', id, periodCode, startDate],
    () => fetchStockChart(id, periodCode, startDate, '2025-12-30'),
    queryOptions,
  );
};

export const useStockTableInfoQuery = (category: string, country: string) => {
  return useQuery<StockTableInfo[]>(
    ['stockTableInfo', category, country],
    () => fetchStockTable(category, country),
    queryOptions,
  );
};

export const useStockSummaryQuery = (symbol: string, country: StockCountryKey) => {
  return useQuery<string[]>(['stockSummary', symbol, country], () => fetchStockSummary(symbol, country), queryOptions);
};

export const useRelevantStockFetchQuery = (id: number) => {
  return useQuery<StockInfo[]>(['relevantStockFetch', id], () => fetchRelevant(id), {
    ...queryOptions,
    enabled: id != undefined,
  });
};

const WordCloudWorker = new Worker(new URL('@utils/worker/GenerateWordCloud.ts', import.meta.url), { type: 'module' });

export const useWordCloudQuery = (
  symbol: string,
  country: StockCountryKey,
  { width, height }: any,
  isMobile: boolean,
) => {
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
        WordCloudWorker.postMessage({ symbol, data: res, width, height, isMobile });
      });
      return;
    }
    setWordCloud(queryData);
  }, [symbol, width, height]);

  return [wordCloud] as const;
};

export const useStockChartQuery = (stockId: number, period: string) => {
  const [chartData, setChartData] = useState<any>([]);
  const [lastDate, setLastDate] = useState<string>('');
  const firstDate = '1970-01-01';
  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData<{ lastDate: string; priceInfos: any[]; chartData: any[] }>([
    'StockChart',
    stockId,
    period,
  ]);

  const formatChartData = (priceInfos: any[], chartData: any[], length: number) => {
    const newChartData = [...Array.from({ length }, () => ({})), ...chartData];
    const updateLength = length + Object.keys(CHART_MOVING_AVERAGE_COLOR).reduce((acc, e) => Math.max(acc, ~~e), 0);
    priceInfos.some((e, i, arr) => {
      if (i >= updateLength) return;
      newChartData[i] = {
        date: formatLocalDateToDate(e.localDate),
        price: Object.fromEntries(
          Object.entries(CHART_PRICE_FIELD).map(([key, value]) => [
            key,
            { value: Number(e[value.key]), delta: i ? Number(e[value.key]) / Number(arr[i - 1].closePrice) - 1 : 0 },
          ]),
        ),
        SMA: Object.fromEntries(
          Object.keys(CHART_MOVING_AVERAGE_COLOR).map((range) => [
            range,
            {
              price:
                Array.from({ length: Math.min(~~range, i + 1) }, (_, j) => Number(arr[i - j].closePrice)).reduce(
                  (acc, e) => acc + e,
                ) / Math.min(~~range, i + 1),
            },
          ]),
        ),
        score: { value: e.score, delta: e.diff },
        trading: {
          value: e.accumulatedTradingValue,
          volume: e.accumulatedTradingVolume,
          delta: i ? Number(e.accumulatedTradingVolume) / Number(arr[i - 1].accumulatedTradingVolume) - 1 : 0,
        },
      } as any;
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
      else if (period == 'M') lastPriceDate.setMonth(lastPriceDate.getMonth() - 1);
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
      fetchData({ lastDate: formatDateISO(new Date()), priceInfos: [], chartData: [] });
      return;
    }
    setChartData(queryData.chartData);
  }, [stockId, period]);

  useEffect(() => {
    if (queryData) fetchData(queryData);
  }, [lastDate]);

  return [chartData, setLastDate] as const;
};

export const usePopularStockFetchQuery = () => {
  const { data = [] } = useQuery(
    ['popularStocks'],
    async () => {
      const popularStocks = await Promise.resolve(fetchPopularStocks());
      return popularStocks.map((stock) => ({ ...stock, value: stock.symbolName })) as PopularItems[];
    },
    { ...queryOptions, placeholderData: [] },
  );
  return [data] as const;
};

export const useAutoComplete = (
  fetchQuery: (input: string) => Promise<AutoCompleteItem[]>,
  key: string,
): [AutoCompleteItem[], (input: string) => Promise<void>] => {
  const [{ results, value }, setSearchState] = useState<{ value: string; results: AutoCompleteItem[] }>({
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
      return setSearchState({ value: input, results: cached || [] });
    }
    await fetchQuery(input)
      .then((res) => {
        if (!res.length) throw new Error('No results found');
        setSearchState({ value: input, results: res.map((item) => ({ ...item, value: item[key].toUpperCase() })) });
      })
      .catch(() => {
        // Error handling - silently fail
      });
    return;
  };

  return [data, fetchData];
};

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useAutoCompleteStockQuery = (input: string) => {
  const value = input.trim();

  const debouncedValue = useDebounce(value, 250);

  return useQuery(['autocomplete', debouncedValue], () => fetchAutoComplete(debouncedValue), {
    ...queryOptions,
    staleTime: 60000,
    cacheTime: 10000,
    enabled: !!debouncedValue,
    keepPreviousData: true,
  });
};

export const useKeywordSearchQuery = (keywordName: string) => {
  return useQuery<string[]>(['keywordSearch', keywordName], () => fetchSearchKeyword(keywordName), queryOptions);
};

export const usePopularKeywordsQuery = (country: string) => {
  return useQuery<string[]>(['popularKeywords', country], () => fetchPopularKeywords(country), {
    ...queryOptions,
    placeholderData: [],
  });
};

export const useKeywordRankingsQuery = () => {
  return useQuery<string[]>(['keywordRankings'], () => fetchKeywordRankings(), {
    ...queryOptions,
    placeholderData: [],
  });
};
