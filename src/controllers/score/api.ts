import { enableMock, fetchData } from '@controllers/common/base';
import { mockIndexScore } from './mock';

export type IndexScore = {
  kospiVix: number;
  kospiVixDiff: number;
  kospiIndex: number;
  kospiIndexDiff: number;
  kosdaqIndex: number;
  kosdaqIndexDiff: number;
  snpVix: number;
  snpVixDiff: number;
  snpIndex: number;
  snpIndexDiff: number;
  nasdaqIndex: number;
  nasdaqIndexDiff: number;
};

// GET /score/index
export const fetchIndexScore = (): Promise<IndexScore> => {
  if (enableMock) return Promise.resolve(mockIndexScore);
  return fetchData(`/score/index`);
};
