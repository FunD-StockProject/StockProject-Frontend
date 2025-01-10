import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { STOCK_COUNTRY_TEXT, TEXT_SIZE_ADJUST } from '@ts/Constants';
import { STOCK_COUNTRY } from '@ts/Types';
import { StockType } from '@components/Common/Common.Type';
import {
  AutoCompleteItem,
  IndexInfo,
  PERIOD_CODE,
  RevelantStockInfo,
  StockTableInfo,
} from '@controllers/api.Type';
import {
  fetchDescentStocks,
  fetchHotStocks,
  fetchIndexScore,
  fetchKeyowordsStocks,
  fetchKeywords,
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
    () => fetchStockChart(id, periodCode, startDate),
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

// SearchBar

export const PopularStocksQuery = () => {
  const { data } = useQuery(
    ['PopularStocksQuery'],
    async () => {
      const popularStocks = await Promise.resolve(fetchPopularStocks());
      return popularStocks.map((stock) => ({ ...stock, value: stock.symbolName }));
    },
    {
      ...queryOptions,
      placeholderData: [],
    },
  );

  return [data];
};

export const PopularKeywordsQuery = () => {
  const countryList = Object.keys(STOCK_COUNTRY_TEXT);

  const { data } = useQuery(
    ['PopularKeywordsQuery'],
    async () => {
      const keywordEntries = await Promise.all(
        countryList.map(async (country) => {
          const keywords = await fetchKeywords(country);
          return [country, keywords.map((keyword) => ({ value: keyword }))];
        }),
      );

      return Object.fromEntries(keywordEntries);
    },
    {
      ...queryOptions,
      placeholderData: Object.fromEntries(countryList.map((country) => [country, []])),
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
