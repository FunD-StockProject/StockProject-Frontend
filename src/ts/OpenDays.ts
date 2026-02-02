import { formatYMD, parseYMD } from '@utils/date/ymd';
import { YMD } from '@utils/date/ymd.types';
import lunarToSolar from '@utils/lunarToSolar';

// =====================
// Date utils (local-safe)
// =====================

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isWeekend(date: Date): boolean {
  const day = date.getDay(); // 0 Sun ... 6 Sat
  return day === 0 || day === 6;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function* eachDay(startDate: Date, endDate: Date): Generator<Date> {
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    yield new Date(d);
  }
}

// =====================
// Calendar helpers
// =====================

/** 토/일이면 관측휴일 적용: 토→금, 일→월 */
function applyWeekendObserved(date: Date): Date {
  const w = date.getDay();
  if (w === 6) return addDays(date, -1);
  if (w === 0) return addDays(date, +1);
  return date;
}

/** 특정 월의 n번째 weekday (0=Sun..6=Sat) */
function nthWeekday(year: number, month0: number, nth: number, weekday: number): Date {
  const first = new Date(year, month0, 1);
  const offset = (7 + weekday - first.getDay()) % 7;
  return new Date(year, month0, 1 + offset + (nth - 1) * 7);
}

/** 특정 월의 마지막 weekday (0=Sun..6=Sat) */
function lastWeekday(year: number, month0: number, weekday: number): Date {
  const last = new Date(year, month0 + 1, 0);
  const diff = (7 + last.getDay() - weekday) % 7;
  return new Date(year, month0, last.getDate() - diff);
}

/** 부활절(서방/그레고리력) */
function calcEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// =====================
// Closed-day builders
// =====================

function buildNyseClosedDays(year: number): Set<YMD> {
  const closed = new Set<YMD>();

  // fixed + observed
  closed.add(formatYMD(applyWeekendObserved(new Date(year, 0, 1)))); // New Year
  closed.add(formatYMD(applyWeekendObserved(new Date(year, 6, 4)))); // Independence
  closed.add(formatYMD(applyWeekendObserved(new Date(year, 11, 25)))); // Christmas

  if (year >= 2022) {
    closed.add(formatYMD(applyWeekendObserved(new Date(year, 5, 19)))); // Juneteenth
  }

  // weekday-based
  if (year >= 1998) closed.add(formatYMD(nthWeekday(year, 0, 3, 1))); // MLK Day: 3rd Mon Jan
  if (year >= 1971) closed.add(formatYMD(nthWeekday(year, 1, 3, 1))); // Presidents: 3rd Mon Feb
  if (year >= 1971) closed.add(formatYMD(lastWeekday(year, 4, 1))); // Memorial: last Mon May
  closed.add(formatYMD(nthWeekday(year, 8, 1, 1))); // Labor: 1st Mon Sep
  closed.add(formatYMD(nthWeekday(year, 10, 4, 4))); // Thanksgiving: 4th Thu Nov

  // Good Friday (Easter - 2)
  const easter = calcEasterSunday(year);
  closed.add(formatYMD(addDays(easter, -2)));

  return closed;
}

function buildKrxClosedDays(year: number): Set<YMD> {
  const closed = new Set<YMD>();

  // fixed solar holidays
  const fixed: Array<[month: number, day: number]> = [
    [1, 1],
    [3, 1],
    [5, 5],
    [6, 6],
    [8, 15],
    [10, 3],
    [10, 9],
    [12, 25],
  ];
  for (const [m, d] of fixed) closed.add(formatYMD(new Date(year, m - 1, d)));

  // Workers' Day (5/1)
  closed.add(formatYMD(new Date(year, 4, 1)));

  // lunar holidays
  const seollal = lunarToSolar(1, 1, year, 0);
  closed.add(formatYMD(addDays(seollal, -1)));
  closed.add(formatYMD(seollal));
  closed.add(formatYMD(addDays(seollal, +1)));

  const chuseok = lunarToSolar(15, 8, year, 0);
  closed.add(formatYMD(addDays(chuseok, -1)));
  closed.add(formatYMD(chuseok));
  closed.add(formatYMD(addDays(chuseok, +1)));

  const buddha = lunarToSolar(8, 4, year, 0);
  closed.add(formatYMD(buddha));

  // year-end closing: last open day among remaining days
  for (let d = new Date(year, 11, 31); ; d = addDays(d, -1)) {
    const ymd = formatYMD(d);
    if (isWeekend(d) || closed.has(ymd)) continue;
    closed.add(ymd);
    break;
  }

  return closed;
}

