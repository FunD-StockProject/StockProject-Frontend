/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷팅합니다.
 * @param _date Date 객체, ISO 문자열, 또는 배열 형태 [year, month, day, hour, minute, second, nano]
 * @returns YYYY.MM.DD 형식의 문자열
 */
export const getFormattedDate = (_date: Date | string | number[]): string => {
  // 배열 형태 [year, month, day, hour, minute, second, nano]인 경우 처리
  if (Array.isArray(_date)) {
    const [year, month, day] = _date;
    return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
  }

  const date = new Date(_date);
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((num) =>
    num.toString().padStart(2, '0'),
  );

  return `${year}.${month}.${day}`;
};

/**
 * 배열 또는 Date/string을 Date 객체로 변환합니다.
 * @param dateInput Date 객체, ISO 문자열, 또는 배열 형태 [year, month, day, hour, minute, second, nano]
 * @returns Date 객체
 */
export const toDate = (dateInput: Date | string | number[]): Date => {
  if (Array.isArray(dateInput)) {
    return new Date(
      dateInput[0],
      dateInput[1] - 1,
      dateInput[2],
      dateInput[3] || 0,
      dateInput[4] || 0,
      dateInput[5] || 0
    );
  }
  return new Date(dateInput);
};
