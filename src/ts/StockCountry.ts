export type StockCountryKey = 'KOREA' | 'OVERSEA';

export interface StockCountryData {
  text: string;
  currency: string;
}
export interface StockCountry extends StockCountryData {
  key: StockCountryKey;
}

export const STOCK_COUNTRY_MAP: Record<StockCountryKey, StockCountryData> = {
  KOREA: {
    text: '국내',
    currency: '₩',
  },
  OVERSEA: {
    text: '해외',
    currency: '$',
  },
};

export const STOCK_COUNTRIES: StockCountry[] = [
  { key: 'KOREA', text: '국내', currency: '₩' },
  { key: 'OVERSEA', text: '해외', currency: '$' },
];
