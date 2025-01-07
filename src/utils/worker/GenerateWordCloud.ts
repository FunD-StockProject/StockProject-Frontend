import { LoadWordCloudWASM } from '@utils/wasm/WordCloudWasm';
import { WordFrequency } from '@components/Search/StockWordCloud/StockWordCloud.Type';

const GetnerateWordCloud = (params: {
  frequencies: WordFrequency[];
  height?: number;
  width: number;
  adjust: number;
  wasm: any;
  minFontSize?: number;
  margin?: number;
  maxWords?: number;
  // relativeScaling?: number;
  randomState?: number;
  maxFontSize?: number;
}): any => {
  let {
    frequencies,
    height = 300,
    width = 300,
    adjust,
    wasm,
    minFontSize = 4,
    margin = 4,
    maxWords = 200,
    // relativeScaling = 0.5,
    randomState = ~~(Math.random() * 1e9),
    maxFontSize,
  } = params;

  frequencies = frequencies.sort((a, b) => b.freq - a.freq).slice(0, maxWords);

  const margin_gap = margin / 2;
  const layouts: any = [];

  let startFontSize = 1;

  if (!maxFontSize) {
    maxFontSize = height;
    if (frequencies.length == 1) {
      startFontSize = height;
    } else {
      const ret = GetnerateWordCloud({
        ...params,
        frequencies: frequencies.slice(0, 2),
        maxFontSize,
      });

      if (!ret) return null;

      const fontSizes = ret.map(({ fontSize }: any) => fontSize);

      if (fontSizes.length >= 2) {
        startFontSize = ~~((2 * fontSizes[0] * fontSizes[1]) / (fontSizes[0] + fontSizes[1]));
      } else if (fontSizes.length == 1) {
        startFontSize = fontSizes[0];
      } else {
        return null;
      }
    }
  } else {
    startFontSize = maxFontSize;
  }

  wasm.initClear(margin, randomState, minFontSize);

  const FontOffCtx = new OffscreenCanvas(width, height).getContext('2d');
  if (!FontOffCtx) return null;
  FontOffCtx.font = `${maxFontSize}px "Pretendard"`;

  frequencies.every(({ word, freq }: any) => {
    word = word.toUpperCase();
    const textWidth = FontOffCtx.measureText(word).width / maxFontSize;
    if (!freq) return true;

    const { fontSize, orientation, posX, posY } = wasm.getPosition(startFontSize, textWidth);
    if (fontSize < minFontSize) return false;
    startFontSize = fontSize;

    const [sizeX, sizeY] = [
      margin + fontSize * (!orientation ? textWidth : 1),
      margin + fontSize * (!orientation ? 1 : textWidth),
    ];

    const offCtx = new OffscreenCanvas(sizeX, sizeY).getContext('2d');
    if (!offCtx) return false;
    offCtx.textBaseline = 'top';
    offCtx.font = `${fontSize}px "Pretendard"`;

    const textX = margin_gap;
    const textY = (orientation ? -1 : 1) * margin_gap + fontSize * (!orientation ? adjust : -(1 - adjust));
    if (orientation) {
      offCtx.rotate((90 * Math.PI) / 180);
      offCtx.fillText(word, textX, textY);
      offCtx.rotate((-90 * Math.PI) / 180);
    } else {
      offCtx.fillText(word, textX, textY);
    }

    layouts.push({
      word,
      fontSize,
      orientation,
      position: { x: posX + margin_gap, y: posY + margin_gap },
      size: { w: sizeX, h: sizeY },
      color: ~~(Math.random() * 6),
    });

    const imageData = new Uint8Array(
      new Uint32Array(offCtx.getImageData(0, 0, sizeX, sizeY).data.buffer).map((e) => (e ? 1 : 0)),
    );

    wasm.Update(imageData, posX, posY, ~~sizeX, ~~sizeY);
    return true;
  });

  return layouts;
};

self.onmessage = (e) => {
  if (!self.FontFace) {
    postMessage("Your browser doesn't support the FontFace API from WebWorkers yet");
    return;
  }
  const fontFace = new FontFace('Pretendard', "url(/fonts/Pretendard-Black.woff2) format('woff2')");
  self.fonts.add(fontFace);
  fontFace.load().then(async () => {
    if (!self.OffscreenCanvas) {
      postMessage("Your browser doesn't support OffscreeenCanvas yet");
      return;
    }

    const wasmModule = await LoadWordCloudWASM(e.data.width, e.data.height);

    const ret = GetnerateWordCloud({
      frequencies: e.data.data,
      height: e.data.height,
      width: e.data.width,
      adjust: e.data.adjust,
      wasm: wasmModule,
    });
    postMessage(ret);
  });
};
