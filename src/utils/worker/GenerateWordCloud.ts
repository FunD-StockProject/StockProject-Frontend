import { WordCloudItem, WordFrequency } from '@ts/Interfaces';
import { LoadWordCloudWASM } from '@utils/wasm/WordCloudWasm';

const GetnerateWordCloud = (params: {
  frequencies: WordFrequency[];
  height?: number;
  width: number;
  wasm: any;
  minFontSize?: number;
  margin?: number;
  maxWords?: number;
  randomState?: number;
  maxFontSize?: number;
}): any => {
  let {
    frequencies,
    height = 300,
    width = 300,
    wasm,
    minFontSize = 4,
    margin = 4,
    maxWords = 800,
    randomState = ~~(Math.random() * 1e9),
    maxFontSize,
  } = params;

  frequencies = frequencies.sort((a, b) => b.freq - a.freq || a.word.length - b.word.length).slice(0, maxWords);

  const margin_gap = margin / 2;
  const layouts: WordCloudItem[] = [];

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

      const fontSizes = ret.layouts.map(({ fontSize }: any) => fontSize);

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
  FontOffCtx.font = `10000px "PretendardBlack"`;
  FontOffCtx.textBaseline = 'top';
  const adjust = (10965.5 - FontOffCtx.measureText('감자탕').fontBoundingBoxDescent) / 10000;

  FontOffCtx.font = `${maxFontSize}px "PretendardBlack"`;

  frequencies.every(({ word, freq }) => {
    word = word.toUpperCase();
    const textWidth = FontOffCtx.measureText(word).width / maxFontSize;

    const { fontSize, orientation, posX, posY } = wasm.getPosition(startFontSize, textWidth);

    if (fontSize < minFontSize) return true;
    startFontSize = fontSize;

    const [sizeX, sizeY] = [
      margin + fontSize * (!orientation ? textWidth : 1),
      margin + fontSize * (!orientation ? 1 : textWidth),
    ];

    const offCtx = new OffscreenCanvas(sizeX, sizeY).getContext('2d');
    if (!offCtx) return false;
    offCtx.textBaseline = 'top';
    offCtx.font = `${fontSize}px "PretendardBlack"`;

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
      freq: freq,
      fontSize,
      orientation,
      pos: { x: posX + margin_gap, y: posY + margin_gap },
      size: { w: sizeX, h: sizeY },
      color: ~~(Math.random() * 6),
    });

    const imageData = new Uint8Array(
      new Uint32Array(offCtx.getImageData(0, 0, sizeX, sizeY).data.buffer).map((e) => (e ? 1 : 0)),
    );

    wasm.Update(imageData, posX, posY, ~~sizeX, ~~sizeY);
    return true;
  });

  return { width: width, height: height, layouts: layouts };
};

self.onmessage = ({ data: { symbol, data, width, height, isMobile } }) => {
  if (!self.FontFace) {
    postMessage("Your browser doesn't support the FontFace API from WebWorkers yet");
    return;
  }
  const fontFace = new FontFace('PretendardBlack', "url(/fonts/Pretendard-Black.woff2) format('woff2')");
  self.fonts.add(fontFace);

  fontFace.load().then(async () => {
    if (!self.OffscreenCanvas) {
      postMessage("Your browser doesn't support OffscreeenCanvas yet");
      return;
    }

    const wasmModule = await LoadWordCloudWASM(width, height);

    const ret = {
      symbol,
      ...GetnerateWordCloud({
        frequencies: data,
        height: height,
        width: width,
        minFontSize: !isMobile ? 7 : 5,
        margin: !isMobile ? 4 : 3,
        maxWords: !isMobile ? 800 : 600,
        wasm: wasmModule,
      }),
    };
    postMessage(ret);
  });
};
