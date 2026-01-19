import { StockCountryKey } from '@ts/StockCountry';

export interface StockDetailInfo {
  stockId: number;
  symbol: string;
  symbolName: string;
  securityName: string;
  exchangeNum: string;
  country: StockCountryKey;

  price: number;
  priceDiff: number;
  priceDiffPerCent: number;

  score: number;
  scoreDiff: number;
  keywords: string[];
}

export interface StockInfo {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
  keywords?: string[];
}

export interface StockTableInfo {
  stockId: number;
  symbolName: string;
  country: string;
  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
  score: number;
  scoreDiff: number;
}

export interface IndexScoreInfo {
  kospiVix: number;
  kospiVixDiff: number;
  kospiIndex: number;
  kospiIndexDiff: number;
  kosdaqIndex: number;
  kosdaqIndexDiff: number;
  snpVix: number;
  snpVixDiff: number;
  snpIndex: number;
  snpIndexDiff: number;
  nasdaqIndex: number;
  nasdaqIndexDiff: number;
}

export interface PopularItems {
  [key: string]: any;
  value: string;
}

export interface AutoCompleteItem {
  [key: string]: any; // 검색 결과 항목의 동적 키
  symbolName: string;
  keywordNames: string[];
  keyword: string;
  country: StockCountryKey;
  value: string;
}

export interface AutoCompleteStockItem {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
  country: StockCountryKey;
  keywords?: string[];
}

export interface SearchBarResultItems extends PopularItems, AutoCompleteItem {
  value: string;
}

export interface PopularStocks {
  stockId: number;
  symbol: string;
  symbolName: string;
  country: 'KOREA' | 'OVERSEA';
}

export type PERIOD_CODE = 'D' | 'W' | 'M';

// Deprecated types - not used anymore
export interface FavoriteStock {
  stockId: number;
  name: string;
  price: number;
  priceDiffPerCent: number;
  score: number;
  diff: number;
  isNotificationOn: boolean;
  isSelected?: boolean;
  symbolName: string;
  country: StockCountryKey;
}

export interface StockPreferenceStatus {
  isBookmarked: boolean;
  isNotificationOn: boolean;
}
