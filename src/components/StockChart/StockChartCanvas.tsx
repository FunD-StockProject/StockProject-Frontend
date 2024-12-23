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

const StockChartPriceCanvas = ({ priceChartList, canvasSize }: { priceChartList: any; canvasSize: any }) => {
  const { width, height } = canvasSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!priceChartList) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    priceChartList.map((e: any) => {
      ctx.fillStyle = e.delta ? theme.colors.red : theme.colors.blue;
      ctx.strokeStyle = e.delta ? theme.colors.red : theme.colors.blue;
      drawRect(ctx, e.pos.x - e.barSize / 2, e.market.y, e.barSize, e.market.h);
      drawLine(ctx, [
        [e.pos.x, e.daily.y],
        [e.pos.x, e.daily.y + e.daily.h],
      ]);
    });
  }, [priceChartList]);

  return <StockChartStyledCanvas ref={canvasRef} />;
};

const StockChartScoreCanvas = ({ scoreChartList, canvasSize }: { scoreChartList: any; canvasSize: any }) => {
  const { width, height } = canvasSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!scoreChartList) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

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
  }, [scoreChartList]);

  return <StockChartStyledCanvas ref={canvasRef} />;
};

const StockChartSMACanvas = ({
  SMAInfo,
  canvasSize,
}: {
  SMAInfo: { color: themeColor; items: any[] };
  canvasSize: any;
}) => {
  const { width, height } = canvasSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { color, items } = SMAInfo;

  useEffect(() => {
    if (!SMAInfo) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    setLineWidth(ctx, 2);
    ctx.strokeStyle = theme.colors[color];

    drawLine(
      ctx,
      items.map((e) => [e.pos.x, e.pos.y]),
    );
  }, [SMAInfo]);

  return <StockChartStyledCanvas ref={canvasRef} />;
};

const StockChartGridCanvas = ({
  gridDate,
  gridPrice,
  gridScore,
  canvasSize,
}: {
  gridDate: any[];
  gridPrice: any[];
  gridScore: any[];
  canvasSize: any;
}) => {
  const { width, height } = canvasSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!gridPrice || !gridScore) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    setLineWidth(ctx, 1);
    ctx.strokeStyle = theme.colors.grayscale100;

    gridDate.map((e: any) =>
      drawLine(ctx, [
        [e.pos.x, 0],
        [e.pos.x, height],
      ]),
    );

    // gridScore.map((e: any) =>
    //   drawLine(ctx, [
    //     [0, e.pos.y],
    //     [width, e.pos.y],
    //   ]),
    // );

    gridPrice.map((e: any) =>
      drawLine(ctx, [
        [0, e.pos.y],
        [width, e.pos.y],
      ]),
    );

    setLineWidth(ctx, 4);
    drawLine(ctx, [
      [0, height],
      [width, height],
      [width, 0],
    ]);
  }, [gridPrice, gridScore]);

  return <StockChartStyledCanvas ref={canvasRef} />;
};

const StockChartMouseCanvas = ({ mousePosInfo, canvasSize }: { mousePosInfo: any; canvasSize: any }) => {
  const { width, height } = canvasSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    if (!mousePosInfo) return;

    ctx.strokeStyle = theme.colors.primary0;
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 10]);
    drawLine(ctx, [
      [0, mousePosInfo.pos.y],
      [width, mousePosInfo.pos.y],
    ]);
    drawLine(ctx, [
      [mousePosInfo.pos.x, 0],
      [mousePosInfo.pos.x, height],
    ]);
    ctx.setLineDash([]);
  }, [mousePosInfo]);

  return <StockChartStyledCanvas ref={canvasRef} />;
};

export {
  StockChartPriceCanvas,
  StockChartScoreCanvas,
  StockChartSMACanvas,
  StockChartGridCanvas,
  StockChartMouseCanvas,
};
