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
  StockChartHeader,
  StockChartHeaderContents,
  StockChartHeaderItem,
} from './StockChart.Style';
import {
  StockChartGridCanvas,
  StockChartMouseCanvas,
  StockChartPriceCanvas,
  StockChartSMACanvas,
  StockChartScoreCanvas,
} from './StockChartCanvas';

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

const FIRST_DATE = new Date('1970-01-05');
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
  const deltaStr = Math.abs(delta * 100).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return `(${symbol + deltaStr}%) `;
};

const MOVING_AVERAGE: { range: number; color: themeColor }[] = [
  { range: 5, color: 'success' },
  { range: 20, color: 'red' },
  { range: 60, color: 'cyan' },
  { range: 120, color: 'yellow' },
];

const StockChartGrid = ({
  priceInfos,
  // oldestDate,
  country,
  period,
  // tmp,
}: {
  priceInfos: any[];
  // oldestDate: any;
  country: string;
  period: 'D' | 'W' | 'M';
  // tmp: () => void;
}) => {
  const selectedRange = [5, 20, 60, 120];

  const containerRef = useRef<HTMLDivElement>(null);
  const priceLabelRef = useRef<HTMLDivElement>(null);
  const scoreLabelRef = useRef<HTMLDivElement>(null);

  const chartPriceCanvasRef = useRef<HTMLCanvasElement>(null);

  const [gridDate, setGridDate] = useState<any>([]);
  const [gridScore, setGridScore] = useState<any>([]);
  const [gridPrice, setGridPrice] = useState<any>([]);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [mousePosInfo, setMousePosInfo] = useState<any>(null);
  const [recentPrice, setRecentPrice] = useState<any>(null);
  const [lastPrice, setLastPrice] = useState<any>(null);
  const [extremePrice, setExtremePrice] = useState<any>(null);

  const [tmpChartItems, setTmpChartItems] = useState<any>([]);
  const [chartGridDate, setChartGridDate] = useState<any>([]);

  const isMobile = useIsMobile();

  const [chartInfo, setChartInfo] = useState<any>({
    BarSize: isMobile ? 8 : 24,
    priceScale: 4 / 5,
    scoreScale: 3 / 5,
    canvasX: 200,
    SMAInfo: MOVING_AVERAGE.filter((e) => selectedRange.includes(e.range)),
    DPR: 0,
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
    const MinX = itemWidth * (3 / 2);
    const MaxX = canvasSize.width + itemWidth * (priceInfos.length - 5 / 2);

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
    const pointerX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    e.preventDefault();
    if (isMouseDown) {
      const deltaX = pointerX - chartInfo.prevX;

      const itemWidth = chartInfo.BarSize * 1.5;
      const canvasX = chartInfo.canvasX + deltaX;
      const MinX = itemWidth * (3 / 2);
      const MaxX = canvasSize.width + itemWidth * (priceInfos.length - 5 / 2);

      setChartInfo({
        ...chartInfo,
        canvasX: canvasX < MinX ? MinX : canvasX > MaxX ? MaxX : canvasX,
        prevX: pointerX,
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

  const [canvasSize, setCanvasSize] = useState<any>({
    width: 0,
    height: 0,
  });

  const observerRef = useRef<ResizeObserver>(
    new ResizeObserver(([entry]) =>
      setCanvasSize({ width: entry.contentRect.width, height: entry.contentRect.height }),
    ),
  );

  useEffect(() => {
    const itemWidth = chartInfo.BarSize * 1.5;
    if (chartInfo.prevX === undefined) {
      setChartInfo({
        ...chartInfo,
        canvasX: canvasSize.width - itemWidth * 2,
      });
    }
  }, [canvasSize]);

  useEffect(() => {
    const canvasContainer = containerRef.current;
    if (!canvasContainer) return;

    const { width } = canvasContainer.getBoundingClientRect();
    const itemWidth = chartInfo.BarSize * 1.5;
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

  const recentDate = priceInfos[0].localDate;
  const oldestDate = [...priceInfos].reverse()[0].localDate;

  const dateType = 'D';

  const MONTH_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // const MAX_MIN: { max: string; min: string } = {
  //   max: 'high',
  //   min: 'low',
  // };

  const TCY = {
    DAY: 1, // 1일 주기
    MON: 30, // 1달 주기 (평균적으로 30일)
    YEA: 365, // 1년 주기 (평균적으로 365일)
    DEC: 10, // 10년 주기
    CEN: 100, // 100년 주기
    MIL: 1000, // 1000년 주기
  };

  const DateList = (priceInfos: any, period: any, range: any) => {
    const priceList = [...priceInfos].reverse();
    const dateList: any[] = [];

    let date = new Date(FIRST_DATE);
    let year = 1970;
    let month = 0;
    let day = 5;
    let weekday = 0;

    let sumDay = FIRST_DATE.getTime();
    while (year < 2070) {
      if (period == 'D') {
        while (true) {
          day++;
          weekday = (weekday + 1) % 7;
          if (![6, 0].includes(weekday)) break;
        }
      } else if (period == 'W') day += 7;
      else if (period == 'M') month += 1;
      else if (period == 'Y') year += 1;

      if (day > (month == 1 && !(year % 4) && year % 100 && !(year % 400) ? 29 : MONTH_DAY[month])) {
        day = 1;
        month += 1;
      }
      if (month >= 12) {
        month = 0;
        year += 1;
      }

      dateList.push({
        date: new Date(date),
        year: 0,
        month: 0,
        day: 0,
        localDate: `${year}-${(month + '').padStart(2, '0')}-${(day + '').padStart(2, '0')}`,
      });
    }
    // console.log(dateList);

    let priceInfoIdx = 0;
    let nowDateIdx = -1;

    const itemWidth = chartInfo.BarSize * 1.5;
    const { canvasX } = chartInfo;

    const nowDate = new Date();

    const tmplist = dateList.map((e) => {
      const priceInfo = priceList[priceInfoIdx];
      const datePrice = { ...e };
      if (!priceInfo) return datePrice;

      const localDate = priceInfo.localDate;
      const [year, month, day] = [~~localDate.substr(0, 4), ~~localDate.substr(4, 2), ~~localDate.substr(6, 2)];
      const priceDate = new Date(`${year}-${month}-${day}`);

      if (
        (period == 'D' && e.date.year == year && e.date.month + 1 == month && e.date.day == day) ||
        (period == 'W' &&
          e.date.getTime() <= priceDate.getTime() &&
          priceDate.getTime() < e.date.getTime() + DAY_TIME * 7) ||
        (period == 'M' &&
          e.date.getFullYear() == priceDate.getFullYear() &&
          e.date.getMonth() == priceDate.getMonth()) ||
        (period == 'Y' && e.date.getFullYear() == priceDate.getFullYear())
      ) {
        priceInfoIdx++;
        Object.assign(datePrice, { date: priceDate, price: true }, priceInfo);
      } else if (priceInfoIdx && priceInfoIdx < priceList.length) {
        return;
      }
      if (nowDate.getTime() >= datePrice.date.getTime()) nowDateIdx++;
      return datePrice;
    });

    // const tmplist = dateList
    //   .map((e) => {
    //     const priceInfo = priceList[priceInfoIdx];
    //     if (period == 'M') e.date.setMonth(e.date.getMonth() + 1, -1);
    //     const datePrice = { ...e };
    //     if (!priceInfo) return datePrice;

    //     const localDate = priceInfo.localDate;
    //     const [year, month, day] = [~~localDate.substr(0, 4), ~~localDate.substr(4, 2), ~~localDate.substr(6, 2)];
    //     const priceDate = new Date(`${year}-${month}-${day}`);

    //     if (
    //       (period == 'D' && e.date.getTime() == priceDate.getTime()) ||
    //       (period == 'W' &&
    //         e.date.getTime() <= priceDate.getTime() &&
    //         priceDate.getTime() < e.date.getTime() + DAY_TIME * 7) ||
    //       (period == 'M' &&
    //         e.date.getFullYear() == priceDate.getFullYear() &&
    //         e.date.getMonth() == priceDate.getMonth()) ||
    //       (period == 'Y' && e.date.getFullYear() == priceDate.getFullYear())
    //     ) {
    //       priceInfoIdx++;
    //       Object.assign(datePrice, { date: priceDate, price: true }, priceInfo);
    //     } else if (priceInfoIdx && priceInfoIdx < priceList.length) {
    //       return;
    //     }
    //     if (nowDate.getTime() >= datePrice.date.getTime()) nowDateIdx++;
    //     return datePrice;
    //   })
    //   .filter((e) => e);

    return tmplist;
  };

  const [priceChartList, setPriceChartList] = useState<any>();
  const [scoreChartList, setScoreChartList] = useState<any>();
  const [SMAChartList, setSMAChartList] = useState<any>();
  const [dateList, setDateList] = useState<any>();

  useEffect(() => {
    const itemWidth = chartInfo.BarSize * 1.5;
    const { canvasX } = chartInfo;
    const { width, height } = canvasSize;
    if (!width) return;

    const dateList: any[] = priceInfos.map((e, i) => ({
      localDate: e.localDate,
      year: ~~e.localDate.substr(0, 4),
      month: ~~e.localDate.substr(4, 2),
      day: ~~e.localDate.substr(6, 2),
      pos: { x: canvasX - i * itemWidth },
    }));
    const date = new Date(dateList[0].year + '-' + dateList[0].month + '-' + dateList[0].day);
    dateList.reverse();
    for (let i = 1; i * itemWidth <= width; i++) {
      if (period == 'D') {
        while ([5, 6].includes(date.getDay())) {
          date.setDate(date.getDate() + 1);
        }
        date.setDate(date.getDate() + 1);
      } else if (period == 'W') date.setDate(date.getDate() + ((7 - date.getDay()) % 7) + 1);
      else if (period == 'M') date.setMonth(date.getMonth() + 2, 0);
      else if (period == 'Y') date.setFullYear(date.getFullYear() + 2, 0, 0);

      while (['M', 'Y'].includes(period) && [0, 6].includes(date.getDay())) {
        date.setDate(date.getDate() - 1);
      }

      const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

      dateList.push({
        localDate: `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`,
        year: year,
        month: month,
        day: day,
        pos: { x: canvasX + i * itemWidth },
      });
    }

    let dayWidth = 0;
    let beforeType = 'D';

    dateList.map((e, i, arr) => {
      e.type = !i ? period : arr[i - 1].year < e.year ? 'Y' : arr[i - 1].month != e.month ? 'M' : 'D';
      e.dateStr = e.type == 'Y' ? e.year + '년' : e.type == 'M' ? e.month + '월' : e.day + '일';
    });

    const dateGrid = dateList.reduce((acc: any[], e) => {
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
        pos: e.pos,
      });
      return acc;
    }, []);

    setGridDate(dateGrid);

    const posX = dateList[0].pos.x;
    dateList.reverse();
    for (let i = 1; i * itemWidth <= width; i++) {
      dateList.push({
        pos: { x: posX - i * itemWidth },
      });
    }
    dateList.reverse();
    setDateList(dateList);

    const chartItemList = priceInfos
      .map((e, i) => {
        const posX = canvasX - i * itemWidth;
        if (posX < -itemWidth || posX > width + itemWidth) return;
        return { ...e, pos: { x: posX } };
      })
      .filter((e) => e);

    const MAX_MIN: { key: 'max' | 'min'; type: string; mul: number; init: number }[] = [
      { key: 'max', type: 'high', mul: 1, init: 0 },
      { key: 'min', type: 'low', mul: -1, init: 1e9 },
    ];

    const scaledValue = (rangedValue: any, scale: number) => {
      const { max, min } = rangedValue;
      const range = max - min;

      const scaled: any = MAX_MIN.reduce(
        (acc, { key, mul }) => ({
          ...acc,
          [key]: min + range * (0.5 + mul * scale),
        }),
        {},
      );
      const scaledRange = scaled.max - scaled.min;

      return {
        ...scaled,
        range: scaledRange,
        Y: (value: number) => height * (1 - (value - scaled.min) / scaledRange),
        H: (value: number) => height * (value / scaledRange),
      };
    };

    const rangedPrice: { max?: any; min?: any } = MAX_MIN.reduce(
      (acc, { key, type, init }) => ({
        ...acc,
        [key]: chartItemList.reduce(
          (prev, e) =>
            Math[key](
              prev,
              Object.entries(e.SMA).reduce(
                (prev: number, [_, value]: [string, any]) => Math[key](prev, value.price),
                e.price[type].value,
              ),
            ),
          init,
        ),
      }),
      {},
    );

    const scaledPrice = scaledValue(rangedPrice, chartInfo.priceScale);

    const priceAxisScale =
      Array.from({ length: 9 }, (_, i) => Math.pow(10, i)).reduce(
        (acc: any, dec) =>
          acc ??
          SCALE_RATIOS.reduce((acc: any, ratio) => {
            return acc ?? (((dec * ratio) / scaledPrice.range) * height < gridY ? acc : dec * ratio);
          }, null),
        null,
      ) ?? 1e9;

    setGridPrice(
      Array.from(
        { length: Math.ceil(scaledPrice.range / priceAxisScale) + 1 },
        (_, i) => (i + Math.floor(scaledPrice.min / priceAxisScale)) * priceAxisScale,
      ).map((e) => ({
        priceStr: formatPriceStr(e, country),
        pos: { x: 0, y: scaledPrice.Y(e) },
      })),
    );

    setPriceChartList(
      chartItemList.map((e) => ({
        pos: e.pos,
        market: {
          y: scaledPrice.Y(Math.max(e.price.open.value, e.price.close.value)),
          h: scaledPrice.H(Math.abs(e.price.open.value - e.price.close.value)),
        },
        daily: {
          y: scaledPrice.Y(e.price.high.value),
          h: scaledPrice.H(e.price.high.value - e.price.low.value),
        },
        delta: e.price.close.value >= e.price.open.value,
        barSize: chartInfo.BarSize,
      })),
    );

    // recentPrice
    const recentPrice = priceInfos[0].price;

    setRecentPrice({
      pos: {
        x: 0,
        y: scaledPrice.Y(recentPrice.close.value),
      },
      delta: recentPrice.close.value - recentPrice.open.value,
      priceStr: formatPriceStr(recentPrice.close.value, country),
    });

    // lastPrice
    const lastPrice = chartItemList.filter(
      ({ pos }) => pos.x > -chartInfo.BarSize / 2 && pos.x < width + chartInfo.BarSize / 2,
    )[0].price;

    setLastPrice({
      pos: {
        x: 0,
        y: scaledPrice.Y(lastPrice.close.value),
      },
      delta: lastPrice.close.value - lastPrice.open.value,
      priceStr: formatPriceStr(lastPrice.close.value, country),
    });

    // extremePrice

    setExtremePrice(
      MAX_MIN.reduce((acc: any, { key, type }) => {
        const { pos, price } = chartItemList
          .filter(({ pos }) => pos.x > 0 && pos.x < width)
          .reduce((prev, e) =>
            (key == 'max' ? prev.price[type].value < e.price[type].value : prev.price[type].value > e.price[type].value)
              ? e
              : prev,
          );

        return {
          ...acc,
          [key]: {
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
        };
      }, {}),
    );

    setSMAChartList(
      chartInfo.SMAInfo.reduce(
        (acc: any, { range, color }: any) => ({
          ...acc,
          [range]: {
            color: color,
            items: chartItemList.map(({ SMA, pos }) => ({
              pos: {
                x: pos.x,
                y: scaledPrice.Y(SMA[range].price),
              },
            })),
          },
        }),
        {},
      ),
    );

    // scoreGrid

    const rangedScore = {
      max: 100,
      min: 0,
    };

    const scaledScore = scaledValue(rangedScore, chartInfo.scoreScale);

    const scoreAxisScale =
      Array.from({ length: 9 }, (_, i) => Math.pow(10, i)).reduce(
        (acc: any, dec) =>
          acc ??
          SCALE_RATIOS.reduce((acc: any, ratio) => {
            return acc ?? (((dec * ratio) / scaledScore.range) * height < gridY ? acc : dec * ratio);
          }, null),
        null,
      ) ?? 1e9;

    setGridScore(
      Array.from(
        { length: Math.ceil(scaledScore.range / scoreAxisScale) + 1 },
        (_, i) => (i + Math.floor(scaledScore.min / scoreAxisScale)) * scoreAxisScale,
      ).map((e) => ({
        scoreStr: e < 0 || e > 100 ? '' : e,
        pos: { x: 0, y: scaledScore.Y(e) },
      })),
    );

    setScoreChartList(chartItemList.map((e) => ({ ...e, score: { ...e.score, y: scaledScore.Y(e.score.value) } })));
  }, [chartInfo, canvasSize]);

  useEffect(() => {
    // const nowDate = new Date();
    // const itemWidth = chartInfo.BarSize * 1.5;
    // const { canvasX } = chartInfo;
    // const { width, height } = canvasSize;
    // // console.log(canvasX, width, height);
    // let nowDateIdx = -1;
    // let priceInfoIdx = priceInfos.length - 1;
    // // console.log(priceChartList);
    // const tmpList = DateList(priceInfos, period, 1);
    // // console.log(tmpList);
    // // const tt = tmpList
    // // .filter((e: any) => e.pos.x > -itemWidth / 2 && e.pos.x < width + itemWidth / 2);
    // // console.log(tt);
    // const chartDateList: any[] = Array.from(
    //   { length: (LAST_DATE.getTime() - FIRST_DATE.getTime()) / DAY_TIME },
    //   (_, i) => {
    //     const date = new Date(FIRST_DATE.getTime() + i * DAY_TIME);
    //     if ([0, 6].includes(date.getDay())) return;
    //     const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    //     const type = day == 1 || ([2, 3].includes(day) && date.getDay() == 1) ? (month == 1 ? 'Y' : 'M') : 'D';
    //     const dateStr = type == 'Y' ? year + '년' : type == 'M' ? month + '월' : day + '일';
    //     const localDate = year + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
    //     if (priceInfoIdx >= 0) {
    //       if (localDate == priceInfos[priceInfoIdx].localDate) {
    //         priceInfoIdx--;
    //       } else if (priceInfoIdx < priceInfos.length - 1) {
    //         return;
    //       }
    //     }
    //     if (nowDate.getTime() >= date.getTime()) nowDateIdx++;
    //     return {
    //       day: day,
    //       month: month,
    //       year: year,
    //       dateStr: dateStr,
    //       type: type,
    //       localDate: localDate,
    //     };
    //   },
    // ).filter(
    //   (e) => e,
    //   //  && (e.localDate >= oldestDate && e.localDate <= recentDate)
    // );
    // let dayWidth = 0;
    // let beforeType = 'D';
    // // const tt = new Date('2020-03-01');
    // // tt.setMonth(tt.getMonth() + 1, -1);
    // // console.log(tt);
    // const chartDateGrid: any[] = chartDateList
    //   .reduce((acc: any[], e: any, i) => {
    //     const posX = canvasX + itemWidth * (i - nowDateIdx);
    //     const isGridBorder = (e.type == 'M' && beforeType == 'D') || (e.type == 'Y' && ['D', 'M'].includes(beforeType));
    //     dayWidth += itemWidth;
    //     if (dayWidth < gridX) {
    //       if (!isGridBorder) return acc;
    //       else acc.pop();
    //     }
    //     dayWidth = 0;
    //     beforeType = e.type;
    //     acc.push({
    //       dateStr: e.dateStr,
    //       key: e.localDate,
    //       pos: { x: posX, y: 0 },
    //     });
    //     return acc;
    //   }, [])
    //   .filter((e) => e.pos.x >= -itemWidth && e.pos.x <= width + itemWidth);
    // setChartGridDate(chartDateGrid);
    // const chartItems: any[] = tmpList
    //   .map((e: any, i: number, arr: any) => {
    //     const posX = canvasX - (nowDateIdx - i) * itemWidth;
    //     return {
    //       localDate: e.localDate,
    //       price: Object.entries(PRICE_FIELD).reduce(
    //         (acc: any, [key, value]: [string, any]) => ({
    //           ...acc,
    //           [key]: {
    //             value: Number(e[value.key]),
    //             delta:
    //               i && arr[i - 1].closePrice && e.closePrice
    //                 ? (Number(e[value.key]) / Number(arr[i - 1].closePrice) - 1) * 100
    //                 : 0,
    //           },
    //         }),
    //         {},
    //       ),
    //       SMA: chartInfo.SMAInfo.reduce((acc: any, e: any) => {
    //         let sum = 0;
    //         let j = i;
    //         // for (j = i; j >= 0 && j > i - e.range && arr[j].closePrice; j--) {
    //         //   sum += Number(arr[j].closePrice);
    //         // }
    //         return {
    //           ...acc,
    //           [e.range]: {
    //             price: sum / (i - j),
    //           },
    //         };
    //       }, {}),
    //       score: {
    //         value: e.score,
    //       },
    //       isEmpty: !e.price,
    //       pos: { x: posX },
    //     };
    //   })
    //   .filter((e: any) => e.pos.x > -itemWidth / 2 && e.pos.x < width + itemWidth / 2 && !e.isEmpty);
    // // console.log(chartItems);
    // // priceGrid
    // const [priceMaxPrice, priceMinPrice] = [
    //   chartItems.reduce(
    //     (prev: number, e: any) =>
    //       Math.max(
    //         prev,
    //         Object.entries(e.SMA).reduce(
    //           (prev: number, [_, value]: [string, any]) => Math.max(prev, value.price),
    //           e.price.high.value,
    //         ),
    //       ),
    //     0,
    //   ),
    //   chartItems.reduce(
    //     (prev: number, e: any) =>
    //       Math.min(
    //         prev,
    //         Object.entries(e.SMA).reduce(
    //           (prev: number, [_, value]: [string, any]) => Math.min(prev, value.price),
    //           e.price.low.value,
    //         ),
    //       ),
    //     1e9,
    //   ),
    // ];
    // const priceRangePrice = priceMaxPrice - priceMinPrice;
    // const [priceScaledMax, priceScaledMin] = [
    //   priceMinPrice + priceRangePrice * (0.5 + chartInfo.priceScale),
    //   priceMinPrice + priceRangePrice * (0.5 - chartInfo.priceScale),
    // ];
    // const priceScaledRange = priceScaledMax - priceScaledMin;
    // const priceScaledY = (price: number) => height * (1 - (price - priceScaledMin) / priceScaledRange);
    // const priceScaledH = (price: number) => height * (price / priceScaledRange);
    // const priceAxisScale =
    //   Array.from({ length: 9 }, (_, i) => Math.pow(10, i)).reduce(
    //     (acc: any, dec) =>
    //       acc ??
    //       SCALE_RATIOS.reduce((acc: any, ratio) => {
    //         return acc ?? (((dec * ratio) / priceScaledRange) * height < gridY ? acc : dec * ratio);
    //       }, null),
    //     null,
    //   ) ?? 1e9;
    // const priceStrList = Array.from({ length: Math.ceil(priceScaledRange / priceAxisScale) + 1 }, (_, i) => {
    //   const price = (i + Math.floor(priceScaledMin / priceAxisScale)) * priceAxisScale;
    //   return {
    //     priceStr: formatPriceStr(price, country),
    //     pos: { x: 0, y: priceScaledY(price) },
    //   };
    // });
    // setGridPrice(priceStrList);
    // // scoreGrid
    // const [scoreMaxPrice, scoreMinPrice] = [100, 0];
    // const scoreRangePrice = scoreMaxPrice - scoreMinPrice;
    // const [scoreScaledMax, scoreScaledMin] = [
    //   scoreMinPrice + scoreRangePrice * (0.5 + chartInfo.scoreScale),
    //   scoreMinPrice + scoreRangePrice * (0.5 - chartInfo.scoreScale),
    // ];
    // const scoreScaledRange = scoreScaledMax - scoreScaledMin;
    // const scoreScaledY = (score: number) => height * (1 - (score - scoreScaledMin) / scoreScaledRange);
    // const scoreAxisScale =
    //   Array.from({ length: 9 }, (_, i) => Math.pow(10, i)).reduce(
    //     (acc: any, dec) =>
    //       acc ??
    //       SCALE_RATIOS.reduce((acc: any, ratio) => {
    //         return acc ?? (((dec * ratio) / scoreScaledRange) * height < gridY ? acc : dec * ratio);
    //       }, null),
    //     null,
    //   ) ?? 1e9;
    // const scoreStrList = Array.from({ length: Math.ceil(scoreScaledRange / scoreAxisScale) + 1 }, (_, i) => {
    //   const score = (i + Math.floor(scoreScaledMin / scoreAxisScale)) * scoreAxisScale;
    //   return {
    //     scoreStr: score < 0 || score > 100 ? '' : score,
    //     pos: { x: 0, y: scoreScaledY(score) },
    //   };
    // });
    // setGridScore(scoreStrList);
    // chartItems.map((e) => {
    //   e.market = {
    //     y: priceScaledY(Math.max(e.price.open.value, e.price.close.value)),
    //     h: priceScaledH(Math.abs(e.price.open.value - e.price.close.value)),
    //   };
    //   e.daily = {
    //     y: priceScaledY(e.price.high.value),
    //     h: priceScaledH(e.price.high.value - e.price.low.value),
    //   };
    //   e.score = { ...e.score, y: scoreScaledY(e.score.value) };
    //   e.delta = e.price.close.value >= e.price.open.value;
    //   e.SMA = Object.entries(e.SMA).reduce(
    //     (acc, [key, value]: [string, any]) => ({
    //       ...acc,
    //       [key]: {
    //         ...value,
    //         y: priceScaledY(value.price),
    //       },
    //     }),
    //     {},
    //   );
    // });
    // setTmpChartItems(chartItems);
    // // recentPrice
    // const recentPrice = Number(priceInfos[0].closePrice);
    // setRecentPrice({
    //   pos: {
    //     x: 0,
    //     y: priceScaledY(recentPrice),
    //   },
    //   delta: ~~priceInfos[0].closePrice - ~~priceInfos[0].openPrice,
    //   priceStr: formatPriceStr(recentPrice, country),
    // });
    // if (chartItems.length) {
    //   // lastPrice
    //   setLastPrice({
    //     pos: {
    //       x: 0,
    //       y: chartItems && priceScaledY(chartItems[0].price.close.value),
    //     },
    //     delta: chartItems && chartItems[0].price.close.value - chartItems[0].price.open.value,
    //     priceStr: formatPriceStr(chartItems[0].price.close.value, country),
    //   });
    //   // extremePrice
    //   const [priceMax, priceMin] = [
    //     chartItems.reduce((prev, value) => (prev.price.high.value < value.price.high.value ? value : prev)),
    //     chartItems.reduce((prev, value) => (prev.price.low.value > value.price.low.value ? value : prev)),
    //   ];
    //   setExtremePrice({
    //     max: {
    //       pos: {
    //         x: priceMax.pos.x,
    //         y: priceScaledY(priceMax.price.high.value),
    //       },
    //       price: {
    //         value: priceMax.price.high.value,
    //         delta: recentPrice / priceMax.price.high.value - 1,
    //       },
    //       label: EXTREME_FIELD.max.label,
    //     },
    //     min: {
    //       pos: {
    //         x: priceMin.pos.x,
    //         y: priceScaledY(priceMin.price.low.value),
    //       },
    //       price: {
    //         value: priceMin.price.low.value,
    //         delta: recentPrice / priceMin.price.low.value - 1,
    //       },
    //       label: EXTREME_FIELD.min.label,
    //     },
    //   });
    // }
    // // mousePos
    // if (isMouseEnter) {
    //   const priceStr = formatPriceStr(((height - mousePos.y) * priceScaledRange) / height + priceScaledMin, country);
    //   chartDateList.map((e, i) => {
    //     const posX = canvasX + (i - nowDateIdx) * itemWidth;
    //     if (posX <= -itemWidth || posX >= width + itemWidth) return;
    //     if (Math.abs(mousePos.x - posX) > itemWidth / 2) return;
    //     const chartItem = chartItems.filter((e2) => e.localDate == e2.localDate)[0];
    //     setMousePosInfo({
    //       pos: {
    //         x: posX,
    //         y: mousePos.y,
    //       },
    //       dateStr: e.year + '-' + String(e.month).padStart(2, '0') + '-' + String(e.day).padStart(2, '0'),
    //       priceStr: priceStr,
    //       price: chartItem?.price,
    //       SMA: chartItem?.SMA,
    //       score: chartItem?.score,
    //     });
    //   });
    // }
    // // // reloading
    // // if (oldestDate.date == [...tmpChartItems].reverse()[0].localDate) {
    // //   console.log(123);
    // //   tmp();
    // // }
  }, [mousePos, chartInfo, isMouseEnter]);

  useEffect(() => {
    const itemWidth = chartInfo.BarSize * 1.5;
    const { canvasX } = chartInfo;
    const { width, height } = canvasSize;

    // mousePos
    if (isMouseEnter) {
      // const priceStr = formatPriceStr(((height - mousePos.y) * priceScaledRange) / height + priceScaledMin, country);
      dateList
        .filter((e: any) => e.pos.x > -itemWidth && e.pos.x < width + itemWidth)
        .map((e: any, i: number) => {
          if (Math.abs(mousePos.x - e.pos.x) > itemWidth / 2) return;
          console.log(e);
          // const chartItem = chartItems.filter((e2) => e.localDate == e2.localDate)[0];
          setMousePosInfo({
            pos: {
              x: e.pos.x,
              y: mousePos.y,
            },
            dateStr: e.year + '-' + String(e.month).padStart(2, '0') + '-' + String(e.day).padStart(2, '0'),
            priceStr: 123,
            price: e.price,
            SMA: e.SMA,
            score: e.score,
          });
        });
      // console.log(posX);
    }
  }, [mousePos, chartInfo, isMouseEnter, dateList]);

  const deltaColor = (delta: number): themeColor => (!delta ? 'grayscale50' : delta > 0 ? 'red' : 'blue');

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            position: 'relative',
            marginBottom: '24px',
            overflow: 'hidden',
          }}
          ref={scoreLabelRef}
        >
          <div style={{ padding: '8px', color: 'transparent' }}>100</div>
          {gridScore.map(
            (e: any) =>
              e.scoreStr !== '' && (
                <ChartLabel align="right" key={'score' + e.scoreStr} y={e.pos.y}>
                  {e.scoreStr}
                </ChartLabel>
              ),
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: '600px',
            }}
          >
            <StockChartGridCanvas
              gridDate={gridDate}
              gridPrice={gridPrice}
              gridScore={gridScore}
              canvasSize={canvasSize}
            />
            <StockChartPriceCanvas priceChartList={priceChartList} canvasSize={canvasSize} />
            <StockChartScoreCanvas scoreChartList={scoreChartList} canvasSize={canvasSize} />
            {SMAChartList &&
              Object.entries(SMAChartList).map(([key, value]: [string, any]) => {
                // console.log(key, value);
                return (
                  <StockChartSMACanvas key={'SMA_' + key} SMAInfo={value} canvasSize={canvasSize}></StockChartSMACanvas>
                );
              })}
            <StockChartMouseCanvas mousePosInfo={mousePosInfo} canvasSize={canvasSize} />
            {/* <StockChartCanvas
              priceLabelItem={gridPrice}
              chartInfo={chartInfo}
              canvasSize={canvasSize}
              recentPrice={recentPrice}
              mousePosInfo={mousePosInfo}
              tmpChartItems={tmpChartItems}
              chartGridDate={chartGridDate}
            /> */}
            {extremePrice &&
              Object.entries(extremePrice).map(([key, value]: [string, any]) => (
                <ExtremeLabel key={key} x={value.pos.x} y={value.pos.y} delta={key == 'max'}>
                  {`${value.label} : ${formatPriceStr(value.price.value, country, true)} ${formatDeltaStr(value.price.delta)}`}
                  {key == 'max' ? <DownSVG /> : <UpSVG />}
                </ExtremeLabel>
              ))}
            {/* <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
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
                {chartInfo.SMAInfo.map((e: { range: number; color: themeColor }) => (
                  <ChartSMAInfo
                    key={'SMA_' + e.range}
                    country={country}
                    price={mousePosInfo?.SMA?.[e.range].price}
                    range={e.range}
                    color={e.color}
                  />
                ))}
              </div>
            </div> */}
            <div ref={containerRef} style={{ top: 0, left: 0, height: '100%', width: '100%', position: 'absolute' }} />
          </div>
          <div style={{ height: '24px', position: 'relative', overflow: 'hidden' }}>
            {gridDate.map((e: any) => (
              <ChartLabel key={e.key} x={e.pos.x}>
                {e.dateStr}
              </ChartLabel>
            ))}
            {/* {mousePosInfo && (
              <ChartLabel fillRect x={mousePosInfo.pos.x} color="blue">
                {mousePosInfo.dateStr}
              </ChartLabel>
            )} */}
          </div>
        </div>
        <div
          ref={priceLabelRef}
          style={{
            position: 'relative',
            marginBottom: '24px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '8px', color: 'transparent', whiteSpace: 'none' }}>
            {[...gridPrice].reverse()[0]?.priceStr}
          </div>
          <>
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
            {mousePosInfo && (
              <ChartLabel fillRect y={mousePosInfo.pos.y} color="blue">
                {mousePosInfo.priceStr}
              </ChartLabel>
            )}
          </>
        </div>
      </div>
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

const formatLocalDate = (date: Date) => {
  const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  const localDate = year + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
  return localDate;
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
                delta: i < arr.length - 1 ? (Number(e[value.key]) / Number(arr[i + 1].closePrice) - 1) * 100 : 0,
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
        <StockChartGrid priceInfos={priceInfos} period={chartPeriodIdx} country={stockInfo.country} />
      </StockChartContainer>
    ))
  );

  //마지막 로딩 날짜
};

export default StockChart;
