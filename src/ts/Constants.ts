const KOREA = 'KOREA';
const OVERSEA = 'OVERSEA';

const STOCK_COUNTRY_TYPE: Record<string, string> = {
  KOREA: '국내',
  OVERSEA: '해외',
};

const MARKET_CODES: Record<string, string> = {
  '512': '나스닥',
  '513': '뉴욕',
  '529': '아멕스',
  '001': '코스피',
  '002': '코스닥',
  '003': 'ETF',
};

export { KOREA, OVERSEA, MARKET_CODES, STOCK_COUNTRY_TYPE };
