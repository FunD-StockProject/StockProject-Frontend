import { useEffect, useRef } from 'react';
import { theme, themeColor } from '@styles/themes';
import { StockChartStyledCanvas } from './StockChart.Style';

const StockChartCanvas = ({
  priceLabelItem,
  chartInfo,
  recentPrice,
  mousePosInfo,
  tmpChartItems,
  chartGridDate,
}: {
  priceLabelItem: any;
  chartInfo: any;
  recentPrice: any;
  mousePosInfo: any;
  tmpChartItems: any[];
  chartGridDate: any;
}) => {
  const boxPlotChartCanvasRef = useRef<HTMLCanvasElement>(null);

  const { width, height } = chartInfo;
  const { BarSize } = chartInfo;
  const { movingAverage } = chartInfo;

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

    chartGridDate.map((e: any) => {
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

  const drawMovingAverage = (ctx: any, { range, color }: { range: number; color: themeColor }) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = theme.colors[color];
    const pathList: any[] = tmpChartItems
      .map((e) => {
        if (!e.SMA[range]) return;
        return [e.pos.x, e.SMA[range].y];
      })
      .filter((e) => e);

    drawLine(ctx, pathList);
  };

  const drawCandleChart = (ctx: any) => {
    ctx.lineWidth = 1;

    tmpChartItems.map((e: any) => {
      ctx.fillStyle = e.delta ? theme.colors.red : theme.colors.blue;
      ctx.strokeStyle = e.delta ? theme.colors.red : theme.colors.blue;
      ctx.fillRect(e.pos.x - BarSize / 2, e.market.y, BarSize, e.market.h);
      ctx.strokeRect(e.pos.x - BarSize / 2, e.market.y, BarSize, e.market.h);
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
    ctx.strokeStyle = theme.colors.cyan;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const pathList: any[] = tmpChartItems
      .map((e) => {
        if (!e.score.value) return;
        return [e.pos.x, e.score.y];
      })
      .filter((e) => e);

    drawLine(ctx, pathList);
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
    movingAverage.map((e: any) => {
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
