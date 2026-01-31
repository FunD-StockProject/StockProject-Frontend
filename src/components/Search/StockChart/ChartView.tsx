import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OPEN_DAYS } from '@ts/OpenDays';
import { StockCountryKey } from '@ts/StockCountry';
import { PERIOD_CODE } from '@ts/Types';
import { CanvasSize } from '@utils/Canvas';
import { formatDateISO } from '@utils/Date';
import {
  DATE_UNIT_PRIORITY,
  formatGridLabel,
  formatYMD,
  getUnitByMetaChange,
  lowerBoundNumber,
  parseYmdMeta,
} from '@utils/date/ymd';
import { DateUnit, IndexedYmd, LabeledGridYmd, YMD, YmdMeta } from '@utils/date/ymd.types';
import { getLocalPos, getTouchPoints } from '@utils/domPointer';
import { Point, avgRadius, centroid } from '@utils/geometry2d';
import { useIsMobile } from '@hooks/useIsMobile';
import useStateRef from '@hooks/useStateRef';
import StockChartDateLabel from './DateLabel';
import StockChartExtremePrice from './ExtremePrice';
import StockChartGridCanvas from './GridCanvas';
import { GridItem } from './GridLabel';
import StockChartPointerCanvas from './PointerCanvas';
import StockPriceChart from './PriceChart';
import StockChartPriceInfo from './PriceInfo';
import StockChartPriceLabel from './PriceLabel';
import StockScoreChart from './ScoreChart';
import StockChartScoreInfo from './ScoreInfo';
import StockChartScoreLabel from './ScoreLabel';
import { ChartHeight, ViewCanvasContainer, ViewContainer, deltaToChartColor } from './StockChart.Style';

const formatPrice = (value: number, country: StockCountryKey) => {
  const digit = country === 'OVERSEA' ? 2 : 0;

  return value.toLocaleString(undefined, {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  });
};

export const pickMetaKeyByPeriod = (period: PERIOD_CODE, meta: YmdMeta) => (period === 'M' ? meta.ymKey : meta.ymdKey);

const AXIS_SCALE_RATIOS = [1, 2, 2.5, 4, 5];
const AXIS_SCALE_VALUES = Array.from({ length: 12 }, (_, i) => 10 ** (i - 3)).flatMap((dec) =>
  AXIS_SCALE_RATIOS.map((r) => dec * r),
);

