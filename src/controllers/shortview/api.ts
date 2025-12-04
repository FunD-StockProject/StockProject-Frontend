import { StockCountryKey } from '@ts/StockCountry';
import { fetchAuthData } from '@controllers/api/base';

//이름 뭐로 하지
export interface ShortViewItem {
  stockId: number;
  imageUrl: string;
  stockName: string;
  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
  score: number;
  diff: number;
  keywords: string[];
  country: StockCountryKey;
}

// GET /shortview
export const fetchShortview = (): Promise<ShortViewItem[]> => fetchAuthData('/shortview');
