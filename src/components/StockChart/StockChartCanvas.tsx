import { useEffect, useRef } from 'react';
import { theme, themeColor } from '@styles/themes';
import { StockChartStyledCanvas } from './StockChart.Style';

const DPR = window.devicePixelRatio;
const setLineWidth = (ctx: any, width: number) => (ctx.lineWidth = width * DPR);
const drawLine = (ctx: any, pathList: any) =>
  ctx.stroke(
    new Path2D(
      pathList.reduce(
        (acc: any, [x, y]: [number, number], i: number) => acc + `${i ? 'L' : 'M'} ${DPR * x} ${DPR * y} `,
        '',
      ),
    ),
  );
const drawRect = (ctx: any, x: number, y: number, w: number, h: number) => {
  ctx.fillRect(x * DPR, y * DPR, w * DPR, h * DPR);
  ctx.strokeRect(x * DPR, y * DPR, w * DPR, h * DPR);
};

const drawPriceChart = (ctx: any, priceChartList: any) => {
  setLineWidth(ctx, 1);
  priceChartList.map((e: any) => {
    ctx.fillStyle = e.delta ? theme.colors.red : theme.colors.blue;
    ctx.strokeStyle = e.delta ? theme.colors.red : theme.colors.blue;
    drawRect(ctx, e.pos.x - e.barSize / 2, e.market.y, e.barSize, e.market.h);
    drawLine(ctx, [
      [e.pos.x, e.daily.y],
      [e.pos.x, e.daily.y + e.daily.h],
    ]);
  });
};

const drawSMAChart = (ctx: any, SMAChartList: any[]) => {
  setLineWidth(ctx, 2);
  Object.values(SMAChartList).map(({ color, items }: { color: themeColor; items: any[] }) => {
    ctx.strokeStyle = theme.colors[color];

    drawLine(
      ctx,
      items.map((e) => [e.pos.x, e.pos.y]),
    );
  });
};

const drawGrid = (ctx: any, colList: any[], rowList: any[], size: any) => {
  const { width, height } = size;

  setLineWidth(ctx, 1);
  ctx.strokeStyle = theme.colors.grayscale90;

  colList.map((e: any) =>
    drawLine(ctx, [
      [e.pos.x, 0],
      [e.pos.x, height],
    ]),
  );

  rowList.map((e: any) =>
    drawLine(ctx, [
      [0, e.pos.y],
      [width, e.pos.y],
    ]),
  );
};

const drawMousePos = (ctx: any, mousePosInfo: any, canvas: 'price' | 'score', size: any) => {
  const { x, y } = mousePosInfo.pos;
  const { width, height } = size;

  ctx.strokeStyle = theme.colors.primary0;
  setLineWidth(ctx, 1);
  ctx.setLineDash([10, 5]);
  if (mousePosInfo.canvas == canvas) {
    drawLine(ctx, [
      [0, y],
      [width, y],
    ]);
  }
  drawLine(ctx, [
    [x, 0],
    [x, height],
  ]);
  ctx.setLineDash([]);
};

const StockChartPriceCanvas = ({
  gridDate,
  gridPrice,
  priceChartList,
  SMAChartList,
  mousePosInfo,
}: {
  gridDate: any[];
  gridPrice: any[];
  priceChartList: any;
  SMAChartList: { color: themeColor; items: any[] }[];
  mousePosInfo: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!priceChartList) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size: { width: number; height: number } = canvas.getBoundingClientRect();
    const { width, height } = size;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    drawGrid(ctx, gridDate, gridPrice, size);
    drawSMAChart(ctx, SMAChartList);
    drawPriceChart(ctx, priceChartList);

    if (!mousePosInfo) return;
    drawMousePos(ctx, mousePosInfo, 'price', size);
  }, [priceChartList, mousePosInfo]);

  return <StockChartStyledCanvas ref={canvasRef} />;
};

const StockChartScoreCanvas = ({
  gridDate,
  gridScore,
  scoreChartList,
  mousePosInfo,
}: {
  gridDate: any[];
  gridScore: any[];
  scoreChartList: any;
  mousePosInfo: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!scoreChartList) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size: { width: number; height: number } = canvas.getBoundingClientRect();
    const { width, height } = size;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    drawGrid(ctx, gridDate, gridScore, size);
    // drawPriceChart(ctx, scoreChartList);
    ctx.globalAlpha = 0.5;
    scoreChartList.map(({ pos, trading, barSize }: any) => {
      ctx.fillStyle = theme.colors[deltaColor(trading.delta)];
      ctx.strokeStyle = theme.colors[deltaColor(trading.delta)];

      drawRect(ctx, pos.x - barSize / 2, trading.y, barSize, trading.h);
    });
    ctx.globalAlpha = 1;
    setLineWidth(ctx, 2);
    ctx.strokeStyle = theme.colors.cyan;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    drawLine(
      ctx,
      scoreChartList
        .map((e: any) => {
          if (!e.score.value) return;
          return [e.pos.x, e.score.y];
        })
        .filter((e: any) => e),
    );

    if (!mousePosInfo) return;
    drawMousePos(ctx, mousePosInfo, 'score', size);
  }, [scoreChartList, mousePosInfo]);

  return <StockChartStyledCanvas ref={canvasRef} />;
};

const deltaColor = (delta: number): themeColor => (!delta ? 'grayscale50' : delta > 0 ? 'red' : 'blue');

export { StockChartPriceCanvas, StockChartScoreCanvas };
