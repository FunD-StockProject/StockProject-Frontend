import { WordFrequency } from './StockWordCloud.Type';

export const testWorker = new Worker(new URL('../../utils/worker/GenerateWordCloud.ts', import.meta.url), {
  type: 'module',
});

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
