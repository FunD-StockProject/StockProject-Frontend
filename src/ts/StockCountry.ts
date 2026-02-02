import KoreaFlagPng from '@assets/flags/korea.png';
import OverseaFlagPng from '@assets/flags/oversea.png';

export type StockCountryKey = 'KOREA' | 'OVERSEA';

export interface StockCountryData {
  text: string;
  currency: string;
  currencyText: string;
  img: string;
}
export interface StockCountry extends StockCountryData {
  key: StockCountryKey;
}

export const STOCK_COUNTRY_MAP: Record<StockCountryKey, StockCountryData> = {
  KOREA: {
    text: '국내',
    currency: '₩',
    currencyText: '원',
    img: KoreaFlagPng,
  },
  OVERSEA: {
    text: '해외',
    currency: '$',
    currencyText: '달러',
    img: OverseaFlagPng,
  },
};

export const STOCK_COUNTRIES: StockCountry[] = [
  { key: 'KOREA', text: '국내', currency: '₩', currencyText: '원', img: KoreaFlagPng },
  { key: 'OVERSEA', text: '해외', currency: '$', currencyText: '달러', img: OverseaFlagPng },
];
