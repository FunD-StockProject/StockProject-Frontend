import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { PERIOD_CODE } from '@controllers/api.Type';
import { ChartQuery } from '@controllers/query';
import { media, theme, themeColor } from '@styles/themes';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  ChartLabel,
  ChartLabelBase,
  ExtremeLabel,
  StockChartContainer,
  StockChartHeader,
  StockChartHeaderContents,
  StockChartHeaderItem,
} from './StockChart.Style';
import { StockChartPriceCanvas, StockChartScoreCanvas } from './StockChartCanvas';

const [gridX, gridY] = [120, 50];

const SCALE_RATIOS = [1, 2, 2.5, 4, 5];
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
const MOVING_AVERAGE: { range: number; color: themeColor }[] = [
  { range: 5, color: 'success' },
  { range: 20, color: 'red' },
  { range: 60, color: 'cyan' },
  { range: 120, color: 'yellow' },
];
const MAX_MIN: { key: 'max' | 'min'; type: string; mul: number; init: number }[] = [
  { key: 'max', type: 'high', mul: 1, init: 0 },
  { key: 'min', type: 'low', mul: -1, init: 1e9 },
];

const deltaColor = (delta: number): themeColor => (!delta ? 'grayscale50' : delta > 0 ? 'red' : 'blue');

const formatPriceStr = (price: number, country: string, isCurrency?: boolean) => {
  const currency = !isCurrency ? ' ' : country == 'KOREA' ? '원 ' : '$ ';
  const digit = country == 'KOREA' || price >= 10000 ? 0 : price >= 1000 ? 1 : 2;
  const priceStr = price?.toLocaleString(undefined, {
    maximumFractionDigits: digit,
    minimumFractionDigits: digit,
  });

  return priceStr + currency;
};

const formatDeltaStr = (delta: number) => {
  const symbol = !delta ? '' : delta > 0 ? '+' : '-';
  const deltaStr = Math.abs(delta * 100).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return `(${symbol + deltaStr}%) `;
};

const formatLocalDate = (day: number, month: number, year: number) =>
  year + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');

const scaledValue = (rangedValue: any, scale: number, height: number) => {
  const { max, min } = rangedValue;
  const range = max - min;

  const scaled = Object.fromEntries(MAX_MIN.map(({ key, mul }) => [key, min + range * (0.5 + mul * scale)]));
  const scaledRange = scaled.max - scaled.min;

  const axisScale =
    Array.from({ length: 9 }, (_, i) => Math.pow(10, i))
      .flatMap((dec) => SCALE_RATIOS.map((ratio) => dec * ratio))
      .find((scale) => (scale / scaledRange) * height >= gridY) ?? 1e9;

  return {
    ...scaled,
    range: scaledRange,
    axisScale: axisScale,
    Y: (value: number) => height * (1 - (value - scaled.min) / scaledRange),
    H: (value: number) => height * (value / scaledRange),
  };
};

const isBetween = (x: number, width: number, gap: number) => x >= -gap && x <= width + gap;
const BAR_GAP = 1.25;

