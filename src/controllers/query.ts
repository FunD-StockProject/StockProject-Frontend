import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { StockType } from '@components/Common/Common.Type';
import { IndexInfo, PERIOD_CODE, RevelantStockInfo, StockTableInfo } from '@controllers/api.Type';
import {
  fetchDescentStocks,
  fetchHotStocks,
  fetchIndexScore,
  fetchKeyowordsStocks,
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

// SearchBar

const COUNTRY = ['KOREA', 'OVERSEA'];

export const PopularKeywordQuery = () => {
  return useQuery(
    ['PopularKeywordQuery'],
    async () => {
      const keywordEntries = await Promise.all(
        COUNTRY.map(async (country) => {
          const keywords = await fetchKeywords(country);
          return [country, keywords.map((keyword) => ({ value: keyword }))];
        }),
      );

      return Object.fromEntries(keywordEntries);
    },
    {
      ...queryOptions,
      placeholderData: Object.fromEntries(COUNTRY.map((country) => [country, []])),
    },
  );
};

interface AutoCompleteItem {
  [key: string]: any; // 검색 결과 항목의 동적 키
  value: string;
}

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
// export const useAutoComplete = (query: any, param: string) => {
//   const [{ result }, setResult] = useState<any>({
//     value: '',
//     result: [],
//   });

//   // const queryClient = useQueryClient();
//   // const { data } = useQuery<any>(['AutoComplete', param, tmp[0]], () => tmp[1], {
//   //   placeholderData: [],
//   // });

//   const fetchData = (searchValue: string) => {
//     // const queryData = queryClient.getQueryData(['AutoComplete', param, value]);
//     // console.log('eeee');
//     // if (queryData) {
//     //   setTmp([value, queryData]);
//     //   return queryData;
//     // }

//     if (!searchValue.length) {
//       setResult({ value: searchValue, result: [] });
//       return [];
//     }

//     query(searchValue)
//       .then((res: any) => {
//         if (res.length) {
//           const ret = res.map((e: any) => ({
//             ...e,
//             value: e[param].toUpperCase(),
//           }));
//           setResult({ value: searchValue, result: ret });
//           return ret;
//         } else {
//           throw new Error();
//         }
//       })
//       .catch(() => {
//         setResult({ value: searchValue, result: result });
//         return result;
//       });
//   };

//   return [result, fetchData];
// };
