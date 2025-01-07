export const testWorker = new Worker(new URL('../../utils/worker/GenerateWordCloud.ts', import.meta.url), {
  type: 'module',
});

export const generateWordCloud = ({ data, width, height, adjust }: any) => {
  testWorker.postMessage({
    data: data,
    width: width,
    height: height,
    adjust: adjust,
  });
};
