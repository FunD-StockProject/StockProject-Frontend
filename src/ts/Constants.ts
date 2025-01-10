import { SEARCH_CATEGORY, STOCK_COUNTRY } from './Types';

const STOCK_COUNTRY_TEXT: Record<STOCK_COUNTRY, string> = {
  KOREA: '국내',
  OVERSEA: '해외',
};

const OPPOSITE_SCOTK_COUNTRY: Record<STOCK_COUNTRY, STOCK_COUNTRY> = {
  KOREA: 'OVERSEA',
  OVERSEA: 'KOREA',
};

const SEARCH_CATEGORY_TEXT: Record<SEARCH_CATEGORY, string> = {
  STOCK: '종목',
  KEYWORD: '키워드',
};

const STOCK_UPDATE_TIME: Record<string, string> = {
  KOREA: '17',
  OVERSEA: '06',
};

const MARKET_CODES: Record<string, string> = {
  '512': '나스닥',
  '513': '뉴욕',
  '529': '아멕스',
  '001': '코스피',
  '002': '코스닥',
  '003': 'ETF',
};

const TEXT_SIZE_ADJUST = {
  chrome: 0.055,
  safari: -0.105,
};

export {
  STOCK_UPDATE_TIME,
  MARKET_CODES,
  STOCK_COUNTRY_TEXT,
  SEARCH_CATEGORY_TEXT,
  OPPOSITE_SCOTK_COUNTRY,
  TEXT_SIZE_ADJUST,
};
