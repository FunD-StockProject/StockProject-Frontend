import test from '@assets/sangsung.svg';

export const fetchIndexScoreMock = [30, -45, 70];
export const fetchKeywordsMock = ['이재명', '더불어민주당', '항공사', '탄소저감', '신용평가', '가스에너지', '원유정제', '조선사', '섬유'];

export const fetchStockTableMock = [
  [
    { logo: test, name: '토닉스 파머슈티컬스 홀딩', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: test, name: '짭삼전자1', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: test, name: '한국가스공사', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: test, name: '신세계 I&C', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: test, name: 'ADVISORSHARES TRUST ADVISORSHARES DORSEY WRIGHT ADR ETF', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: test, name: 'HD현대중공업', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
  [
    { logo: null, name: '삼성전자2', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자2', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: null, name: '삼성전자2', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자2', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: null, name: '삼성전자2', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자2', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
  [
    { logo: null, name: '삼성전자3', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자3', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: null, name: '삼성전자3', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자3', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: null, name: '삼성전자3', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자3', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
  [
    { logo: null, name: '삼성전자4', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자4', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: null, name: '삼성전자4', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자4', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: null, name: '삼성전자4', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: null, name: '짭삼전자4', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
];
export const fetchScoreCardMock = [
  { stockId: 1, symbolName: '삼성전자', score: 81, diff: 18 },
  { stockId: 2, symbolName: '한화솔루션', score: 11, diff: -18 },
  { stockId: 3, symbolName: 'SK하이닉스', score: 32, diff: -7 },
  { stockId: 4, symbolName: '삼성전자', score: 81, diff: 18 },
  { stockId: 5, symbolName: '한화솔루션', score: 11, diff: -18 },
  { stockId: 6, symbolName: 'SK하이닉스', score: 32, diff: -7 },
  { stockId: 7, symbolName: '삼성전자', score: 81, diff: 18 },
  { stockId: 8, symbolName: '한화솔루션', score: 11, diff: -18 },
  { stockId: 9, symbolName: 'SK하이닉스', score: 32, diff: -7 },
];

export const fetchRelevantMock = [
  { stockId: 1, symbolName: '삼성전자', score: 81, diff: 18 },
  { stockId: 2, symbolName: '한화솔루션', score: 11, diff: -18 },
  { stockId: 3, symbolName: 'SK하이닉스', score: 32, diff: -7 },
];

export const fetchSearchSymbolNameMock = {
  stockId: 0,
  symbolName: 'string',
  securityName: 'string',
  symbol: 'string',
  exchangeNum: '512',
  country: 'KOREA',
  price: 0,
  priceDiff: 0,
  priceDiffPerCent: 0,
  priceSign: 0,
};

export const fetchScoreMock = {
  score: 50,
};

export const fetchChartMock = {
  symbol: '005930',
  symbolName: '삼성전자',
  securityName: '삼성전자보통주',
  exchangenum: '001',
  country: 'KOREA',
  priceInfos: [
    {
      localDate: '20241205',
      closePrice: '53700',
      openPrice: '53200',
      highPrice: '54400',
      lowPrice: '53200',
      accumulatedTradingVolume: '23588276',
      accumulatedTradingValue: '1270914173744',
      score: '52',
      diff: '-3',
    },
    {
      localDate: '20241204',
      closePrice: '53100',
      openPrice: '52000',
      highPrice: '53400',
      lowPrice: '52000',
      accumulatedTradingVolume: '29004766',
      accumulatedTradingValue: '1533224160462',
      score: '55',
      diff: '-5',
    },
    {
      localDate: '20241203',
      closePrice: '53600',
      openPrice: '53100',
      highPrice: '54400',
      lowPrice: '53100',
      accumulatedTradingVolume: '23374604',
      accumulatedTradingValue: '1257635151648',
      score: '60',
      diff: '13',
    },
    {
      localDate: '20241004',
      closePrice: '60600',
      openPrice: '61000',
      highPrice: '61700',
      lowPrice: '60500',
      accumulatedTradingVolume: '24247578',
      accumulatedTradingValue: '1480865292580',
      score: null,
      diff: null,
    },
    {
      localDate: '20241002',
      closePrice: '61300',
      openPrice: '60500',
      highPrice: '61900',
      lowPrice: '59900',
      accumulatedTradingVolume: '28473536',
      accumulatedTradingValue: '1737678269615',
      score: null,
      diff: null,
    },
  ],
};

export const fetchSearchWordCloudMock = [
  { word: '에어레인', freq: 94 },
  { word: '전략적', freq: 92 },
  { word: '조', freq: 70 },
  { word: '신규상장', freq: 69 },
  { word: '투자', freq: 53 },
  { word: '독점', freq: 52 },
  { word: '억', freq: 49 },
  { word: '시장', freq: 49 },
  { word: '국내', freq: 49 },
  { word: '유일', freq: 49 },
  { word: '분리막', freq: 48 },
  { word: '삼성전자', freq: 46 },
  { word: '속보', freq: 43 },
  { word: '만주', freq: 37 },
  { word: '독점기술력', freq: 37 },
  { word: '년', freq: 34 },
  { word: '있다', freq: 34 },
  { word: '시총', freq: 33 },
  { word: '대기업군', freq: 32 },
  { word: '한라', freq: 30 },
  { word: '포스코', freq: 30 },
  { word: '등', freq: 28 },
  { word: '최초', freq: 28 },
  { word: '기술력이', freq: 28 },
  { word: '재료', freq: 27 },
  { word: '이런', freq: 26 },
  { word: '기업가치', freq: 26 },
  { word: '높은', freq: 26 },
  { word: '신규상장에어레인', freq: 26 },
  { word: '예상', freq: 25 },
  { word: '이', freq: 25 },
  { word: '일', freq: 25 },
  { word: '현', freq: 25 },
  { word: '자사주', freq: 24 },
  { word: '가지', freq: 24 },
  { word: '대우', freq: 24 },
  { word: '받을', freq: 24 },
  { word: '회사가', freq: 24 },
  { word: '아닌데', freq: 24 },
  { word: '롯데케미칼', freq: 24 },
  { word: '질소', freq: 24 },
  { word: '기체', freq: 24 },
  { word: '지난', freq: 22 },
  { word: '크게', freq: 22 },
  { word: '수', freq: 21 },
  { word: '약', freq: 21 },
  { word: '년간', freq: 18 },
  { word: '이상', freq: 18 },
  { word: '시장의', freq: 17 },
  { word: '주가', freq: 17 },
  { word: '같은', freq: 16 },
  { word: '기술력', freq: 16 },
  { word: '러브콜대기업들신규', freq: 16 },
  { word: '상장한에어레인의', freq: 16 },
  { word: '부각되면서', freq: 16 },
  { word: '주목을', freq: 16 },
  { word: '받고', freq: 16 },
  { word: '상장한에어레인은', freq: 16 },
  { word: '공모가', freq: 16 },
  { word: '만원으로', freq: 16 },
  { word: '확정했으나', freq: 16 },
  { word: '이날', freq: 16 },
  { word: '하락으로', freq: 16 },
  { word: '이어지면서', freq: 16 },
  { word: '가까이', freq: 16 },
  { word: '하락하고', freq: 16 },
  { word: '특히', freq: 15 },
  { word: '세계', freq: 15 },
  { word: '많은', freq: 15 },
  { word: '것으로', freq: 15 },
  { word: '기업', freq: 15 },
  { word: '대기업', freq: 15 },
  { word: '가장', freq: 15 },
  { word: '또', freq: 15 },
  { word: '하는', freq: 14 },
  { word: '현재', freq: 14 },
  { word: '시간이', freq: 14 },
  { word: '배', freq: 14 },
  { word: '최소', freq: 14 },
  { word: '매우', freq: 14 },
  { word: '월', freq: 14 },
  { word: '자체', freq: 14 },
  { word: '데', freq: 14 },
  { word: '평균', freq: 14 },
  { word: '씩', freq: 14 },
  { word: '주식', freq: 13 },
  { word: '진입', freq: 13 },
  { word: '것이', freq: 13 },
  { word: '미쳤다', freq: 13 },
  { word: '폭락', freq: 13 },
  { word: '투자를', freq: 13 },
  { word: '무상소각', freq: 12 },
  { word: '투자신규상장', freq: 12 },
  { word: '천억이상', freq: 12 },
  { word: '독점력대기업투자', freq: 12 },
  { word: '기술력신규상장', freq: 12 },
  { word: '대한민국', freq: 12 },
  { word: '수소', freq: 12 },
  { word: '연료', freq: 12 },
  { word: '러브콜대기업들', freq: 12 },
  { word: '공동', freq: 12 },
  { word: '사업제안', freq: 12 },
  { word: '경쟁에어레인', freq: 12 },
  { word: '월에어레인은', freq: 12 },
  { word: '해당', freq: 12 },
  { word: '기술을', freq: 12 },
  { word: '개발해', freq: 12 },
  { word: '번째로', freq: 12 },
  { word: '양산에', freq: 12 },
  { word: '성공했다', freq: 12 },
  { word: '제조', freq: 12 },
  { word: '공정엔', freq: 12 },
  { word: '필요하고', freq: 12 },
  { word: '기체의', freq: 12 },
  { word: '선택적', freq: 12 },
  { word: '분리를', freq: 12 },
  { word: '위한', freq: 12 },
  { word: '소재', freq: 12 },
  { word: '합성', freq: 12 },
  { word: '기술은', freq: 12 },
  { word: '화학', freq: 12 },
  { word: '분야에서도', freq: 12 },
  { word: '전문성이', freq: 12 },
  { word: '요구되는', freq: 12 },
  { word: '분야다이', freq: 12 },
  { word: '때문에', freq: 12 },
  { word: '제품을', freq: 12 },
  { word: '개발하는', freq: 12 },
  { word: '걸리며', freq: 12 },
  { word: '양산', freq: 12 },
  { word: '단계까지', freq: 12 },
  { word: '진입하는', freq: 12 },
  { word: '어려워', freq: 12 },
  { word: '기술적', freq: 12 },
  { word: '장벽이', freq: 12 },
  { word: '높다는', freq: 12 },
  { word: '평가를', freq: 12 },
  { word: '받는다에어레인은', freq: 12 },
  { word: '연속식', freq: 12 },
  { word: '모듈', freq: 12 },
  { word: '생산시스템을', freq: 12 },
  { word: '도입해', freq: 12 },
  { word: '생산', freq: 12 },
  { word: '경쟁력도', freq: 12 },
  { word: '확보했다', freq: 12 },
  { word: '에어레인은', freq: 12 },
  { word: '롯데케미칼한라포스코', freq: 12 },
  { word: '대기업들로부터', freq: 12 },
  { word: '기술력을', freq: 12 },
  { word: '인정받아', freq: 12 },
  { word: '받기도', freq: 12 },
  { word: '했다에어레인은', freq: 12 },
  { word: '기술경쟁력을', freq: 12 },
  { word: '앞세워', freq: 12 },
  { word: '매출액을', freq: 12 },
  { word: '끌어올리는', freq: 12 },
  { word: '꾸준히', freq: 12 },
  { word: '성장해왔다신규상장', freq: 12 },
  { word: '미친', freq: 12 },
  { word: '회사자사주', freq: 12 },
  { word: '무상소각한다유일', freq: 12 },
  { word: '독점기업', freq: 12 },
  { word: '성장주', freq: 12 },
  { word: '독점주', freq: 12 },
  { word: '다', freq: 11 },
  { word: '일론', freq: 11 },
  { word: '머스크가', freq: 11 },
  { word: '탄소포집', freq: 11 },
  { word: '무상소각한다', freq: 11 },
  { word: '롯데그룹', freq: 11 },
  { word: '한라그룹', freq: 11 },
  { word: '포스코그룹', freq: 11 },
  { word: '그룹', freq: 11 },
  { word: '투자속보', freq: 11 },
  { word: '항상', freq: 11 },
  { word: '아파트', freq: 11 },
  { word: '할', freq: 10 },
  { word: '미국', freq: 10 },
  { word: '주요', freq: 10 },
  { word: '가', freq: 10 },
  { word: '머스크', freq: 10 },
  { word: '청정', freq: 10 },
  { word: '대기', freq: 10 },
  { word: 'ㅎㅎ가치주', freq: 10 },
  { word: '그', freq: 9 },
  { word: '있는', freq: 9 },
  { word: '테슬라', freq: 9 },
  { word: '최대', freq: 9 },
  { word: '러브콜', freq: 9 },
  { word: '폭등해도', freq: 9 },
  { word: '이상하지', freq: 9 },
  { word: '않을', freq: 9 },
  { word: '대기업들', freq: 9 },
  { word: '투자에어레인', freq: 9 },
  { word: '주식과', freq: 9 },
  { word: '절대', freq: 8 },
  { word: '돈을', freq: 8 },
  { word: '한', freq: 8 },
  { word: '원', freq: 8 },
  { word: '위해', freq: 8 },
  { word: '크레딧', freq: 8 },
  { word: '투자해야', freq: 8 },
  { word: '달러', freq: 8 },
  { word: '더', freq: 7 },
  { word: '경제', freq: 7 },
  { word: '트럼프', freq: 7 },
  { word: '대', freq: 7 },
  { word: '만큼', freq: 7 },
  { word: '도지코인', freq: 7 },
  { word: '본다', freq: 7 },
  { word: '알루미늄', freq: 7 },
  { word: '지분', freq: 7 },
  { word: '유럽', freq: 7 },
  { word: '수출', freq: 7 },
  { word: '뉴스뉴스', freq: 7 },
  { word: '아파트는', freq: 7 },
  { word: '달러를', freq: 7 },
  { word: '매수', freq: 6 },
  { word: '것', freq: 6 },
  { word: '쌍용건설', freq: 6 },
  { word: 'ㅋㅋㅋ', freq: 6 },
  { word: '전', freq: 6 },
  { word: '될', freq: 6 },
  { word: '폭등', freq: 6 },
  { word: '에', freq: 6 },
  { word: '제도를', freq: 6 },
  { word: '탄소중립에', freq: 6 },
  { word: '기여조', freq: 6 },
  { word: '삼성', freq: 6 },
  { word: '현대', freq: 6 },
  { word: '롯데', freq: 6 },
  { word: '사업', freq: 6 },
  { word: '프랑스시총', freq: 6 },
  { word: '예금', freq: 6 },
  { word: '따라', freq: 6 },
  { word: '하면', freq: 5 },
  { word: '좀', freq: 5 },
  { word: '내주', freq: 5 },
  { word: '복원', freq: 5 },
  { word: '계획', freq: 5 },
  { word: '관한', freq: 5 },
  { word: '다음주', freq: 5 },
  { word: '계획을', freq: 5 },
  { word: '것이라며', freq: 5 },
  { word: '오늘', freq: 5 },
  { word: '가자', freq: 5 },
  { word: '확보', freq: 5 },
  { word: '가능성이', freq: 5 },
  { word: '뉴스', freq: 5 },
  { word: '만', freq: 5 },
  { word: '테슬라가', freq: 5 },
  { word: 'ㅎㅎ', freq: 5 },
  { word: '콘트롤암을', freq: 5 },
  { word: '테슬라에', freq: 5 },
  { word: '공급하고', freq: 5 },
  { word: '하고', freq: 5 },
  { word: '순환', freq: 5 },
  { word: '거의', freq: 5 },
  { word: '투자에', freq: 5 },
  { word: '즉', freq: 5 },
  { word: '투자순서가', freq: 5 },
  { word: '완전히', freq: 5 },
  { word: '책', freq: 5 },
  { word: '제일', freq: 4 },
  { word: '주식으로', freq: 4 },
  { word: '못', freq: 4 },
  { word: '젤렌스키', freq: 4 },
  { word: '종전안이', freq: 4 },
  { word: '아닌', freq: 4 },
  { word: '전후재건등우크라이나의', freq: 4 },
  { word: '지속가능성에', freq: 4 },
  { word: '구상이다', freq: 4 },
  { word: '그는', freq: 4 },
  { word: '제시할', freq: 4 },
  { word: '각', freq: 4 },
  { word: '사항에', freq: 4 },
  { word: '대해우크라이나시민사회와', freq: 4 },
  { word: '합리적인', freq: 4 },
  { word: '아이디어를', freq: 4 },
  { word: '추가할', freq: 4 },
  { word: '의향이', freq: 4 },
  { word: '잘', freq: 4 },
  { word: '해야', freq: 4 },
  { word: '제가', freq: 4 },
  { word: '로', freq: 4 },
  { word: '프로', freq: 4 },
  { word: '희귀유전질환', freq: 4 },
  { word: '관련', freq: 4 },
  { word: '등록', freq: 4 },
  { word: '특허는', freq: 4 },
  { word: '건을', freq: 4 },
  { word: '기술', freq: 4 },
  { word: '배터리', freq: 4 },
  { word: '절대적', freq: 4 },
  { word: '정부', freq: 4 },
  { word: '이미', freq: 4 },
  { word: '새로운', freq: 4 },
  { word: '않은', freq: 4 },
  { word: '통해', freq: 4 },
  { word: '씨티알모빌리티는', freq: 4 },
  { word: '연방', freq: 4 },
  { word: '자동차', freq: 4 },
  { word: '한다', freq: 4 },
  { word: '전조회수', freq: 4 },
  { word: '수혜', freq: 4 },
  { word: '대통령이', freq: 4 },
  { word: '백악관을', freq: 4 },
  { word: '차지하게', freq: 4 },
  { word: '된', freq: 4 },
  { word: '유지시키기', freq: 4 },
  { word: '전방위로', freq: 4 },
  { word: '영향력을', freq: 4 },
  { word: '행사할', freq: 4 },
  { word: '비상', freq: 4 },
  { word: '모든', freq: 4 },
  { word: '폭락한다이것이', freq: 4 },
  { word: '반복성을', freq: 4 },
  { word: '재테크', freq: 4 },
  { word: '투자순서를', freq: 4 },
  { word: '않으면', freq: 4 },
  { word: '망하는', freq: 4 },
  { word: '아파트를', freq: 4 },
  { word: '팔고', freq: 4 },
  { word: '꼭', freq: 4 },
  { word: '투자가', freq: 4 },
  { word: '미국인은', freq: 4 },
  { word: '달러와의', freq: 4 },
  { word: '누구나', freq: 4 },
  { word: '글로벌에픽분', freq: 4 },
  { word: '전에어레인', freq: 4 },
  { word: '설립괸에어레인은', freq: 4 },
  { word: '기체분리막', freq: 4 },
  { word: '솔루션', freq: 4 },
  { word: '전문', freq: 4 },
  { word: '기업이다', freq: 4 },
  { word: '제품은', freq: 4 },
  { word: '기', freq: 4 },
  { word: '좋으시죠', freq: 3 },
  { word: '년전', freq: 3 },
  { word: '분의', freq: 3 },
  { word: '말', freq: 3 },
  { word: '미국의', freq: 3 },
  { word: '절반', freq: 3 },
  { word: '주는', freq: 3 },
  { word: '이후', freq: 3 },
  { word: '갈', freq: 3 },
  { word: '법도', freq: 3 },
  { word: '모조리', freq: 3 },
  { word: '인디에프속보', freq: 3 },
  { word: '빠르게', freq: 3 },
  { word: '발표', freq: 3 },
  { word: '다산', freq: 3 },
  { word: '미리', freq: 3 },
  { word: '시초가', freq: 3 },
  { word: '이유가', freq: 3 },
  { word: '두고', freq: 3 },
  { word: '하지', freq: 3 },
  { word: '전체', freq: 3 },
  { word: '보유', freq: 3 },
  { word: '폭락이라', freq: 3 },
  { word: '만원씩', freq: 3 },
  { word: '갑자기', freq: 3 },
  { word: '실적', freq: 3 },
  { word: '대비', freq: 3 },
  { word: '포인트', freq: 3 },
  { word: '나', freq: 3 },
  { word: '것은', freq: 3 },
  { word: '비트코인', freq: 3 },
  { word: '머스크는', freq: 3 },
  { word: '가격이', freq: 3 },
  { word: '것을', freq: 3 },
  { word: '머스크를', freq: 3 },
  { word: '도지', freq: 3 },
  { word: 'ㅋ', freq: 3 },
  { word: '달러가', freq: 3 },
  { word: '업비트', freq: 3 },
  { word: '빗썸', freq: 3 },
  { word: '거래대금', freq: 3 },
  { word: '티사이언티픽', freq: 3 },
  { word: '만동영상문서', freq: 3 },
  { word: '자본', freq: 3 },
  { word: '살펴야', freq: 3 },
  { word: '최고의', freq: 3 },
  { word: '블룸버그', freq: 3 },
  { word: '러브콜속보', freq: 3 },
  { word: '이게', freq: 3 },
  { word: '정상인가', freq: 3 },
  { word: '짜리다단독', freq: 3 },
  { word: '생존', freq: 3 },
  { word: '투자시가총액', freq: 3 },
  { word: '블룸버그강희종기자입력', freq: 3 },
  { word: '우리나라가', freq: 3 },
  { word: '년까지', freq: 3 },
  { word: '탄소중립을', freq: 3 },
  { word: '달성하기', freq: 3 },
  { word: '위해서는', freq: 3 },
  { word: '탄소포집저장', freq: 3 },
  { word: '기술이', freq: 3 },
  { word: '기여해야', freq: 3 },
  { word: '분석됐다', freq: 3 },
  { word: '전체적으로는', freq: 3 },
  { word: '조억달러약', freq: 3 },
  { word: '조원의', freq: 3 },
  { word: '자본을', freq: 3 },
  { word: '투입해야', freq: 3 },
  { word: '나타났다에어레인', freq: 3 },
  { word: '러브콜단독', freq: 3 },
  { word: '사람은', freq: 3 },
  { word: '대상', freq: 3 },
  { word: '출발해야', freq: 3 },
  { word: '하며', freq: 3 },
  { word: '사야', freq: 3 },
  { word: '장기투자를', freq: 3 },
  { word: '이상을', freq: 3 },
  { word: '맞춰', freq: 3 },
  { word: '그냥', freq: 3 },
  { word: '보유하면', freq: 3 },
  { word: '따라서', freq: 3 },
  { word: '순환투자해야', freq: 3 },
  { word: '의', freq: 3 },
  { word: '국채를', freq: 3 },
  { word: '투자법이다', freq: 3 },
  { word: '배가', freq: 3 },
  { word: '평생', freq: 3 },
  { word: '주식부자로', freq: 3 },
  { word: '키우는', freq: 3 },
  { word: '전쟁이', freq: 3 },
  { word: '사옥까지', freq: 3 },
  { word: '팔아서', freq: 3 },
  { word: '조를', freq: 3 },
  { word: '부자가', freq: 3 },
  { word: '내용', freq: 2 },
  { word: '존나', freq: 2 },
  { word: '가능', freq: 2 },
  { word: '유지', freq: 2 },
  { word: '삼성전자는', freq: 2 },
  { word: '조원', freq: 2 },
  { word: '해', freq: 2 },
  { word: '올해', freq: 2 },
  { word: '만원', freq: 2 },
  { word: '모두', freq: 2 },
  { word: '말고', freq: 2 },
  { word: '너무', freq: 2 },
  { word: '번', freq: 2 },
  { word: '언제까지', freq: 2 },
  { word: '어저구', freq: 2 },
  { word: '저저구', freq: 2 },
  { word: '가격을', freq: 2 },
  { word: '빨리', freq: 2 },
  { word: '골로', freq: 2 },
  { word: '실물', freq: 2 },
  { word: '제', freq: 2 },
  { word: '주가가', freq: 2 },
  { word: '조용히', freq: 2 },
  { word: '을', freq: 2 },
  { word: '현재의', freq: 2 },
  { word: '한국이', freq: 2 },
  { word: '잘난', freq: 2 },
  { word: '우크라이나', freq: 2 },
  { word: '재건', freq: 2 },
  { word: '진행중', freq: 2 },
  { word: '발표이것은', freq: 2 },
  { word: '지수', freq: 2 },
  { word: '미친듯', freq: 2 },
  { word: '소리질러', freq: 2 },
  { word: '입증하는것이다', freq: 2 },
  { word: '사기범에', freq: 2 },
  { word: '청년을', freq: 2 },
  { word: '봅니다', freq: 2 },
  { word: '억원', freq: 2 },
  { word: '이번', freq: 2 },
  { word: '를', freq: 2 },
  { word: '결국은', freq: 2 },
  { word: '까지', freq: 2 },
  { word: '둘째주', freq: 2 },
  { word: '보내드리겠습니다', freq: 2 },
  { word: '몰라도', freq: 2 },
  { word: '텐버거성우', freq: 2 },
  { word: '엔솔', freq: 2 },
  { word: '스페이스', freq: 2 },
  { word: '리비안', freq: 2 },
  { word: '벤츠', freq: 2 },
  { word: '성장', freq: 2 },
  { word: '에너지', freq: 2 },
  { word: '안정조치', freq: 2 },
  { word: '선물', freq: 2 },
  { word: '이마트', freq: 2 },
  { word: '시', freq: 2 },
  { word: '원으로', freq: 2 },
  { word: '넘는', freq: 2 },
  { word: '주식만', freq: 2 },
  { word: '시총은', freq: 2 },
  { word: '도지코인의', freq: 2 },
  { word: '도지코인이', freq: 2 },
  { word: '했다', freq: 2 },
  { word: '들고', freq: 2 },
  { word: '트윗을', freq: 2 },
  { word: '머스크의', freq: 2 },
  { word: '순간', freq: 2 },
  { word: '당시', freq: 2 },
  { word: '기어이', freq: 2 },
  { word: '다시', freq: 2 },
  { word: '돌파', freq: 2 },
  { word: '알려졌다정부효율부는', freq: 2 },
  { word: '당선인이', freq: 2 },
  { word: '전체의', freq: 2 },
  { word: '재정', freq: 2 },
  { word: '및', freq: 2 },
  { word: '성과에', freq: 2 },
  { word: '대한', freq: 2 },
  { word: '감사를', freq: 2 },
  { word: '수행하고', freq: 2 },
  { word: '과감한', freq: 2 },
  { word: '개혁', freq: 2 },
  { word: '권고안을', freq: 2 },
  { word: '제시하기', freq: 2 },
  { word: '만든다고', freq: 2 },
  { word: '밝혔던', freq: 2 },
  { word: '조직이다', freq: 2 },
  { word: '뉴욕에서', freq: 2 },
  { word: '열린', freq: 2 },
  { word: '당선인', freq: 2 },
  { word: '선거', freq: 2 },
  { word: '유세', freq: 2 },
  { word: '연설에서', freq: 2 },
  { word: '정부효율부를', freq: 2 },
  { word: '예산에서', freq: 2 },
  { word: '달러약', freq: 2 },
  { word: '조원를', freq: 2 },
  { word: '아낄', freq: 2 },
  { word: '있다고', freq: 2 },
  { word: '말했다한편', freq: 2 },
  { word: '알려졌다', freq: 2 },
  { word: '콘트롤암은', freq: 2 },
  { word: '본체와', freq: 2 },
  { word: '바퀴를', freq: 2 },
  { word: '연결하는', freq: 2 },
  { word: '부품으로', freq: 2 },
  { word: '씨티알모빌리티가', freq: 2 },
  { word: '개발했다시가총액', freq: 2 },
  { word: '억대', freq: 2 },
  { word: '편입시켜라', freq: 2 },
  { word: '지분배', freq: 2 },
  { word: '공식일', freq: 2 },
  { word: '가능성', freq: 2 },
  { word: 'ㅋㅋ', freq: 2 },
  { word: '종합지수', freq: 2 },
  { word: '삼전', freq: 2 },
  { word: '되고', freq: 2 },
  { word: '아무', freq: 2 },
  { word: '저점', freq: 2 },
  { word: '거울아', freq: 2 },
  { word: '증시부양책', freq: 2 },
  { word: '에어레인트럼프', freq: 2 },
  { word: '효과', freq: 2 },
  { word: '상승', freq: 2 },
  { word: '날개', freq: 2 },
  { word: '월가가', freq: 2 },
  { word: '기대하는', freq: 2 },
  { word: '건', freq: 2 },
  { word: '이른바', freq: 2 },
  { word: '크레딧도', freq: 2 },
  { word: '노리는', freq: 2 },
  { word: '대선', freq: 2 },
  { word: '수혜다', freq: 2 },
  { word: '환경보호청과', freq: 2 },
  { word: '캘리포니아', freq: 2 },
  { word: '업계에', freq: 2 },
  { word: '특정', freq: 2 },
  { word: '수준의', freq: 2 },
  { word: '탄소', freq: 2 },
  { word: '배출', freq: 2 },
  { word: '제한을', freq: 2 },
  { word: '이를', freq: 2 },
  { word: '준수하거나', freq: 2 },
  { word: '기준치를', freq: 2 },
  { word: '넘어서는', freq: 2 },
  { word: '테슬라를', freq: 2 },
  { word: '포함한', freq: 2 },
  { word: '전기차', freq: 2 },
  { word: '업체로부터', freq: 2 },
  { word: '크레딧을', freq: 2 },
  { word: '매입하도록', freq: 2 },
  { word: '있다미국', freq: 2 },
  { word: '언론들은', freq: 2 },
  { word: '유지하도록', freq: 2 },
  { word: '사활을', freq: 2 },
  { word: '걸', freq: 2 },
  { word: '예상한다', freq: 2 },
  { word: '분기', freq: 2 },
  { word: '판매로', freq: 2 },
  { word: '벌어들인', freq: 2 },
  { word: '이익은', freq: 2 },
  { word: '억만달러에', freq: 2 },
  { word: '달했다', freq: 2 },
  { word: '이는', freq: 2 },
  { word: '순이익의', freq: 2 },
  { word: '해당한다지난', freq: 2 },
  { word: '호조를', freq: 2 },
  { word: '지속', freq: 2 },
  { word: '자산가', freq: 2 },
  { word: '대열에', freq: 2 },
  { word: '올려', freq: 2 },
  { word: '놓은', freq: 2 },
  { word: '데는', freq: 2 },
  { word: '판매가', freq: 2 },
  { word: '기여했다트럼프', freq: 2 },
  { word: '점쳐진다', freq: 2 },
  { word: 'ㅎㅎ트럼프', freq: 2 },
  { word: '점쳐진다가치주', freq: 2 },
  { word: '돈', freq: 2 },
  { word: '전담조직', freq: 2 },
  { word: '출범', freq: 2 },
  { word: '이재용', freq: 2 },
  { word: '최태원', freq: 2 },
  { word: '정의선', freq: 2 },
  { word: '탄소중립', freq: 2 },
  { word: '감축', freq: 2 },
  { word: '년부터', freq: 2 },
  { word: '지금처럼', freq: 2 },
  { word: '달러가오르면', freq: 2 },
  { word: '다이아몬드달러투자법이다달러투자만으로', freq: 2 },
  { word: '단기간에', freq: 2 },
  { word: '재산을', freq: 2 },
  { word: '불릴수', freq: 2 },
  { word: '있다재테크', freq: 2 },
  { word: '경력이', freq: 2 },
  { word: '년이', freq: 2 },
  { word: '넘은', freq: 2 },
  { word: '전직', freq: 2 },
  { word: '방송', freq: 2 },
  { word: '프로듀서가그의', freq: 2 },
  { word: '경험과', freq: 2 },
  { word: '이론을', freq: 2 },
  { word: '총', freq: 2 },
  { word: '정리한', freq: 2 },
  { word: '시각의', freq: 2 },
  { word: '책이다세상이', freq: 2 },
  { word: '몰랐던', freq: 2 },
  { word: '이론이다하나도', freq: 2 },
  { word: '과장하거나', freq: 2 },
  { word: '숨기지', freq: 2 },
  { word: '투자비법이다', freq: 2 },
  { word: '라는', freq: 2 },
  { word: '주식연구투자가는주가의', freq: 2 },
  { word: '움직임에서', freq: 2 },
  { word: '찾아', freq: 2 },
  { word: '그져', freq: 2 },
  { word: '먹기를', freq: 2 },
  { word: '원했지만', freq: 2 },
  { word: '주가의', freq: 2 },
  { word: '찾았다만약', freq: 2 },
  { word: '사이클반복성이', freq: 2 },
  { word: '있다면', freq: 2 },
  { word: '주식에서', freq: 2 },
  { word: '실패하는', freq: 2 },
  { word: '없게', freq: 2 },
  { word: '된다당연히', freq: 2 },
  { word: '사람의', freq: 2 },
  { word: '소망은', freq: 2 },
  { word: '꿈으로', freq: 2 },
  { word: '끝났다사람들이', freq: 2 },
  { word: '대상으로', freq: 2 },
  { word: '삼을', freq: 2 },
  { word: '자산은', freq: 2 },
  { word: '주식아파트달러예금국채', freq: 2 },
  { word: '뿐이다가끔', freq: 2 },
  { word: '금', freq: 2 },
  { word: '은', freq: 2 },
  { word: '원자재를', freq: 2 },
  { word: '들먹이는', freq: 2 },
  { word: '사람도', freq: 2 },
  { word: '있으나', freq: 2 },
  { word: '이들은', freq: 2 },
  { word: '곁다리', freq: 2 },
  { word: '투자수단에', freq: 2 },
  { word: '불과하다는', freq: 2 },
  { word: '알게된다저자는', freq: 2 },
  { word: '하워드', freq: 2 },
  { word: '막스와', freq: 2 },
  { word: '달리주가가', freq: 2 },
  { word: '아니라', freq: 2 },
  { word: '이들', freq: 2 },
  { word: '자산간에는', freq: 2 },
  { word: '존재하는일정한', freq: 2 },
  { word: '사이클이항상존재함을', freq: 2 },
  { word: '찾아냈다주식아파트', freq: 2 },
  { word: '국채는', freq: 2 },
  { word: '가격에서는', freq: 2 },
  { word: '규칙성을', freq: 2 },
  { word: '찾을', freq: 2 },
  { word: '없고투자순서상으로는', freq: 2 },
  { word: '반드시', freq: 2 },
  { word: '따라야', freq: 2 },
  { word: '순서가', freq: 2 },
  { word: '있음을', freq: 2 },
  { word: '알아냈다이', freq: 2 },
  { word: '따르지', freq: 2 },
  { word: '실패함을', freq: 2 },
  { word: '알', freq: 2 },
  { word: '있다사람들은', freq: 2 },
  { word: '주가는', freq: 2 },
  { word: '반복된다면서', freq: 2 },
  { word: '그래프를', freq: 2 },
  { word: '시세예측에', freq: 2 },
  { word: '사용하지만', freq: 2 },
  { word: '맞는', freq: 2 },
  { word: '경우는', freq: 2 },
  { word: '없다당연한', freq: 2 },
  { word: '얘기다', freq: 2 },
  { word: '들이', freq: 2 },
  { word: '결국에는', freq: 2 },
  { word: '이것이다주가', freq: 2 },
  { word: '달러가격예금국채', freq: 2 },
  { word: '가격에는', freq: 2 },
  { word: '반복성이', freq: 2 },
  { word: '없다그러나저자는투자대상', freq: 2 },
  { word: '자산', freq: 2 },
  { word: '국채간에는항상', freq: 2 },
  { word: '같은매매순서를', freq: 2 },
  { word: '지켜야', freq: 2 },
  { word: '존재함을', freq: 2 },
  { word: '알아', freq: 2 },
  { word: '냈다즉', freq: 2 },
  { word: '재테크를', freq: 2 },
  { word: '시작할', freq: 2 },
  { word: '때에는', freq: 2 },
  { word: '일정기간', freq: 2 },
  { word: '후에는', freq: 2 },
  { word: '사야하고', freq: 2 },
  { word: '후꼭대기에서', freq: 2 },
  { word: '한다이', freq: 2 },
  { word: '후', freq: 2 },
  { word: '정기예금에', freq: 2 },
  { word: '가입했다가마지막으로', freq: 2 },
  { word: '국채에', freq: 2 },
  { word: '투자해야만', freq: 2 },
  { word: '한다이것이', freq: 2 },
  { word: '자산사이클', freq: 2 },
  { word: '이다이것이', freq: 2 },
  { word: '주식아파트달러예금국채중', freq: 2 },
  { word: '자산에만장기투자하면누구나', freq: 2 },
  { word: '이유이다절대로', freq: 2 },
  { word: '자산에만', freq: 2 },
  { word: '장기투자하지', freq: 2 },
  { word: '말라그래도', freq: 2 },
  { word: '싶다면최소', freq: 2 },
  { word: '자산에', freq: 2 },
  { word: '손해는', freq: 2 },
  { word: '적게', freq: 2 },
  { word: '보거나', freq: 2 },
  { word: '이익이', freq: 2 },
  { word: '되는', freq: 2 },
  { word: '된다이렇게', freq: 2 },
  { word: '에셋사이클에', freq: 2 },
  { word: '자산간에', freq: 2 },
  { word: '투자하지', freq: 2 },
  { word: '투자자산을', freq: 2 },
  { word: '가까이로', freq: 2 },
  { word: '폭락하게', freq: 2 },
  { word: '된다우리가', freq: 2 },
  { word: '수없이', freq: 2 },
  { word: '봐온', freq: 2 },
  { word: '가격', freq: 2 },
  { word: '폭락현상이', freq: 2 },
  { word: '이것이다이중', freq: 2 },
  { word: '교체', freq: 2 },
  { word: '필요없으므로', freq: 2 },
  { word: '재산을다른', freq: 2 },
  { word: '나라의', freq: 2 },
  { word: '투자자', freq: 2 },
  { word: '모두는', freq: 2 },
  { word: '재산의', freq: 2 },
  { word: '순환순서를', freq: 2 },
  { word: '차례대로', freq: 2 },
  { word: '한다는', freq: 2 },
  { word: '법칙이', freq: 2 },
  { word: '성립한다이것이미국식', freq: 2 },
  { word: '주식투자와', freq: 2 },
  { word: '비미국식', freq: 2 },
  { word: '주식투자가', freq: 2 },
  { word: '달라야', freq: 2 },
  { word: '이유이다즉', freq: 2 },
  { word: '미국인과', freq: 2 },
  { word: '달라져야한다어디', freq: 2 },
  { word: '사느냐에', freq: 2 },
  { word: '투자기법이', freq: 2 },
  { word: '달라지는', freq: 2 },
  { word: '것이다바로', freq: 2 },
  { word: '교체투자', freq: 2 },
  { word: '자리에서', freq: 2 },
  { word: '배의', freq: 2 },
  { word: '수익이', freq: 2 },
  { word: '발생한다급등한', freq: 2 },
  { word: '아파트와', freq: 2 },
  { word: '팔자마자', freq: 2 },
  { word: '돈으로', freq: 2 },
  { word: '샀다가', freq: 2 },
  { word: '일정', freq: 2 },
  { word: '싯점에', freq: 2 },
  { word: '달러플', freq: 2 },
  { word: '팔기만', freq: 2 },
  { word: '해도', freq: 2 },
  { word: '그자리에서', freq: 2 },
  { word: '남는다책', freq: 2 },
  { word: '설명대로', freq: 2 },
  { word: '약간의', freq: 2 },
  { word: '기교를', freq: 2 },
  { word: '부리면수익이', freq: 2 },
  { word: '기적처럼', freq: 2 },
  { word: '달라진다그래서', freq: 2 },
  { word: '제목이', freq: 2 },
  { word: '핀테크', freq: 2 },
  { word: '수익난다대', freq: 2 },
  { word: '자산시장', freq: 2 },
  { word: '하나를', freq: 2 },
  { word: '통해주식아파트달러스왑예금국채', freq: 2 },
  { word: '투자요령을', freq: 2 },
  { word: '한꺼번에', freq: 2 },
  { word: '익히고', freq: 2 },
  { word: '이해할', freq: 2 },
  { word: '있다지금처럼', freq: 2 },
  { word: '오르면', freq: 2 },
  { word: '달러상승율과', freq: 2 },
  { word: '아파트의', freq: 2 },
  { word: '하락율마져도', freq: 2 },
  { word: '같아야', freq: 2 },
  { word: '법칙이다이것은', freq: 2 },
  { word: '공식이다한국인은', freq: 2 },
  { word: '한국의', freq: 2 },
  { word: '때', freq: 2 },
  { word: '경험', freq: 2 },
  { word: '바', freq: 2 },
  { word: '있다그동안', freq: 2 },
  { word: '대세상승시', freq: 2 },
  { word: '벌었다가대세하락만', freq: 2 },
  { word: '하면돈을', freq: 2 },
  { word: '토해놓은', freq: 2 },
  { word: '경험들이', freq: 2 },
  { word: '누구에게나', freq: 2 },
  { word: '있을', freq: 2 },
  { word: '것이다인간들의', freq: 2 },
  { word: '욕심은', freq: 2 },
  { word: '영원히', freq: 2 },
  { word: '변하지', freq: 2 },
  { word: '않으므로세월이', freq: 2 },
  { word: '아무리', freq: 2 },
  { word: '흘러도', freq: 2 },
  { word: '재산', freq: 2 },
  { word: '순환투자접', freq: 2 },
  { word: '즉펜타곤', freq: 2 },
  { word: '투자법은', freq: 2 },
  { word: '변할', freq: 2 },
  { word: '없다즉달러스와핑을', freq: 2 },
  { word: '안하면', freq: 2 },
  { word: '재산은', freq: 2 },
  { word: '차이가', freq: 2 },
  { word: '난다부록으로', freq: 2 },
  { word: '달러평균법에', freq: 2 },
  { word: '의한', freq: 2 },
  { word: '이후에도', freq: 2 },
  { word: '성공하는', freq: 2 },
  { word: '법과자녀를', freq: 2 },
  { word: '소개한다이', freq: 2 },
  { word: '책은', freq: 2 },
  { word: '아마존', freq: 2 },
  { word: '에서', freq: 2 },
  { word: '영어로', freq: 2 },
  { word: '판매', freq: 2 },
  { word: '중이기도', freq: 2 },
  { word: '하다', freq: 2 },
  { word: '큰', freq: 2 },
  { word: '중국', freq: 2 },
  { word: '말아야', freq: 2 },
  { word: '주식도', freq: 2 },
  { word: '월장은', freq: 2 },
  { word: '받아서', freq: 2 },
  { word: '집사는', freq: 2 },
  { word: '시간', freq: 2 },
  { word: '대기중인', freq: 2 },
  { word: '투자할', freq: 2 },
  { word: '곳이', freq: 2 },
  { word: '일본의', freq: 2 },
  { word: '처럼', freq: 2 },
  { word: '자산가격의', freq: 2 },
  { word: '본격적으로', freq: 2 },
  { word: '폭락하는', freq: 2 },
  { word: '이유를', freq: 2 },
  { word: '달러도', freq: 2 },
  { word: '중으로', freq: 2 },
  { word: '알아야', freq: 2 },
  { word: '롱텀디플레이션', freq: 2 },
  { word: '전문가는', freq: 2 },
  { word: '채권투자', freq: 2 },
  { word: '전문가들의', freq: 2 },
  { word: '국채의', freq: 2 },
  { word: '매', freq: 2 },
  { word: '망한', freq: 2 },
  { word: '월급을', freq: 2 },
  { word: '내수주도', freq: 1 },
  { word: '좋고', freq: 1 },
  { word: '쓰레기장미대선이', freq: 1 },
  { word: '끝나면', freq: 1 },
  { word: '한국시장은', freq: 1 },
  { word: '늘', freq: 1 },
  { word: '버림', freq: 1 },
  { word: '받은건', freq: 1 },
  { word: '알고덜', freq: 1 },
  { word: '있것지', freq: 1 },
  { word: '한국시장에서', freq: 1 },
  { word: '기대', freq: 1 },
  { word: '바가', freq: 1 },
  { word: '전혀', freq: 1 },
  { word: '없다잉ㅠㅜ주르륵ㅡㅜ찔찔찔', freq: 1 },
  { word: '안해도', freq: 1 },
  { word: '대는걸', freq: 1 },
  { word: '고객에게서', freq: 1 },
  { word: '정보르ㄹ', freq: 1 },
  { word: '빼가는', freq: 1 },
  { word: '거자나', freq: 1 },
  { word: '아무도', freq: 1 },
  { word: '모르는데', freq: 1 },
  { word: '가서', freq: 1 },
  { word: '흉을', freq: 1 },
  { word: '봐야지뉴스도', freq: 1 },
  { word: '참나', freq: 1 },
  { word: '요상한걸', freq: 1 },
  { word: '뉴스에내가', freq: 1 },
  { word: '바지에', freq: 1 },
  { word: '오줌싼건', freq: 1 },
  { word: '뉴스꺼리도', freq: 1 },
  { word: '안대것지', freq: 1 },
  { word: '밧때리가', freq: 1 },
  { word: '미국에게', freq: 1 },
  { word: '치명적', freq: 1 },
  { word: '결과를', freq: 1 },
  { word: '줄뻔', freq: 1 },
  { word: '했다한국의ㅏ', freq: 1 },
  { word: '빠때리를', freq: 1 },
  { word: '솎아내기', freq: 1 },
  { word: '시작', freq: 1 },
  { word: '방송에서', freq: 1 },
  { word: '밧때리', freq: 1 },
  { word: '바이오', freq: 1 },
  { word: '반도체', freq: 1 },
  { word: '몰이만', freq: 1 },
  { word: '해대서쳐물린', freq: 1 },
  { word: '종목만', freq: 1 },
  { word: '무너진다고', freq: 1 },
  { word: '아우성이네', freq: 1 },
  { word: 'ㅋㅋㅋ섬유', freq: 1 },
  { word: '증권', freq: 1 },
  { word: '건설', freq: 1 },
  { word: '철강', freq: 1 },
  { word: '대부분', freq: 1 },
  { word: '갠찮은', freq: 1 },
  { word: '실적이다잉', freq: 1 },
  { word: '개똥전자를', freq: 1 },
  { word: '일년내내', freq: 1 },
  { word: '너덜', freq: 1 },
  { word: '끼리만', freq: 1 },
  { word: '매매해라', freq: 1 },
  { word: '포근함', freq: 1 },
  { word: '시키고', freq: 1 },
  { word: '세월을이겨내는거', freq: 1 },
  { word: '말고는', freq: 1 },
  { word: '다른선택이', freq: 1 },
  { word: '없을거라', freq: 1 },
  { word: '보겠데이', freq: 1 },
  { word: '연계도', freq: 1 },
  { word: '복잡하게', freq: 1 },
  { word: '누가쓰것노', freq: 1 },
  { word: '미국에', freq: 1 },
  { word: '대적할', freq: 1 },
  { word: '국가는', freq: 1 },
  { word: '없다충분히', freq: 1 },
  { word: '쎄고도', freq: 1 },
  { word: '넘치는데트럼프는', freq: 1 },
  { word: '뭘', freq: 1 },
  { word: '원하는건가트럼프는', freq: 1 },
  { word: '나랏빚이나', freq: 1 },
  { word: '갚아라', freq: 1 },
  { word: '언제', freq: 1 },
  { word: '죽을지도', freq: 1 },
  { word: '모르는', freq: 1 },
  { word: '위험한', freq: 1 },
  { word: '곳에서', freq: 1 },
  { word: '사는데전쟁하는', freq: 1 },
  { word: '애들은', freq: 1 },
  { word: '조금더', freq: 1 },
  { word: '빨리죽자고', freq: 1 },
  { word: '서두르는거같아', freq: 1 },
  { word: '많이늙었지만', freq: 1 },
  { word: '내대가리보단', freq: 1 },
  { word: '좋은거', freq: 1 },
  { word: '같다미국하고', freq: 1 },
  { word: '교류를', freq: 1 },
  { word: '끊어야', freq: 1 },
  { word: '하는거', freq: 1 },
  { word: '아냐ㅎㅎㅎ', freq: 1 },
];
