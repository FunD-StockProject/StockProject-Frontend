const stockHolidays2025: Record<string, string[]> = {
  KOREA: [
    '2025-01-01',
    '2025-01-28',
    '2025-01-29',
    '2025-01-30',
    '2025-03-03',
    '2025-05-01',
    '2025-05-05',
    '2025-05-06',
    '2025-06-06',
    '2025-08-15',
    '2025-10-03',
    '2025-10-06',
    '2025-10-07',
    '2025-10-08',
    '2025-10-09',
    '2025-12-25',
    '2025-12-31',
  ],
  OVERSEA: [
    '2025-01-01',
    '2025-01-20',
    '2025-02-17',
    '2025-04-18',
    '2025-05-26',
    '2025-07-04',
    '2025-09-01',
    '2025-11-27',
    '2025-12-25',
  ],
};

const isHoliday = (date: Date, country: string): boolean => {
  const day = date.getDay();
  const iso = date.toISOString().slice(0, 10);
  return day === 0 || day === 6 || stockHolidays2025[country].includes(iso);
};

export const getBusinessDaysLater = (startDate: Date, days: number, country: string): string => {
  let count = 0;
  const current = new Date(startDate);

  while (count < days) {
    current.setDate(current.getDate() + 1);
    if (!isHoliday(current, country)) {
      count++;
    }
  }

  return `${current.getMonth() + 1}월 ${current.getDate()}일`;
};
