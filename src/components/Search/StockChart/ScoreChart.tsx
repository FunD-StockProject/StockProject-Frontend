import React from 'react';
import { CanvasSize, drawLine } from '@utils/Canvas';
import useHiDPICanvas from '@hooks/useHiDPICanvas';
import useRafCanvasDraw from '@hooks/useRafCanvasDraw';
import { ViewCanvas, deltaToChartColor } from './StockChart.Style';

const drawScoreLineChart = (ctx: CanvasRenderingContext2D, scoreChartItems: any[]) => {
  if (!scoreChartItems.length) return;
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#64FFEA';
  ctx.lineWidth = 2;

  drawLine(
    ctx,
    scoreChartItems.map(({ pos }) => [pos.x, pos.y]),
  );
};

const drawTradingBarChart = (ctx: CanvasRenderingContext2D, tradingChartItems: any[], barSize: any) => {
  if (!tradingChartItems.length) return;
  ctx.globalAlpha = 0.75;

  tradingChartItems.forEach(({ pos, delta, bottom }) => {
    ctx.fillStyle = deltaToChartColor(delta);
    ctx.fillRect(pos.x - barSize.width / 2, pos.y, barSize.width, bottom - pos.y);
  });
};

const StockScoreChart = ({
  onSizeChange,
  scoreChartItems,
  tradingChartItems,
  barSize,
}: {
  onSizeChange: (size: CanvasSize) => void;
  scoreChartItems: any[];
  tradingChartItems: any[];
  barSize: any;
}) => {
  const { canvasRef, canvasSize, redrawTick } = useHiDPICanvas({
    onResize: onSizeChange,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawTradingBarChart(ctx, tradingChartItems, barSize);
    drawScoreLineChart(ctx, scoreChartItems);
  };

  useRafCanvasDraw(canvasRef, draw, [
    redrawTick,
    canvasSize.width,
    canvasSize.height,
    barSize,
    tradingChartItems,
    scoreChartItems,
  ]);

  return <ViewCanvas ref={canvasRef} />;
};

export default React.memo(StockScoreChart);