interface ValueRange {
  max: number;
  min: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const getScaleY = (top: number, bottom: number, range: ValueRange) =>
  (bottom - top) / Math.max(range.max - range.min, 1);

const valueToY = (
  value: number,
  height: number,
  margin: {
    top: number;
    bottom: number;
  },
  range: ValueRange,
  zoom: number = 1,
) => {
  const { top, bottom } = margin;

  const plotTop = top;
  const plotBottom = height - bottom;

  const centerY = (plotTop + plotBottom) / 2;
  const scaleY = getScaleY(plotTop, plotBottom, range);

  const zoomY = (y0: number) => centerY + (y0 - centerY) / zoom;
  return zoomY(plotBottom - (value - range.min) * scaleY);
};

const yToValue = (
  y: number,
  height: number,
  margin: {
    top: number;
    bottom: number;
  },
  range: ValueRange,
  zoom: number = 1,
) => {
  const { top, bottom } = margin;

  const plotTop = top;
  const plotBottom = height - bottom;

  const centerY = (plotTop + plotBottom) / 2;
  const scaleY = getScaleY(plotTop, plotBottom, range);

  const unzoomY = (y: number) => centerY + (y - centerY) * zoom;
  return range.min + (plotBottom - unzoomY(y)) / scaleY;
};

export const DPR = window.devicePixelRatio;

export const SMA_PERIODS = [5, 20, 60, 120] as const;
export const SMA_STYLE: Record<
  (typeof SMA_PERIODS)[number],
  {
    color: string;
    width: number;
  }
> = {
  '5': {
    color: '#EF4444',
    width: 2,
  },
  '20': {
    color: '#F59E0B',
    width: 1.5,
  },
  '60': {
    color: '#3B82F6',
    width: 1.2,
  },
  '120': {
    color: '#8B5CF6',
    width: 1,
  },
};

export type PriceChartItem = {
  x: number;
  openY: number;
  closeY: number;
  lowY: number;
  highY: number;
  smaY: Record<(typeof SMA_PERIODS)[number], number>;
  color: string;
};

const CHART_GAP = {
  MOBILE: {
    PRICE_VERTICAL_MARGIN: {
      top: 64,
      bottom: 42,
    },
    SCORE_VERTICAL_MARGIN: {
      top: 28,
      bottom: 8,
    },
    GRID_GAP: {
      width: 48,
      height: 28,
    },
  },
  DESKTOP: {
    PRICE_VERTICAL_MARGIN: {
      top: 96,
      bottom: 48,
    },
    SCORE_VERTICAL_MARGIN: {
      top: 32,
      bottom: 12,
    },
    GRID_GAP: {
      width: 64,
      height: 36,
    },
  },
};

const BAR_SIZE = 8;
const BAR_GAP = BAR_SIZE / 2;
const MIN_SCALE_X = 0.4;
const MAX_SCALE_X = 12.0;
const ZOOM_SPEED = 0.001;

const StockChartView = ({
  chartData,
  updateChart,
  period,
  country,
  chartInteractive = true,
  chartHeight,
}: {
  chartData: any[];
  updateChart: any;
  period: PERIOD_CODE;
  country: StockCountryKey;
  chartInteractive?: boolean;
  chartHeight?: ChartHeight;
}) => {
  const isMobile = useIsMobile();
  const chartGap = isMobile ? CHART_GAP.MOBILE : CHART_GAP.DESKTOP;
  const priceVerticalMargin = chartGap.PRICE_VERTICAL_MARGIN;
  const scoreVerticalMargin = chartGap.SCORE_VERTICAL_MARGIN;
  const gridGap = chartGap.GRID_GAP;

  const calculatedChartHeight = chartHeight ?? { price: '1fr', score: !isMobile ? '200px' : '100px' };

  const pointerCanvasRef = useRef<HTMLCanvasElement>(null);
  const [pointerCanvasSize, setPointerCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });
  const [priceCanvasSize, setPriceCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });
  const [scoreCanvasSize, setScoreCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

  const [zoomPrice, setZoomPrice, zoomPriceRef] = useStateRef(1);
  const chartDataLengthRef = useRef(0);

  const [pointerPos, setPointerPos, pointerPosRef] = useStateRef<{
    curr: Point;
    prev: Point;
    isMoving: boolean;
  }>({
    curr: { x: -1, y: -1 },
    prev: { x: -1, y: -1 },
    isMoving: false,
  });
  const [canvasPos, setCanvasPos, canvasPosRef] = useStateRef<any>({
    x: 0,
    delta: 0,
  });

  const priceRangeRef = useRef<ValueRange>({
    max: 0,
    min: 0,
  });
  const tradingRangeRef = useRef<ValueRange>({
    max: 0,
    min: 0,
  });

  const [barSize, setBarSize, barSizeRef] = useStateRef({
    width: BAR_SIZE,
    gap: BAR_GAP,
  });

  const pinchRef = useRef<{ centerX: number; radius: number } | null>(null);

  const handlePriceZoom = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const zoomPrice = zoomPriceRef.current;

    const deltaY = e.deltaY;
    const scale = clamp(zoomPrice * Math.exp(-deltaY * ZOOM_SPEED), 0.125, 8);
    setZoomPrice(scale);
  }, []);

  const MIN_CANVAS_X = MAX_SCALE_X * (BAR_SIZE + BAR_GAP) * 0.5;
  const MAX_CANVAS_X = MAX_SCALE_X * (BAR_SIZE + BAR_GAP) * 0.5;

  const clampDragDelta = useCallback((rawDelta: number) => {
    const pointerCanvas = pointerCanvasRef.current;
    if (!pointerCanvas) return 0;

    const canvasPos = canvasPosRef.current;
    const bar = barSizeRef.current;

    const step = bar.width + bar.gap;

    const width = pointerCanvas.clientWidth;
    const minDelta = width - MIN_CANVAS_X - canvasPos.x;
    const maxDelta = MAX_CANVAS_X + step * (chartDataLengthRef.current - 1) - canvasPos.x;

    return clamp(rawDelta, minDelta, maxDelta);
  }, []);

  const applyZoom = useCallback((pointerX: number, deltaY: number, nextPointerPos: { x: number; y: number }) => {
    const pointerCanvas = pointerCanvasRef.current;
    if (!pointerCanvas) return;

    const lastIndex = chartDataLengthRef.current - 1;
    if (lastIndex < 0) return;

    const { x, delta } = canvasPosRef.current;
    const barSize = barSizeRef.current;

    const prevStep = barSize.width + barSize.gap;

    const prevScale = barSize.width / BAR_SIZE;
    const nextScale = clamp(prevScale * Math.exp(-deltaY * ZOOM_SPEED), MIN_SCALE_X, MAX_SCALE_X);
    if (nextScale === prevScale) return;

    const nextW = BAR_SIZE * nextScale;
    const nextG = BAR_GAP * nextScale;
    const nextStep = nextW + nextG;

    const width = pointerCanvas.clientWidth;
    const minX = width - MIN_CANVAS_X;
    const maxX = MAX_CANVAS_X + nextStep * lastIndex;

    const nextVisibleX = clamp(pointerX + ((x + delta - pointerX) / prevStep) * nextStep, minX, maxX);

    setBarSize({ width: nextW, gap: nextG });
    setCanvasPos({ x: nextVisibleX, delta: 0 });

    const pp = pointerPosRef.current;
    setPointerPos({ ...pp, curr: nextPointerPos, prev: nextPointerPos });
  }, []);

  const handleStartPointer = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    const pointerCanvas = pointerCanvasRef.current;
    if (!pointerCanvas) return;

    const isTouch = 'touches' in e;
    const touchCount = isTouch ? e.touches.length : 0;

    if (isTouch && touchCount > 1) {
      const pts = getTouchPoints(e.touches, pointerCanvas);
      const c = centroid(pts);
      const r = avgRadius(pts, c);

      pinchRef.current = { centerX: c.x, radius: r };

      const pointerPos = pointerPosRef.current;
      setPointerPos({
        ...pointerPos,
        isMoving: false,
      });
      return;
    }

    const localPos = isTouch ? getLocalPos(e.touches, pointerCanvas) : getLocalPos(e, pointerCanvas);

    setPointerPos({
      curr: localPos,
      prev: localPos,
      isMoving: true,
    });
  }, []);

  const handleMovePointer = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      const pointerCanvas = pointerCanvasRef.current;
      if (!pointerCanvas) return;

      const pointerPos = pointerPosRef.current;

      const isTouch = 'touches' in e;
      const touchCount = isTouch ? e.touches.length : 0;

      if (isTouch && touchCount >= 2) {
        const pts = getTouchPoints(e.touches, pointerCanvas);
        const c = centroid(pts);
        const r = avgRadius(pts, c);

        const prev = pinchRef.current;
        if (!prev || prev.radius <= 0 || r <= 0) {
          pinchRef.current = { centerX: c.x, radius: r };
          return;
        }

        const pinchScale = r / prev.radius;
        if (Math.abs(pinchScale - 1) < 0.002) {
          pinchRef.current = { centerX: c.x, radius: r };
          return;
        }

        const deltaY = -Math.log(pinchScale) / ZOOM_SPEED;

        applyZoom(c.x, deltaY, { x: c.x, y: c.y });

        pinchRef.current = { centerX: c.x, radius: r };
        return;
      }

      const localPos = isTouch ? getLocalPos(e.touches, pointerCanvas, 0) : getLocalPos(e, pointerCanvas);

      setPointerPos({ ...pointerPos, curr: localPos });
      if (!pointerPos.isMoving) return;

      const delta = clampDragDelta(localPos.x - pointerPos.prev.x);

      const canvasPos = canvasPosRef.current;
      setCanvasPos({ ...canvasPos, delta });
    },
    [applyZoom, clampDragDelta, setPointerPos, setCanvasPos],
  );

  const handleEndPointer = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      const pointerCanvas = pointerCanvasRef.current;
      if (!pointerCanvas) return;

      const pointerPos = pointerPosRef.current;
      const canvasPos = canvasPosRef.current;

      const isTouch = 'touches' in e;
      const touchCount = isTouch ? e.touches.length : 0;

      if (isTouch && touchCount >= 2) {
        const pts = getTouchPoints(e.touches, pointerCanvas);
        const c = centroid(pts);
        const r = avgRadius(pts, c);

        setPointerPos({ ...pointerPos, isMoving: false });

        pinchRef.current = { centerX: c.x, radius: r };
        return;
      }

      if (isTouch && touchCount === 1) {
        const localPos = getLocalPos(e.touches, pointerCanvas, 0);

        setPointerPos({ curr: localPos, prev: localPos, isMoving: true });

        pinchRef.current = null;
        return;
      }

      setPointerPos({ ...pointerPos, isMoving: false });
      setCanvasPos({ x: canvasPos.x + canvasPos.delta, delta: 0 });

      pinchRef.current = null;
    },
    [setPointerPos, setCanvasPos],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const pointerCanvas = pointerCanvasRef.current;
      if (!pointerCanvas) return;

      const localPos = getLocalPos(e, pointerCanvas);
      applyZoom(localPos.x, e.deltaY, localPos);
    },
    [applyZoom],
  );

  useEffect(() => {
    const pointerCanvas = pointerCanvasRef.current;
    if (!pointerCanvas) return;
    if (!chartInteractive) return;

    const opts = { passive: false } as AddEventListenerOptions;

    if (!isMobile) {
      pointerCanvas.addEventListener('mousedown', handleStartPointer);
      window.addEventListener('mousemove', handleMovePointer);
      window.addEventListener('mouseup', handleEndPointer);
      pointerCanvas.addEventListener('wheel', handleWheel);
    } else {
      pointerCanvas.addEventListener('touchstart', handleStartPointer, opts);
      pointerCanvas.addEventListener('touchmove', handleMovePointer, opts);
      pointerCanvas.addEventListener('touchend', handleEndPointer, opts);
      pointerCanvas.addEventListener('touchcancel', handleEndPointer, opts);
    }

    return () => {
      if (!isMobile) {
        pointerCanvas.removeEventListener('mousedown', handleStartPointer);
        window.removeEventListener('mousemove', handleMovePointer);
        window.removeEventListener('mouseup', handleEndPointer);
        pointerCanvas.removeEventListener('wheel', handleWheel);
      } else {
        pointerCanvas.removeEventListener('touchstart', handleStartPointer);
        pointerCanvas.removeEventListener('touchmove', handleMovePointer);
        pointerCanvas.removeEventListener('touchend', handleEndPointer);
        pointerCanvas.removeEventListener('touchcancel', handleEndPointer);
      }
    };
  }, [chartInteractive, isMobile]);

  const chartItems = useMemo(() => {
    const { width, height } = priceCanvasSize;
    const len = chartData.length;

    if (!len || width <= 0 || height <= 0) {
      return [];
    }

    const barWidth = barSize.width + barSize.gap;

    const canvasX = canvasPos.x + canvasPos.delta;
    const skip = Math.max(0, Math.floor((canvasX - width) / barWidth));
    const baseX = canvasX - barWidth * skip;
    const count = Math.min(Math.floor(baseX / barWidth) + 1, len - skip);

    const startRev = skip;
    const endRev = Math.min(skip + count, len - 1);
    const visibleCount = Math.max(0, endRev - startRev + 1);

    const chartItems = new Array(visibleCount);
    for (let i = 0; i < visibleCount; i++) {
      const revIndex = startRev + i;
      chartItems[i] = {
        ...chartData[len - 1 - revIndex],
        idx: revIndex,
      };
    }

    return chartItems;
  }, [chartData, canvasPos, barSize, priceCanvasSize]);

  const { priceRange, tradingRange } = useMemo(() => {
    if (!chartItems.length)
      return {
        priceRange: priceRangeRef.current,
        tradingRange: tradingRangeRef.current,
      };

    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxTrading = -Infinity;

    for (const item of chartItems) {
      const low = item.price.low.value;
      const high = item.price.high.value;
      const trading = item.trading.value;

      if (low < minPrice) minPrice = low;
      if (high > maxPrice) maxPrice = high;
      if (trading > maxTrading) maxTrading = trading;

      const sma = item.SMA;
      for (let p = 0; p < SMA_PERIODS.length; p++) {
        const period = SMA_PERIODS[p];
        const v = sma[period].price;
        if (v < minPrice) minPrice = v;
        if (v > maxPrice) maxPrice = v;
      }
    }

    const prevPriceRange = priceRangeRef.current;
    let nextPriceRange = prevPriceRange;

    if (prevPriceRange.min !== minPrice || prevPriceRange.max !== maxPrice) {
      nextPriceRange = {
        max: maxPrice,
        min: minPrice,
      };
      priceRangeRef.current = nextPriceRange;
    }

    const prevTradingRange = tradingRangeRef.current;
    let nextTradingRange = prevTradingRange;

    if (prevTradingRange.max !== maxTrading) {
      nextTradingRange = {
        max: maxTrading,
        min: 0,
      };
      tradingRangeRef.current = nextTradingRange;
    }

    return {
      priceRange: nextPriceRange,
      tradingRange: nextTradingRange,
    };
  }, [chartItems]);

  const chartMaxPrice = useMemo(() => {
    if (!chartData.length) return 0;

    const maxPriceItem = chartData.reduce((max, item) => Math.max(max, item.price.high.value), -Infinity);

    return formatPrice(maxPriceItem, country);
  }, [chartData]);

  const indexToX = useCallback(
    (index: number) => {
      const { width, gap } = barSizeRef.current;
      const { x, delta } = canvasPosRef.current;
      const barWidth = width + gap;
      const canvasX = x + delta;
      return canvasX - index * barWidth;
    },
    [barSizeRef.current, canvasPosRef.current],
  );

  const xToIndex = useCallback(
    (x: number) => {
      const { width, gap } = barSizeRef.current;
      const { x: currX, delta } = canvasPosRef.current;
      const barWidth = width + gap;
      const canvasX = currX + delta;
      return Math.floor((canvasX - x + barWidth / 2) / barWidth);
    },
    [barSizeRef.current, canvasPosRef.current],
  );

  const { priceToY, yToPrice } = useMemo(() => {
    const { height } = priceCanvasSize;

    return {
      priceToY: (price: number) => valueToY(price, height, priceVerticalMargin, priceRange, zoomPrice),
      yToPrice: (y: number) => yToValue(y, height, priceVerticalMargin, priceRange, zoomPrice),
    };
  }, [priceCanvasSize.height, priceVerticalMargin, priceRange, zoomPrice]);

  const { scoreToY, yToScore } = useMemo(() => {
    const { height } = scoreCanvasSize;
    const scoreRange = { max: 100, min: 0 };

    return {
      scoreToY: (score: number) => valueToY(score, height, scoreVerticalMargin, scoreRange),
      yToScore: (y: number) => yToValue(y, height, scoreVerticalMargin, scoreRange),
    };
  }, [scoreCanvasSize.height, scoreVerticalMargin]);

  const tradingToY = useCallback(
    (value: number) => {
      const { height } = scoreCanvasSize;

      return valueToY(value, height, scoreVerticalMargin, tradingRange);
    },
    [scoreCanvasSize.height, scoreVerticalMargin, tradingRange],
  );

  const indexedDates: IndexedYmd[] = useMemo(() => {
    const chartLen = chartData.length;
    if (!chartLen) return [];

    const marketOpenDays = OPEN_DAYS[period][country] as YMD[];

    const chartYmds = new Array<YMD>(chartLen);
    const chartMetas = new Array<YmdMeta>(chartLen);
    for (let i = 0; i < chartLen; i++) {
      const ymd = formatYMD(chartData[i].date);
      chartYmds[i] = ymd;
      chartMetas[i] = parseYmdMeta(ymd);
    }

    const openDayMetas = new Array<YmdMeta>(marketOpenDays.length);
    const openDayKeys = new Array<number>(marketOpenDays.length);
    for (let i = 0; i < marketOpenDays.length; i++) {
      const meta = parseYmdMeta(marketOpenDays[i]);
      openDayMetas[i] = meta;
      openDayKeys[i] = pickMetaKeyByPeriod(period, meta);
    }

    const firstChartKey = pickMetaKeyByPeriod(period, chartMetas[0]);
    const lastChartKey = pickMetaKeyByPeriod(period, chartMetas[chartLen - 1]);

    const firstOpenDayIdx = lowerBoundNumber(openDayKeys, firstChartKey);
    const lastOpenDayIdx = lowerBoundNumber(openDayKeys, lastChartKey);

    const prefixEndIdx = firstOpenDayIdx - 1;
    const suffixStartIdx = Math.min(marketOpenDays.length, lastOpenDayIdx + 1);

    const prefixLen = Math.max(0, prefixEndIdx + 1);
    const suffixLen = Math.max(0, marketOpenDays.length - suffixStartIdx);

    const out = new Array<IndexedYmd>(prefixLen + chartLen + suffixLen);

    let writePos = 0;

    for (let i = 0; i < prefixLen; i++) {
      out[writePos++] = {
        ymd: marketOpenDays[i],
        meta: openDayMetas[i],
        idx: chartLen + prefixEndIdx - i,
      };
    }

    for (let i = 0; i < chartLen; i++) {
      out[writePos++] = {
        ymd: chartYmds[i],
        meta: chartMetas[i],
        idx: chartLen - i - 1,
      };
    }

    for (let i = 0; i < suffixLen; i++) {
      const openIdx = suffixStartIdx + i;
      out[writePos++] = {
        ymd: marketOpenDays[openIdx],
        meta: openDayMetas[openIdx],
        idx: -i - 1,
      };
    }

    return out;
  }, [chartData, period, country]);

  const labeledGridDates: LabeledGridYmd[] = useMemo(() => {
    if (!indexedDates.length) return [];

    const barPitch = barSize.width + barSize.gap;
    const minGridGap = gridGap.width;

    const gridPoints: LabeledGridYmd[] = [];

    const makeGridPoint = (src: IndexedYmd, unit: DateUnit): LabeledGridYmd => ({
      ymd: src.ymd,
      idx: src.idx,
      label: formatGridLabel(src.meta, unit),
    });

    gridPoints.push(makeGridPoint(indexedDates[0], 'Y'));

    let lastPlacedX = 0;
    let lastPlacedUnit: DateUnit = 'Y';
    let prevMeta: YmdMeta = indexedDates[0].meta;

    for (let i = 1; i < indexedDates.length; i++) {
      const src = indexedDates[i];
      const x = i * barPitch;

      const unit = getUnitByMetaChange(prevMeta, src.meta);
      prevMeta = src.meta;

      const isFarEnough = x - lastPlacedX >= minGridGap;
      const isHigherUnit = DATE_UNIT_PRIORITY[unit] > DATE_UNIT_PRIORITY[lastPlacedUnit];
      if (!isFarEnough && !isHigherUnit) continue;

      const nextPoint = makeGridPoint(src, unit);
      if (isFarEnough) gridPoints.push(nextPoint);
      else gridPoints[gridPoints.length - 1] = nextPoint;

      lastPlacedX = x;
      lastPlacedUnit = unit;
    }

    return gridPoints;
  }, [indexedDates, barSize, gridGap]);

  const dateGrid: GridItem[] = useMemo(() => {
    const res: GridItem[] = [];
    const canvasWidth = pointerCanvasSize.width;

    for (const item of labeledGridDates) {
      const x = indexToX(item.idx);
      if (x < 0 || x > canvasWidth) continue;

      res.push({
        pos: { x },
        value: item.ymd,
        text: item.label,
      });
    }

    return res;
  }, [labeledGridDates, indexToX, pointerCanvasSize.width]);

  const priceChartItems = useMemo(() => {
    if (!chartItems.length) {
      return [];
    }

    return chartItems.map(({ price, SMA, idx }) => {
      const x = indexToX(idx);

      const openY = priceToY(price.open.value);
      const closeY = priceToY(price.close.value);
      const lowY = priceToY(price.low.value);
      const highY = priceToY(price.high.value);

      const smaY = {} as Record<(typeof SMA_PERIODS)[number], number>;
      for (let p = 0; p < SMA_PERIODS.length; p++) {
        const period = SMA_PERIODS[p];
        smaY[period] = priceToY(SMA[period].price);
      }

      return {
        x,
        openY,
        closeY,
        lowY,
        highY,
        smaY: smaY,
        color: deltaToChartColor(price.close.value - price.open.value),
      };
    });
  }, [chartItems, indexToX, priceToY]);

  const scoreChartItems = useMemo(() => {
    if (!chartItems.length) return [];

    return chartItems
      .map(({ score, idx }) => {
        const { value, delta } = score;
        if (value === null) return;
        const x = indexToX(idx);

        const y = scoreToY(value);

        return {
          pos: {
            x,
            y,
          },
          value,
          delta,
        };
      })
      .filter(Boolean);
  }, [chartItems, indexToX, scoreToY]);

  const tradingChartItems = useMemo(() => {
    if (!chartItems.length) return [];

    const bottom = tradingToY(0);
    return chartItems.map(({ trading, idx }) => {
      const { value, volume, delta } = trading;
      const x = indexToX(idx);
      return {
        pos: {
          x,
          y: tradingToY(value),
        },
        value,
        volume,
        delta,
        bottom,
      };
    });
  }, [chartItems, indexToX, tradingToY]);

  const createYAxisGrid = useCallback(
    ({
      height,
      margin,
      yToValue,
      valueToY,
      valueRange,
      formatText,
      zoomPrice = 1,
    }: {
      height: number;
      margin: { top: number; bottom: number };
      yToValue: (y: number) => number;
      valueToY: (value: number) => number;
      valueRange: ValueRange;
      formatText: (value: number) => string;
      zoomPrice?: number;
    }) => {
      const gapHeight = gridGap.height;

      const plotTop = margin.top;
      const plotBottom = height - margin.bottom;

      const scaleY = getScaleY(plotTop, plotBottom, valueRange);
      const axis = AXIS_SCALE_VALUES.find((v) => (v * scaleY) / zoomPrice >= gapHeight) ?? 1e9;

      const start = Math.floor(yToValue(height) / axis);
      const end = Math.ceil(yToValue(0) / axis);

      const grid: GridItem[] = [];
      for (let m = start; m <= end; m++) {
        const value = m * axis;
        const y = valueToY(value);

        if (y < 0 || y > height) continue;

        grid.push({
          value,
          text: formatText(value),
          pos: { y },
        });
      }

      return grid;
    },
    [gridGap.height],
  );

  const priceGrid = useMemo(() => {
    return createYAxisGrid({
      height: priceCanvasSize.height,
      margin: priceVerticalMargin,
      yToValue: yToPrice,
      valueToY: priceToY,
      valueRange: priceRange,
      formatText: (value) => formatPrice(value, country),
      zoomPrice,
    });
  }, [createYAxisGrid, priceCanvasSize.height, priceVerticalMargin, priceToY, yToPrice, priceRange, zoomPrice]);

  const scoreGrid = useMemo(() => {
    return createYAxisGrid({
      height: scoreCanvasSize.height,
      margin: scoreVerticalMargin,
      yToValue: yToScore,
      valueToY: scoreToY,
      valueRange: { min: 0, max: 100 },
      formatText: (value) => value.toString(),
    });
  }, [createYAxisGrid, scoreCanvasSize.height, scoreVerticalMargin, scoreToY, yToScore]);

  const recentPrice = useMemo(() => {
    if (!chartData?.length) return;

    const recentChartItem = chartData[chartData.length - 1];
    const value = recentChartItem.price.close.value;
    const delta = value - recentChartItem.price.open.value;

    return {
      pos: {
        y: priceToY(value),
      },
      value,
      text: formatPrice(value, country),
      delta,
    };
  }, [chartData, priceToY]);

  const lastPrice = useMemo(() => {
    if (!chartItems?.length) return;

    const lastChartItem = chartItems[0];
    const value = lastChartItem.price.close.value;
    const delta = value - lastChartItem.price.open.value;

    return {
      pos: {
        y: priceToY(value),
      },
      value,
      text: formatPrice(value, country),
      delta,
    };
  }, [chartItems, priceToY]);

  const pointerIndex = useMemo(() => {
    if (isMobile) return;
    const { width, height } = pointerCanvasSize;
    const { curr } = pointerPos;

    if (curr.x < 0 || curr.x > width || curr.y < 0 || curr.y > height) return;

    return xToIndex(curr.x);
  }, [isMobile, pointerPos, xToIndex]);

  const pointerChartItem = useMemo(() => {
    if (pointerIndex === undefined) return;

    return chartItems.find((item) => item.idx === pointerIndex);
  }, [pointerIndex, chartItems]);

  const { pointerPriceInfo, pointerScoreInfo } = useMemo(() => {
    if (!pointerChartItem) return { pointerPriceInfo: undefined, pointerScoreInfo: undefined };

    return {
      pointerPriceInfo: {
        price: pointerChartItem.price,
        SMA: pointerChartItem.SMA,
      },
      pointerScoreInfo: {
        trading: pointerChartItem.trading,
        score: pointerChartItem.score,
      },
    };
  }, [pointerChartItem]);

  const { pointerPriceY, pointerScoreY } = useMemo(() => {
    const { width, height } = pointerCanvasSize;
    const { x, y } = pointerPos.curr;

    if (isMobile || x < 0 || x > width || y < 0 || y > height) {
      return { pointerPriceY: undefined, pointerScoreY: undefined };
    }

    const priceH = priceCanvasSize.height;

    const priceY = y <= priceH ? y : undefined;
    const scoreY = y > priceH && y <= height ? y - priceH : undefined;

    return {
      pointerPriceY: priceY,
      pointerScoreY: scoreY,
    };
  }, [isMobile, pointerPos, pointerCanvasSize, priceCanvasSize.height]);

  const pointerPriceLabel = useMemo(() => {
    if (!pointerPriceY) return;

    const price = yToPrice(pointerPriceY);
    return {
      value: price,
      text: formatPrice(price, country),
      pos: {
        y: pointerPriceY,
      },
    };
  }, [pointerPriceY, country]);

  const pointerScoreLabel = useMemo(() => {
    if (!pointerScoreY) return;

    const score = clamp(yToScore(pointerScoreY), 0, 100);
    return {
      value: score,
      text: score.toFixed(0),
      pos: {
        y: pointerScoreY,
      },
    };
  }, [pointerScoreY]);

  const pointerDateLabel = useMemo(() => {
    if (!pointerIndex) return;

    const date = indexedDates.find((item) => item.idx === pointerIndex);
    if (!date) return;

    return {
      value: date.ymd,
      text: date.ymd,
      pos: {
        x: indexToX(date.idx),
      },
    };
  }, [pointerIndex, indexedDates, indexToX]);

  const pointerInfo = useMemo(() => {
    if (isMobile) return;
    const { width, height } = pointerCanvasSize;

    const { curr } = pointerPos;
    if (curr.x < 0 || curr.x > width || curr.y < 0 || curr.y > height) return;

    const y = curr.y;

    const index = xToIndex(curr.x);
    const x = indexToX(index);

    return {
      pos: {
        x,
        y,
      },
    };
  }, [isMobile, pointerCanvasSize, pointerPos, xToIndex, indexToX]);

  useEffect(() => {
    if (!chartItems?.length) return;

    const oldItem = chartItems[chartItems.length - 1];
    if (oldItem.idx !== chartData.length - 1) return;

    updateChart(formatDateISO(oldItem.date));
  }, [chartItems]);

  useEffect(() => {
    chartDataLengthRef.current = chartData.length;
  }, [chartData]);

  const [firstLoading, setFirstLoading] = useState(false);
  useEffect(() => {
    if (!chartMaxPrice) return;
    setFirstLoading(true);
  }, [chartMaxPrice]);

  useEffect(() => {
    const pointerCanvas = pointerCanvasRef.current;
    if (!pointerCanvas) return;

    setZoomPrice(1);
    setBarSize({ width: BAR_SIZE, gap: BAR_GAP });

    setCanvasPos({
      x: pointerCanvas.clientWidth - BAR_SIZE * 4,
      delta: 0,
    });
  }, [period, firstLoading]);

  const canvasHeight = useMemo(() => {
    return {
      price: priceCanvasSize.height,
      score: scoreCanvasSize.height,
    };
  }, [priceCanvasSize, scoreCanvasSize]);

  return (
    <ViewContainer chartHeight={calculatedChartHeight}>
      <ViewCanvasContainer>
        <StockChartPointerCanvas
          canvasRef={pointerCanvasRef}
          onSizeChange={setPointerCanvasSize}
          canvasHeight={canvasHeight}
          pointerInfo={pointerInfo}
        />
        <StockPriceChart
          onSizeChange={setPriceCanvasSize}
          priceChartItems={priceChartItems}
          barSize={barSize}
          recentPrice={recentPrice}
        />
        <StockChartGridCanvas
          canvasHeight={canvasHeight}
          dateGrid={dateGrid}
          priceGrid={priceGrid}
          scoreGrid={scoreGrid}
        />
        <StockChartExtremePrice
          country={country}
          priceCanvasSize={priceCanvasSize}
          chartItems={chartItems}
          recentPrice={recentPrice}
          indexToX={indexToX}
          priceToY={priceToY}
        />
        <StockChartPriceInfo pointerPriceInfo={pointerPriceInfo} country={country} isMobile={isMobile} />
      </ViewCanvasContainer>
      <StockChartPriceLabel
        chartMaxPrice={chartMaxPrice}
        priceGrid={priceGrid}
        recentPrice={recentPrice}
        lastPrice={lastPrice}
        pointerPrice={pointerPriceLabel}
        handlePriceZoom={handlePriceZoom}
      />
      <ViewCanvasContainer>
        <StockScoreChart
          onSizeChange={setScoreCanvasSize}
          scoreChartItems={scoreChartItems}
          tradingChartItems={tradingChartItems}
          barSize={barSize}
        />
        <StockChartScoreInfo pointerScoreInfo={pointerScoreInfo} />
      </ViewCanvasContainer>
      <StockChartScoreLabel scoreGrid={scoreGrid} pointerScore={pointerScoreLabel} />
      <StockChartDateLabel dateGrid={dateGrid} pointerDate={pointerDateLabel} />
    </ViewContainer>
  );
};

export default StockChartView;
