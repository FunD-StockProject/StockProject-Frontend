import { useQuery, useQueryClient } from 'react-query';
import { CHART_MOVING_AVERAGE_COLOR, CHART_PRICE_FIELD } from '@ts/Constants';
import { STOCK_COUNTRY } from '@ts/Types';
import { formatDateISO, formatLocalDateToDate } from '@utils/Date';
import { StockType } from '@components/Common/Common.Type';
import { AutoCompleteItem, IndexScoreInfo, PERIOD_CODE, PopularItems, StockInfo, StockTableInfo } from '../api.Type';
import {
  // fetchAutoComplete,
  fetchIndexScore,
  fetchKeywords,
  fetchPopularKeywords,
  fetchPopularStocks,
  fetchRealStockInfo,
  fetchRelevant,
  fetchScore,
  fetchSearchKeyword,
  fetchSearchSymbolName,
  fetchSearchWordCloud,
  fetchStockChart,
  fetchStockSummary,
  fetchStockTable,
} from '../api';
import { queryOptions, STOCK_FETCH_FUNCTIONS } from './common';
import { useEffect, useState } from 'react';

export const useSymbolNameSearchQuery = (name: string, country: STOCK_COUNTRY) => {
  return useQuery(['symbolNameSearch', name, country], () => fetchSearchSymbolName(name, country), queryOptions);
};

export const useStockIdSearchQuery = (stockId: number, country: STOCK_COUNTRY) => {
  return useQuery(['stockIdSearchQuery', stockId, country], () => fetchRealStockInfo(stockId, country), queryOptions);
};

export const useHomeStockFetchQuery = (type: StockType, country: string) => {
  return useQuery(['homeStockFetch', type, country], () => STOCK_FETCH_FUNCTIONS[type](country), queryOptions);
};

export const useScoreQuery = (id: number, country: string) => {
  return useQuery(['score', id, country], () => fetchScore(id, country), queryOptions);
};

export const useChartInfoQuery = (id: number, periodCode: PERIOD_CODE, startDate: string) => {
  return useQuery(['chartInfo', id, periodCode, startDate], () => fetchStockChart(id, periodCode, startDate, '2025-12-30'), queryOptions);
};

export const useKeywordsQuery = (country: string) => {
  return useQuery<string[]>(['keywords', country], () => fetchKeywords(country), queryOptions);
};

export const useStockTableInfoQuery = (category: string, country: string) => {
  return useQuery<StockTableInfo>(['stockTableInfo', category, country], () => fetchStockTable(category, country), queryOptions);
};

export const useIndexScoreQuery = () => {
  return useQuery<IndexScoreInfo>(['indexScore'], () => fetchIndexScore(), queryOptions);
};

export const useKeywordSearchQuery = (keywordName: string) => {
  return useQuery<string[]>(['keywordSearch', keywordName], () => fetchSearchKeyword(keywordName), queryOptions);
};

export const useStockSummaryQuery = (symbol: string, country: STOCK_COUNTRY) => {
  const { data = [] } = useQuery<string[]>(['stockSummary', symbol, country], () => fetchStockSummary(symbol, country), queryOptions);
  return [data] as const;
};

export const useRelevantStockFetchQuery = (id: number) => {
  const { data } = useQuery<StockInfo[]>(['relevantStockFetch', id], () => fetchRelevant(id), {
    ...queryOptions,
    enabled: id != undefined,
  });
  return [data] as const;
};

const WordCloudWorker = new Worker(new URL('@utils/worker/GenerateWordCloud.ts', import.meta.url), { type: 'module' });

export const useWordCloudQuery = (symbol: string, country: STOCK_COUNTRY, { width, height }: any, isMobile: boolean) => {
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
              price: Array.from({ length: Math.min(~~range, i + 1) }, (_, j) => Number(arr[i - j].closePrice)).reduce(
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

  const fetchData = async ({ lastDate, priceInfos, chartData }: { lastDate: string; priceInfos: any[]; chartData: any[] }) => {
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
    ['PopularStocksFetch'],
    async () => {
      const popularStocks = await Promise.resolve(fetchPopularStocks());
      return popularStocks.map((stock) => ({ ...stock, value: stock.symbolName })) as PopularItems[];
    },
    { ...queryOptions, placeholderData: [] },
  );
  return [data] as const;
};

export const PopularKeywordQuery = () => {
  const { data = [] } = useQuery(
    ['PopularKeywordFetch'],
    async () => {
      const popularKeywords = await Promise.resolve(fetchPopularKeywords());
      return popularKeywords.map((keyword) => ({ value: keyword })) as PopularItems[];
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

  const { data = [] } = useQuery<AutoCompleteItem[]>(['AutoComplete', value, key], () => results, { placeholderData: [] });

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
      .catch((err) => {
        err;
      });
    return;
  };

  return [data, fetchData];
};