const StockChartView = ({
  selectedRange,
  priceInfos,
  // oldestDate,
  country,
  period,
  // tmp,
}: {
  selectedRange: any[];
  priceInfos: any[];
  // oldestDate: any;
  country: string;
  period: 'D' | 'W' | 'M' | 'Y';
  // tmp: () => void;
}) => {
  const isMobile = useIsMobile();

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const priceCanvasRef = useRef<HTMLDivElement>(null);
  const scoreCanvasRef = useRef<HTMLDivElement>(null);

  const priceLabelRef = useRef<HTMLDivElement>(null);
  const scoreLabelRef = useRef<HTMLDivElement>(null);

  const [chartInfo, setChartInfo] = useState<any>({
    BarSize: isMobile ? 8 : 24,
    canvasX: 200,
    SMAInfo: MOVING_AVERAGE.filter((e) => selectedRange.includes(e.range)),
    DPR: 0,
  });
  const [canvasSize, setCanvasSize] = useState<any>({
    width: 0,
    priceHeight: 0,
    scoreHeight: 0,
  });
  const [chartItemList, setChartItemList] = useState<any[]>();
  const [scaledPrice, setScaledPrice] = useState<any>();
  const [scaledScore, setScaledScore] = useState<any>();
  const [scaledVolume, setScaledVolume] = useState<any>();

  const [priceScale, setPriceScale] = useState<any>(4 / 5);
  const [scoreScale, setScoreScale] = useState<any>(3 / 5);
  const [volumeScale, setVolumeScale] = useState<any>(4 / 5);

  const [gridDate, setGridDate] = useState<any>([]);
  const [gridScore, setGridScore] = useState<any>([]);
  const [gridPrice, setGridPrice] = useState<any>([]);

  const [dateList, setDateList] = useState<any>();
  const [priceChartList, setPriceChartList] = useState<any>();
  const [scoreChartList, setScoreChartList] = useState<any>();
  const [SMAChartList, setSMAChartList] = useState<any>();

  const [recentPrice, setRecentPrice] = useState<any>(null);
  const [lastPrice, setLastPrice] = useState<any>(null);
  const [extremePrice, setExtremePrice] = useState<any>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [mousePosInfo, setMousePosInfo] = useState<any>(null);

  const [mousePos, setMousePos] = useState<any>({
    x: 0,
    y: 0,
  });

  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [zoom, setZoom] = useState<any>();

  const zoomPrice = (a: number) => {
    const delta = 4 / 5;
    const scale = priceScale * (a > 0 ? delta : 1 / delta);
    if (scale <= 0.1 || scale > 20) return;
    setPriceScale(scale);
  };

  const zoomScore = (a: number) => {
    const delta = 4 / 5;
    const scale = scoreScale * (a > 0 ? delta : 1 / delta);
    if (scale <= 0.1 || scale > 20) return;
    setScoreScale(scale);
  };

  const zoomVolume = (a: number) => {
    const delta = 4 / 5;
    const scale = volumeScale * (a > 0 ? delta : 1 / delta);
    if (scale <= 0.1 || scale > 20) return;
    setVolumeScale(scale);
  };

  const zoomChart = (a: number, x: number) => {
    const delta = Math.ceil(chartInfo.BarSize * 0.125);
    const barSize = chartInfo.BarSize + (a > 0 ? delta : -delta);
    if (barSize <= 0 || barSize > 200) return;

    const itemWidth = barSize * BAR_GAP;
    const MinX = itemWidth * (3 / 2);
    const MaxX = canvasSize.width + itemWidth * (priceInfos.length - 5 / 2);
    const canvasX = x + (chartInfo.canvasX - x) * (barSize / chartInfo.BarSize);

    setChartInfo({
      ...chartInfo,
      canvasX: canvasX < MinX ? MinX : canvasX > MaxX ? MaxX : canvasX,
      BarSize: barSize,
    });
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomChart(1, e.offsetX);
    } else {
      zoomChart(-1, e.offsetX);
    }
  };

  const handleMouseMovePriceCanvas = (e: MouseEvent) => {
    setMousePos({ canvas: 'price', x: e.offsetX, y: e.offsetY });
  };

  const handleMouseMoveScoreCanvas = (e: MouseEvent) => {
    setMousePos({ canvas: 'score', x: e.offsetX, y: e.offsetY });
  };

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  const handlePointerDown = (e: MouseEvent | TouchEvent) => {
    const ponterX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    setIsMouseDown(true);
    setChartInfo({ ...chartInfo, prevX: ponterX });
    setIsZoom(!('clientX' in e) && e.touches.length >= 2);
    if (!('clientX' in e) && Object.values(e.touches).length >= 2) {
      const touches = Object.values(e.touches);
      const now = { x: 0, y: 0, a: 0 };
      touches.map((e) => {
        now.x += e.clientX / touches.length;
        now.y += e.clientY / touches.length;
      });
      touches.map((e) => {
        now.a += Math.sqrt(Math.pow(e.clientX - now.x, 2) + Math.pow(e.clientY - now.y, 2)) / touches.length;
      });
      setZoom(now.a);
    }
  };

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    const pointerX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    if (isZoom && !('clientX' in e)) {
      e.preventDefault();
      const touches = Object.values(e.touches);
      const now = { x: 0, y: 0, a: 0 };
      touches.map((e) => {
        now.x += e.clientX / touches.length;
        now.y += e.clientY / touches.length;
      });
      touches.map((e) => {
        now.a += Math.sqrt(Math.pow(e.clientX - now.x, 2) + Math.pow(e.clientY - now.y, 2)) / touches.length;
      });
      if (zoom && Math.abs(zoom - now.a) > 10) {
        if (zoom < now.a) {
          zoomChart(1, now.x);
        } else {
          zoomChart(-1, now.x);
        }
        setZoom(now.a);
      }
    } else if (isMouseDown) {
      e.preventDefault();
      const deltaX = pointerX - chartInfo.prevX;

      const itemWidth = chartInfo.BarSize * BAR_GAP;
      const canvasX = chartInfo.canvasX + deltaX;
      const MinX = itemWidth * (3 / 2);
      const MaxX = canvasSize.width + itemWidth * (priceInfos.length - 5 / 2);

      setChartInfo({
        ...chartInfo,
        canvasX: canvasX < MinX ? MinX : canvasX > MaxX ? MaxX : canvasX,
        prevX: pointerX,
      });
      setZoom(null);
    }
  };

  const handlePointerUp = (e: MouseEvent | TouchEvent) => {
    setIsMouseDown(false);
    setChartInfo({
      ...chartInfo,
      prevX: 0,
    });
    setIsZoom(!('clientX' in e) && e.touches.length >= 2);
  };

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
      zoomVolume(1);
    } else {
      zoomScore(-1);
      zoomVolume(-1);
    }
  };

  const observerRef = useRef<ResizeObserver>(
    new ResizeObserver(([entry]) => {
      const priceCanvas = priceCanvasRef.current;
      if (!priceCanvas) return;

      const scoreCanvas = scoreCanvasRef.current;
      if (!scoreCanvas) return;

      console.log(priceCanvas.clientHeight);

      setCanvasSize({
        width: entry.contentRect.width,
        priceHeight: priceCanvas.clientHeight,
        scoreHeight: scoreCanvas.clientHeight,
      });
    }),
  );

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    const { width } = canvasContainer.getBoundingClientRect();
    const itemWidth = chartInfo.BarSize * BAR_GAP;
    const DPR = window.devicePixelRatio;

    const observer = observerRef.current;
    if (!observer) return;

    observer.observe(canvasContainer);

    setChartInfo({
      ...chartInfo,
      canvasX: width - itemWidth * 2,
      DPR: DPR,
    });

    return () => observer.unobserve(canvasContainer);
  }, []);

  useEffect(() => {
    console.log(canvasSize);
    const itemWidth = chartInfo.BarSize * BAR_GAP;
    if (chartInfo.prevX === undefined) {
      setChartInfo({
        ...chartInfo,
        canvasX: canvasSize.width - itemWidth * 2,
      });
    }
  }, [canvasSize]);

  useEffect(() => {
    const itemWidth = chartInfo.BarSize * BAR_GAP;
    const { canvasX } = chartInfo;
    const { width } = canvasSize;
    if (!width) return;

    setChartItemList(
      priceInfos
        .map((e, i) => ({
          ...e,
          pos: { x: canvasX - i * itemWidth },
        }))
        .filter(({ pos: { x } }) => isBetween(x, width, itemWidth)),
    );

    const dateList: any[] = priceInfos.map((e, i) => ({
      localDate: e.localDate,
      year: +e.localDate.substr(0, 4),
      month: +e.localDate.substr(4, 2),
      day: +e.localDate.substr(6, 2),
      pos: { x: canvasX - i * itemWidth },
    }));

    const date = new Date(dateList[0].year + '-' + dateList[0].month + '-' + dateList[0].day);
    dateList.reverse();

    for (let i = 1; i * itemWidth <= width; i++) {
      if (period == 'D')
        do {
          date.setDate(date.getDate() + 1);
        } while ([0, 6].includes(date.getDay()));
      else if (period == 'W') date.setDate(date.getDate() + ((7 - date.getDay()) % 7) + 1);
      else if (period == 'M') date.setMonth(date.getMonth() + 2, 0);
      else if (period == 'Y') date.setFullYear(date.getFullYear() + 2, 0, 0);

      if (['M', 'Y'].includes(period) && [0, 6].includes(date.getDay())) {
        date.setDate(date.getDate() - (date.getDay() || 2));
      }

      const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

      dateList.push({
        localDate: formatLocalDate(day, month, year),
        year: year,
        month: month,
        day: day,
        pos: { x: canvasX + i * itemWidth },
      });
    }

    dateList.forEach((e, i, arr) => {
      e.type = !i ? period : arr[i - 1].year < e.year ? 'Y' : arr[i - 1].month != e.month ? 'M' : 'D';
      e.dateStr = e.type === 'Y' ? `${e.year}년` : e.type === 'M' ? `${e.month}월` : `${e.day}일`;
    });

    let dayWidth = 0;
    let beforeType = 'D';

    const dateGrid = dateList.reduce((acc: any[], e) => {
      dayWidth += itemWidth;

      if (dayWidth < gridX) {
        if ((e.type === 'M' && beforeType === 'D') || (e.type === 'Y' && ['D', 'M'].includes(beforeType))) acc.pop();
        else return acc;
      }

      acc.push({
        dateStr: e.dateStr,
        key: e.localDate,
        pos: e.pos,
      });

      dayWidth = 0;
      beforeType = e.type;
      return acc;
    }, []);

    setGridDate(dateGrid);

    const posX = dateList[0].pos.x;
    for (let i = 1; i * itemWidth <= width; i++) {
      dateList.unshift({ pos: { x: posX - i * itemWidth } });
    }
    setDateList(dateList);
  }, [chartInfo, canvasSize, priceInfos]);

  //price
  useEffect(() => {
    if (!chartItemList) return;
    const { width, priceHeight } = canvasSize;

    const rangedPrice = Object.fromEntries(
      MAX_MIN.map(({ key, type, init }) => [
        key,
        chartItemList.reduce(
          (prev, { price, SMA }) =>
            Math[key](
              prev,
              Object.values(SMA).reduce((prev: number, value: any) => Math[key](prev, value.price), price[type].value),
            ),
          init,
        ),
      ]),
    );

    const scaledPrice: any = scaledValue(rangedPrice, priceScale, priceHeight);
    setScaledPrice(scaledPrice);

    setGridPrice(
      Array.from({ length: Math.ceil(scaledPrice.range / scaledPrice.axisScale) + 1 }, (_, i) => {
        const price = (i + Math.floor(scaledPrice.min / scaledPrice.axisScale)) * scaledPrice.axisScale;
        return {
          priceStr: formatPriceStr(price, country),
          pos: { x: 0, y: scaledPrice.Y(price) },
        };
      }),
    );

    setPriceChartList(
      chartItemList.map(({ pos, price: { open, close, high, low } }) => ({
        pos: pos,
        market: {
          y: scaledPrice.Y(Math.max(open.value, close.value)),
          h: scaledPrice.H(Math.abs(open.value - close.value)),
        },
        daily: {
          y: scaledPrice.Y(high.value),
          h: scaledPrice.H(high.value - low.value),
        },
        delta: close.value >= open.value,
        barSize: chartInfo.BarSize,
      })),
    );

    // recentPrice
    const recentPrice = priceInfos[0].price;

    {
      const { open, close } = recentPrice;

      setRecentPrice({
        pos: {
          x: 0,
          y: scaledPrice.Y(close.value),
        },
        delta: close.value - open.value,
        priceStr: formatPriceStr(close.value, country),
      });
    }

    // lastPrice

    const lastPrice = chartItemList.find(({ pos }) => isBetween(pos.x, width, chartInfo.BarSize / 2))?.price;

    if (lastPrice) {
      const { open, close } = lastPrice;

      setLastPrice({
        pos: {
          x: 0,
          y: scaledPrice.Y(close.value),
        },
        delta: close.value - open.value,
        priceStr: formatPriceStr(close.value, country),
      });
    }

    // extremePrice

    const extremePriceList = chartItemList.filter(({ pos }) => isBetween(pos.x, width, 0));

    if (extremePriceList.length) {
      setExtremePrice(
        Object.fromEntries(
          MAX_MIN.map(({ key, type }) => {
            const { pos, price } = extremePriceList.reduce((prev, curr) =>
              Math[key](prev.price[type].value, curr.price[type].value) === curr.price[type].value ? curr : prev,
            );

            return [
              key,
              {
                pos: {
                  x: pos.x,
                  y: scaledPrice.Y(price[type].value),
                },
                price: {
                  value: price[type].value,
                  delta: recentPrice.close.value / price[type].value - 1,
                },
                label: EXTREME_FIELD[key].label,
              },
            ];
          }),
        ),
      );
    }

    setSMAChartList(
      Object.fromEntries(
        chartInfo.SMAInfo.map(({ range, color }: any) => [
          range,
          {
            color,
            items: chartItemList.map(({ SMA, pos }) => ({
              pos: {
                x: pos.x,
                y: scaledPrice.Y(SMA[range].price),
              },
            })),
          },
        ]),
      ),
    );
  }, [chartItemList, priceScale]);

  //score
  useEffect(() => {
    if (!chartItemList) return;
    const { scoreHeight } = canvasSize;
    const rangedScore = {
      max: 100,
      min: 0,
    };

    const scaledScore: any = scaledValue(rangedScore, scoreScale, scoreHeight);
    setScaledScore(scaledScore);

    const rangedVolume = {
      min: 0,
      max: chartItemList.reduce((prev, { trading: { volume } }) => Math.max(prev, volume), 0),
    };

    const scaledVolume: any = scaledValue(rangedVolume, volumeScale, scoreHeight);
    setScaledVolume(scaledVolume);

    setGridScore(
      Array.from({ length: Math.ceil(scaledScore.range / scaledScore.axisScale) + 1 }, (_, i) => {
        const score = (i + Math.floor(scaledScore.min / scaledScore.axisScale)) * scaledScore.axisScale;
        return {
          scoreStr: score < 0 || score > 100 ? '' : score,
          pos: { x: 0, y: scaledScore.Y(score) },
        };
      }),
    );

    setScoreChartList(
      chartItemList.map(({ pos, score, trading: { volume, delta } }) => ({
        pos: pos,
        score: { ...score, y: scaledScore.Y(score.value) },
        trading: {
          y: scaledVolume.Y(volume),
          h: scaledVolume.H(volume),
          delta: delta,
        },
        barSize: chartInfo.BarSize,
      })),
    );
  }, [chartItemList, scoreScale]);

  useEffect(() => {
    const priceCanvas = priceCanvasRef.current;
    if (!priceCanvas) return;

    const scoreCanvas = scoreCanvasRef.current;
    if (!scoreCanvas) return;

    const priceLabel = priceLabelRef.current;
    if (!priceLabel) return;

    const scoreLabel = scoreLabelRef.current;
    if (!scoreLabel) return;

    if (!isMobile) {
      priceCanvas.addEventListener('mousedown', handlePointerDown);
      scoreCanvas.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);

      priceCanvas.addEventListener('mouseenter', handleMouseEnter);
      priceCanvas.addEventListener('mouseleave', handleMouseLeave);
      priceCanvas.addEventListener('mousemove', handleMouseMovePriceCanvas);

      scoreCanvas.addEventListener('mouseenter', handleMouseEnter);
      scoreCanvas.addEventListener('mouseleave', handleMouseLeave);
      scoreCanvas.addEventListener('mousemove', handleMouseMoveScoreCanvas);

      priceCanvas.addEventListener('wheel', handleWheel);
      scoreCanvas.addEventListener('wheel', handleWheel);

      priceLabel.addEventListener('wheel', handleWheelPrice);
      scoreLabel.addEventListener('wheel', handleWheelScore);
    } else {
      priceCanvas.ontouchstart = handlePointerDown;
      scoreCanvas.ontouchstart = handlePointerDown;
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.ontouchend = handlePointerUp;
    }

    return () => {
      if (!isMobile) {
        priceCanvas.removeEventListener('mousedown', handlePointerDown);
        scoreCanvas.removeEventListener('mousedown', handlePointerDown);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);

        priceCanvas.removeEventListener('mouseenter', handleMouseEnter);
        priceCanvas.removeEventListener('mouseleave', handleMouseLeave);
        priceCanvas.removeEventListener('mousemove', handleMouseMovePriceCanvas);

        scoreCanvas.removeEventListener('mouseenter', handleMouseEnter);
        scoreCanvas.removeEventListener('mouseleave', handleMouseLeave);
        scoreCanvas.removeEventListener('mousemove', handleMouseMoveScoreCanvas);

        priceCanvas.removeEventListener('wheel', handleWheel);
        scoreCanvas.removeEventListener('wheel', handleWheel);

        priceLabel.removeEventListener('wheel', handleWheelPrice);
        scoreLabel.removeEventListener('wheel', handleWheelScore);
      } else {
        window.removeEventListener('touchmove', handlePointerMove);
      }
    };
  }, [chartInfo, isMouseDown, isZoom, scoreScale, priceScale]);

  useEffect(() => {
    const itemWidth = chartInfo.BarSize * BAR_GAP;
    const { width, priceHeight, scoreHeight } = canvasSize;

    // mousePos
    if (isMouseEnter) {
      const priceStr = formatPriceStr(
        ((priceHeight - mousePos.y) * scaledPrice.range) / priceHeight + scaledPrice.min,
        country,
      );
      const scoreStr = ~~(((scoreHeight - mousePos.y) * scaledScore.range) / scoreHeight + scaledScore.min);
      const volumeStr = ~~(((scoreHeight - mousePos.y) * scaledVolume.range) / scoreHeight + scaledVolume.min);

      dateList
        .filter(({ pos }: any) => isBetween(pos.x, width, itemWidth))
        .some(({ pos, ...e }: any) => {
          if (Math.abs(mousePos.x - pos.x) > itemWidth / 2) return;
          const dateStr = e.type
            ? `${e.year}${
                period !== 'Y'
                  ? `-${e.month.toString().padStart(2, '0')}${
                      period !== 'M' ? `-${e.day.toString().padStart(2, '0')}` : ''
                    }`
                  : ''
              }`
            : '';
          const selectedPrice = priceInfos.find(({ localDate }) => e.localDate >= localDate);
          setMousePosInfo({
            canvas: mousePos.canvas,
            pos: {
              x: pos.x,
              y: mousePos.y,
            },
            dateStr: dateStr,
            priceStr: priceStr,
            scoreStr: scoreStr,
            volumeStr: volumeStr,
            price: selectedPrice?.price,
            SMA: selectedPrice?.SMA,
            score: selectedPrice?.score,
            trading: selectedPrice?.trading,
          });
          return true;
        });
    } else {
      setMousePosInfo(null);
    }
  }, [mousePos, chartInfo, isMouseEnter, dateList]);

  return (
    <>
      <StockChartViewContainer>
        <StockChartItemContainer grow ref={canvasContainerRef}>
          <StockChartItemContent type="price">
            <StockChartPriceCanvas
              gridDate={gridDate}
              gridPrice={gridPrice}
              priceChartList={priceChartList}
              SMAChartList={SMAChartList}
              mousePosInfo={mousePosInfo}
            />
            <StockChartExtremePrice extremePrice={extremePrice} country={country} />
            <StockChartInfoHeader>
              {!isMobile && (
                <StockChartInfoHeaderItem>
                  {Object.entries(PRICE_FIELD).map(([key, value]: [string, any]) => (
                    <ChartPriceInfo
                      key={value.key}
                      country={country}
                      label={value.label}
                      price={mousePosInfo?.price?.[key]}
                    />
                  ))}
                </StockChartInfoHeaderItem>
              )}

              <StockChartInfoHeaderItem>
                이동평균선
                {chartInfo.SMAInfo.map((e: { range: number; color: themeColor }) => (
                  <ChartSMAInfo
                    key={'SMA_' + e.range}
                    country={country}
                    price={!isMobile && mousePosInfo?.SMA?.[e.range].price}
                    range={e.range}
                    color={e.color}
                  />
                ))}
              </StockChartInfoHeaderItem>
            </StockChartInfoHeader>
            <StockChartCanvasRefContainer ref={priceCanvasRef} />
          </StockChartItemContent>
          <StockChartItemContent type="score">
            <StockChartScoreCanvas
              gridDate={gridDate}
              gridScore={gridScore}
              scoreChartList={scoreChartList}
              mousePosInfo={mousePosInfo}
            />
            <StockChartInfoHeader>
              {!isMobile && (
                <StockChartInfoHeaderItem>
                  <ChartBottomInfo trading={mousePosInfo?.trading} score={mousePosInfo?.score} />
                </StockChartInfoHeaderItem>
              )}
            </StockChartInfoHeader>
            <StockChartCanvasRefContainer ref={scoreCanvasRef} />
          </StockChartItemContent>
          <StockChartItemContent>
            <ChartLabelBase>0000</ChartLabelBase>
            {gridDate.map((e: any) => (
              <ChartLabel key={e.key} x={e.pos.x}>
                {e.dateStr}
              </ChartLabel>
            ))}
            {mousePosInfo?.dateStr && (
              <ChartLabel fillRect x={mousePosInfo.pos.x} color="blue">
                {mousePosInfo.dateStr}
              </ChartLabel>
            )}
          </StockChartItemContent>
        </StockChartItemContainer>
        <StockChartItemContainer>
          <StockChartItemContent type="price" ref={priceLabelRef}>
            <ChartLabelBase>{[...gridPrice].reverse()[0]?.priceStr}</ChartLabelBase>
            {gridPrice.map((e: any) => (
              <ChartLabel key={e.priceStr} y={e.pos.y}>
                {e.priceStr}
              </ChartLabel>
            ))}
            {lastPrice && (
              <ChartLabel strokeRect fillText y={lastPrice.pos.y} color={deltaColor(lastPrice.delta)}>
                {lastPrice.priceStr}
              </ChartLabel>
            )}
            {recentPrice && (
              <ChartLabel fillRect y={recentPrice.pos.y} color={deltaColor(recentPrice.delta)}>
                {recentPrice.priceStr}
              </ChartLabel>
            )}
            {mousePosInfo && mousePosInfo.canvas == 'price' && (
              <ChartLabel fillRect y={mousePosInfo.pos.y} color="blue">
                {mousePosInfo.priceStr}
              </ChartLabel>
            )}
          </StockChartItemContent>
          <StockChartItemContent type="score" ref={scoreLabelRef}>
            <ChartLabelBase>100</ChartLabelBase>
            {gridScore.map(
              (e: any) =>
                e.scoreStr !== '' && (
                  <ChartLabel key={'score' + e.scoreStr} y={e.pos.y}>
                    {e.scoreStr}
                  </ChartLabel>
                ),
            )}
            {mousePosInfo && mousePosInfo.canvas == 'score' && (
              <ChartLabel fillRect y={mousePosInfo.pos.y} color="blue">
                {mousePosInfo.scoreStr}
              </ChartLabel>
            )}
          </StockChartItemContent>
        </StockChartItemContainer>
      </StockChartViewContainer>
    </>
  );
};

const StockChartItemContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
  },
  ({ grow }: { grow?: true }) => grow && { flexGrow: 1, borderRight: `2px solid ${theme.colors.grayscale90}` },
);

const StockChartItemContent = styled.div(
  {
    position: 'relative',
    overflow: 'hidden',
  },
  ({ type }: { type?: 'price' | 'score' }) => ({
    borderBottom: type ? `2px solid ${theme.colors.grayscale90}` : '',
    height: !type ? 'auto' : type == 'price' ? '500px' : '200px',
    [media[0]]: {
      height: !type ? 'auto' : type == 'price' ? '300px' : '100px',
    },
  }),
);

const StockChartExtremePrice = React.memo(({ extremePrice, country }: { extremePrice: any; country: string }) => {
  return (
    extremePrice &&
    Object.entries(extremePrice).map(([key, value]: [string, any]) => (
      <ExtremeLabel key={key} x={value.pos.x} y={value.pos.y} delta={key == 'max'}>
        {`${value.label} : ${formatPriceStr(value.price.value, country, true)} ${formatDeltaStr(value.price.delta)}`}
        {key == 'max' ? <DownSVG /> : <UpSVG />}
      </ExtremeLabel>
    ))
  );
});

const StockChartCanvasRefContainer = styled.div({
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  position: 'absolute',
});

