import React from 'react';
import { CanvasSize, drawLine } from '@utils/Canvas';
import useHiDPICanvas from '@hooks/useHiDPICanvas';
import useRafCanvasDraw from '@hooks/useRafCanvasDraw';
import { ViewCanvas } from './StockChart.Style';

const drawPointer = (ctx: CanvasRenderingContext2D, pointerInfo: any, canvasSize: CanvasSize) => {
  if (!pointerInfo) return;
  const { pos } = pointerInfo;

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#9A9C9E';
  ctx.setLineDash([4, 2]);

  drawLine(ctx, [
    [pos.x, 0],
    [pos.x, canvasSize.height],
  ]);
  drawLine(ctx, [
    [0, pos.y],
    [canvasSize.width, pos.y],
  ]);
};

const StockChartPointerCanvas = ({
  canvasRef,
  onSizeChange,
  canvasHeight,
  pointerInfo,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onSizeChange: (size: CanvasSize) => void;
  canvasHeight: { price: number; score: number };
  pointerInfo: any;
}) => {
  const { canvasSize, redrawTick } = useHiDPICanvas({
    canvasRef,
    onResize: onSizeChange,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawPointer(ctx, pointerInfo, canvasSize);
  };

  useRafCanvasDraw(canvasRef, draw, [redrawTick, canvasSize.width, canvasSize.height, pointerInfo]);

  return <ViewCanvas ref={canvasRef} type="POINTER" expand={`${canvasHeight.score + 2}px`} />;
};

export default React.memo(StockChartPointerCanvas);
