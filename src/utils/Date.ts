import { DAY_TYPE } from '@ts/Types';

export const formatLocalDateToDate = (localDate: string) => {
  const date = new Date(
    `${localDate.substr(0, 4)}-${localDate.substr(4, 2)}-${localDate.substr(6, 2)}`,
  );
  return date;
};

/// 2024-04-12
export const formatDateISO = (date: Date) => {
  const [day, month, year] = (['getDate', 'getMonth', 'getFullYear'] as const).map((fn) =>
    date[fn](),
  );
  return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

export const getDateLabel = (date: Date, type: DAY_TYPE) => {
  if (type == 'D') return `${date.getDate()}일`;
  else if (type == 'M') return `${date.getMonth() + 1}월`;
  else if (type == 'Y') return `${date.getFullYear()}년`;
};
