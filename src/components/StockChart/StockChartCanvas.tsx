import { useEffect, useRef } from 'react';
import { theme, themeColor } from '@styles/themes';
import { StockChartStyledCanvas } from './StockChart.Style';

const StockChartCanvas = ({
  priceLabelItem,
  chartInfo,
  canvasSize,
  recentPrice,
  mousePosInfo,
  tmpChartItems,
  chartGridDate,
}: {
  priceLabelItem: any;
  chartInfo: any;
  canvasSize: any;
  recentPrice: any;
  mousePosInfo: any;
  tmpChartItems: any[];
  chartGridDate: any;
}) => {
  const boxPlotChartCanvasRef = useRef<HTMLCanvasElement>(null);

  const { width, height } = canvasSize;
  const { BarSize } = chartInfo;
  const { SMAInfo } = chartInfo;
  const { DPR } = chartInfo;

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

  const drawChartGrid = (ctx: any) => {
    setLineWidth(ctx, 1);
    ctx.strokeStyle = theme.colors.grayscale100;

    priceLabelItem.map((e: any) =>
      drawLine(ctx, [
        [0, e.pos.y],
        [width, e.pos.y],
      ]),
    );

    chartGridDate.map((e: any) =>
      drawLine(ctx, [
        [e.pos.x, 0],
        [e.pos.x, height],
      ]),
    );

    setLineWidth(ctx, 4);
    drawLine(ctx, [
      [0, height],
      [width, height],
      [width, 0],
    ]);
  };

  const drawMovingAverage = (ctx: any, { range, color }: { range: number; color: themeColor }) => {
    setLineWidth(ctx, 2);
    ctx.strokeStyle = theme.colors[color];

    drawLine(
      ctx,
      tmpChartItems
        .map((e) => {
          if (!e.SMA[range]) return;
          return [e.pos.x, e.SMA[range].y];
        })
        .filter((e) => e),
    );
  };

  const drawCandleChart = (ctx: any) => {
    setLineWidth(ctx, 1);

    tmpChartItems.map((e: any) => {
      ctx.fillStyle = e.delta ? theme.colors.red : theme.colors.blue;
      ctx.strokeStyle = e.delta ? theme.colors.red : theme.colors.blue;
      drawRect(ctx, e.pos.x - BarSize / 2, e.market.y, BarSize, e.market.h);
      drawLine(ctx, [
        [e.pos.x, e.daily.y],
        [e.pos.x, e.daily.y + e.daily.h],
      ]);
    });
  };

  const drawRecentPrice = (ctx: any) => {
    if (!recentPrice) return;
    ctx.strokeStyle = recentPrice.delta >= 0 ? theme.colors.red : theme.colors.blue;
    ctx.setLineDash([2, 4]);
    drawLine(ctx, [
      [0, recentPrice.pos.y],
      [width, recentPrice.pos.y],
    ]);
    ctx.setLineDash([]);
  };

  const drawMouseMove = (ctx: any) => {
    if (!mousePosInfo) return;
    setLineWidth(ctx, 1);

    ctx.strokeStyle = theme.colors.primary0;
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
  };

  const drawLineChart = (ctx: any) => {
    setLineWidth(ctx, 2);
    ctx.strokeStyle = theme.colors.cyan;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    drawLine(
      ctx,
      tmpChartItems
        .map((e) => {
          if (!e.score.value) return;
          return [e.pos.x, e.score.y];
        })
        .filter((e) => e),
    );
    ctx.lineCap = 'square';
    ctx.lineJoin = 'round';
  };

  useEffect(() => {
    const canvas = boxPlotChartCanvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawChartGrid(ctx);
    SMAInfo.map((e: any) => {
      drawMovingAverage(ctx, e);
    });
    drawCandleChart(ctx);
    drawRecentPrice(ctx);
    drawMouseMove(ctx);
    drawLineChart(ctx);
  }, [chartGridDate, priceLabelItem, tmpChartItems]);

  return <StockChartStyledCanvas ref={boxPlotChartCanvasRef} />;
};

export default StockChartCanvas;
