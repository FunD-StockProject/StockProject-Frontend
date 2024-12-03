import { WordCloud, WordFrequency } from '../../components/StockWordCloud/StockWordCloud.Type';

const GetnerateWordCloud = ({
  frequencies,
  height = 300,
  width = 300,
  minFontSize = 4,
  margin = 2,
  maxWords = 200,
  relativeScaling = 0.5,
  randomState = ~~(Math.random() * 1e9),
  maxFontSize,
}: {
  frequencies: WordFrequency[];
  height?: number;
  width: number;
  minFontSize?: number;
  margin?: number;
  maxWords?: number;
  relativeScaling?: number;
  randomState?: number;
  maxFontSize?: number;
}): WordCloud[] | null => {
  const isEmptyArea = (x: number, y: number, w: number, h: number) => {
    return (
      prefixSum[(y + h) * (width + 1) + (x + w)] -
        (prefixSum[y * (width + 1) + (x + w)] + prefixSum[(y + h) * (width + 1) + x]) +
        prefixSum[y * (width + 1) + x] ===
      0
    );
  };

  const getPosition = (
    textMetrics: TextMetrics,
    fontSize: number,
    margin: number,
    orientation: boolean,
    randomState: number,
  ) => {
    const [sizeX, sizeY] = [
      margin + ~~(!orientation ? textMetrics.width * fontSize : fontSize),
      margin + ~~(!orientation ? fontSize : textMetrics.width * fontSize),
    ];

    let [i, j] = [0, 0];
    let [l, m, r] = [0, 0, 0];
    let hits: any[] = [];

    for (i = 0; i < height - sizeY; i++) {
      for (j = 0; j < width - sizeX; j++) {
        if (grid[i * width + (j + sizeX - 1)]) {
          j += sizeX - 1;
          continue;
        }
        if (grid[i * width + j]) continue;

        while (j < width - sizeX && !isEmptyArea(j, i, sizeX, 1)) {
          l = j;
          r = j + sizeX;
          m = 0;

          while (l + 1 < r) {
            m = (l + r) >> 1;
            if (isEmptyArea(m, i, j + sizeX - m, 1)) {
              r = m;
            } else {
              l = m;
            }
          }
          j = m;
        }
        if (isEmptyArea(j, i, sizeX, sizeY)) {
          hits.push(i * width + j);
        }
      }
    }

    if (!hits.length) return null;

    return hits[randomState % hits.length];
  };

  const Update = (data: Uint8ClampedArray, x: number, y: number, w: number, h: number) => {
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

  frequencies = frequencies.sort((a, b) => b.freq - a.freq).slice(0, maxWords);

  const max_frequency = frequencies[0].freq;
  const FontOffCtx = new OffscreenCanvas(width, 1).getContext('2d');

  if (!FontOffCtx) return null;

  frequencies = Array.from(frequencies, (x) => ({
    word: x.word,
    freq: x.freq / max_frequency,
  }));

  let fontSize = 1;

  let layouts = [];
  let fontSizes;

  const prefixSum = new Int32Array((height + 1) * (width + 1));
  const grid = new Int32Array(height * width);

  if (!maxFontSize) {
    if (frequencies.length == 1) {
      fontSize = height;
    } else {
      const ret = GetnerateWordCloud({
        frequencies: frequencies.slice(0, 2),
        height: height,
        width: width,
        minFontSize: minFontSize,
        margin: margin,
        maxWords: maxWords,
        relativeScaling: relativeScaling,
        randomState: randomState,
        maxFontSize: height,
      });

      if (!ret) return null;

      if (ret.length >= 2) {
        fontSize = ~~((2 * ret[0].fontSize * ret[1].fontSize) / (ret[0].fontSize + ret[1].fontSize));
      } else if (ret.length == 1) {
        fontSize = ret[0].fontSize;
      } else {
        return null;
      }
    }
  } else {
    fontSize = maxFontSize;
  }

  fontSizes = new Array(fontSize + 1);
  for (let i = 0; i <= fontSize; i++) {
    fontSizes[i] = `900 ${i}px "Pretendard"`;
  }
  FontOffCtx.font = fontSizes[1];

  for (const e of frequencies) {
    const word = e.word;
    const freq = e.freq;

    if (freq == 0) continue;

    let layout = null;
    let textPosition: any | null = null;

    let orientation: boolean = Math.random() >= 0.9 ? true : false;
    let tried_other_orientation: boolean = false;

    const textMetrics = FontOffCtx.measureText(word);

    while (true) {
      if (fontSize < minFontSize) break;

      const pos = getPosition(textMetrics, fontSize, margin, orientation, randomState);

      if (pos != null) {
        textPosition = {
          posX: pos % width,
          posY: ~~(pos / width),
          sizeX: margin + ~~(!orientation ? textMetrics.width * fontSize : fontSize),
          sizeY: margin + ~~(!orientation ? fontSize : textMetrics.width * fontSize),

          spanX: (pos % width) + margin / 2,
          spanY: ~~(pos / width) + margin / 2,
          textX: (pos % width) + margin / 2 - (!orientation ? 0 : fontSize * 0.055),
          textY: ~~(pos / width) + margin / 2 + (!orientation ? fontSize * 0.055 : 0),
        };
        break;
      }

      if (!tried_other_orientation) {
        orientation = !orientation ? true : true;
        tried_other_orientation = true;
      } else {
        fontSize -= 1;
        orientation = false;
      }
    }

    if (fontSize < minFontSize) break;

    if (!textPosition) continue;

    const offCtx = new OffscreenCanvas(textPosition.sizeX, textPosition.sizeY).getContext('2d');
    if (!offCtx) return null;

    offCtx.font = fontSizes[fontSize];

    const textX = margin / 2 - (!orientation ? 0 : fontSize * 0.055);
    const textY = margin / 2 + (!orientation ? fontSize * 0.055 : 0);
    if (orientation) {
      offCtx.textBaseline = 'bottom';
      offCtx.rotate((90 * Math.PI) / 180);
      offCtx.fillText(e.word, textY, -textX);
      offCtx.rotate((-90 * Math.PI) / 180);
    } else {
      offCtx.textBaseline = 'top';
      offCtx.fillText(e.word, textX, textY);
    }

    layout = {
      word: word,
      freq: freq,
      fontSize: fontSize,
      position: { x: textPosition.spanX, y: textPosition.spanY },
      size: { w: textPosition.sizeX, h: textPosition.sizeY },
      orientation: orientation,
      color: ~~Math.floor(Math.random() * 6),
    };
    layouts.push(layout);

    const imageData = offCtx.getImageData(0, 0, textPosition.sizeX, textPosition.sizeY);

    Update(imageData.data, ~~textPosition.posX, ~~textPosition.posY, ~~textPosition.sizeX, ~~textPosition.sizeY);
  }

  return layouts;
};

self.onmessage = (e) => {
  if (!self.FontFace) {
    postMessage("Your browser doesn't support the FontFace API from WebWorkers yet");
    return;
  }
  const fontFace = new FontFace('Pretendard', "url(/fonts/Pretendard-Black.woff2) format('woff2')");
  self.fonts.add(fontFace);
  fontFace.load().then(() => {
    if (!self.OffscreenCanvas) {
      postMessage("Your browser doesn't support OffscreeenCanvas yet");
      return;
    }
    const ret = GetnerateWordCloud({
      frequencies: e.data.data,
      height: e.data.height,
      width: e.data.width,
    });
    postMessage(ret);
  });
};