// =====================
// Generic open-day generator
// =====================

type ClosedBuilder = (year: number) => Set<YMD>;

function listOpenDaysByClosedRules(
  buildClosedDays: ClosedBuilder,
  start: Date = new Date('1970-01-01'),
  end: Date = new Date('2061-12-31'),
): YMD[] {
  const startDate = startOfDay(start);
  const endDate = startOfDay(end);
  if (startDate > endDate) throw new Error('start가 end보다 큽니다.');

  const closedCache = new Map<number, Set<YMD>>();
  const openDays: YMD[] = [];

  for (const date of eachDay(startDate, endDate)) {
    if (isWeekend(date)) continue;

    const year = date.getFullYear();
    const closed =
      closedCache.get(year) ??
      (() => {
        const s = buildClosedDays(year);
        closedCache.set(year, s);
        return s;
      })();

    const ymd = formatYMD(date);
    if (!closed.has(ymd)) openDays.push(ymd);
  }

  return openDays;
}

export const listNyseOpenDays = (start?: Date, end?: Date) =>
  listOpenDaysByClosedRules(buildNyseClosedDays, start, end);
export const listKrxOpenDays = (start?: Date, end?: Date) => listOpenDaysByClosedRules(buildKrxClosedDays, start, end);

// =====================
// "First open day" reducers
// =====================

/** 월별 마지막 개장일 */
function pickLastOpenDayOfEachMonth(openDays: YMD[]): YMD[] {
  const result: YMD[] = [];
  let lastMonthKey: string | null = null;
  let lastYmd: YMD | null = null;

  for (const ymd of openDays) {
    const monthKey = ymd.slice(0, 7); // YYYY-MM

    if (lastMonthKey !== null && monthKey !== lastMonthKey) {
      // 월이 바뀌는 순간, 직전 월의 마지막 개장일 확정
      result.push(lastYmd!);
    }

    lastMonthKey = monthKey;
    lastYmd = ymd; // 계속 최신으로 갱신 => 월의 마지막 값
  }

  if (lastYmd) result.push(lastYmd); // 마지막 월 처리
  return result;
}

/** 주별 마지막 개장일 (월요일 시작 주 기준) */
function pickLastOpenDayOfEachWeek(openDays: YMD[]): YMD[] {
  const result: YMD[] = [];
  let lastWeekStart: YMD | null = null;
  let lastYmd: YMD | null = null;

  for (const ymd of openDays) {
    const date = parseYMD(ymd);

    // week start = Monday
    const diffToMon = (date.getDay() + 6) % 7;
    const weekStart = formatYMD(addDays(date, -diffToMon));

    if (lastWeekStart !== null && weekStart !== lastWeekStart) {
      // 주가 바뀌는 순간, 직전 주의 마지막 개장일 확정
      result.push(lastYmd!);
    }

    lastWeekStart = weekStart;
    lastYmd = ymd; // 계속 최신으로 갱신 => 주의 마지막 값
  }

  if (lastYmd) result.push(lastYmd); // 마지막 주 처리
  return result;
}

// =====================
// Final export
// =====================

const DAILY_OPEN_DAYS = {
  KOREA: listKrxOpenDays(),
  OVERSEA: listNyseOpenDays(),
};

export const OPEN_DAYS = {
  D: DAILY_OPEN_DAYS,
  W: {
    KOREA: pickLastOpenDayOfEachWeek(DAILY_OPEN_DAYS.KOREA),
    OVERSEA: pickLastOpenDayOfEachWeek(DAILY_OPEN_DAYS.OVERSEA),
  },
  M: {
    KOREA: pickLastOpenDayOfEachMonth(DAILY_OPEN_DAYS.KOREA),
    OVERSEA: pickLastOpenDayOfEachMonth(DAILY_OPEN_DAYS.OVERSEA),
  },
} as const;
