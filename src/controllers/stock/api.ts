import { StockCountryKey } from '@ts/StockCountry';
import { StockSectorKey } from '@ts/StockSector';
import { fetchData } from '@controllers/api/base';

export interface AutoCompleteItem {
  stockId: number;
  symbol: string;
  symbolName: string;
  securityName: string;
  exchangeNum: string;
  country: StockCountryKey;
  score: number;
  diff: number;
}

export interface StockInfo {
  stockId: number;
  symbolName: string;
  securityName: string;
  symbol: string;
  exchangeNum: string;
  country: StockCountryKey;
  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
  score: number;
  scoreDiff: number;
  keywords: string[];
}

// GET /stock/{stockId}/info/{country}
export const fetchStockInfo = (stockId: number, country: StockCountryKey): Promise<StockInfo> => {
  return fetchData(`/stock/${stockId}/info/${country}`);
};

// GET /stock/autocomplete?keyword={keyword}
export const fetchAutoCompleteStock = (name: string): Promise<AutoCompleteItem[]> => {
  return fetchData(`/stock/autocomplete?keyword=${name}`);
};

// GET /stock/sector/overseas/{sectorKey}/recommend
// GET /stock/sector/domestic/{sectorKey}/recommend
export const fetchSectorRecommend = (country: StockCountryKey, sectorKey: StockSectorKey): Promise<StockInfo[]> => {
  const countryPath = country == 'KOREA' ? 'domestic' : 'overseas';
  return fetchData(`/stock/sector/${countryPath}/${sectorKey}/recommend`);
};
