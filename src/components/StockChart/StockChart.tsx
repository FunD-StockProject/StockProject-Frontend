import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { PERIOD_CODE } from '@controllers/api.Type';
import { ChartQuery } from '@controllers/query';
import { theme, themeColor } from '@styles/themes';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  ChartLabel,
  ExtremeLabel,
  StockChartContainer,
  StockChartGridContainer,
  StockChartHeader,
  StockChartHeaderContents,
  StockChartHeaderItem,
} from './StockChart.Style';
import StockChartCanvas from './StockChartCanvas';

const SCALE_RATIOS = [1, 2, 2.5, 4, 5];
const [gridX, gridY] = [120, 50];
const PRICE_FIELD = {
  open: { key: 'openPrice', label: '시가' },
  high: { key: 'highPrice', label: '고가' },
  low: { key: 'lowPrice', label: '저가' },
  close: { key: 'closePrice', label: '종가' },
};
const EXTREME_FIELD = {
  max: { key: 'max', label: '최고' },
  min: { key: 'min', label: '최저' },
};

const FIRST_DATE = new Date('1970-01-01');
const LAST_DATE = new Date('2070-12-31');
const DAY_TIME = 1000 * 60 * 60 * 24;

const formatPriceStr = (price: number, country: string, isCurrency?: boolean) => {
  const currency = !isCurrency ? ' ' : country == 'KOREA' ? '원 ' : '$ ';
  const digit = country == 'KOREA' || price >= 10000 ? 0 : price >= 1000 ? 1 : 2;
  const priceStr = price.toLocaleString(undefined, {
    maximumFractionDigits: digit,
    minimumFractionDigits: digit,
  });

  return priceStr + currency;
};

const formatDeltaStr = (delta: number) => {
  const symbol = !delta ? '' : delta > 0 ? '+' : '-';
  const deltaStr = Math.abs(delta).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return `(${symbol + deltaStr}%) `;
};

