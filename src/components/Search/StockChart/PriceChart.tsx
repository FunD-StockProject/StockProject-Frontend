import React from 'react';
import { CanvasSize, drawLine } from '@utils/Canvas';
import useHiDPICanvas from '@hooks/useHiDPICanvas';
import useRafCanvasDraw from '@hooks/useRafCanvasDraw';
import { PriceChartItem, SMA_PERIODS, SMA_STYLE } from './ChartView';
import { GridItem } from './GridLabel';
import { ViewCanvas, deltaToChartColor } from './StockChart.Style';

const drawBar = (ctx: CanvasRenderingContext2D, priceChartItems: PriceChartItem[], barSize: any) => {
  ctx.globalAlpha = 1;
  priceChartItems.forEach((item) => {
    const color = item.color;

    const x = item.x;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    drawLine(ctx, [
      [x, item.highY],
      [x, item.lowY],
    ]);

    const bodyTop = Math.min(item.openY, item.closeY);
    const bodyHeight = Math.max(Math.abs(item.openY - item.closeY), 1);
    ctx.fillStyle = color;
    ctx.fillRect(x - barSize.width / 2, bodyTop, barSize.width, bodyHeight);
  });
};

const drawSMA = (ctx: CanvasRenderingContext2D, priceChartItems: PriceChartItem[]) => {
  ctx.globalAlpha = 0.85;
  SMA_PERIODS.forEach((period) => {
    ctx.strokeStyle = SMA_STYLE[period].color;
    ctx.lineWidth = SMA_STYLE[period].width;
    drawLine(
      ctx,
      priceChartItems.map((item) => [item.x, item.smaY[period]]),
    );
  });
};

const drawRecentPriceLine = (ctx: CanvasRenderingContext2D, recentPrice?: GridItem) => {
  if (!recentPrice) return;

  ctx.globalAlpha = 1;
  ctx.strokeStyle = deltaToChartColor(recentPrice.delta!);
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);

  drawLine(ctx, [
    [0, recentPrice.pos.y!],
    [ctx.canvas.width, recentPrice.pos.y!],
  ]);
};

const StockPriceChart = ({
  onSizeChange,
  priceChartItems,
  barSize,
  recentPrice,
}: {
  onSizeChange: (size: CanvasSize) => void;
  priceChartItems: PriceChartItem[];
  barSize: any;
  recentPrice?: GridItem;
}) => {
  const { canvasRef, canvasSize, redrawTick } = useHiDPICanvas({
    onResize: onSizeChange,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawBar(ctx, priceChartItems, barSize);
    drawSMA(ctx, priceChartItems);
    if (recentPrice) {
      drawRecentPriceLine(ctx, recentPrice);
    }
  };

  useRafCanvasDraw(canvasRef, draw, [
    redrawTick,
    canvasSize.width,
    canvasSize.height,
    priceChartItems,
    barSize,
    recentPrice,
  ]);

  return <ViewCanvas ref={canvasRef} />;
};

export default React.memo(StockPriceChart);
