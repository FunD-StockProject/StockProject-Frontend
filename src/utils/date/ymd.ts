import type { DateUnit, YMD, YmdMeta } from './ymd.types';

export const DATE_UNIT_PRIORITY: Record<DateUnit, number> = { D: 1, M: 2, Y: 3 };

export const lowerBoundNumber = (sorted: number[], target: number) => {
  let lo = 0;
  let hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (sorted[mid] >= target) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};

export const parseYMD = (ymd: YMD): Date => {
  const year = Number(ymd.slice(0, 4));
  const month = Number(ymd.slice(5, 7));
  const day = Number(ymd.slice(8, 10));
  return new Date(year, month - 1, day);
};

export const parseYmdMeta = (ymd: YMD): YmdMeta => {
  const year = Number(ymd.slice(0, 4));
  const month = Number(ymd.slice(5, 7));
  const day = Number(ymd.slice(8, 10));
  return { year, month, day, ymKey: year * 100 + month, ymdKey: year * 10000 + month * 100 + day };
};

export const getUnitByMetaChange = (prev: YmdMeta | null, curr: YmdMeta): DateUnit => {
  if (!prev) return 'D';
  if (prev.year !== curr.year) return 'Y';
  if (prev.month !== curr.month) return 'M';
  return 'D';
};

export const formatGridLabel = (meta: YmdMeta, unit: DateUnit) =>
  unit === 'D' ? `${meta.day}일` : unit === 'M' ? `${meta.month}월` : `${meta.year}년`;

export const formatYMD = (date: Date): YMD => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}` as YMD;
};
