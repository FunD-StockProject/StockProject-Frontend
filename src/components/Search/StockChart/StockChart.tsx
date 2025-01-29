import { useEffect, useRef, useState } from 'react';
import {
  CHART_MOVING_AVERAGE_COLOR,
  CHART_PRICE_FIELD,
  CHART_SCALE_RATIO,
  MAX_MIN,
  PERIOD_CODE_TEXT,
} from '@ts/Constants';
import { PERIOD_CODE, STOCK_COUNTRY } from '@ts/Types';
import { drawLine, drawRect, setLineWidth } from '@utils/Canvas';
import { formatDateISO, getDateLabel } from '@utils/Date';
import { deltaColor } from '@utils/Delta';
import { useIsMobile } from '@hooks/useIsMobile';
import { useStockChartQuery } from '@controllers/query';
import { theme, themeColor } from '@styles/themes';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  ChartLabel,
  ChartLabelBase,
  ExtremeLabel,
  StockChartCanvasRefContainer,
  StockChartContainer,
  StockChartHeader,
  StockChartHeaderContents,
  StockChartHeaderItem,
  StockChartInfoHeader,
  StockChartInfoHeaderItem,
  StockChartItemCanvasContainer,
  StockChartItemContainer,
  StockChartItemContent,
  StockChartViewContainer,
  StockInfoDeltaLabel,
} from './StockChart.Style';

const DPR = window.devicePixelRatio;

const useResizeObserver = <T extends HTMLElement>(): [any, React.RefObject<T>] => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({
          width,
          height,
        });
      }
    });

    resizeObserver.observe(element);

    return () => {
      if (element) resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, []);

  return [size, ref];
};

const useManagedStateRef = <T,>(state: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return [ref];
};

const useStateRef = <T,>(initializer: T): [T, (value: T) => void, React.MutableRefObject<T>] => {
  const [state, setState] = useState<T>(initializer);
  const ref = useRef<T>(state);

  const setValue = (value: T) => {
    setState((ref.current = value));
  };

  return [state, setValue, ref];
};

const formatPriceStr = (price: number, country: string, isCurrency?: boolean) => {
  const currency = !isCurrency ? ' ' : country == 'KOREA' ? '원 ' : '$ ';
  const digit = country == 'KOREA' || price >= 10000 ? 0 : price >= 1000 ? 1 : 2;
  const priceStr = price?.toLocaleString(undefined, {
    maximumFractionDigits: digit,
    minimumFractionDigits: digit,
  });

  return `${priceStr}${currency}`;
};

const formatDeltaStr = (delta: number) => {
  const symbol = !delta ? '' : delta > 0 ? '+' : '-';
  const deltaStr = Math.abs(delta * 100).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return `(${symbol + deltaStr}%) `;
};

const formatSymbol = (delta: number) => (!delta ? '' : delta > 0 ? '+' : '-');
const formatVolume = (volume: number) => {
  const unit = [
    {
      type: 'B',
      num: 1e9,
    },
    {
      type: 'M',
      num: 1e6,
    },
    {
      type: 'K',
      num: 1e3,
    },
    {
      type: '',
      num: 1,
    },
  ];
  const a = unit.find(({ num }) => volume >= num);

  return a && (volume / a.num).toFixed(2) + a.type;
};

const isBetween = (pos: number, min: number, max: number) => pos >= min && pos <= max;

const getScaledValue = ({ max, min }: any, scale: number, height: number, gap: number) => {
  const range = max - min;

  const scaled = Object.fromEntries(
    Object.entries(MAX_MIN).map(([key, { mul }]) => {
      return [key, min + range * (0.5 + mul * scale)];
    }),
  );
  const scaledRange = scaled.max - scaled.min;

  const axisScale =
    Array.from(
      {
        length: 12,
      },
      (_, i) => Math.pow(10, i - 3),
    )
      .flatMap((dec) => CHART_SCALE_RATIO.map((ratio) => dec * ratio))
      .find((scale) => (scale / scaledRange) * height >= gap) ?? 1e9;

  return {
    ...scaled,
    range: scaledRange,
    axisScale: axisScale,
    Y: (value: number) => height * (1 - (value - scaled.min) / scaledRange),
    H: (value: number) => height * (value / scaledRange),
    toValue: (y: number) => ((height - y) * scaledRange) / height + scaled.min,
  };
};

