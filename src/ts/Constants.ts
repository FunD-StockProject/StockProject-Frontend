const STOCK_COUNTRY_TYPE: Record<string, string> = {
  KOREA: '국내',
  OVERSEA: '해외',
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

export { STOCK_UPDATE_TIME, MARKET_CODES, STOCK_COUNTRY_TYPE };
