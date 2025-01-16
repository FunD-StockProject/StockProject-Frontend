import { STOCK_COUNTRY } from '@ts/Types';

export interface StockInfo {
  stockId: number;
  symbol: string;
  symbolName: string;
  securityName: string;
  exchangeNum: string;
  country: STOCK_COUNTRY;

  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
}

export interface StockScore {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
  keywords: string[];
}

export interface RevelantStockInfo {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
}

export interface StockTableInfo {
  stockId: string;
  symbolName: string;
  country: string;
  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
  score: number;
  scoreDiff: number;
}

export interface IndexInfo {
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
  country: STOCK_COUNTRY;
  value: string;
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
