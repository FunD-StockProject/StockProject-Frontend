import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { PERIOD_CODE } from '@controllers/api.Type';
import { ChartQuery } from '@controllers/query';
import { theme } from '@styles/themes';
import {
  ChartLabel,
  StockChartContainer,
  StockChartGridContainer,
  StockChartHeader,
  StockChartHeaderContents,
  StockChartHeaderItem,
} from './StockChart.Style';
import StockChartCanvas from './StockChartCanvas';

const SCALE_RATIOS = [1, 2, 2.5, 4, 5];

const priceToStr = (price: number, country: string) => {
  if (country == 'KOREA') return price.toLocaleString();
  if (price >= 10000) {
    return price.toFixed(0).toLocaleString();
  } else if (price >= 1000) {
    return price.toFixed(1).toLocaleString();
  } else {
    return price.toFixed(2).toLocaleString();
  }
};

const StockChartGrid = ({ priceInfos, country }: { priceInfos: any; country: string }) => {
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

  const isMobile = useIsMobile();

  const [chartInfo, setChartInfo] = useState<any>({
    BarSize: isMobile ? 8 : 24,
    width: 0,
    height: 0,
    priceScale: 5 / 4,
    scoreScale: 5 / 4,
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
    setChartInfo({ ...chartInfo, priceScale: priceScale });
  };

  const zoomScore = (a: number) => {
    const delta = 5 / 4;
    const scoreScale = chartInfo.scoreScale * (a > 0 ? delta : 1 / delta);
    if (scoreScale <= 0.3 || scoreScale > 20) return;
    setChartInfo({ ...chartInfo, scoreScale: scoreScale });
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

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomChart(1);
    } else {
      zoomChart(-1);
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

  const handlePointerDown = (e: MouseEvent | TouchEvent) => {
    const ponterX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    setIsMouseDown(true);
    setChartInfo({ ...chartInfo, prevX: ponterX });
  };

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    const ponterX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    e.preventDefault();
    if (isMouseDown) {
      const deltaX = ponterX - chartInfo.prevX;

      const itemWidth = chartInfo.BarSize * 1.5;
      const canvasX = chartInfo.canvasX + deltaX;
      const MinX = itemWidth * (5 / 2);
      const MaxX = chartInfo.width + itemWidth * (priceInfos.length - 3 / 2);

      setChartInfo({
        ...chartInfo,
        canvasX: canvasX < MinX ? MinX : canvasX > MaxX ? MaxX : canvasX,
        prevX: ponterX,
      });
    }
  };

  const handlePointerUp = () => {
    setIsMouseDown(false);
    setChartInfo({
      ...chartInfo,
      prevX: 0,
    });
  };

  useEffect(() => {
    const canvasContainer = containerRef.current;
    if (!canvasContainer) return;

    const { width, height } = canvasContainer.getBoundingClientRect();
    const itemWidth = chartInfo.BarSize * 1.5;

    setChartInfo({
      ...chartInfo,
      width: width,
      height: height,
      canvasX: width - itemWidth,
    });
  }, []);

  useEffect(() => {
    const canvasContainer = containerRef.current;
    if (!canvasContainer) return;

    const priceLabel = priceLabelRef.current;
    if (!priceLabel) return;

    const scoreLabel = scoreLabelRef.current;
    if (!scoreLabel) return;

    canvasContainer.onmousedown = handlePointerDown;
    window.onmousemove = handlePointerMove;
    window.onmouseup = handlePointerUp;

    canvasContainer.ontouchstart = handlePointerDown;
    window.ontouchmove = handlePointerMove;
    window.ontouchend = handlePointerUp;

    canvasContainer.addEventListener('wheel', handleWheel);
    canvasContainer.addEventListener('mousemove', handleMouseMoveCanvas);
    canvasContainer.addEventListener('mouseenter', handleMouseEnter);
    canvasContainer.addEventListener('mouseleave', handleMouseLeave);
    canvasContainer.addEventListener('mouseleave', handleMouseLeave);

    priceLabel.addEventListener('wheel', handleWheelPrice);
    scoreLabel.addEventListener('wheel', handleWheelScore);

    return () => {
      canvasContainer.removeEventListener('wheel', handleWheel);
      canvasContainer.removeEventListener('mousemove', handleMouseMoveCanvas);
      canvasContainer.removeEventListener('mouseenter', handleMouseEnter);
      canvasContainer.removeEventListener('mouseleave', handleMouseLeave);

      priceLabel.removeEventListener('wheel', handleWheelPrice);
      scoreLabel.removeEventListener('wheel', handleWheelScore);
    };
  }, [chartInfo, isMouseDown]);

  const handleWheelPrice = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomPrice(1);
    } else {
      zoomPrice(-1);
    }
  };

  const handleWheelScore = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomScore(1);
    } else {
      zoomScore(-1);
    }
  };

  useEffect(() => {
    const firstDay = new Date('1970-01-01');
    const lastDay = new Date('2070-12-31');
    const nowDay = new Date();

    const itemWidth = chartInfo.BarSize * 1.5;

    const { width, height } = chartInfo;

    let nowDateIdx = 0;
    let priceInfoIdx = 0;

    const chartItemList: any[] = [];

    const DAY_TIME = 1000 * 60 * 60 * 24;

    for (let i = 0; i <= (lastDay.getTime() - firstDay.getTime()) / DAY_TIME; i++) {
      const date = new Date(firstDay.getTime() + i * DAY_TIME);
      if (date.getDay() == 0 || date.getDay() == 6) continue;

      const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
      const type = day == 1 || ([2, 3].includes(day) && date.getDay() == 1) ? (month == 1 ? 'Y' : 'M') : 'D';
      const dateStr = type == 'Y' ? year + '년' : type == 'M' ? month + '월' : day + '일';
      const localDate = year + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');

      const chartItem = {
        dateStr: dateStr,
        localDate: localDate,
        year: year,
        month: month,
        day: day,
        type: type,
        price: 0,
      };

      if (priceInfoIdx < priceInfos.length) {
        const lastPriceInfo = priceInfos[priceInfos.length - priceInfoIdx - 1];
        if (lastPriceInfo.localDate == localDate) {
          Object.assign(chartItem, lastPriceInfo);
          priceInfoIdx++;
        } else if (priceInfoIdx) continue;
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

      const isGridBorder = (e.type == 'M' && beforeType == 'D') || (e.type == 'Y' && ['D', 'M'].includes(beforeType));

      if (dayWidth >= gridX || isGridBorder) {
        dayWidth = 0;
        beforeType = e.type;

        if (isGridBorder) dateList.pop();
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

    const chartItems = chartItemList
      .map((e, i) => {
        const posX = chartInfo.canvasX + itemWidth * (i - nowDateIdx);
        if (posX < -itemWidth / 2 || posX > width + itemWidth / 2) return;
        if (e.highPrice == undefined) return;
        return {
          ...e,
          pos: { x: posX },
          highPrice: Number(e.highPrice),
          lowPrice: Number(e.lowPrice),
          openPrice: Number(e.openPrice),
          closePrice: Number(e.closePrice),
        };
      })
      .filter((e) => e);

    const [priceMax, priceMin] = [
      chartItems.reduce((prev, value) => (prev.highPrice < value.highPrice ? value : prev)),
      chartItems.reduce((prev, value) => (prev.lowPrice > value.lowPrice ? value : prev)),
    ];
    const [priceMaxPrice, priceMinPrice] = [priceMax.highPrice, priceMin.lowPrice];
    const priceRangePrice = priceMaxPrice - priceMinPrice;

    const [priceScaledMax, priceScaledMin] = [
      priceMaxPrice - (1 - chartInfo.priceScale) * (priceRangePrice / 2) + 1,
      priceMinPrice + (1 - chartInfo.priceScale) * (priceRangePrice / 2) - 1,
    ];
    const priceScaledRange = priceScaledMax - priceScaledMin;

    const priceScaledY = (price: number) => height * (1 - (price - priceScaledMin) / priceScaledRange);
    const priceScaledH = (price: number) => height * (price / priceScaledRange);
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
        priceStr: priceToStr(i, country),
        pos: { x: 0, y: height - ((i - priceScaledMin) / priceScaledRange) * height },
      });
    }

    setGridPrice(priceStrList);

    // recentPrice

    const recentPrice = Number(priceInfos[0].closePrice);

    setRecentPrice({
      pos: {
        x: 0,
        y: height - ((~~priceInfos[0].closePrice - priceScaledMin) / priceScaledRange) * height,
      },
      delta: ~~priceInfos[0].closePrice - ~~priceInfos[0].openPrice,
      priceStr: priceToStr(recentPrice, country),
    });

    const priceChartItems = chartItems.map((e) => {
      return {
        ...e,
        market: {
          y: priceScaledY(Math.max(e.openPrice, e.closePrice)),
          h: priceScaledH(Math.abs(e.openPrice - e.closePrice)),
        },
        daily: {
          y: priceScaledY(e.highPrice),
          h: priceScaledH(e.highPrice - e.lowPrice),
        },
        delta: ~~e.closePrice >= ~~e.openPrice,
      };
    });

    setChartItemList(priceChartItems);

    // extremePrice

    setExtremePrice({
      max: {
        pos: {
          x: priceMax.pos.x,
          y: priceScaledY(priceMax.highPrice),
        },
        price: priceMax.highPrice.toLocaleString(),
        delta: (recentPrice - priceMax.highPrice) / priceMax.highPrice,
      },
      min: {
        pos: {
          x: priceMin.pos.x,
          y: priceScaledY(priceMin.lowPrice),
        },
        price: priceMin.lowPrice.toLocaleString(),
        delta: (recentPrice - priceMin.lowPrice) / priceMin.lowPrice,
      },
    });

    //

    const [scoreMaxPrice, scoreMinPrice] = [100, 0];
    const scoreRangePrice = scoreMaxPrice - scoreMinPrice;

    const [scoreScaledMax, scoreScaledMin] = [
      scoreMaxPrice - (1 - chartInfo.scoreScale) * (scoreRangePrice / 2) + 1,
      scoreMinPrice + (1 - chartInfo.scoreScale) * (scoreRangePrice / 2) - 1,
    ];
    const scoreScaledRange = scoreScaledMax - scoreScaledMin;
    const scoreScaledY = (score: number) => height * (1 - (score - scoreScaledMin) / scoreScaledRange);

    let scoreAxisScale = 0;
    for (let i = 1; i <= 1e9; i *= 10) {
      SCALE_RATIOS.map((e) => {
        if (scoreAxisScale) return;
        const scale = e * i;
        if ((scale / scoreScaledRange) * height >= gridY) {
          scoreAxisScale = scale;
        }
      });
      if (scoreAxisScale) break;
    }

    const scoreStrList = [];
    for (
      let i = Math.ceil(scoreScaledMin / scoreAxisScale) * scoreAxisScale;
      i <= Math.floor(scoreScaledMax / scoreAxisScale) * scoreAxisScale;
      i += scoreAxisScale
    ) {
      scoreStrList.push({
        str: i,
        pos: { x: 0, y: scoreScaledY(i) },
      });
    }
    setGridScore(scoreStrList);

    const scoreChartItems = chartItems
      .map((e) => {
        return {
          ...e,
          pos: {
            ...e.pos,
            y: scoreScaledY(e.score),
          },
        };
      })
      .filter((e) => e.score);

    setScoreItemList(scoreChartItems);

    // mousePos

    if (isMouseEnter) {
      const priceStr = priceToStr(((height - mousePos.y) * priceScaledRange) / height + priceScaledMin, country);

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

  return (
    <StockChartGridContainer>
      <div ref={scoreLabelRef}>
        {gridScore.map((e: any) => (
          <ChartLabel align="right" key={e.str} y={e.pos.y}>
            {e.str}
          </ChartLabel>
        ))}
      </div>
      <div ref={containerRef}>
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
              {`최저 : ${extremePrice.min.price} 원 (${(extremePrice.min.delta >= 0 ? '+' : '-') + (Math.abs(extremePrice.min.delta) * 100).toFixed(1)}%)`}
            </ChartLabel>
            <ChartLabel x={extremePrice.max.pos.x} y={extremePrice.max.pos.y - 20} color={theme.colors.red}>
              {`최고 : ${extremePrice.max.price} 원 (${(extremePrice.max.delta >= 0 ? '+' : '-') + (Math.abs(extremePrice.max.delta) * 100).toFixed(1)}%)`}
            </ChartLabel>
          </>
        )}
      </div>
      <div ref={priceLabelRef}>
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
      <div />
      <div>
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
    </StockChartGridContainer>
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
                onClick={() => i == 0 && setChartPeriodIdx(e.periodCode)}
              >
                {e.periodTitle}
              </StockChartHeaderItem>
            ))}
          </StockChartHeaderContents>
        </StockChartHeader>
        <StockChartGrid priceInfos={priceInfos} country={stockInfo.country} />
      </StockChartContainer>
    ))
  );
};

export default StockChart;
