import { Size, WordCloudLayout, WordFrequency } from './StockWordCloud.Type';

const isEmptyArea = (
  prefixSum: Int32Array,
  x: number,
  y: number,
  w: number,
  h: number,
  width: number,
) => {
  return (
    prefixSum[(y + h) * (width + 1) + (x + w)] -
      (prefixSum[y * (width + 1) + (x + w)] +
        prefixSum[(y + h) * (width + 1) + x]) +
      prefixSum[y * (width + 1) + x] ===
    0
  );
};

const getPosition = (
  prefixSum: Int32Array,
  grid: Int32Array,
  randomState: number,
  w: number,
  h: number,
  width: number,
  height: number,
) => {
  let [i, j] = [0, 0];
  let [l, m, r] = [0, 0, 0];
  let hits: any[] = [];

  for (i = 0; i < height - h; i++) {
    for (j = 0; j < width - w; j++) {
      if (grid[i * width + (j + w - 1)]) {
        j += w - 1;
        continue;
      }
      if (grid[i * width + j]) continue;

      while (j < width - w && !isEmptyArea(prefixSum, j, i, w, 1, width)) {
        l = j;
        r = j + w;
        m = 0;

        while (l + 1 < r) {
          m = (l + r) >> 1;
          if (isEmptyArea(prefixSum, m, i, j + w - m, 1, width)) {
            r = m;
          } else {
            l = m;
          }
        }
        j = m;
      }
      if (isEmptyArea(prefixSum, j, i, w, h, width)) {
        hits.push(i * width + j);
      }
    }
  }

  if (!hits.length) return null;

  return hits[randomState % hits.length];
};

const Update = (
  prefixSum: Int32Array,
  grid: Int32Array,
  data: Uint8ClampedArray,
  x: number,
  y: number,
  w: number,
  h: number,
  width: number,
  height: number,
) => {
  let [i, j] = [0, 0];

  for (i = y; i < y + h; i++) {
    for (j = x; j < x + w; j++) {
      grid[i * width + j] = data[(i - y) * w * 4 + (j - x) * 4 + 3] ? 1 : 0;
    }
  }

  for (i = y; i < height; i++) {
    for (j = x; j < width; j++) {
      prefixSum[(i + 1) * (width + 1) + (j + 1)] =
        prefixSum[i * (width + 1) + (j + 1)] +
        prefixSum[(i + 1) * (width + 1) + j] -
        prefixSum[i * (width + 1) + j] +
        grid[i * width + j];
    }
  }
};

const GetnerateWordCloud = ({
  canvasSize,
  boxSize,
  randomState,
  imageData,
  prefixSum,
  grid,
  margin,
  layout,
}: {
  canvasSize: Size;
  boxSize: Size;
  randomState: number;
  imageData: ImageData;
  prefixSum: Int32Array;
  grid: Int32Array;
  margin: number;
  layout: WordCloudLayout;
}): any => {
  // const newGrid = Int32Array.from(grid, (x) => x);

  const pos = getPosition(
    prefixSum,
    // newGrid,
    grid,
    randomState,
    boxSize.w,
    boxSize.h,
    canvasSize.w,
    canvasSize.h,
  );

  if (pos == null) {
    return {
      resultType: 'REPEAT',
      prefixSum: prefixSum,
      grid: grid,
    };
  }

  Update(
    prefixSum,
    // newGrid,
    grid,
    imageData.data,
    pos % canvasSize.w,
    ~~(pos / canvasSize.w),
    boxSize.w,
    boxSize.h,
    canvasSize.w,
    canvasSize.h,
  );

  layout.position = {
    x: (pos % canvasSize.w) + margin / 2,
    y: ~~(pos / canvasSize.w) + margin / 2,
  };

  return {
    resultType: 'NEXT',
    layout: layout,
    prefixSum: prefixSum,
    grid: grid,
  };
};

self.onmessage = async (e) => {
  // const font = new FontFace(
  //   'Pretendardaa',
  //   `url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Black.woff')`,
  //   {
  //     weight: '700',
  //   },
  // );
  // await font.load();
  // self.fonts.add(font);

  return responseMessage(e);
};

const responseMessage = (e: any) => {
  const processedData = () => {
    if (e.data.type == 'START') {
      return {
        resultType: 'NEXT',
        prefixSum: e.data.prefixSum,
        grid: e.data.grid,
      };
    }
    if (e.data.type == 'PROCESSING') {
      return GetnerateWordCloud({
        canvasSize: e.data.canvasSize,
        boxSize: e.data.boxSize,
        randomState: e.data.randomState,
        imageData: e.data.imageData,
        prefixSum: e.data.prefixSum,
        grid: e.data.grid,
        margin: e.data.margin,
        layout: e.data.layout,
      });
    }
    if (e.data.type == 'END') {
      return {
        resultType: 'END',
      };
    }
    if (e.data.type == 'STARTA') {
      self.postMessage({ resultType: 'END' });
    }
  };
  postMessage(processedData());
};
