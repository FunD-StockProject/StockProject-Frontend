import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { PERIOD_CODE } from '@controllers/api.Type';
import { ChartQuery } from '@controllers/query';
import { theme } from '@styles/themes';

const StockChartCanvas = styled.canvas({
  width: '100%',
  height: '100%',
});

const START_BAR_SIZE = 60;

type CanvasType = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
};

// const initCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>, setCanvas: any) => {
//   const canvas = canvasRef.current;
//   if (!canvas) return;
//   const width = canvas.offsetWidth;
//   const height = canvas.offsetHeight;
//   canvas.width = width;
//   canvas.height = height;
//   const ctx = canvas.getContext('2d');
//   if (!ctx) return;

//   setCanvas({
//     canvas: canvas,
//     ctx: ctx,
//     width: width,
//     height: height,
//   });
// };

const StockChartCanvasGrid = ({ priceInfos }: { priceInfos: any }) => {
  const boxPlotChartCanvasRef = useRef<HTMLCanvasElement>(null);
  const labelBoxPlotCanvasRef = useRef<HTMLCanvasElement>(null);
  const dateLabelCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isMouseDown, _setIsMouseDown] = useState<boolean>(false);
  const isMouseDownRef = useRef(isMouseDown);
  const setIsMouseDown = (data: boolean) => {
    isMouseDownRef.current = data;
    _setIsMouseDown(data);
  };

  const [chartBoxPlot, _setChartBoxPlot] = useState<CanvasType>();
  const chartBoxPlotRef = useRef(chartBoxPlot);
  const setChartBoxPlot = (data: any) => {
    chartBoxPlotRef.current = data;
    _setChartBoxPlot(data);
  };

  const [labelBoxPlot, setLabelBoxPlot] = useState<CanvasType>();
  const [dateLabel, setDateLabel] = useState<CanvasType>();

  const [chartInfo, _setChartInfo] = useState<any>({
    BarSize: START_BAR_SIZE,
    BarGap: Math.floor(START_BAR_SIZE / 4),
    PriceMax: 0,
    PriceMin: 0,
    width: 0,
  });
  const chartInfoRef = useRef(chartInfo);
  const setChartInfo = (data: any) => {
    Object.assign(chartInfo, data);
    chartInfoRef.current = chartInfo;
    _setChartInfo({ ...chartInfo });
  };

  const [mousePos, setMousePos] = useState<any>(null);

  const [canvasPos, _setCanvasPos] = useState<any>({
    PrevX: 900,
    StartX: 0,
    EndX: 0,
    MaxX: 0,
    MinX: 0,
  });
  const canvasPosRef = useRef(canvasPos);
  const setCanvasPos = (data: any) => {
    const canvasPos = canvasPosRef.current;
    Object.assign(canvasPos, data);

    if (canvasPos.PrevX + canvasPos.EndX - canvasPos.StartX < canvasPos.MinX) {
      canvasPos.EndX = canvasPos.StartX - canvasPos.PrevX + canvasPos.MinX;
    } else if (canvasPos.PrevX + canvasPos.EndX - canvasPos.StartX > canvasPos.MaxX) {
      canvasPos.EndX = canvasPos.StartX - canvasPos.PrevX + canvasPos.MaxX;
    }
    canvasPosRef.current = canvasPos;
    _setCanvasPos({ ...canvasPos });
  };

  useEffect(() => {
    setCanvasPos({
      MinX: (chartInfo.BarSize + chartInfo.BarGap) * (5 / 2),
      MaxX: chartInfo.width + (chartInfo.BarSize + chartInfo.BarGap) * (priceInfos.length - 3 / 2),
    });
  }, [chartInfo]);

  useEffect(() => {
    const chartBoxPlotCanvas = boxPlotChartCanvasRef.current;
    if (!chartBoxPlotCanvas) return;
    chartBoxPlotCanvas.width = chartBoxPlotCanvas.offsetWidth;
    chartBoxPlotCanvas.height = chartBoxPlotCanvas.offsetHeight;
    const chartBoxPlotCtx = chartBoxPlotCanvas.getContext('2d');
    setChartBoxPlot({
      canvas: chartBoxPlotCanvas,
      ctx: chartBoxPlotCtx,
      width: chartBoxPlotCanvas.offsetWidth,
      height: chartBoxPlotCanvas.offsetHeight,
    });

    setChartInfo({ width: chartBoxPlotCanvas.offsetWidth });

    setCanvasPos({ PrevX: chartBoxPlotCanvas.offsetWidth - chartInfo.BarSize });

    const labelBoxPlotCanvas = labelBoxPlotCanvasRef.current;
    if (!labelBoxPlotCanvas) return;
    labelBoxPlotCanvas.width = labelBoxPlotCanvas.offsetWidth;
    labelBoxPlotCanvas.height = labelBoxPlotCanvas.offsetHeight;
    const labelBoxPlotCtx = labelBoxPlotCanvas.getContext('2d');
    if (!labelBoxPlotCtx) return;
    setLabelBoxPlot({
      canvas: labelBoxPlotCanvas,
      ctx: labelBoxPlotCtx,
      width: labelBoxPlotCanvas.offsetWidth,
      height: labelBoxPlotCanvas.offsetHeight,
    });

    // const scoreLinechartCanvas = scoreLineChartCanvasRef.current;
    // if (!scoreLinechartCanvas) return;
    // scoreLinechartCanvas.width = scoreLinechartCanvas.offsetWidth;
    // scoreLinechartCanvas.height = scoreLinechartCanvas.offsetHeight;

    const dateLabelCanvas = dateLabelCanvasRef.current;
    if (!dateLabelCanvas) return;
    dateLabelCanvas.width = dateLabelCanvas.offsetWidth;
    dateLabelCanvas.height = dateLabelCanvas.offsetHeight;
    const dateLabelCtx = dateLabelCanvas.getContext('2d');
    if (!dateLabelCtx) return;
    setDateLabel({
      canvas: dateLabelCanvas,
      ctx: dateLabelCtx,
      width: dateLabelCanvas.width,
      height: dateLabelCanvas.height,
    });

    chartBoxPlotCanvas.addEventListener('wheel', handleWheel);
    chartBoxPlotCanvas.addEventListener('mousedown', handleMouseDown);
    chartBoxPlotCanvas.addEventListener('mousemove', handleMouseMoveCanvas);
    chartBoxPlotCanvas.addEventListener('mouseenter', handleMouseEnter);
    chartBoxPlotCanvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      chartBoxPlotCanvas.removeEventListener('wheel', handleWheel);
      chartBoxPlotCanvas.removeEventListener('mousedown', handleMouseDown);
      chartBoxPlotCanvas.removeEventListener('mousemove', handleMouseMoveCanvas);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  useEffect(() => {
    if (!chartBoxPlot) return;
    if (!dateLabel) return;
    if (!labelBoxPlot) return;

    // const scoreLinechartCanvas = scoreLineChartCanvasRef.current;
    // if (!scoreLinechartCanvas) return;
    // const scoreLinechartCtx = scoreLinechartCanvas.getContext('2d');
    // if (!scoreLinechartCtx) return;

    chartBoxPlot.ctx.clearRect(0, 0, chartBoxPlot.width, chartBoxPlot.height);
    dateLabel.ctx.clearRect(0, 0, dateLabel.width, dateLabel.height);
    chartBoxPlot.ctx.fillStyle = '#FFFFFF11';
    dateLabel.ctx.textBaseline = 'middle';
    dateLabel.ctx.textAlign = 'center';
    dateLabel.ctx.fillStyle = '#FFFFFF11';
    dateLabel.ctx.font = '15px Pretendard';

    labelBoxPlot.ctx.clearRect(0, 0, labelBoxPlot.width, labelBoxPlot.height);
    // scoreLinechartCtx.clearRect(0, 0, scoreLinechartCanvas.width, scoreLinechartCanvas.height);
    // console.log(scoreLinechartCanvas.width, scoreLinechartCanvas.height);
    labelBoxPlot.ctx.fillStyle = 'white';
    labelBoxPlot.ctx.font = '15px Pretendard';
    labelBoxPlot.ctx.textBaseline = 'middle';
    // scoreLinechartCtx.fillStyle = '#FFFFFF33';

    const canvasPosX = canvasPos.PrevX + canvasPos.EndX - canvasPos.StartX;

    const dateList: any = [];
    let dayIdx = 0;
    let monthIdx = 0;

    const firstDay = new Date('1970-01-01');
    const nowDay = new Date();

    for (let i = 0; i < ~~((nowDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)); i++) {
      const tmp = firstDay.getTime() + i * (1000 * 60 * 60 * 24);
      const date = new Date(tmp);
      if (date.getDay() == 0 || date.getDay() == 6) {
        continue;
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      let str = day + '일';

      if (day == 1 || ((day == 2 || day == 3) && date.getDay() == 1)) {
        dayIdx = 0;
        str = month + '월';
        if (month == 1) {
          monthIdx = 0;
          str = year + '년';
        } else {
          monthIdx++;
        }
      } else {
        dayIdx++;
      }

      dateList.push({ str: str, year: year, month: month, day: day, dayIdx: dayIdx, monthIdx: monthIdx, price: 0 });
    }

    for (let i = 0; i < priceInfos.length; i++) {
      Object.assign(dateList[dateList.length - i - 1], priceInfos[i]);
    }

    let nowDateLength = dateList.length;

    for (let i = 0; i < ~~((new Date('2030-01-01').getTime() - nowDay.getTime()) / (1000 * 60 * 60 * 24)); i++) {
      const tmp = nowDay.getTime() + i * (1000 * 60 * 60 * 24);
      const date = new Date(tmp);
      if (date.getDay() == 0 || date.getDay() == 6) {
        continue;
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      let str = day + '일';

      if (day == 1 || ((day == 2 || day == 3) && date.getDay() == 1)) {
        dayIdx = 0;
        str = month + '월';
        if (month == 1) {
          monthIdx = 0;
          str = year + '년';
        } else {
          monthIdx++;
        }
      } else {
        dayIdx++;
      }

      dateList.push({ str: str, year: year, month: month, day: day, dayIdx: dayIdx, monthIdx: monthIdx, price: 0 });
    }

    let max = 0;
    let min = 1e9;
    let maxDate = '';
    let minDate = '';
    for (let i = 0; i < dateList.length; i++) {
      const date = dateList[i];
      const posX =
        canvasPosX -
        nowDateLength * (chartInfo.BarSize + chartInfo.BarGap) +
        i * (chartInfo.BarSize + chartInfo.BarGap);
      if (posX < -chartInfo.BarSize / 2 || posX > chartBoxPlot.width + chartInfo.BarSize / 2) continue;
      if (date.highPrice == undefined) continue;

      if (max < ~~date.highPrice) {
        max = ~~date.highPrice;
        maxDate = date.localDate;
      }
      if (min > ~~date.lowPrice) {
        min = ~~date.lowPrice;
        minDate = date.localDate;
      }
    }
    const rMax = max + (max - min) * (1 / 4);
    const rMin = min - (max - min) * (1 / 4);

    let a = 1;
    for (; a * 10 < (rMax - rMin) / 10; a *= 10);
    let b = a;
    for (; b <= (rMax - rMin) / 10; b += a);

    for (let i = Math.ceil(rMin / b) * b; i <= Math.floor(rMax / b) * b; i += b) {
      chartBoxPlot.ctx.fillRect(
        0,
        chartBoxPlot.height - ((i - rMin) / (rMax - rMin)) * chartBoxPlot.height,
        chartBoxPlot.width,
        1,
      );

      labelBoxPlot.ctx.fillText(
        i.toLocaleString(),
        8,
        labelBoxPlot.height - ((i - rMin) / (rMax - rMin)) * labelBoxPlot.height,
      );
    }

    for (let i = 0; i < dateList.length; i++) {
      const date = dateList[i];
      const posX =
        canvasPosX -
        nowDateLength * (chartInfo.BarSize + chartInfo.BarGap) +
        i * (chartInfo.BarSize + chartInfo.BarGap);
      if (posX < -chartInfo.BarSize / 2 || posX > chartBoxPlot.width + chartInfo.BarSize / 2) continue;

      if (chartInfo.BarSize > 7) {
        if (chartInfo.BarSize > 70) {
        } else if (chartInfo.BarSize > 50) {
          if (date.dayIdx % 2 || (i + 1 < dateList.length && date.day >= dateList[i + 1].day)) continue;
        } else if (chartInfo.BarSize > 30) {
          if (date.dayIdx % 3 || (i + 2 < dateList.length && date.day >= dateList[i + 2].day)) continue;
        } else if (chartInfo.BarSize > 20) {
          if (date.dayIdx % 4 || (i + 2 < dateList.length && date.day >= dateList[i + 2].day)) continue;
        } else if (chartInfo.BarSize > 15) {
          if (date.dayIdx % 5 || (i + 3 < dateList.length && date.day >= dateList[i + 3].day)) continue;
        } else if (chartInfo.BarSize > 11) {
          if (date.dayIdx % 6 || (i + 3 < dateList.length && date.day >= dateList[i + 3].day)) continue;
        } else if (chartInfo.BarSize > 10) {
          if (date.dayIdx % 7 || (i + 4 < dateList.length && date.day >= dateList[i + 4].day)) continue;
        } else if (chartInfo.BarSize > 9) {
          if (date.dayIdx % 8 || (i + 5 < dateList.length && date.day >= dateList[i + 5].day)) continue;
        } else if (chartInfo.BarSize > 8) {
          if (date.dayIdx % 9 || (i + 6 < dateList.length && date.day >= dateList[i + 6].day)) continue;
        } else if (chartInfo.BarSize > 7) {
          if (date.dayIdx % 10 || (i + 7 < dateList.length && date.day >= dateList[i + 7].day)) continue;
        }
      } else if (chartInfo.BarSize > 0) {
        if (date.dayIdx != 0) continue;
        if (chartInfo.BarSize > 2) {
        } else if (chartInfo.BarSize > 1) {
          if (date.monthIdx % 2) continue;
        } else if (chartInfo.BarSize > 0) {
          if (date.monthIdx % 3) continue;
        }
      }

      dateLabel.ctx.fillStyle = 'white';
      dateLabel.ctx.textBaseline = 'top';
      dateLabel.ctx.fillText(date.str, posX, 10);
      chartBoxPlot.ctx.fillStyle = '#FFFFFF11';
      chartBoxPlot.ctx.fillRect(posX, 0, 1, chartBoxPlot.height);
      // scoreLinechartCtx.fillRect(posX, 0, 1, scoreLinechartCanvas.height);
    }
    drawCandleChart(dateList, nowDateLength, rMax, rMin, minDate, maxDate);
    drawLineChart(dateList, nowDateLength);
    drawRecentPrice(rMax, rMin);
    drawMouseMove(dateList, nowDateLength, rMax, rMin);
  }, [chartBoxPlot, dateLabel, canvasPos, mousePos, isMouseEnter]);

  const drawRecentPrice = (rMax: number, rMin: number) => {
    if (!chartBoxPlot) return;
    if (!labelBoxPlot) return;

    const y = (1 - (priceInfos[0].closePrice - rMin) / (rMax - rMin)) * chartBoxPlot.height;

    chartBoxPlot.ctx.strokeStyle = theme.colors.red;
    chartBoxPlot.ctx.lineWidth = 2;
    chartBoxPlot.ctx.setLineDash([1, 4]);
    chartBoxPlot.ctx.beginPath();
    chartBoxPlot.ctx.moveTo(0, y);
    chartBoxPlot.ctx.lineTo(chartBoxPlot.width, y);
    chartBoxPlot.ctx.stroke();
    chartBoxPlot.ctx.setLineDash([]);

    const price = (~~priceInfos[0].closePrice).toLocaleString();
    const textSize = labelBoxPlot.ctx.measureText(price);
    const fontSize = 15;
    const width = textSize.width + 20;
    const height = fontSize + 10;
    labelBoxPlot.ctx.fillStyle = theme.colors.red;
    labelBoxPlot.ctx.fillRect(0, y - height / 2, width, height);

    labelBoxPlot.ctx.fillStyle = 'white';
    labelBoxPlot.ctx.textBaseline = 'middle';
    labelBoxPlot.ctx.fillText(price, 20 / 2, y);
  };

  const drawMouseMove = (dateList: any, nowDateLength: number, rMax: number, rMin: number) => {
    if (!chartBoxPlot) return;
    if (!dateLabel) return;
    if (!labelBoxPlot) return;

    if (isMouseEnter) {
      chartBoxPlot.ctx.strokeStyle = 'white';
      chartBoxPlot.ctx.lineWidth = 1;
      chartBoxPlot.ctx.setLineDash([10, 10]);
      chartBoxPlot.ctx.beginPath();
      chartBoxPlot.ctx.moveTo(0, mousePos.y);
      chartBoxPlot.ctx.lineTo(chartBoxPlot.width, mousePos.y);
      chartBoxPlot.ctx.stroke();

      const price = (~~(
        ((chartBoxPlot.height - mousePos.y) * (rMax - rMin)) / chartBoxPlot.height +
        rMin
      )).toLocaleString();
      const textSize = labelBoxPlot.ctx.measureText(price);
      const fontSize = 15;
      const width = textSize.width + 20;
      const height = fontSize + 10;
      labelBoxPlot.ctx.fillStyle = theme.colors.blue;
      labelBoxPlot.ctx.fillRect(0, mousePos.y - height / 2, width, height);
      labelBoxPlot.ctx.fillStyle = 'white';
      labelBoxPlot.ctx.textBaseline = 'middle';
      labelBoxPlot.ctx.fillText(price, 20 / 2, mousePos.y);

      const canvasPosX =
        canvasPos.PrevX + canvasPos.EndX - canvasPos.StartX - nowDateLength * (chartInfo.BarSize + chartInfo.BarGap);

      for (let i = 0; i < dateList.length; i++) {
        const date = dateList[i];
        const posX = canvasPosX + i * (chartInfo.BarSize + chartInfo.BarGap);
        if (posX <= -chartInfo.BarSize * (3 / 2) || posX >= chartBoxPlot.width + chartInfo.BarSize * (3 / 2)) continue;

        if (Math.abs(mousePos.x - posX) <= (chartInfo.BarSize + chartInfo.BarGap) / 2) {
          chartBoxPlot.ctx.beginPath();
          chartBoxPlot.ctx.moveTo(posX, 0);
          chartBoxPlot.ctx.lineTo(posX, chartBoxPlot.height);
          chartBoxPlot.ctx.stroke();

          const str = date.year + '-' + String(date.month).padStart(2, '0') + '-' + String(date.day).padStart(2, '0');
          const textSize = dateLabel.ctx.measureText(str);
          const fontSize = 15;
          const width = textSize.width + 25;
          const height = fontSize + 10;
          dateLabel.ctx.font = fontSize + 'px Pretendard';
          dateLabel.ctx.fillStyle = theme.colors.blue;
          dateLabel.ctx.fillRect(posX - width / 2, 0, width, height);
          dateLabel.ctx.fillStyle = 'white';
          dateLabel.ctx.textBaseline = 'middle';
          dateLabel.ctx.fillText(str, posX, height / 2);
          break;
        }
      }
      chartBoxPlot.ctx.setLineDash([]);
    }
  };

  const drawCandleChart = (
    dateList: any,
    nowDateLength: number,
    rMax: number,
    rMin: number,
    minDate: string,
    maxDate: string,
  ) => {
    if (!chartBoxPlot) return;
    const canvasPosX =
      canvasPos.PrevX + canvasPos.EndX - canvasPos.StartX - nowDateLength * (chartInfo.BarSize + chartInfo.BarGap);

    for (let i = 0; i < dateList.length; i++) {
      const date = dateList[i];
      const posX = canvasPosX + i * (chartInfo.BarSize + chartInfo.BarGap);
      if (posX < -chartInfo.BarSize / 2 || posX > chartBoxPlot.width + chartInfo.BarSize / 2) continue;

      if (date.openPrice <= date.closePrice) {
        chartBoxPlot.ctx.fillStyle = theme.colors.red;
        chartBoxPlot.ctx.fillRect(
          posX - Math.floor(chartInfo.BarSize / 2),
          chartBoxPlot.height - ((date.closePrice - rMin) / (rMax - rMin)) * chartBoxPlot.height,
          chartInfo.BarSize,
          ((date.closePrice - date.openPrice) / (rMax - rMin)) * chartBoxPlot.height + 1,
        );
      } else {
        chartBoxPlot.ctx.fillStyle = theme.colors.blue;
        chartBoxPlot.ctx.fillRect(
          posX - Math.floor(chartInfo.BarSize / 2),
          chartBoxPlot.height - ((date.openPrice - rMin) / (rMax - rMin)) * chartBoxPlot.height,
          chartInfo.BarSize,
          ((date.openPrice - date.closePrice) / (rMax - rMin)) * chartBoxPlot.height + 1,
        );
      }

      chartBoxPlot.ctx.fillRect(
        posX,
        chartBoxPlot.height - ((date.highPrice - rMin) / (rMax - rMin)) * chartBoxPlot.height,
        1,
        ((date.highPrice - date.lowPrice) / (rMax - rMin)) * chartBoxPlot.height,
      );

      chartBoxPlot.ctx.font = '15px Pretendard';
      chartBoxPlot.ctx.textAlign = 'center';
      if (date.localDate == minDate) {
        chartBoxPlot.ctx.textBaseline = 'top';
        chartBoxPlot.ctx.fillStyle = theme.colors.blue;
        chartBoxPlot.ctx.fillText(
          '최저: ' + (~~date.lowPrice).toLocaleString() + '원',
          posX,
          10 + chartBoxPlot.height - ((date.lowPrice - rMin) / (rMax - rMin)) * chartBoxPlot.height,
        );
      }
      if (date.localDate == maxDate) {
        chartBoxPlot.ctx.textBaseline = 'bottom';
        chartBoxPlot.ctx.fillStyle = theme.colors.red;
        chartBoxPlot.ctx.fillText(
          '최고: ' + (~~date.highPrice).toLocaleString() + '원',
          posX,
          -10 + chartBoxPlot.height - ((date.highPrice - rMin) / (rMax - rMin)) * chartBoxPlot.height,
        );
      }
    }
  };

  const drawLineChart = (dateList: any, nowDateLength: number) => {
    if (!chartBoxPlot) return;
    const canvasPosX =
      canvasPos.PrevX + canvasPos.EndX - canvasPos.StartX - nowDateLength * (chartInfo.BarSize + chartInfo.BarGap);

    chartBoxPlot.ctx.strokeStyle = theme.colors.cyan;
    chartBoxPlot.ctx.lineWidth = 2;
    chartBoxPlot.ctx.lineCap = 'round';
    chartBoxPlot.ctx.lineJoin = 'round';

    let dd = 0;
    for (let i = 0; i < dateList.length; i++) {
      const date = dateList[i];
      const posX = canvasPosX + i * (chartInfo.BarSize + chartInfo.BarGap);
      if (posX <= -chartInfo.BarSize * (3 / 2) || posX >= chartBoxPlot.width + chartInfo.BarSize * (3 / 2)) continue;

      if (date.score == undefined) continue;
      if (!dd) {
        chartBoxPlot.ctx.beginPath();
        chartBoxPlot.ctx.moveTo(posX, chartBoxPlot.height - (date.score * chartBoxPlot.height) / 100);
        dd = 1;
      } else chartBoxPlot.ctx.lineTo(posX, chartBoxPlot.height - (date.score * chartBoxPlot.height) / 100);
    }
    if (!dd) return;
    chartBoxPlot.ctx.stroke();
    chartBoxPlot.ctx.lineCap = 'square';
    chartBoxPlot.ctx.lineJoin = 'round';
  };

  const zoomChart = (a: number) => {
    const delta = Math.ceil(Math.log10(chartInfo.BarSize + 1));
    const barSize = chartInfo.BarSize + (a > 0 ? delta : -delta);
    if (barSize < 1 || barSize > 200) return;
    setChartInfo({
      BarSize: barSize,
      BarGap: Math.floor(barSize / 4),
    });
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomChart(2);
    } else {
      zoomChart(-2);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsMouseDown(true);
    setCanvasPos({
      PrevX: canvasPosRef.current.PrevX + canvasPosRef.current.EndX - canvasPosRef.current.StartX,
      StartX: e.clientX,
      EndX: e.clientX,
    });
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setCanvasPos({
      PrevX: canvasPosRef.current.PrevX + canvasPosRef.current.EndX - canvasPosRef.current.StartX,
      StartX: 0,
      EndX: 0,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (isMouseDownRef.current) {
      setCanvasPos({
        EndX: e.clientX,
      });
    }
  };

  const handleMouseMoveCanvas = (e: MouseEvent) => {
    setMousePos({ x: e.offsetX, y: e.offsetY });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 72px',
        gridTemplateRows: '400px 64px',
      }}
    >
      <StockChartCanvas
        ref={boxPlotChartCanvasRef}
        style={{
          borderRight: '2px solid #FFFFFF11',
          borderBottom: '2px solid #FFFFFF11',
        }}
      />
      <StockChartCanvas ref={labelBoxPlotCanvasRef} />
      {/* <StockChartCanvas
        style={{
          borderRight: '2px solid #FFFFFF33',
        }}
        ref={scoreLineChartCanvasRef}
      />
      <StockChartCanvas style={{ background: 'yellow' }} /> */}
      <StockChartCanvas ref={dateLabelCanvasRef} />
    </div>
  );
};

const StockChart = ({ stockId }: { stockId: number }) => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const chartPeriodList: { periodCode: PERIOD_CODE; periodTitle: string }[] = [
    {
      periodCode: 'D',
      periodTitle: '일',
    },
    {
      periodCode: 'W',
      periodTitle: '주',
    },
    {
      periodCode: 'M',
      periodTitle: '월',
    },
  ];
  const [chartPeriodIdx, setChartPeriodIdx] = useState<PERIOD_CODE>('D');
  const [stockInfo, suspend] = useQueryComponent({ query: ChartQuery(stockId, chartPeriodIdx, '2020-08-01') });
  const [priceInfos, setPriceInfos] = useState<any>();

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
  }, [didMount]);

  useEffect(() => {
    if (!stockInfo) return;
    console.log(stockInfo, chartPeriodIdx);
    setPriceInfos(stockInfo.priceInfos);
  }, [stockInfo]);

  return (
    suspend ||
    (priceInfos && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div>{stockInfo.symbolName}</div>
            <div>새로고침</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', padding: '0 12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {chartPeriodList.map((e, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 8px',
                    background: e.periodCode == chartPeriodIdx ? 'gray' : '',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setChartPeriodIdx(e.periodCode)}
                >
                  {e.periodTitle}
                </span>
              ))}
            </div>
          </div>
        </div>
        <StockChartCanvasGrid priceInfos={priceInfos} />
      </div>
    ))
  );
};

export default StockChart;
