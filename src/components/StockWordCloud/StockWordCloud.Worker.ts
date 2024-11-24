import { WordFrequency } from './StockWordCloud.Type';
import TestWorker from '../../utils/worker/GenerateWordCloud.ts?worker';

export const testWorker = new TestWorker();

export const generateWordCloud = ({
  data,
  width,
  height,
}: {
  data: WordFrequency[];
  width: number;
  height: number;
}) => {
  testWorker.postMessage({
    data: data,
    width: width,
    height: height,
  });
};
