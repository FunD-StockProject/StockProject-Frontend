const TZ_KST = 9; // Korea Standard Time UTC+9
const PI = Math.PI;

/* =========================
   Astronomical Lunar Conversion (KST)
   Adapted from common Meeus-based Vietnamese/Chinese lunar algorithms
   ========================= */

function INT(d: number) {
  return Math.floor(d);
}

// Julian day number from date (Gregorian)
function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  return jd;
}

// Date from Julian day number
function jdToDate(jd: number): { dd: number; mm: number; yy: number } {
  let a = jd + 32044;
  let b = INT((4 * a + 3) / 146097);
  let c = a - INT((146097 * b) / 4);
  let d = INT((4 * c + 3) / 1461);
  let e = c - INT((1461 * d) / 4);
  let m = INT((5 * e + 2) / 153);
  let day = e - INT((153 * m + 2) / 5) + 1;
  let month = m + 3 - 12 * INT(m / 10);
  let year = 100 * b + d - 4800 + INT(m / 10);
  return { dd: day, mm: month, yy: year };
}

// True new moon time (Julian day, TT) for k-th new moon since 1900-01-01 13:52 UTC-ish epoch
function NewMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  const M = (359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3) * dr;
  const Mpr = (306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3) * dr;
  const F = (21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3) * dr;

  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M) +
    0.0021 * Math.sin(2 * M) -
    0.4068 * Math.sin(Mpr) +
    0.0161 * Math.sin(2 * Mpr) -
    0.0004 * Math.sin(3 * Mpr) +
    0.0104 * Math.sin(2 * F) -
    0.0051 * Math.sin(M + Mpr) -
    0.0074 * Math.sin(M - Mpr) +
    0.0004 * Math.sin(2 * F + M) -
    0.0004 * Math.sin(2 * F - M) -
    0.0006 * Math.sin(2 * F + Mpr) +
    0.001 * Math.sin(2 * F - Mpr) +
    0.0005 * Math.sin(M + 2 * Mpr);

  let deltaT: number;
  if (T < -11) {
    deltaT = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
  } else {
    deltaT = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }

  return Jd1 + C1 - deltaT;
}

function SunLongitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = (357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2) * dr;
  const L0 = (280.46645 + 36000.76983 * T + 0.0003032 * T2) * dr;
  let DL =
    (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.00029 * Math.sin(3 * M);
  let L = L0 + DL * dr;
  L = L - PI * 2 * INT(L / (PI * 2));
  return L; // radians [0, 2π)
}

function getSunLongitudeDayNumber(jdn: number, timeZone: number): number {
  // Return sector index of sun longitude at local midnight: 0..11 (each 30 degrees)
  return INT((SunLongitude(jdn - 0.5 - timeZone / 24) / PI) * 6);
}

function getNewMoonDay(k: number, timeZone: number): number {
  return INT(NewMoon(k) + 0.5 + timeZone / 24);
}

function getLunarMonth11(yy: number, timeZone: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitudeDayNumber(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
  let k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitudeDayNumber(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitudeDayNumber(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

/**
 * 음력 -> 양력 변환
 * lunarMonth: 1..12
 * lunarDay: 1..30
 * lunarLeap: 0(평달) or 1(윤달)
 */
function lunarToSolar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap: 0 | 1,
  timeZone: number = TZ_KST,
): Date {
  let a11 = getLunarMonth11(lunarYear - 1, timeZone);
  let b11 = getLunarMonth11(lunarYear, timeZone);
  let off = lunarMonth - 11;
  if (off < 0) off += 12;

  let leapOff = 0;
  let leapMonth = 0;
  if (b11 - a11 > 365) {
    leapOff = getLeapMonthOffset(a11, timeZone);
    leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (lunarLeap === 1 && lunarMonth !== leapMonth + 1) {
      throw new Error('윤달 플래그가 맞지 않습니다.');
    }
    if (lunarLeap === 1 || off >= leapOff) {
      off += 1;
    }
  }

  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  const monthStart = getNewMoonDay(k + off, timeZone);
  const { dd, mm, yy } = jdToDate(monthStart + lunarDay - 1);
  return new Date(yy, mm - 1, dd);
}

export default lunarToSolar;
