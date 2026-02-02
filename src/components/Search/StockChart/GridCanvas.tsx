import React from 'react';
import { drawLine } from '@utils/Canvas';
import useHiDPICanvas from '@hooks/useHiDPICanvas';
import useRafCanvasDraw from '@hooks/useRafCanvasDraw';
import { GridItem } from './GridLabel';
import { ViewCanvas } from './StockChart.Style';

const drawGrid = (
  ctx: CanvasRenderingContext2D,
  priceGrid: GridItem[],
  scoreGrid: GridItem[],
  dateGrid: GridItem[],
  height: number,
) => {
  ctx.globalAlpha = 0.85;

  ctx.strokeStyle = '#303033';
  ctx.lineWidth = 1;

  priceGrid.forEach((item) => {
    drawLine(ctx, [
      [0, item.pos.y],
      [ctx.canvas.width, item.pos.y],
    ]);
  });

  scoreGrid.forEach((item) => {
    drawLine(ctx, [
      [0, item.pos.y! + height],
      [ctx.canvas.width, item.pos.y! + height],
    ]);
  });

  dateGrid.forEach((item) => {
    drawLine(ctx, [
      [item.pos.x, 0],
      [item.pos.x, ctx.canvas.height],
    ]);
  });
};

const StockChartGridCanvas = ({
  canvasHeight,
  dateGrid,
  priceGrid,
  scoreGrid,
}: {
  canvasHeight: { price: number; score: number };
  dateGrid: GridItem[];
  priceGrid: GridItem[];
  scoreGrid: GridItem[];
}) => {
  const { canvasRef, redrawTick } = useHiDPICanvas();

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawGrid(ctx, priceGrid, scoreGrid, dateGrid, canvasHeight.price);
  };

  useRafCanvasDraw(canvasRef, draw, [redrawTick, canvasHeight.price, dateGrid, priceGrid, scoreGrid]);

  return <ViewCanvas ref={canvasRef} type="GRID" expand={`${canvasHeight.score}px`} />;
};

export default React.memo(StockChartGridCanvas);
