import { StockCountryKey } from './StockCountry';

export interface Pos {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface WordFrequency {
  word: string;
  freq: number;
}

export interface WordCloudItem {
  word: string;
  freq: number;
  fontSize: number;
  pos: Pos;
  size: Size;
  orientation: boolean;
  color: number;
}

export interface ExperimentItem {
  experimentId: number;
  symbolName: string;
  buyPrice: number;
  buyScore: number;
  currentPrice: number;
  currentScore: number;
  autoSellIn: number;
  buyAt: string;
  country: StockCountryKey;
  stockId: number;
  status: string;
}