const StockChartInfoHeaderItem = styled.div({
  background: '#00000088',
  display: 'flex',
  gap: '4px',
});

const StockChartInfoHeader = styled.div({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px',
});

const StockChartViewContainer = styled.div({
  display: 'flex',
  fontSize: '15px',
  [media[0]]: {
    fontSize: '11px',
  },
});

const formatSymbol = (delta: number) => (!delta ? '' : delta > 0 ? '+' : '-');
const formatVolume = (volume: number) => {
  const unit = [
    { type: 'B', num: 1e9 },
    { type: 'M', num: 1e6 },
    { type: 'K', num: 1e3 },
    { type: '', num: 1 },
  ];
  const a = unit.find(({ num }) => volume >= num);

  return a && (volume / a.num).toFixed(2) + a.type;
};

const ChartBottomInfo = ({ trading, score }: { trading: any; score: any }) => {
  return (
    <>
      거래량{' '}
      {trading && (
        <>
          {formatVolume(trading.volume)}{' '}
          <StockInfoDeltaLabel delta={trading.delta}>{formatDeltaStr(trading.delta)}</StockInfoDeltaLabel>
        </>
      )}
      인간지표{' '}
      {score?.value && (
        <>
          {score.value}점{' '}
          <StockInfoDeltaLabel delta={score.delta}>
            ({formatSymbol(score.delta) + Math.abs(score.delta)}점)
          </StockInfoDeltaLabel>
        </>
      )}
    </>
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
  const [stockInfo, suspend] = useQueryComponent({ query: ChartQuery(stockId, chartPeriodIdx, '1970-08-01') });
  const [priceInfos, setPriceInfos] = useState<any>([]);
  // const [oldestDate, setOldestDate] = useState<any>({
  //   status: 'loading',
  // });
  const selectedRange = [5, 20, 60, 120];

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
  }, [didMount]);

  useEffect(() => {
    if (!stockInfo) return;
    // console.log([...priceInfos, ...stockInfo.priceInfos]);
    // setPriceInfos([...priceInfos, ...stockInfo.priceInfos]);
    // setOldestDate({ status: 'ok', date: [...stockInfo.priceInfos].reverse()[0].localDate });
    // DateList(stockInfo.priceInfos, 'M', 1);

    setPriceInfos(
      stockInfo.priceInfos.map((e: any, i: number, arr: any) => {
        return {
          localDate: e.localDate,
          price: Object.entries(PRICE_FIELD).reduce(
            (acc: any, [key, value]: [string, any]) => ({
              ...acc,
              [key]: {
                value: Number(e[value.key]),
                delta: i < arr.length - 1 ? Number(e[value.key]) / Number(arr[i + 1].closePrice) - 1 : 0,
              },
            }),
            {},
          ),
          SMA: MOVING_AVERAGE.reduce(
            (acc: any, e: any) => ({
              ...acc,
              [e.range]: {
                price: Array.from({ length: Math.min(e.range, arr.length - i) }, (_, j) =>
                  Number(arr[i + j].closePrice),
                ).reduce((acc, e, _, arr) => acc + e / arr.length, 0),
              },
            }),
            {},
          ),
          score: {
            value: e.score,
            delta: e.diff,
          },
          trading: {
            value: e.accumulatedTradingValue,
            volume: e.accumulatedTradingVolume,
            delta:
              i < arr.length - 1
                ? Number(e.accumulatedTradingVolume) / Number(arr[i + 1].accumulatedTradingVolume) - 1
                : 0,
          },
        };
      }),
    );
  }, [stockInfo]);

  useEffect(() => {}, [chartPeriodIdx]);

  // useEffect(() => {
  //   if (oldestDate.status == 'loading') {
  //     if (!stockInfo) return;
  //     setPriceInfos([...priceInfos, ...stockInfo.priceInfos]);
  //     console.log(12312312312);
  //   }
  //   console.log(oldestDate);
  // }, [oldestDate]);

  // const tmp = () => {
  //   console.log('tmp');
  //   setOldestDate({ status: 'loading' });
  // };

  return (
    suspend ||
    (priceInfos.length != 0 && (
      <StockChartContainer>
        <StockChartHeader>
          <StockChartHeaderContents>
            <StockChartHeaderItem>{stockInfo.symbolName}</StockChartHeaderItem>
            {/* <StockChartHeaderItem>새로고침</StockChartHeaderItem> */}
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
        <StockChartView
          selectedRange={selectedRange}
          priceInfos={priceInfos}
          period={chartPeriodIdx}
          country={stockInfo.country}
        />
      </StockChartContainer>
    ))
  );

  //마지막 로딩 날짜
};

export default StockChart;