const StockChartGrid = ({ priceInfos, country }: { priceInfos: any; country: string }) => {
  const selectedRange = [5, 20, 60, 120];

  const containerRef = useRef<HTMLDivElement>(null);
  const priceLabelRef = useRef<HTMLDivElement>(null);
  const scoreLabelRef = useRef<HTMLDivElement>(null);

  const [gridScore, setGridScore] = useState<any>([]);
  const [gridPrice, setGridPrice] = useState<any>([]);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [mousePosInfo, setMousePosInfo] = useState<any>(null);
  const [recentPrice, setRecentPrice] = useState<any>(null);
  const [extremePrice, setExtremePrice] = useState<any>(null);

  const [tmpChartItems, setTmpChartItems] = useState<any>([]);
  const [chartGridDate, setChartGridDate] = useState<any>([]);

  const isMobile = useIsMobile();

  const MOVING_AVERAGE: { range: number; color: themeColor }[] = [
    { range: 5, color: 'success' },
    { range: 20, color: 'red' },
    { range: 60, color: 'cyan' },
    { range: 120, color: 'yellow' },
  ];

  const [chartInfo, setChartInfo] = useState<any>({
    BarSize: isMobile ? 8 : 24,
    width: 0,
    height: 0,
    priceScale: 4 / 5,
    scoreScale: 3 / 5,
    canvasX: 0,
    movingAverage: MOVING_AVERAGE.filter((e) => selectedRange.includes(e.range)),
  });

  const [mousePos, setMousePos] = useState<any>({
    x: 0,
    y: 0,
  });

  const zoomPrice = (a: number) => {
    const delta = 4 / 5;
    const priceScale = chartInfo.priceScale * (a > 0 ? delta : 1 / delta);
    if (priceScale <= 0.1 || priceScale > 20) return;
    setChartInfo({ ...chartInfo, priceScale: priceScale });
  };

  const zoomScore = (a: number) => {
    const delta = 4 / 5;
    const scoreScale = chartInfo.scoreScale * (a > 0 ? delta : 1 / delta);
    if (scoreScale <= 0.1 || scoreScale > 20) return;
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
      canvasX: width - itemWidth * 2,
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
    const nowDate = new Date();

    const itemWidth = chartInfo.BarSize * 1.5;

    const { width, height, canvasX } = chartInfo;

    let nowDateIdx = -1;
    let priceInfoIdx = priceInfos.length - 1;

    const chartDateList: any[] = Array.from(
      { length: (LAST_DATE.getTime() - FIRST_DATE.getTime()) / DAY_TIME },
      (_, i) => {
        const date = new Date(FIRST_DATE.getTime() + i * DAY_TIME);
        if ([0, 6].includes(date.getDay())) return;

        const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
        const type = day == 1 || ([2, 3].includes(day) && date.getDay() == 1) ? (month == 1 ? 'Y' : 'M') : 'D';
        const dateStr = type == 'Y' ? year + '년' : type == 'M' ? month + '월' : day + '일';
        const localDate = year + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');

        if (priceInfoIdx >= 0) {
          if (localDate == priceInfos[priceInfoIdx].localDate) {
            priceInfoIdx--;
          } else if (priceInfoIdx < priceInfos.length - 1) {
            return;
          }
        }
        if (nowDate.getTime() >= date.getTime()) nowDateIdx++;

        return {
          day: day,
          month: month,
          year: year,
          dateStr: dateStr,
          type: type,
          localDate: localDate,
        };
      },
    ).filter((e) => e);

    let dayWidth = 0;
    let beforeType = 'D';

    const chartDateGrid: any[] = chartDateList
      .reduce((acc: any[], e: any, i) => {
        const posX = canvasX + itemWidth * (i - nowDateIdx);
        const isGridBorder = (e.type == 'M' && beforeType == 'D') || (e.type == 'Y' && ['D', 'M'].includes(beforeType));

        dayWidth += itemWidth;

        if (dayWidth < gridX) {
          if (!isGridBorder) return acc;
          else acc.pop();
        }

        dayWidth = 0;
        beforeType = e.type;

        acc.push({
          dateStr: e.dateStr,
          key: e.localDate,
          pos: { x: posX, y: 0 },
        });
        return acc;
      }, [])
      .filter((e) => e.pos.x >= -itemWidth && e.pos.x <= width + itemWidth);

    setChartGridDate(chartDateGrid);

    const tmpChartItems: any[] = priceInfos
      .map((e: any, i: number) => {
        const posX = canvasX - i * itemWidth;

        return {
          localDate: e.localDate,
          price: Object.entries(PRICE_FIELD).reduce((acc: any, [key, value]: [string, any]) => {
            return {
              ...acc,
              [key]: {
                value: Number(e[value.key]),
                delta: priceInfos[i + 1] ? (Number(e[value.key]) / Number(priceInfos[i + 1].closePrice) - 1) * 100 : 0,
              },
            };
          }, {}),
          SMA: chartInfo.movingAverage.reduce((acc: any, e: any) => {
            let sum = 0;
            let j = 0;
            for (j = i; j < i + e.range && j < priceInfos.length; j++) {
              sum += Number(priceInfos[j].closePrice);
            }

            return { ...acc, [e.range]: { price: sum / (j - i) } };
          }, {}),
          score: {
            value: e.score,
          },
          pos: { x: posX },
        };
      })
      .filter((e: any) => e.pos.x >= -itemWidth / 2 && e.pos.x <= width + itemWidth / 2);

    // priceGrid

    const [priceMaxPrice, priceMinPrice] = [
      tmpChartItems.reduce(
        (prev: number, e: any) =>
          Math.max(
            prev,
            Object.entries(e.SMA).reduce(
              (prev: number, [_, value]: [string, any]) => Math.max(prev, value.price),
              e.price.high.value,
            ),
          ),
        0,
      ),
      tmpChartItems.reduce(
        (prev: number, e: any) =>
          Math.min(
            prev,
            Object.entries(e.SMA).reduce(
              (prev: number, [_, value]: [string, any]) => Math.min(prev, value.price),
              e.price.low.value,
            ),
          ),
        1e9,
      ),
    ];
    const priceRangePrice = priceMaxPrice - priceMinPrice;

    const [priceScaledMax, priceScaledMin] = [
      priceMinPrice + priceRangePrice * (0.5 + chartInfo.priceScale),
      priceMinPrice + priceRangePrice * (0.5 - chartInfo.priceScale),
    ];
    const priceScaledRange = priceScaledMax - priceScaledMin;

    const priceScaledY = (price: number) => height * (1 - (price - priceScaledMin) / priceScaledRange);
    const priceScaledH = (price: number) => height * (price / priceScaledRange);

    const priceAxisScale =
      Array.from({ length: 9 }, (_, i) => Math.pow(10, i)).reduce(
        (acc: any, dec) =>
          acc ??
          SCALE_RATIOS.reduce((acc: any, ratio) => {
            return acc ?? (((dec * ratio) / priceScaledRange) * height < gridY ? acc : dec * ratio);
          }, null),
        null,
      ) ?? 1e9;

    const priceStrList = Array.from({ length: Math.ceil(priceScaledRange / priceAxisScale) + 1 }, (_, i) => {
      const price = (i + Math.floor(priceScaledMin / priceAxisScale)) * priceAxisScale;
      return {
        priceStr: formatPriceStr(price, country),
        pos: { x: 0, y: priceScaledY(price) },
      };
    });

    setGridPrice(priceStrList);

    // scoreGrid

    const [scoreMaxPrice, scoreMinPrice] = [100, 0];
    const scoreRangePrice = scoreMaxPrice - scoreMinPrice;

    const [scoreScaledMax, scoreScaledMin] = [
      scoreMinPrice + scoreRangePrice * (0.5 + chartInfo.scoreScale),
      scoreMinPrice + scoreRangePrice * (0.5 - chartInfo.scoreScale),
    ];
    const scoreScaledRange = scoreScaledMax - scoreScaledMin;
    const scoreScaledY = (score: number) => height * (1 - (score - scoreScaledMin) / scoreScaledRange);

    const scoreAxisScale =
      Array.from({ length: 9 }, (_, i) => Math.pow(10, i)).reduce(
        (acc: any, dec) =>
          acc ??
          SCALE_RATIOS.reduce((acc: any, ratio) => {
            return acc ?? (((dec * ratio) / scoreScaledRange) * height < gridY ? acc : dec * ratio);
          }, null),
        null,
      ) ?? 1e9;

    const scoreStrList = Array.from({ length: Math.ceil(scoreScaledRange / scoreAxisScale) + 1 }, (_, i) => {
      const score = (i + Math.floor(scoreScaledMin / scoreAxisScale)) * scoreAxisScale;
      return {
        scoreStr: score < 0 || score > 100 ? '' : score,
        pos: { x: 0, y: scoreScaledY(score) },
      };
    });

    setGridScore(scoreStrList);

    tmpChartItems.map((e) => {
      e.market = {
        y: priceScaledY(Math.max(e.price.open.value, e.price.close.value)),
        h: priceScaledH(Math.abs(e.price.open.value - e.price.close.value)),
      };
      e.daily = {
        y: priceScaledY(e.price.high.value),
        h: priceScaledH(e.price.high.value - e.price.low.value),
      };
      e.score = { ...e.score, y: scoreScaledY(e.score.value) };
      e.delta = e.price.close.value >= e.price.open.value;
      e.SMA = Object.entries(e.SMA).reduce(
        (acc, [key, value]: [string, any]) => ({
          ...acc,
          [key]: {
            ...value,
            y: priceScaledY(value.price),
          },
        }),
        {},
      );
    });

    setTmpChartItems(tmpChartItems);

    // recentPrice

    const recentPrice = Number(priceInfos[0].closePrice);

    setRecentPrice({
      pos: {
        x: 0,
        y: priceScaledY(recentPrice),
      },
      delta: ~~priceInfos[0].closePrice - ~~priceInfos[0].openPrice,
      priceStr: formatPriceStr(recentPrice, country),
    });

    // extremePrice

    const [priceMax, priceMin] = [
      tmpChartItems.reduce((prev, value) => (prev.price.high.value < value.price.high.value ? value : prev)),
      tmpChartItems.reduce((prev, value) => (prev.price.low.value > value.price.low.value ? value : prev)),
    ];

    setExtremePrice({
      max: {
        pos: {
          x: priceMax.pos.x,
          y: priceScaledY(priceMax.price.high.value),
        },
        price: {
          value: priceMax.price.high.value,
          delta: recentPrice / priceMax.price.high.value - 1,
        },
        label: EXTREME_FIELD.max.label,
      },
      min: {
        pos: {
          x: priceMin.pos.x,
          y: priceScaledY(priceMin.price.low.value),
        },
        price: {
          value: priceMin.price.low.value,
          delta: recentPrice / priceMin.price.low.value - 1,
        },
        label: EXTREME_FIELD.min.label,
      },
    });

    // mousePos

    if (isMouseEnter) {
      const priceStr = formatPriceStr(((height - mousePos.y) * priceScaledRange) / height + priceScaledMin, country);

      chartDateList.map((e, i) => {
        const posX = canvasX + (i - nowDateIdx) * itemWidth;
        if (posX <= -itemWidth || posX >= width + itemWidth) return;
        if (Math.abs(mousePos.x - posX) > itemWidth / 2) return;
        const chartItem = tmpChartItems.filter((e2) => e.localDate == e2.localDate)[0];

        setMousePosInfo({
          pos: {
            x: posX,
            y: mousePos.y,
          },
          dateStr: e.year + '-' + String(e.month).padStart(2, '0') + '-' + String(e.day).padStart(2, '0'),
          priceStr: priceStr,
          price: chartItem?.price,
          SMA: chartItem?.SMA,
          score: chartItem?.score,
        });
      });
    }
  }, [mousePos, chartInfo, isMouseEnter]);

  return (
    <StockChartGridContainer>
      <div ref={scoreLabelRef}>
        {gridScore.map(
          (e: any) =>
            e.scoreStr !== '' && (
              <ChartLabel align="right" key={'score' + e.scoreStr} y={e.pos.y}>
                {e.scoreStr}
              </ChartLabel>
            ),
        )}
      </div>
      <div>
        <StockChartCanvas
          priceLabelItem={gridPrice}
          chartInfo={chartInfo}
          recentPrice={recentPrice}
          mousePosInfo={mousePosInfo}
          tmpChartItems={tmpChartItems}
          chartGridDate={chartGridDate}
        />
        {extremePrice &&
          Object.entries(extremePrice).map(([key, value]: [string, any]) => (
            <ExtremeLabel key={key} x={value.pos.x} y={value.pos.y} delta={key == 'max'}>
              {key == 'min' && <UpSVG />}
              {`${value.label} : ${formatPriceStr(value.price.value, country, true)} ${formatDeltaStr(value.price.delta)}`}
              {key == 'max' && <DownSVG />}
            </ExtremeLabel>
          ))}
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
          <div style={{ background: '#00000088', display: 'flex', gap: '4px' }}>
            {Object.entries(PRICE_FIELD).map(([key, value]: [string, any]) => (
              <ChartPriceInfo
                key={value.key}
                country={country}
                label={value.label}
                price={mousePosInfo?.price?.[key]}
              />
            ))}
          </div>
          <div style={{ background: '#00000088', display: 'flex', gap: '4px', width: 'auto' }}>
            이동평균선{' '}
            {chartInfo.movingAverage.map((e: { range: number; color: themeColor }) => (
              <ChartSMAInfo
                key={'SMA_' + e.range}
                country={country}
                price={mousePosInfo?.SMA?.[e.range].price}
                range={e.range}
                color={e.color}
              />
            ))}
          </div>
        </div>
        <div ref={containerRef} style={{ top: 0, left: 0, height: '100%', width: '100%', position: 'absolute' }} />
      </div>
      <div ref={priceLabelRef}>
        {gridPrice.map((e: any) => (
          <ChartLabel key={e.priceStr} y={e.pos.y}>
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
        {chartGridDate.map((e: any) => (
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

const ChartPriceInfo = ({ label, price, country }: { label: string; price: any; country: string }) => {
  return (
    <>
      {label + ' '}
      {typeof price?.value == 'number' ? formatPriceStr(price.value, country, true) : ''}
      <StockInfoDeltaLabel delta={price?.delta}>
        {typeof price?.delta == 'number' ? formatDeltaStr(price?.delta) : ''}
      </StockInfoDeltaLabel>
    </>
  );
};

const ChartSMAInfo = ({
  range,
  price,
  country,
  color,
}: {
  range: number;
  price?: number;
  country: string;
  color: themeColor;
}) => {
  return (
    <>
      <span style={{ color: theme.colors[color] }}>{range + ' '}</span>
      {price && formatPriceStr(price, country, true)}
    </>
  );
};

const StockInfoDeltaLabel = styled.span(({ delta }: { delta?: number }) => ({
  color: theme.colors[!delta ? 'grayscale60' : delta > 0 ? 'red' : 'blue'],
}));

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