const getDateType = (prev: Date, curr: Date) => {
  if (curr.getFullYear() != prev.getFullYear()) return 'Y';
  else if (curr.getMonth() != prev.getMonth()) return 'M';
  else return 'D';
};

const StockChartView = ({
  chartData,
  updateChart,
  period,
  country,
}: {
  chartData: any[];
  updateChart: any;
  period: PERIOD_CODE;
  country: STOCK_COUNTRY;
}) => {
  const isMobile = useIsMobile();

  const initialBarSize = isMobile ? 4 : 8;

  const GRID_GAP = {
    X: !isMobile ? 120 : 60,
    PRICE_Y: !isMobile ? 40 : 30,
    SCORE_Y: !isMobile ? 40 : 20,
  };

  const [chartContainerSize, chartContainerRef] = useResizeObserver<HTMLCanvasElement>();
  const [priceCanvasSize, priceCanvasRef] = useResizeObserver<HTMLCanvasElement>();
  const [scoreCanvasSize, scoreCanvasRef] = useResizeObserver<HTMLCanvasElement>();

  const priceLabelRef = useRef<HTMLDivElement>(null);
  const scoreLabelRef = useRef<HTMLDivElement>(null);
  const [barSize, setBarSize, barSizeRef] = useStateRef<number>(initialBarSize);

  const [canvasPos, setCanvasPos, canvasPosRef] = useStateRef<any>({
    curr: {
      x: 900,
    },
    prev: {
      x: 0,
    },
  });
  const [isCanvasMove, setIsCanvasMove, isCanvasMoveRef] = useStateRef<boolean>(false);
  const [isMouseEnter, setIsMouseEnter] = useStateRef<boolean>(false);
  const [mousePos, setMousePos] = useStateRef<any>({
    pos: {
      x: 0,
      y: 0,
    },
  });

  const [dateGrid, setDateGrid] = useState<any[]>([]);
  const [priceGrid, setPriceGrid] = useState<any[]>([]);
  const [scoreGrid, setScoreGrid] = useState<any[]>([]);

  const [extremePrice, setExtremePrice] = useState<any>();

  const [recentPriceItem, setRecentPriceItem] = useState<any>();
  const [lastPriceItem, setLastPriceItem] = useState<any>();

  const [scaledPrice, setScaledPrice] = useState<any>();
  const [scaledScore, setScaledScore] = useState<any>();
  const [, setScaledVolume] = useState<any>();

  const [priceScale, setPriceScale, priceScaleRef] = useStateRef<any>(4 / 5);
  const [scoreScale, setScoreScale, scoreScaleRef] = useStateRef<any>(3 / 5);
  const [volumeScale, setVolumeScale] = useState<any>(4 / 5);

  const [, setIsZoom, isZoomRef] = useStateRef<boolean>(false);
  const [, setZoom, zoomRef] = useStateRef<number>(0);

  const [mousePosInfo, setMousePosInfo] = useState<any>();

  const [stateRef] = useManagedStateRef<any>({
    chartLength: chartData.length,
  });

  const barGap = 1.5;

  const itemWidth = barSize * barGap;

  useEffect(() => {
    const { width, height } = priceCanvasSize;
    const priceCanvas = priceCanvasRef.current;
    if (!priceCanvas) return;
    priceCanvas.width = width;
    priceCanvas.height = height;
  }, [priceCanvasSize]);

  useEffect(() => {
    const canvasContainer = chartContainerRef.current;
    if (!canvasContainer) return;

    const { width } = canvasContainer.getBoundingClientRect();

    setCanvasPos({
      curr: {
        x: width - GRID_GAP.X,
      },
      prev: {
        x: 0,
      },
    });
    setBarSize(initialBarSize);
  }, [period]);

  useEffect(() => {
    if (!chartData.length) return;
    const width = chartContainerSize.width;
    const priceHeight = priceCanvasSize.height;
    const scoreHeight = scoreCanvasSize.height;

    const dateList = getDateList(width);
    const dateGrid = getDateGrid(dateList);
    setDateGrid(dateGrid.filter(({ posX }) => isBetween(posX, 0, width)));

    if (dateList[0].posX >= 0) updateChart(dateList[0].dateISO);

    const currX = canvasPos.curr.x;

    const chartItems = chartData
      .map((e, i) => {
        const posX = currX - (chartData.length - i - 1) * itemWidth;
        if (!isBetween(posX, -itemWidth, width + itemWidth)) return;

        return {
          ...e,
          pos: {
            x: posX,
          },
        };
      })
      .filter((e) => e);

    const rangedPrice = Object.fromEntries(
      Object.entries(MAX_MIN).map(([key, { type, init }]) => [
        key,
        chartItems.reduce((prev, { price, SMA }) => {
          return Math[key as 'max' | 'min'](
            prev,
            Object.values(SMA).reduce((prev: number, { price }: any) => {
              return Math[key as 'max' | 'min'](prev, price);
            }, price[type].value),
          );
        }, init),
      ]),
    );

    const scaledPrice: any = getScaledValue(rangedPrice, priceScale, priceHeight, GRID_GAP.PRICE_Y);
    setScaledPrice(scaledPrice);

    const priceGrid = getGrid(scaledPrice, (value: any) => formatPriceStr(value, country));
    setPriceGrid(priceGrid);

    const chartPriceItems = getChartPriceItems(chartItems, scaledPrice);
    const chartSMAItems = getChartSMAItems(chartItems, scaledPrice);

    // recentPrice
    const recentPrice = chartData[chartData.length - 1].price;

    const recentPriceItem = getPriceItem(recentPrice, scaledPrice);
    setRecentPriceItem(recentPriceItem);

    // lastPrice
    const lastPrice = chartItems[chartItems.length - 1]?.price;

    const lastPriceItem = getPriceItem(lastPrice, scaledPrice);
    setLastPriceItem(lastPriceItem);

    // extremePrice

    const extremePrice = getExtremePrice(chartItems, recentPrice, [0, width], scaledPrice);
    setExtremePrice(extremePrice);

    // score

    const rangedScore = {
      max: 100,
      min: 0,
    };

    const scaledScore: any = getScaledValue(rangedScore, scoreScale, scoreHeight, GRID_GAP.SCORE_Y);
    setScaledScore(scaledScore);

    const rangedVolume = {
      min: 0,
      max: chartItems.reduce((prev, { trading: { volume } }) => Math.max(prev, volume), 0),
    };

    const scaledVolume: any = getScaledValue(rangedVolume, volumeScale, scoreHeight, GRID_GAP.SCORE_Y);
    setScaledVolume(scaledVolume);

    const scoreGrid = getGrid(scaledScore, (value: any) => (value < 0 || value > 100 ? '' : value));
    setScoreGrid(scoreGrid);

    const scoreChartList = getChartScoreItems(chartItems, scaledScore, scaledVolume);

    drawPriceChart(dateGrid, chartPriceItems, chartSMAItems, recentPriceItem);
    drawScoreChart(dateGrid, scoreChartList);
  }, [chartData, priceCanvasSize, canvasPos, barSize, priceScale, scoreScale]);

  useEffect(() => {
    const { width, height } = chartContainerSize;

    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return;
    chartContainer.width = width * DPR;
    chartContainer.height = height * DPR;
    const ctx = chartContainer.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    if (!isMouseEnter) {
      return;
    }

    const { pos } = mousePos;
    const { curr } = canvasPos;

    const alignedPos = {
      x: curr.x - Math.floor((curr.x - pos.x + itemWidth / 2) / itemWidth) * itemWidth,
      y: pos.y,
    };

    if (!chartData.length) return;
    const dateList = getDateList(width);
    const dateStr = dateList.find((e) => e.posX == alignedPos.x)?.dateISO;
    const priceStr = formatPriceStr(scaledPrice.toValue(alignedPos.y), country);
    const scoreStr = ~~scaledScore.toValue(alignedPos.y - priceCanvasSize.height);
    const selectedPrice = chartData.find(({ date }) => dateStr == formatDateISO(date));

    setMousePosInfo({
      pos: alignedPos,
      dateStr,
      priceStr,
      scoreStr,
      price: selectedPrice?.price,
      SMA: selectedPrice?.SMA,
      score: selectedPrice?.score,
      trading: selectedPrice?.trading,
    });

    ctx.strokeStyle = theme.colors.primary0;
    setLineWidth(ctx, 1);
    ctx.setLineDash([4, 2]);
    drawLine(ctx, [
      [alignedPos.x, 0],
      [alignedPos.x, height],
    ]);

    drawLine(ctx, [
      [0, alignedPos.y],
      [width, alignedPos.y],
    ]);
  }, [isMouseEnter, mousePos, canvasPos, barSize, scaledPrice]);

  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.overflow = isCanvasMove ? 'hidden' : '';
      document.documentElement.style.overscrollBehavior = isCanvasMove ? 'contain' : '';
    }
  }, [isCanvasMove]);

  useEffect(() => {
    const charContainer = chartContainerRef.current;
    if (!charContainer) return;
    const priceLabel = priceLabelRef.current;
    if (!priceLabel) return;
    const scoreLabel = scoreLabelRef.current;
    if (!scoreLabel) return;

    if (!isMobile) {
      charContainer.addEventListener('mousedown', handleCanvasPointerDown);
      window.addEventListener('mousemove', handleCanvasPointerMove);
      window.addEventListener('mouseup', handleCanvasPointerUp);

      charContainer.addEventListener('wheel', handleCanvasZoom, { passive: false });
      priceLabel.addEventListener('wheel', handlePriceZoom, { passive: false });
      scoreLabel.addEventListener('wheel', handleScoreZoom, { passive: false });

      charContainer.addEventListener('mouseenter', handleCanvasMouseEnter);
      charContainer.addEventListener('mouseleave', handleCanvasMouseLeave);
      charContainer.addEventListener('mousemove', handlePriceCanvasMouseMove);
    } else {
      charContainer.addEventListener('touchstart', handleCanvasPointerDown);
      window.addEventListener('touchmove', handleCanvasPointerMove, {
        passive: false,
      });
      window.addEventListener('touchend', handleCanvasPointerUp);
    }

    charContainer.addEventListener('dragstart', handleBlockDrag);

    return () => {
      if (!isMobile) {
        charContainer.removeEventListener('mousedown', handleCanvasPointerDown);
        window.removeEventListener('mousemove', handleCanvasPointerMove);
        window.removeEventListener('mouseup', handleCanvasPointerUp);

        charContainer.removeEventListener('wheel', handleCanvasZoom);
        priceLabel.removeEventListener('wheel', handlePriceZoom);
        scoreLabel.removeEventListener('wheel', handleScoreZoom);

        charContainer.removeEventListener('mouseenter', handleCanvasMouseEnter);
        charContainer.removeEventListener('mouseleave', handleCanvasMouseLeave);
        charContainer.removeEventListener('mousemove', handlePriceCanvasMouseMove);
      } else {
        charContainer.removeEventListener('touchstart', handleCanvasPointerDown);
        window.removeEventListener('touchmove', handleCanvasPointerMove);
        window.removeEventListener('touchend', handleCanvasPointerUp);
      }

      charContainer.removeEventListener('dragstart', handleBlockDrag);
    };
  }, []);

  const getDateList = (width: number) => {
    const currX = canvasPos.curr.x;

    const dateList: any[] = chartData.map(({ date }, i, arr) => {
      const type = i ? getDateType(arr[i - 1].date, date) : 'D';
      return {
        type: type,
        date,
        posX: currX - (chartData.length - i - 1) * itemWidth,
        dateISO: formatDateISO(date),
        dateStr: getDateLabel(date, type),
      };
    });

    const nowDate = new Date(chartData[chartData.length - 1].date);
    for (let i = 1; i <= width / itemWidth; i++) {
      if (period == 'D') {
        if (nowDate.getDay() == 5) {
          nowDate.setDate(nowDate.getDate() + 3);
        } else {
          nowDate.setDate(nowDate.getDate() + 1);
        }
      } else if (period == 'W') {
        nowDate.setDate(nowDate.getDate() + 7);
      } else if (period == 'M') {
        nowDate.setMonth(nowDate.getMonth() + 2, 0);
      } else if (period == 'Y') {
        nowDate.setFullYear(nowDate.getFullYear() + 2, 0, 0);
      }

      const type = getDateType(dateList[dateList.length - 1].date, nowDate);

      dateList.push({
        type: type,
        date: new Date(nowDate),
        posX: currX + i * itemWidth,
        dateISO: formatDateISO(nowDate),
        dateStr: getDateLabel(nowDate, type),
      });
    }
    return dateList;
  };

  const getDateGrid = (dateList: any[]) => {
    let dayWidth = 0;
    let beforeType = 'D';

    const dateGrid = dateList.reduce((acc: any[], e) => {
      const { type } = e;
      dayWidth += itemWidth;

      if (dayWidth < GRID_GAP.X) {
        if ((type === 'M' && beforeType === 'D') || (type === 'Y' && ['D', 'M'].includes(beforeType))) acc.pop();
        else return acc;
      }

      acc.push(e);

      dayWidth = 0;
      beforeType = type;
      return acc;
    }, []);

    return dateGrid;
  };

  const getChartPriceItems = (chartItems: any[], scaledPrice: any) => {
    return chartItems.map(({ pos, price }) => {
      const { open, close, high, low } = Object.fromEntries(
        ['open', 'close', 'high', 'low'].map((e) => [e, price[e].value]),
      );

      return {
        pos: pos,
        market: {
          y: scaledPrice.Y(Math.max(open, close)),
          h: scaledPrice.H(Math.abs(open - close)),
        },
        daily: {
          y: scaledPrice.Y(high),
          h: scaledPrice.H(high - low),
        },
        delta: close >= open,
      };
    });
  };

  const getChartSMAItems = (chartItems: any[], scaledPrice: any) => {
    const chartSMAItems: Record<
      string,
      {
        color: themeColor;
        items: {
          pos: {
            x: number;
            y: number;
          };
        }[];
      }
    > = Object.fromEntries(
      Object.entries(CHART_MOVING_AVERAGE_COLOR).map(([key, value]) => [
        key,
        {
          color: value,
          items: [],
        },
      ]),
    );

    chartItems.forEach(({ pos, SMA }) => {
      Object.entries(SMA).forEach(([key, { price }]: [string, any]) => {
        chartSMAItems[key].items.push({
          pos: {
            x: pos.x,
            y: scaledPrice.Y(price),
          },
        });
      });
    });

    return chartSMAItems;
  };

  const getPriceItem = (price: any, scaledPrice: any) => {
    if (!price) return;

    const { open, close } = Object.fromEntries(['open', 'close'].map((e) => [e, price[e].value]));

    return {
      pos: {
        x: 0,
        y: scaledPrice.Y(close),
      },
      delta: close - open,
      priceStr: formatPriceStr(close, country),
    };
  };

  const getExtremePrice = (chartItems: any[], recentPrice: any, [min, max]: [number, number], scaledPrice: any) => {
    const extremePriceList = chartItems.filter(({ pos }) => isBetween(pos.x, min, max));
    if (!extremePriceList.length) return;

    return Object.fromEntries(
      Object.entries(MAX_MIN).map(([key, { type, label }]: [string, any]) => {
        const {
          pos,
          price: {
            [type]: { value },
          },
        } = extremePriceList.reduce((prev, curr) => {
          const prevValue = prev.price[type].value;
          const currValue = curr.price[type].value;

          return Math[key as 'max' | 'min'](prevValue, currValue) === currValue ? curr : prev;
        });
        return [
          key,
          {
            pos: {
              x: pos.x,
              y: scaledPrice.Y(value),
            },
            price: {
              value: value,
              delta: recentPrice.close.value / value - 1,
            },
            label,
          },
        ];
      }),
    );
  };

  const getGrid = (scaledValue: any, valueStr: any) => {
    return Array.from(
      {
        length: Math.ceil(scaledValue.range / scaledValue.axisScale) + 1,
      },
      (_, i) => {
        const value = (i + Math.floor(scaledValue.min / scaledValue.axisScale)) * scaledValue.axisScale;
        return {
          valueStr: valueStr(value),
          pos: {
            x: 0,
            y: scaledValue.Y(value),
          },
        };
      },
    );
  };

  const getChartScoreItems = (chartItems: any[], scaledScore: any, scaledVolume: any) => {
    return chartItems.map(({ pos, score, trading: { volume, delta } }) => ({
      pos: pos,
      score: {
        ...score,
        y: scaledScore.Y(score.value),
      },
      trading: {
        y: scaledVolume.Y(volume),
        h: scaledVolume.H(volume),
        delta: delta,
      },
      barSize: barSize,
    }));
  };

  const drawPriceChart = (
    dateGrid: any[],
    chartPriceItems: any[],
    chartSMAItems: Record<
      string,
      {
        color: themeColor;
        items: {
          pos: {
            x: number;
            y: number;
          };
        }[];
      }
    >,
    recentPriceItem: any,
  ) => {
    const { width, height } = priceCanvasSize;
    const canvas = priceCanvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // grid

    setLineWidth(ctx, 1);
    ctx.strokeStyle = theme.colors.grayscale90;

    dateGrid.forEach(({ posX }) => {
      drawLine(ctx, [
        [posX, 0],
        [posX, height],
      ]);
    });

    priceGrid.forEach(({ pos }) => {
      drawLine(ctx, [
        [0, pos.y],
        [width, pos.y],
      ]);
    });

    // priceItems

    setLineWidth(ctx, 1);
    chartPriceItems.forEach(({ delta, pos, market, daily }: any) => {
      ctx.fillStyle = delta ? theme.colors.red : theme.colors.blue;
      ctx.strokeStyle = delta ? theme.colors.red : theme.colors.blue;
      drawRect(ctx, pos.x - barSize / 2, market.y, barSize, market.h);
      drawLine(ctx, [
        [pos.x, daily.y],
        [pos.x, daily.y + daily.h],
      ]);
    });

    setLineWidth(ctx, 2);
    Object.values(chartSMAItems).map(({ color, items }: { color: themeColor; items: any[] }) => {
      ctx.strokeStyle = theme.colors[color];

      drawLine(
        ctx,
        items.map((e) => [e.pos.x, e.pos.y]),
      );
    });

    ctx.strokeStyle = theme.colors['red'];
    setLineWidth(ctx, 1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([4, 4]);
    drawLine(ctx, [
      [0, recentPriceItem.pos.y],
      [width, recentPriceItem.pos.y],
    ]);
  };

  const drawScoreChart = (dateGrid: any[], scoreChartList: any[]) => {
    const { width, height } = scoreCanvasSize;
    const canvas = scoreCanvasRef.current;
    if (!canvas) return;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // grid

    setLineWidth(ctx, 1);
    ctx.strokeStyle = theme.colors.grayscale90;

    dateGrid.forEach(({ posX }) => {
      drawLine(ctx, [
        [posX, 0],
        [posX, height],
      ]);
    });

    scoreGrid.forEach(({ pos }) => {
      drawLine(ctx, [
        [0, pos.y],
        [width, pos.y],
      ]);
    });

    ctx.globalAlpha = 0.5;
    scoreChartList.map(({ pos, trading, barSize }: any) => {
      ctx.fillStyle = theme.colors[deltaColor(trading.delta)];
      ctx.strokeStyle = theme.colors[deltaColor(trading.delta)];

      drawRect(ctx, pos.x - barSize / 2, trading.y, barSize, trading.h);
    });

    ctx.globalAlpha = 1;
    setLineWidth(ctx, 2);
    ctx.strokeStyle = theme.colors.cyan;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    drawLine(
      ctx,
      scoreChartList
        .map((e: any) => {
          if (!e.score.value) return;
          return [e.pos.x, e.score.y];
        })
        .filter((e: any) => e),
    );
  };

  const zoomChart = (delta: number, x: number) => {
    const barSize = barSizeRef.current;
    const scaledBarSize = barSize * delta;
    if (scaledBarSize <= 0.25 || scaledBarSize > 250) return;

    const width = chartContainerRef.current?.offsetWidth ?? 0;
    const itemWidth = scaledBarSize * barGap;

    const MinX = itemWidth * (3 / 2);
    const MaxX = width + itemWidth * (stateRef.current.chartLength - 5 / 2);
    const canvasX = x + (canvasPosRef.current.curr.x - x) * (scaledBarSize / barSize);

    const currX = canvasX < MinX ? MinX : canvasX > MaxX ? MaxX : canvasX;

    setBarSize(scaledBarSize);
    setCanvasPos({
      ...canvasPosRef.current,
      curr: {
        x: currX,
      },
    });
  };

  const handleCanvasPointerDown = (e: MouseEvent | TouchEvent) => {
    const ponterX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    setIsCanvasMove(true);
    setCanvasPos({
      ...canvasPosRef.current,
      prev: {
        x: ponterX,
      },
    });
    setIsZoom(!('clientX' in e) && e.touches.length >= 2);
    if (!('clientX' in e) && Object.values(e.touches).length >= 2) {
      const touches = Object.values(e.touches);
      const now = {
        x: 0,
        y: 0,
        a: 0,
      };
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

  const handleCanvasPointerMove = (e: MouseEvent | TouchEvent) => {
    const pointerX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    if (isZoomRef.current && !('clientX' in e)) {
      if (e.cancelable) e.preventDefault();
      const touches = Object.values(e.touches);
      const now = {
        x: 0,
        y: 0,
        a: 0,
      };
      touches.map((e) => {
        now.x += e.clientX / touches.length;
        now.y += e.clientY / touches.length;
      });
      touches.map((e) => {
        now.a += Math.sqrt(Math.pow(e.clientX - now.x, 2) + Math.pow(e.clientY - now.y, 2)) / touches.length;
      });
      if (zoomRef.current && Math.abs(zoomRef.current - now.a) > 10) {
        zoomChart(now.a / zoomRef.current, now.x);
        setZoom(now.a);
      }
    } else if (isCanvasMoveRef.current) {
      const deltaX = pointerX - canvasPosRef.current.prev.x;
      const barSize = barSizeRef.current;

      const width = chartContainerRef.current?.offsetWidth ?? 0;
      const itemWidth = barSize * barGap;

      const MinX = itemWidth * (3 / 2);
      const MaxX = width + itemWidth * (stateRef.current.chartLength - 5 / 2);
      const canvasX = canvasPosRef.current.curr.x + deltaX;

      const currX = canvasX < MinX ? MinX : canvasX > MaxX ? MaxX : canvasX;

      setCanvasPos({
        curr: {
          x: currX,
        },
        prev: {
          x: pointerX,
        },
      });
    }
  };

  const handleCanvasPointerUp = (e: MouseEvent | TouchEvent) => {
    setIsCanvasMove(false);
    setIsZoom(!('clientX' in e) && e.touches.length >= 2);
  };

  const handleCanvasZoom = (e: WheelEvent) => {
    e.preventDefault();
    const deltaY = e.deltaY > 10 ? 10 : e.deltaY < -10 ? -10 : e.deltaY;
    zoomChart(1 - deltaY / 100, e.offsetX);
  };

  const handleCanvasMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleCanvasMouseLeave = () => {
    setIsMouseEnter(false);
    setMousePosInfo(null);
  };

  const handlePriceCanvasMouseMove = (e: MouseEvent) => {
    setMousePos({
      pos: {
        x: e.offsetX,
        y: e.offsetY,
      },
    });
  };

  const handlePriceZoom = (e: WheelEvent) => {
    e.preventDefault();
    const deltaY = e.deltaY > 10 ? 10 : e.deltaY < -10 ? -10 : e.deltaY;
    const scale = (1 + deltaY / 100) * priceScaleRef.current;
    if (scale <= 0.1 || scale > 20) return;
    setPriceScale(scale);
  };

  const handleScoreZoom = (e: WheelEvent) => {
    e.preventDefault();
    const deltaY = e.deltaY > 10 ? 10 : e.deltaY < -10 ? -10 : e.deltaY;
    const scale = (1 + deltaY / 100) * scoreScaleRef.current;
    if (scale <= 0.1 || scale > 20) return;
    setScoreScale(scale);
    setVolumeScale(scale);
  };

  const handleBlockDrag = () => false;

  return (
    <StockChartViewContainer>
      <StockChartItemContainer grow>
        <StockChartItemCanvasContainer>
          <StockChartItemContent type="price">
            <StockChartCanvasRefContainer ref={priceCanvasRef} />
            {extremePrice &&
              Object.entries(extremePrice).map(([key, value]: [string, any]) => (
                <ExtremeLabel key={key} x={value.pos.x} y={value.pos.y} delta={key == 'max'}>
                  {`${value.label} : ${formatPriceStr(value.price.value, country, true)} ${formatDeltaStr(value.price.delta)}`}
                  {key == 'max' ? <DownSVG /> : <UpSVG />}
                </ExtremeLabel>
              ))}
            <StockChartInfoHeader>
              {!isMobile && (
                <StockChartInfoHeaderItem>
                  {Object.entries(CHART_PRICE_FIELD).map(([key, value]: [string, any]) => (
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
                {Object.entries(CHART_MOVING_AVERAGE_COLOR).map(([range, color]) => (
                  <ChartSMAInfo
                    key={'SMA_' + range}
                    country={country}
                    price={!isMobile && mousePosInfo?.SMA?.[range].price}
                    range={~~range}
                    color={color}
                  />
                ))}
              </StockChartInfoHeaderItem>
            </StockChartInfoHeader>
          </StockChartItemContent>
          <StockChartItemContent type="score">
            <StockChartCanvasRefContainer ref={scoreCanvasRef} />
            <StockChartInfoHeader>
              <StockChartInfoHeaderItem>
                <ChartBottomInfo trading={mousePosInfo?.trading} score={mousePosInfo?.score} isMobile={isMobile} />
              </StockChartInfoHeaderItem>
            </StockChartInfoHeader>
          </StockChartItemContent>
          <StockChartCanvasRefContainer ref={chartContainerRef} />
        </StockChartItemCanvasContainer>
        <StockChartItemContent>
          <ChartLabelBase>0000</ChartLabelBase>
          {dateGrid.map((e: any) => (
            <ChartLabel key={e.dateISO} x={e.posX}>
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
          <ChartLabelBase>{priceGrid[priceGrid.length - 1]?.priceStr}</ChartLabelBase>
          {priceGrid.map((e: any) => (
            <ChartLabel key={e.valueStr} y={e.pos.y}>
              {e.valueStr}
            </ChartLabel>
          ))}
          {lastPriceItem && (
            <ChartLabel strokeRect fillText y={lastPriceItem.pos.y} color={deltaColor(lastPriceItem.delta)}>
              {lastPriceItem.priceStr}
            </ChartLabel>
          )}
          {recentPriceItem && (
            <ChartLabel fillRect y={recentPriceItem.pos.y} color={deltaColor(recentPriceItem.delta)}>
              {recentPriceItem.priceStr}
            </ChartLabel>
          )}
          {mousePosInfo?.priceStr && (
            <ChartLabel fillRect y={mousePosInfo.pos.y} color="blue">
              {mousePosInfo.priceStr}
            </ChartLabel>
          )}
        </StockChartItemContent>
        <StockChartItemContent type="score" ref={scoreLabelRef}>
          <ChartLabelBase>100</ChartLabelBase>
          {scoreGrid.map(
            (e: any) =>
              e.valueStr !== '' && (
                <ChartLabel key={'score' + e.valueStr} y={e.pos.y}>
                  {e.valueStr}
                </ChartLabel>
              ),
          )}
          {mousePosInfo?.scoreStr && (
            <ChartLabel fillRect y={mousePosInfo.pos.y - priceCanvasSize.height} color="blue">
              {mousePosInfo.scoreStr}
            </ChartLabel>
          )}
        </StockChartItemContent>
      </StockChartItemContainer>
    </StockChartViewContainer>
  );
};

const ChartBottomInfo = ({ trading, score, isMobile }: { trading: any; score: any; isMobile: boolean }) => {
  return (
    <>
      거래량{' '}
      {!isMobile && trading && (
        <>
          {formatVolume(trading.volume)}{' '}
          <StockInfoDeltaLabel delta={trading.delta}>{formatDeltaStr(trading.delta)}</StockInfoDeltaLabel>
        </>
      )}
      / 인간지표{' '}
      {!isMobile && score?.value && (
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
      <span
        style={{
          color: theme.colors[color],
        }}
      >
        {range + ' '}
      </span>
      {price && formatPriceStr(price, country, true)}
    </>
  );
};

const StockChart = ({
  stockId,
  symbolName,
  country,
}: {
  stockId: number;
  symbolName: string;
  country: STOCK_COUNTRY;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PERIOD_CODE>('D');

  const [chartData, updateChartData] = useStockChartQuery(stockId, selectedPeriod);

  return (
    <StockChartContainer>
      <StockChartHeader>
        <StockChartHeaderItem>{symbolName}</StockChartHeaderItem>
        <StockChartHeaderContents>
          {(Object.entries(PERIOD_CODE_TEXT) as [PERIOD_CODE, string][]).map(([key, value], i) => (
            <StockChartHeaderItem
              key={i}
              background={key == selectedPeriod ? 'grayscale90' : 'transparent'}
              onClick={() => setSelectedPeriod(key)}
            >
              {value}
            </StockChartHeaderItem>
          ))}
        </StockChartHeaderContents>
      </StockChartHeader>
      <StockChartView chartData={chartData} updateChart={updateChartData} period={selectedPeriod} country={country} />
    </StockChartContainer>
  );
};

export default StockChart;
