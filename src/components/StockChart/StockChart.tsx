import styled from '@emotion/styled';
import { M } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
import { useEffect, useRef, useState } from 'react';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { PERIOD_CODE } from '@controllers/api.Type';
import { ChartQuery } from '@controllers/query';
import { theme } from '@styles/themes';
import {
  ChartLabel,
  StockChartContainer,
  StockChartHeader,
  StockChartHeaderContents,
  StockChartHeaderItem,
} from './StockChart.Style';
import StockChartCanvas from './StockChartCanvas';

const START_BAR_SIZE = 60;

const SCALE_RATIOS = [1, 2, 2.5, 4, 5];

const StockChartGrid = ({ priceInfos }: { priceInfos: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const priceLabelRef = useRef<HTMLDivElement>(null);
  const scoreLabelRef = useRef<HTMLDivElement>(null);

  const [chartItemList, setChartItemList] = useState<any>([]);
  const [scoreItemList, setScoreItemList] = useState<any>([]);

  const [gridDate, setGridDate] = useState<any>([]);
  const [gridScore, setGridScore] = useState<any>([]);
  const [gridPrice, setGridPrice] = useState<any>([]);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [mousePosInfo, setMousePosInfo] = useState<any>(null);
  const [recentPrice, setRecentPrice] = useState<any>(null);
  const [extremePrice, setExtremePrice] = useState<any>(null);

  const [chartInfo, setChartInfo] = useState<any>({
    BarSize: START_BAR_SIZE,
    width: 0,
    height: 0,
    priceScale: 5 / 4,
    canvasX: 900,
    prevX: 0,
  });

  const [mousePos, setMousePos] = useState<any>({
    x: 0,
    y: 0,
  });

  const [gridX, gridY] = [120, 50];

  const zoomPrice = (a: number) => {
    const delta = 5 / 4;
    const priceScale = chartInfo.priceScale * (a > 0 ? delta : 1 / delta);
    if (priceScale <= 0.3 || priceScale > 20) return;
    console.log(chartInfo);
    setChartInfo({ ...chartInfo, priceScale: priceScale });
  };

  const zoomChart = (a: number) => {
    const delta = Math.ceil(Math.log10(chartInfo.BarSize + 1));
    const barSize = chartInfo.BarSize + (a > 0 ? delta : -delta);
    if (barSize <= 0 || barSize > 200) return;

    const itemWidth = barSize * 1.5;
    const MinX = itemWidth * (5 / 2);
    const MaxX = chartInfo.width + itemWidth * (priceInfos.length - 3 / 2);

    setChartInfo({
      ...chartInfo,
      canvasX: chartInfo.canvasX < MinX ? MinX : chartInfo.canvasX > MaxX ? MaxX : chartInfo.canvasX,
      BarSize: barSize,
    });
  };

  useEffect(() => {
    const canvasContainer = containerRef.current;
    if (!canvasContainer) return;

    setChartInfo({ ...chartInfo, width: canvasContainer.offsetWidth, height: canvasContainer.offsetHeight });
  }, []);

  useEffect(() => {
    const canvasContainer = containerRef.current;
    if (!canvasContainer) return;

    const priceLabel = priceLabelRef.current;
    if (!priceLabel) return;

    const scoreLabel = scoreLabelRef.current;
    if (!scoreLabel) return;

    canvasContainer.addEventListener('wheel', handleWheel);
    canvasContainer.addEventListener('mousedown', handleMouseDown);
    canvasContainer.addEventListener('mousemove', handleMouseMoveCanvas);
    canvasContainer.addEventListener('mouseenter', handleMouseEnter);
    canvasContainer.addEventListener('mouseleave', handleMouseLeave);
    canvasContainer.addEventListener('mouseleave', handleMouseLeave);

    priceLabel.addEventListener('wheel', handleWheelPrice);

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvasContainer.removeEventListener('wheel', handleWheel);
      canvasContainer.removeEventListener('mousedown', handleMouseDown);
      canvasContainer.removeEventListener('mousemove', handleMouseMoveCanvas);
      canvasContainer.removeEventListener('mouseenter', handleMouseEnter);
      canvasContainer.removeEventListener('mouseleave', handleMouseLeave);

      priceLabel.removeEventListener('wheel', handleWheelPrice);

      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [chartInfo, isMouseDown]);

  const handleWheelPrice = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomPrice(2);
    } else {
      zoomPrice(-2);
    }
  };

  useEffect(() => {
    const chartItemList: any[] = [];
    const scoreItemList: any[] = [];

    const firstDay = new Date('1970-01-01');
    const lastDay = new Date('2070-12-31');
    const nowDay = new Date();

    const itemWidth = chartInfo.BarSize * 1.5;

    const { width, height } = chartInfo;

    let nowDateIdx = 0;
    let priceInfoIdx = 0;

    for (let i = 0; i <= ~~((lastDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)); i++) {
      const date = new Date(firstDay.getTime() + i * (1000 * 60 * 60 * 24));
      if (date.getDay() == 0 || date.getDay() == 6) continue;

      const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
      const dateStr =
        day == 1 || ([2, 3].includes(day) && date.getDay() == 1)
          ? month == 1
            ? year + '년'
            : month + '월'
          : day + '일';
      const type = day == 1 || ([2, 3].includes(day) && date.getDay() == 1) ? (month == 1 ? 'Y' : 'M') : 'D';

      const chartItem = {
        dateStr: dateStr,
        localDate: year + month.toString().padStart(2, '0') + day.toString().padStart(2, '0'),
        year: year,
        month: month,
        day: day,
        type: type,
        price: 0,
      };

      if (
        priceInfoIdx &&
        priceInfoIdx < priceInfos.length &&
        priceInfos[priceInfos.length - priceInfoIdx - 1].localDate != chartItem.localDate
      )
        continue;

      if (
        priceInfoIdx < priceInfos.length &&
        priceInfos[priceInfos.length - priceInfoIdx - 1].localDate == chartItem.localDate
      ) {
        Object.assign(chartItem, priceInfos[priceInfos.length - priceInfoIdx - 1]);
        priceInfoIdx++;
      }

      chartItemList.push(chartItem);
      if (nowDay.getTime() >= date.getTime()) nowDateIdx = chartItemList.length;
    }

    // dateGrid

    const dateList: any = [];

    let dayWidth = 0;
    let beforeType = 'D';
    let [l, r] = [1e9, 0];

    chartItemList.map((e: any, i: number) => {
      const posX = chartInfo.canvasX + itemWidth * (i - nowDateIdx);

      dayWidth += itemWidth;

      if (
        dayWidth >= gridX ||
        (e.type == 'M' && beforeType == 'D') ||
        (e.type == 'Y' && ['D', 'M'].includes(beforeType))
      ) {
        if ((e.type == 'M' && beforeType == 'D') || (e.type == 'Y' && ['D', 'M'].includes(beforeType))) {
          dateList.pop();
        }
        dayWidth = 0;
        beforeType = e.type;
        dateList.push({
          dateStr: e.dateStr,
          key: e.localDate,
          pos: { x: posX, y: 0 },
        });
      }

      if (posX < -gridX * 2 || posX > chartInfo.width + gridX * 2) return;
      l = Math.min(l, dateList.length - 1);
      r = Math.max(r, dateList.length - 1);
    });

    setGridDate(dateList.slice(l, r));

    // chart cut;

    // const chartItems = chartItemList.filter((_, i: number) => {
    //   const posX = chartInfo.canvasX + itemWidth * (i - nowDateIdx);
    //   if (posX < -itemWidth / 2 || posX > width + itemWidth / 2) return false;
    //   return true;
    // });

    const chartItems: any[] = [];
    chartItemList.map((e, i) => {
      const posX = chartInfo.canvasX + itemWidth * (i - nowDateIdx);
      if (posX < -itemWidth / 2 || posX > width + itemWidth / 2) return;
      chartItems.push({ ...e, pos: { x: posX } });
    });
    console.log(chartItems);

    // score chart cut;

    const priceMaxIdx = chartItems.reduce(
      (prevIdx: number, value: any, curIdx: number, arr: any) =>
        value.highPrice != undefined &&
        (arr[prevIdx].highPrice == undefined || ~~value.highPrice > ~~arr[prevIdx].highPrice)
          ? curIdx
          : prevIdx,
      0,
    );
    const priceMinIdx = chartItems.reduce(
      (prevIdx: number, value: any, curIdx: number, arr: any) =>
        value.lowPrice != undefined &&
        (arr[prevIdx].lowPrice == undefined || ~~value.lowPrice < ~~arr[prevIdx].lowPrice)
          ? curIdx
          : prevIdx,
      0,
    );

    const [priceMaxItem, priceMinItem] = [chartItems[priceMaxIdx], chartItems[priceMinIdx]];
    const [priceMaxPrice, priceMinPrice] = [~~priceMaxItem.highPrice, ~~priceMinItem.lowPrice];
    const priceRangePrice = priceMaxPrice - priceMinPrice;

    const [priceScaledMax, priceScaledMin] = [
      priceMaxPrice - (1 - chartInfo.priceScale) * (priceRangePrice / 2) + 1,
      priceMinPrice + (1 - chartInfo.priceScale) * (priceRangePrice / 2) - 1,
    ];
    const priceScaledRange = priceScaledMax - priceScaledMin;

    // priceGrid

    const priceStrList = [];

    let priceAxisScale = 0;
    for (let i = 1; i <= 1e9; i *= 10) {
      SCALE_RATIOS.map((e) => {
        if (priceAxisScale) return;
        const scale = e * i;
        if ((scale / priceScaledRange) * height >= gridY) {
          priceAxisScale = scale;
        }
      });
      if (priceAxisScale) break;
    }

    for (
      let i = Math.ceil(priceScaledMin / priceAxisScale) * priceAxisScale;
      i <= Math.floor(priceScaledMax);
      i += priceAxisScale
    ) {
      priceStrList.push({
        priceStr: i.toLocaleString(),
        pos: { x: 0, y: height - ((i - priceScaledMin) / priceScaledRange) * height },
      });
    }

    setGridPrice(priceStrList);

    // recentPrice

    setRecentPrice({
      pos: {
        x: 0,
        y: height - ((~~priceInfos[0].closePrice - priceScaledMin) / priceScaledRange) * height,
      },
      delta: ~~priceInfos[0].closePrice - ~~priceInfos[0].openPrice,
      priceStr: (~~priceInfos[0].closePrice).toLocaleString(),
    });

    const priceChartItems: any[] = [];
    const extremePrice = {};

    chartItemList.map((e, i) => {
      const posX = chartInfo.canvasX + itemWidth * (i - nowDateIdx);
      if (posX < -itemWidth / 2 || posX > width + itemWidth / 2) return;
      // if (typeof e.openPrice != 'string') return;

      const item = {
        marketTop: height - ((Math.max(~~e.openPrice, ~~e.closePrice) - priceScaledMin) / priceScaledRange) * height,
        marketBottom: (Math.abs(~~e.openPrice - ~~e.closePrice) / priceScaledRange) * height,
        DailyTop: height - ((e.highPrice - priceScaledMin) / priceScaledRange) * height,
        DailyBottom: ((e.highPrice - e.lowPrice) / priceScaledRange) * height,
        delta: ~~e.closePrice >= ~~e.openPrice,
        pos: {
          x: chartInfo.canvasX + itemWidth * (i - nowDateIdx),
        },
      };

      priceChartItems.push(item);
      if (i == priceMinIdx) {
        console.log(i, 'min');
      } else if (i == priceMaxIdx) {
        console.log(i, 'max');
      }
    });
    console.log(priceMinIdx, priceMaxIdx);
    console.log(priceChartItems.length);

    setChartItemList(priceChartItems);

    // extremePrice

    setExtremePrice({
      min: {
        pos: {
          x: priceChartItems[priceMinIdx].pos.x,
          y: priceChartItems[priceMinIdx].DailyTop + priceChartItems[priceMinIdx].DailyBottom,
        },
        price: priceMinItem.lowPrice.toLocaleString(),
      },
      max: {
        pos: {
          x: priceChartItems[priceMaxIdx].pos.x,
          y: priceChartItems[priceMaxIdx].DailyTop,
        },
        price: priceMaxItem.highPrice.toLocaleString(),
      },
    });

    //

    const maxIdx = chartItems.reduce(
      (prevIdx: number, value: any, curIdx: number, arr: any) =>
        value.highPrice != undefined &&
        (arr[prevIdx].highPrice == undefined || ~~value.highPrice > ~~arr[prevIdx].highPrice)
          ? curIdx
          : prevIdx,
      0,
    );
    const minIdx = chartItems.reduce(
      (prevIdx: number, value: any, curIdx: number, arr: any) =>
        value.highPrice != undefined &&
        (arr[prevIdx].lowPrice == undefined || ~~value.lowPrice < ~~arr[prevIdx].lowPrice)
          ? curIdx
          : prevIdx,
      0,
    );

    const [maxItem, minItem] = [chartItems[maxIdx], chartItems[minIdx]];

    const [maxPrice, minPrice] = [~~maxItem.highPrice, ~~minItem.lowPrice];
    const rangePrice = maxPrice - minPrice;

    const [rMax, rMin] = [
      maxPrice - (1 - chartInfo.priceScale) * (rangePrice / 2) + 1,
      minPrice + (1 - chartInfo.priceScale) * (rangePrice / 2) - 1,
    ];
    const rRange = rMax - rMin;

    //

    chartItemList.map((e: any, i: number) => {
      const posX = chartInfo.canvasX + itemWidth * (i - nowDateIdx);
      if (posX < -gridX * 2 || posX > chartInfo.width + gridX * 2) return;

      if (typeof e.score != 'number') return;
      scoreItemList.push(
        Object.assign(e, {
          pos: {
            x: posX,
            y: chartInfo.height - (e.score * chartInfo.height) / 100,
          },
        }),
      );
    });

    setScoreItemList(scoreItemList);

    let scoreLabelRatio = 0;
    for (let i = 1; i <= 1e9; i *= 10) {
      const ratios = [1, 2, 2.5, 4, 5];
      for (let j = 0; j < ratios.length; j++) {
        const tmp = i * ratios[j];
        if ((tmp / 100) * chartInfo.height >= gridY) {
          scoreLabelRatio = tmp;
          break;
        }
      }
      if (scoreLabelRatio) break;
    }

    const scoreStrList = [];
    for (
      let i = Math.ceil(0 / scoreLabelRatio) * scoreLabelRatio;
      i <= Math.floor(100 / scoreLabelRatio) * scoreLabelRatio;
      i += scoreLabelRatio
    ) {
      scoreStrList.push({
        str: i.toLocaleString(),
        pos: { x: 0, y: chartInfo.height - ((i - 0) / 100) * chartInfo.height },
      });
    }
    setGridScore(scoreStrList);

    // mousePos

    if (isMouseEnter) {
      const priceStr = (~~(((height - mousePos.y) * priceScaledRange) / height + priceScaledMin)).toLocaleString();

      chartItemList.map((e, i) => {
        const posX = chartInfo.canvasX + (i - nowDateIdx) * itemWidth;
        if (posX <= -itemWidth || posX >= width + itemWidth) return;
        if (Math.abs(mousePos.x - posX) > itemWidth / 2) return;

        setMousePosInfo({
          pos: {
            x: posX,
            y: mousePos.y,
          },
          dateStr: e.year + '-' + String(e.month).padStart(2, '0') + '-' + String(e.day).padStart(2, '0'),
          priceStr: priceStr,
        });
      });
    }
  }, [mousePos, chartInfo, isMouseEnter]);

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
    setChartInfo({ ...chartInfo, prevX: e.clientX });
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsMouseDown(false);
    setChartInfo({
      ...chartInfo,
      prevX: 0,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (isMouseDown) {
      const deltaX = e.clientX - chartInfo.prevX;

      const itemWidth = chartInfo.BarSize * 1.5;
      const canvasX = chartInfo.canvasX + deltaX;
      const MinX = itemWidth * (5 / 2);
      const MaxX = chartInfo.width + itemWidth * (priceInfos.length - 3 / 2);

      setChartInfo({
        ...chartInfo,
        canvasX: canvasX < MinX ? MinX : canvasX > MaxX ? MaxX : canvasX,
        prevX: e.clientX,
      });
    }
  };

  const handleMouseMoveCanvas = (e: MouseEvent) => {
    setMousePos({ x: e.offsetX, y: e.offsetY });
  };

  const handleMouseEnter = (e: MouseEvent) => {
    setIsMouseEnter(true);
    setMousePosInfo({
      pos: {
        x: e.offsetX,
        y: e.offsetY,
      },
      dateStr: '',
      priceStr: '',
    });
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
    setMousePosInfo(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '72px auto 72px',
        gridTemplateRows: '400px 64px',
      }}
    >
      <div ref={scoreLabelRef} style={{ position: 'relative', overflow: 'hidden' }}>
        {gridScore.map((e: any) => (
          <ChartLabel key={e.str} y={e.pos.y}>
            {e.str}
          </ChartLabel>
        ))}
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <StockChartCanvas
          dateLabelItem={gridDate}
          priceLabelItem={gridPrice}
          chartItemList={chartItemList}
          chartInfo={chartInfo}
          recentPrice={recentPrice}
          mousePosInfo={mousePosInfo}
          scoreItemList={scoreItemList}
        />
        {extremePrice && (
          <>
            <ChartLabel x={extremePrice.min.pos.x} y={extremePrice.min.pos.y + 20} color={theme.colors.blue}>
              {'최저: ' + extremePrice.min.price + '원'}
            </ChartLabel>
            <ChartLabel x={extremePrice.max.pos.x} y={extremePrice.max.pos.y - 20} color={theme.colors.red}>
              {'최고: ' + extremePrice.max.price + '원'}
            </ChartLabel>
          </>
        )}
        <div ref={containerRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      </div>
      <div ref={priceLabelRef} style={{ position: 'relative', overflow: 'hidden' }}>
        {gridPrice.map((e: any) => (
          <ChartLabel key={e.str} y={e.pos.y}>
            {e.priceStr}
          </ChartLabel>
        ))}
        {recentPrice && (
          <ChartLabel y={recentPrice.pos.y} background={recentPrice.delta >= 0 ? 'red' : 'blue'}>
            {recentPrice.priceStr}
          </ChartLabel>
        )}
        {mousePosInfo && (
          <ChartLabel y={mousePosInfo.pos.y} background="blue">
            {mousePosInfo.priceStr}
          </ChartLabel>
        )}
      </div>
      <div style={{ position: 'relative', overflow: 'hidden', gridColumn: '2 / 3' }}>
        {gridDate.map((e: any) => (
          <ChartLabel key={e.key} x={e.pos.x}>
            {e.dateStr}
          </ChartLabel>
        ))}
        {mousePosInfo && (
          <ChartLabel x={mousePosInfo.pos.x} background="blue">
            {mousePosInfo.dateStr}
          </ChartLabel>
        )}
      </div>
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
    setPriceInfos(stockInfo.priceInfos);
  }, [stockInfo]);

  return (
    suspend ||
    (priceInfos && (
      <StockChartContainer>
        <StockChartHeader>
          <StockChartHeaderContents>
            <StockChartHeaderItem>{stockInfo.symbolName}</StockChartHeaderItem>
            <StockChartHeaderItem>새로고침</StockChartHeaderItem>
          </StockChartHeaderContents>
          <StockChartHeaderContents>
            {chartPeriodList.map((e, i) => (
              <StockChartHeaderItem
                key={i}
                background={e.periodCode == chartPeriodIdx ? 'grayscale90' : 'transparent'}
                onClick={() => setChartPeriodIdx(e.periodCode)}
              >
                {e.periodTitle}
              </StockChartHeaderItem>
            ))}
          </StockChartHeaderContents>
        </StockChartHeader>
        <StockChartGrid priceInfos={priceInfos} />
      </StockChartContainer>
    ))
  );
};

export default StockChart;
