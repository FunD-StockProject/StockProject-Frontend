import { useEffect, useRef } from 'react';
import { theme } from '@styles/themes';
import { StockChartStyledCanvas } from './StockChart.Style';

const StockChartCanvas = ({
  dateLabelItem,
  priceLabelItem,
  chartItemList,
  chartInfo,
  recentPrice,
  mousePosInfo,
  scoreItemList,
}: {
  dateLabelItem: any;
  priceLabelItem: any;
  chartItemList: any;
  chartInfo: any;
  recentPrice: any;
  mousePosInfo: any;
  scoreItemList: any;
}) => {
  const boxPlotChartCanvasRef = useRef<HTMLCanvasElement>(null);

  const { width, height } = chartInfo;
  const { BarSize } = chartInfo;

  const drawLine = (ctx: any, pathList: any) => {
    let str = '';
    pathList.map((e: any, i: number) => {
      str += `${i ? 'L' : 'M'} `;
      str += `${e[0]} ${e[1]} `;
    });

    ctx.stroke(new Path2D(str));
  };

  const drawChartGrid = (ctx: any) => {
    priceLabelItem.map((e: any) => {
      drawLine(ctx, [
        [0, e.pos.y],
        [width, e.pos.y],
      ]);
    });

    dateLabelItem.map((e: any) => {
      drawLine(ctx, [
        [e.pos.x, 0],
        [e.pos.x, height],
      ]);
    });

    ctx.lineWidth = 4;
    drawLine(ctx, [
      [0, height],
      [width, height],
      [width, 0],
    ]);
  };

  const drawCandleChart = (ctx: any) => {
    ctx.lineWidth = 1;
    chartItemList.map((e: any) => {
      ctx.fillStyle = e.delta ? theme.colors.red : theme.colors.blue;
      ctx.strokeStyle = e.delta ? theme.colors.red : theme.colors.blue;
      ctx.fillRect(e.pos.x - BarSize / 2, e.marketTop, BarSize, e.marketBottom);
      ctx.strokeRect(e.pos.x - BarSize / 2, e.marketTop, BarSize, e.marketBottom);
      drawLine(ctx, [
        [e.pos.x, e.DailyTop],
        [e.pos.x, e.DailyTop + e.DailyBottom],
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
  };

  const drawLineChart = (ctx: any) => {
    if (!scoreItemList) return;
    const scoreList: any = [];

    ctx.strokeStyle = theme.colors.cyan;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    scoreItemList.map((e: any) => {
      scoreList.push([e.pos.x, e.pos.y]);
    });

    drawLine(ctx, scoreList);
    ctx.lineCap = 'square';
    ctx.lineJoin = 'round';
  };

  useEffect(() => {
    const canvas = boxPlotChartCanvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = theme.colors.grayscale100;

    drawChartGrid(ctx);
    drawCandleChart(ctx);
    drawRecentPrice(ctx);
    drawMouseMove(ctx);
    drawLineChart(ctx);
  }, [dateLabelItem, priceLabelItem]);

  return <StockChartStyledCanvas ref={boxPlotChartCanvasRef} />;
};

export default StockChartCanvas;
