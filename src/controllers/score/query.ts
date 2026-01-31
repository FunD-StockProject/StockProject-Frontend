import { useQuery } from 'react-query';
import { StockCountryKey } from '@ts/StockCountry';
import { queryOptions } from '@controllers/common/query';
import { fetchIndexScore } from './api';

type ScoreIndex = 'kospiVix' | 'kospiIndex' | 'kosdaqIndex' | 'snpVix' | 'snpIndex' | 'nasdaqIndex';

const scoreIndexNames: Record<ScoreIndex, string> = {
  kospiVix: '공포지수',
  kospiIndex: '코스피',
  kosdaqIndex: '코스닥',
  snpVix: '공포지수',
  snpIndex: 'S&P 500',
  nasdaqIndex: '나스닥',
};

const scoreIndexCountry: Record<StockCountryKey, ScoreIndex[]> = {
  KOREA: ['kospiVix', 'kospiIndex', 'kosdaqIndex'],
  OVERSEA: ['snpVix', 'snpIndex', 'nasdaqIndex'],
};

export const useIndexScoreQuery = () => {
  return useQuery(['indexScore'], () => fetchIndexScore(), {
    ...queryOptions,
    select: (data) =>
      Object.fromEntries(
        Object.entries(scoreIndexCountry).map(([key, value]) => [
          key,
          value.map((e) => ({
            key: e,
            name: scoreIndexNames[e],
            value: data[e],
            diff: data[`${e}Diff`],
          })),
        ]),
      ),
  });
};
