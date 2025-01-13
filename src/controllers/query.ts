import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { CHART_MOVING_AVERAGE_COLOR, CHART_PRICE_FIELD, TEXT_SIZE_ADJUST } from '@ts/Constants';
import { STOCK_COUNTRY } from '@ts/Types';
import { formatDateISO, formatLocalDateToDate } from '@utils/Date';
import { StockType } from '@components/Common/Common.Type';
import {
  AutoCompleteItem,
  IndexInfo,
  PERIOD_CODE,
  PopularItems,
  RevelantStockInfo,
  StockTableInfo,
} from '@controllers/api.Type';
import {
  fetchDescentStocks,
  fetchHotStocks,
  fetchIndexScore,
  fetchKeyowordsStocks,
  fetchKeywords,
  fetchPopularKeywords,
  fetchPopularStocks,
  fetchRealStockInfo,
  fetchRelevant,
  fetchRisingStocks,
  fetchScore,
  fetchSearchSymbolName,
  fetchSearchWordCloud,
  fetchStockChart,
  fetchStockTable,
} from './api';
import { StockInfo } from './api.Type';

export const queryOptions = {
  // retry: 5, // 실패 시 반복 횟수 - 기본 3
  staleTime: 1000, // 다시 fetch 보내려 할때 해당 시간 이내이면 굳이 fetch 다시 하지 않음
};

export const SearchSymbolNameQuery = (name: string, country: string) => {
  return useQuery<StockInfo>(
    ['searchSymbolByName', name],
    () => fetchSearchSymbolName(name, country),
    queryOptions,
  );
};

export const StockRelevantQuery = (id: number) => {
  return useQuery<RevelantStockInfo>(
    ['searchRelevangStockById', id],
    () => fetchRelevant(id),
    queryOptions,
  );
};

const StockFetchers = {
  HOT: fetchHotStocks,
  RISING: fetchRisingStocks,
  DESCENT: fetchDescentStocks,
};

export const StockFetchQuery = (type: StockType, index: number) => {
  return useQuery<any>(
    [type + ' ' + index],
    () => StockFetchers[type](!index ? 'KOREA' : 'OVERSEA'),
    queryOptions,
  );
};

export const ScoreQuery = (id: number, country: string) => {
  return useQuery<StockInfo>(
    ['searchSymbolByName', id, country],
    () => fetchScore(id, country),
    queryOptions,
  );
};

export const ChartQuery = (id: number, periodCode: PERIOD_CODE, startDate: string) => {
  return useQuery<StockInfo>(
    ['chartInfo', id, periodCode, startDate],
    () => fetchStockChart(id, periodCode, startDate, '2025-12-30'),
    queryOptions,
  );
};

export const RealStockInfoQuery = (id: number, country: string) => {
  return useQuery<StockInfo>(
    ['realStockInfo', id, country],
    () => fetchRealStockInfo(id, country),
    queryOptions,
  );
};

export const KeywordsQuery = (country: string) => {
  return useQuery<string[]>(['keywords', country], () => fetchKeywords(country), queryOptions);
};

export const StockTableQuery = (category: string, country: string) => {
  return useQuery<StockTableInfo>(
    ['stockTable', category, country],
    () => fetchStockTable(category, country),
    queryOptions,
  );
};

export const IndexScoreQuery = () => {
  return useQuery<IndexInfo>(['indexScore'], () => fetchIndexScore(), queryOptions);
};

export const KeywordsStocksQuery = (keywordName: string) => {
  return useQuery<string[]>(
    ['keywordsStocks', keywordName],
    () => fetchKeyowordsStocks(keywordName),
    queryOptions,
  );
};

// WordCloud
const WordCloudWorker = new Worker(new URL('@utils/worker/GenerateWordCloud.ts', import.meta.url), {
  type: 'module',
});

const agent = window.navigator.userAgent.toLowerCase();

export const WordCloudQuery = (
  symbol: string,
  country: STOCK_COUNTRY,
  { width, height }: any,
  isMobile: boolean,
) => {
  const [wordCloud, setWordCloud] = useState<any>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(['WordCloudQuery', symbol, 0, 0], []);
    WordCloudWorker.onmessage = ({ data: { layouts, height, width } }: any) => {
      queryClient.setQueryData(['WordCloudQuery', symbol, width, height], layouts);
      setWordCloud(layouts);
    };
  }, []);

  useEffect(() => {
    const queryData = queryClient.getQueryData(['WordCloudQuery', symbol, width, height]);

    if (!queryData) {
      fetchSearchWordCloud(symbol, country).then((res) => {
        const adjust =
          agent.indexOf('chrome') > -1
            ? TEXT_SIZE_ADJUST.chrome
            : agent.indexOf('instagram') > -1
              ? TEXT_SIZE_ADJUST.chrome
              : TEXT_SIZE_ADJUST.safari;

        WordCloudWorker.postMessage({
          data: res,
          width,
          height,
          adjust,
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
    const newChartData = [...Array.from({ length: length }, () => ({})), ...chartData];
    const updateLength =
      length + Object.keys(CHART_MOVING_AVERAGE_COLOR).reduce((acc, e) => Math.max(acc, ~~e), 0);

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
                  { length: Math.min(~~range, i + 1) },
                  (_, j) => ~~arr[i - j].closePrice,
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
          delta: i
            ? Number(e.accumulatedTradingVolume) / Number(arr[i - 1].accumulatedTradingVolume) - 1
            : 0,
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
      console.log(e, firstDate, lastDate);
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
      fetchData({ lastDate: formatDateISO(new Date()), priceInfos: [], chartData: [] });
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
      ...queryOptions,
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
      return popularKeywords.map((keyword) => ({ value: keyword })) as PopularItems[];
    },
    {
      ...queryOptions,
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
      return setSearchState({ value: input, results: cached || [] });
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
