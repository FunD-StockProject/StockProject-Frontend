export type StockCountryKey = 'KOREA' | 'OVERSEA';

export interface StockCountryData {
  text: string;
}
export interface StockCountry extends StockCountryData {
  key: StockCountryKey;
}

export const STOCK_COUNTRY_MAP: Record<StockCountryKey, StockCountryData> = {
  KOREA: {
    text: '국내',
  },
  OVERSEA: {
    text: '해외',
  },
};

export const STOCK_COUNTRIES: StockCountry[] = [
  { key: 'KOREA', text: '국내' },
  { key: 'OVERSEA', text: '해외' },
];
