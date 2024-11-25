import { useEffect, useRef, useState } from 'react';
import { WordCloud, WordFrequency } from './StockWordCloud.Type';
import { StockWordCloudContainer, Word, WordContainer } from './StockWordCloud.Style';
import { ButtonDiv, FlexDiv, ImgDiv } from '../Common/Common';
import { TextHeading } from '../Text/Text';
import InfoSVG from '../../assets/info.svg';
import { useLocation } from 'react-router-dom';
import { generateWordCloud, testWorker } from './StockWordCloud.Worker';

const sample: WordFrequency[] = [
  { text: '에어레인', freq: 94 },
  { text: '전략적', freq: 92 },
  { text: '조', freq: 70 },
  { text: '신규상장', freq: 69 },
  { text: '투자', freq: 53 },
  { text: '독점', freq: 52 },
  { text: '억', freq: 49 },
  { text: '시장', freq: 49 },
  { text: '국내', freq: 49 },
  { text: '유일', freq: 49 },
  { text: '분리막', freq: 48 },
  { text: '삼성전자', freq: 46 },
  { text: '속보', freq: 43 },
  { text: '만주', freq: 37 },
  { text: '독점기술력', freq: 37 },
  { text: '년', freq: 34 },
  { text: '있다', freq: 34 },
  { text: '시총', freq: 33 },
  { text: '대기업군', freq: 32 },
  { text: '한라', freq: 30 },
  { text: '포스코', freq: 30 },
  { text: '등', freq: 28 },
  { text: '최초', freq: 28 },
  { text: '기술력이', freq: 28 },
  { text: '재료', freq: 27 },
  { text: '이런', freq: 26 },
  { text: '기업가치', freq: 26 },
  { text: '높은', freq: 26 },
  { text: '신규상장에어레인', freq: 26 },
  { text: '예상', freq: 25 },
  { text: '이', freq: 25 },
  { text: '일', freq: 25 },
  { text: '현', freq: 25 },
  { text: '자사주', freq: 24 },
  { text: '가지', freq: 24 },
  { text: '대우', freq: 24 },
  { text: '받을', freq: 24 },
  { text: '회사가', freq: 24 },
  { text: '아닌데', freq: 24 },
  { text: '롯데케미칼', freq: 24 },
  { text: '질소', freq: 24 },
  { text: '기체', freq: 24 },
  { text: '지난', freq: 22 },
  { text: '크게', freq: 22 },
  { text: '수', freq: 21 },
  { text: '약', freq: 21 },
  { text: '년간', freq: 18 },
  { text: '이상', freq: 18 },
  { text: '시장의', freq: 17 },
  { text: '주가', freq: 17 },
  { text: '같은', freq: 16 },
  { text: '기술력', freq: 16 },
  { text: '러브콜대기업들신규', freq: 16 },
  { text: '상장한에어레인의', freq: 16 },
  { text: '부각되면서', freq: 16 },
  { text: '주목을', freq: 16 },
  { text: '받고', freq: 16 },
  { text: '상장한에어레인은', freq: 16 },
  { text: '공모가', freq: 16 },
  { text: '만원으로', freq: 16 },
  { text: '확정했으나', freq: 16 },
  { text: '이날', freq: 16 },
  { text: '하락으로', freq: 16 },
  { text: '이어지면서', freq: 16 },
  { text: '가까이', freq: 16 },
  { text: '하락하고', freq: 16 },
  { text: '특히', freq: 15 },
  { text: '세계', freq: 15 },
  { text: '많은', freq: 15 },
  { text: '것으로', freq: 15 },
  { text: '기업', freq: 15 },
  { text: '대기업', freq: 15 },
  { text: '가장', freq: 15 },
  { text: '또', freq: 15 },
  { text: '하는', freq: 14 },
  { text: '현재', freq: 14 },
  { text: '시간이', freq: 14 },
  { text: '배', freq: 14 },
  { text: '최소', freq: 14 },
  { text: '매우', freq: 14 },
  { text: '월', freq: 14 },
  { text: '자체', freq: 14 },
  { text: '데', freq: 14 },
  { text: '평균', freq: 14 },
  { text: '씩', freq: 14 },
  { text: '주식', freq: 13 },
  { text: '진입', freq: 13 },
  { text: '것이', freq: 13 },
  { text: '미쳤다', freq: 13 },
  { text: '폭락', freq: 13 },
  { text: '투자를', freq: 13 },
  { text: '무상소각', freq: 12 },
  { text: '투자신규상장', freq: 12 },
  { text: '천억이상', freq: 12 },
  { text: '독점력대기업투자', freq: 12 },
  { text: '기술력신규상장', freq: 12 },
  { text: '대한민국', freq: 12 },
  { text: '수소', freq: 12 },
  { text: '연료', freq: 12 },
  { text: '러브콜대기업들', freq: 12 },
  { text: '공동', freq: 12 },
  { text: '사업제안', freq: 12 },
  { text: '경쟁에어레인', freq: 12 },
  { text: '월에어레인은', freq: 12 },
  { text: '해당', freq: 12 },
  { text: '기술을', freq: 12 },
  { text: '개발해', freq: 12 },
  { text: '번째로', freq: 12 },
  { text: '양산에', freq: 12 },
  { text: '성공했다', freq: 12 },
  { text: '제조', freq: 12 },
  { text: '공정엔', freq: 12 },
  { text: '필요하고', freq: 12 },
  { text: '기체의', freq: 12 },
  { text: '선택적', freq: 12 },
  { text: '분리를', freq: 12 },
  { text: '위한', freq: 12 },
  { text: '소재', freq: 12 },
  { text: '합성', freq: 12 },
  { text: '기술은', freq: 12 },
  { text: '화학', freq: 12 },
  { text: '분야에서도', freq: 12 },
  { text: '전문성이', freq: 12 },
  { text: '요구되는', freq: 12 },
  { text: '분야다이', freq: 12 },
  { text: '때문에', freq: 12 },
  { text: '제품을', freq: 12 },
  { text: '개발하는', freq: 12 },
  { text: '걸리며', freq: 12 },
  { text: '양산', freq: 12 },
  { text: '단계까지', freq: 12 },
  { text: '진입하는', freq: 12 },
  { text: '어려워', freq: 12 },
  { text: '기술적', freq: 12 },
  { text: '장벽이', freq: 12 },
  { text: '높다는', freq: 12 },
  { text: '평가를', freq: 12 },
  { text: '받는다에어레인은', freq: 12 },
  { text: '연속식', freq: 12 },
  { text: '모듈', freq: 12 },
  { text: '생산시스템을', freq: 12 },
  { text: '도입해', freq: 12 },
  { text: '생산', freq: 12 },
  { text: '경쟁력도', freq: 12 },
  { text: '확보했다', freq: 12 },
  { text: '에어레인은', freq: 12 },
  { text: '롯데케미칼한라포스코', freq: 12 },
  { text: '대기업들로부터', freq: 12 },
  { text: '기술력을', freq: 12 },
  { text: '인정받아', freq: 12 },
  { text: '받기도', freq: 12 },
  { text: '했다에어레인은', freq: 12 },
  { text: '기술경쟁력을', freq: 12 },
  { text: '앞세워', freq: 12 },
  { text: '매출액을', freq: 12 },
  { text: '끌어올리는', freq: 12 },
  { text: '꾸준히', freq: 12 },
  { text: '성장해왔다신규상장', freq: 12 },
  { text: '미친', freq: 12 },
  { text: '회사자사주', freq: 12 },
  { text: '무상소각한다유일', freq: 12 },
  { text: '독점기업', freq: 12 },
  { text: '성장주', freq: 12 },
  { text: '독점주', freq: 12 },
  { text: '다', freq: 11 },
  { text: '일론', freq: 11 },
  { text: '머스크가', freq: 11 },
  { text: '탄소포집', freq: 11 },
  { text: '무상소각한다', freq: 11 },
  { text: '롯데그룹', freq: 11 },
  { text: '한라그룹', freq: 11 },
  { text: '포스코그룹', freq: 11 },
  { text: '그룹', freq: 11 },
  { text: '투자속보', freq: 11 },
  { text: '항상', freq: 11 },
  { text: '아파트', freq: 11 },
  { text: '할', freq: 10 },
  { text: '미국', freq: 10 },
  { text: '주요', freq: 10 },
  { text: '가', freq: 10 },
  { text: '머스크', freq: 10 },
  { text: '청정', freq: 10 },
  { text: '대기', freq: 10 },
  { text: 'ㅎㅎ가치주', freq: 10 },
  { text: '그', freq: 9 },
  { text: '있는', freq: 9 },
  { text: '테슬라', freq: 9 },
  { text: '최대', freq: 9 },
  { text: '러브콜', freq: 9 },
  { text: '폭등해도', freq: 9 },
  { text: '이상하지', freq: 9 },
  { text: '않을', freq: 9 },
  { text: '대기업들', freq: 9 },
  { text: '투자에어레인', freq: 9 },
  { text: '주식과', freq: 9 },
  { text: '절대', freq: 8 },
  { text: '돈을', freq: 8 },
  { text: '한', freq: 8 },
  { text: '원', freq: 8 },
  { text: '위해', freq: 8 },
  { text: '크레딧', freq: 8 },
  { text: '투자해야', freq: 8 },
  { text: '달러', freq: 8 },
  { text: '더', freq: 7 },
  { text: '경제', freq: 7 },
  { text: '트럼프', freq: 7 },
  { text: '대', freq: 7 },
  { text: '만큼', freq: 7 },
  { text: '도지코인', freq: 7 },
  { text: '본다', freq: 7 },
  { text: '알루미늄', freq: 7 },
  { text: '지분', freq: 7 },
  { text: '유럽', freq: 7 },
  { text: '수출', freq: 7 },
  { text: '뉴스뉴스', freq: 7 },
  { text: '아파트는', freq: 7 },
  { text: '달러를', freq: 7 },
  { text: '매수', freq: 6 },
  { text: '것', freq: 6 },
  { text: '쌍용건설', freq: 6 },
  { text: 'ㅋㅋㅋ', freq: 6 },
  { text: '전', freq: 6 },
  { text: '될', freq: 6 },
  { text: '폭등', freq: 6 },
  { text: '에', freq: 6 },
  { text: '제도를', freq: 6 },
  { text: '탄소중립에', freq: 6 },
  { text: '기여조', freq: 6 },
  { text: '삼성', freq: 6 },
  { text: '현대', freq: 6 },
  { text: '롯데', freq: 6 },
  { text: '사업', freq: 6 },
  { text: '프랑스시총', freq: 6 },
  { text: '예금', freq: 6 },
  { text: '따라', freq: 6 },
  { text: '하면', freq: 5 },
  { text: '좀', freq: 5 },
  { text: '내주', freq: 5 },
  { text: '복원', freq: 5 },
  { text: '계획', freq: 5 },
  { text: '관한', freq: 5 },
  { text: '다음주', freq: 5 },
  { text: '계획을', freq: 5 },
  { text: '것이라며', freq: 5 },
  { text: '오늘', freq: 5 },
  { text: '가자', freq: 5 },
  { text: '확보', freq: 5 },
  { text: '가능성이', freq: 5 },
  { text: '뉴스', freq: 5 },
  { text: '만', freq: 5 },
  { text: '테슬라가', freq: 5 },
  { text: 'ㅎㅎ', freq: 5 },
  { text: '콘트롤암을', freq: 5 },
  { text: '테슬라에', freq: 5 },
  { text: '공급하고', freq: 5 },
  { text: '하고', freq: 5 },
  { text: '순환', freq: 5 },
  { text: '거의', freq: 5 },
  { text: '투자에', freq: 5 },
  { text: '즉', freq: 5 },
  { text: '투자순서가', freq: 5 },
  { text: '완전히', freq: 5 },
  { text: '책', freq: 5 },
  { text: '제일', freq: 4 },
  { text: '주식으로', freq: 4 },
  { text: '못', freq: 4 },
  { text: '젤렌스키', freq: 4 },
  { text: '종전안이', freq: 4 },
  { text: '아닌', freq: 4 },
  { text: '전후재건등우크라이나의', freq: 4 },
  { text: '지속가능성에', freq: 4 },
  { text: '구상이다', freq: 4 },
  { text: '그는', freq: 4 },
  { text: '제시할', freq: 4 },
  { text: '각', freq: 4 },
  { text: '사항에', freq: 4 },
  { text: '대해우크라이나시민사회와', freq: 4 },
  { text: '합리적인', freq: 4 },
  { text: '아이디어를', freq: 4 },
  { text: '추가할', freq: 4 },
  { text: '의향이', freq: 4 },
  { text: '잘', freq: 4 },
  { text: '해야', freq: 4 },
  { text: '제가', freq: 4 },
  { text: '로', freq: 4 },
  { text: '프로', freq: 4 },
  { text: '희귀유전질환', freq: 4 },
  { text: '관련', freq: 4 },
  { text: '등록', freq: 4 },
  { text: '특허는', freq: 4 },
  { text: '건을', freq: 4 },
  { text: '기술', freq: 4 },
  { text: '배터리', freq: 4 },
  { text: '절대적', freq: 4 },
  { text: '정부', freq: 4 },
  { text: '이미', freq: 4 },
  { text: '새로운', freq: 4 },
  { text: '않은', freq: 4 },
  { text: '통해', freq: 4 },
  { text: '씨티알모빌리티는', freq: 4 },
  { text: '연방', freq: 4 },
  { text: '자동차', freq: 4 },
  { text: '한다', freq: 4 },
  { text: '전조회수', freq: 4 },
  { text: '수혜', freq: 4 },
  { text: '대통령이', freq: 4 },
  { text: '백악관을', freq: 4 },
  { text: '차지하게', freq: 4 },
  { text: '된', freq: 4 },
  { text: '유지시키기', freq: 4 },
  { text: '전방위로', freq: 4 },
  { text: '영향력을', freq: 4 },
  { text: '행사할', freq: 4 },
  { text: '비상', freq: 4 },
  { text: '모든', freq: 4 },
  { text: '폭락한다이것이', freq: 4 },
  { text: '반복성을', freq: 4 },
  { text: '재테크', freq: 4 },
  { text: '투자순서를', freq: 4 },
  { text: '않으면', freq: 4 },
  { text: '망하는', freq: 4 },
  { text: '아파트를', freq: 4 },
  { text: '팔고', freq: 4 },
  { text: '꼭', freq: 4 },
  { text: '투자가', freq: 4 },
  { text: '미국인은', freq: 4 },
  { text: '달러와의', freq: 4 },
  { text: '누구나', freq: 4 },
  { text: '글로벌에픽분', freq: 4 },
  { text: '전에어레인', freq: 4 },
  { text: '설립괸에어레인은', freq: 4 },
  { text: '기체분리막', freq: 4 },
  { text: '솔루션', freq: 4 },
  { text: '전문', freq: 4 },
  { text: '기업이다', freq: 4 },
  { text: '제품은', freq: 4 },
  { text: '기', freq: 4 },
  { text: '좋으시죠', freq: 3 },
  { text: '년전', freq: 3 },
  { text: '분의', freq: 3 },
  { text: '말', freq: 3 },
  { text: '미국의', freq: 3 },
  { text: '절반', freq: 3 },
  { text: '주는', freq: 3 },
  { text: '이후', freq: 3 },
  { text: '갈', freq: 3 },
  { text: '법도', freq: 3 },
  { text: '모조리', freq: 3 },
  { text: '인디에프속보', freq: 3 },
  { text: '빠르게', freq: 3 },
  { text: '발표', freq: 3 },
  { text: '다산', freq: 3 },
  { text: '미리', freq: 3 },
  { text: '시초가', freq: 3 },
  { text: '이유가', freq: 3 },
  { text: '두고', freq: 3 },
  { text: '하지', freq: 3 },
  { text: '전체', freq: 3 },
  { text: '보유', freq: 3 },
  { text: '폭락이라', freq: 3 },
  { text: '만원씩', freq: 3 },
  { text: '갑자기', freq: 3 },
  { text: '실적', freq: 3 },
  { text: '대비', freq: 3 },
  { text: '포인트', freq: 3 },
  { text: '나', freq: 3 },
  { text: '것은', freq: 3 },
  { text: '비트코인', freq: 3 },
  { text: '머스크는', freq: 3 },
  { text: '가격이', freq: 3 },
  { text: '것을', freq: 3 },
  { text: '머스크를', freq: 3 },
  { text: '도지', freq: 3 },
  { text: 'ㅋ', freq: 3 },
  { text: '달러가', freq: 3 },
  { text: '업비트', freq: 3 },
  { text: '빗썸', freq: 3 },
  { text: '거래대금', freq: 3 },
  { text: '티사이언티픽', freq: 3 },
  { text: '만동영상문서', freq: 3 },
  { text: '자본', freq: 3 },
  { text: '살펴야', freq: 3 },
  { text: '최고의', freq: 3 },
  { text: '블룸버그', freq: 3 },
  { text: '러브콜속보', freq: 3 },
  { text: '이게', freq: 3 },
  { text: '정상인가', freq: 3 },
  { text: '짜리다단독', freq: 3 },
  { text: '생존', freq: 3 },
  { text: '투자시가총액', freq: 3 },
  { text: '블룸버그강희종기자입력', freq: 3 },
  { text: '우리나라가', freq: 3 },
  { text: '년까지', freq: 3 },
  { text: '탄소중립을', freq: 3 },
  { text: '달성하기', freq: 3 },
  { text: '위해서는', freq: 3 },
  { text: '탄소포집저장', freq: 3 },
  { text: '기술이', freq: 3 },
  { text: '기여해야', freq: 3 },
  { text: '분석됐다', freq: 3 },
  { text: '전체적으로는', freq: 3 },
  { text: '조억달러약', freq: 3 },
  { text: '조원의', freq: 3 },
  { text: '자본을', freq: 3 },
  { text: '투입해야', freq: 3 },
  { text: '나타났다에어레인', freq: 3 },
  { text: '러브콜단독', freq: 3 },
  { text: '사람은', freq: 3 },
  { text: '대상', freq: 3 },
  { text: '출발해야', freq: 3 },
  { text: '하며', freq: 3 },
  { text: '사야', freq: 3 },
  { text: '장기투자를', freq: 3 },
  { text: '이상을', freq: 3 },
  { text: '맞춰', freq: 3 },
  { text: '그냥', freq: 3 },
  { text: '보유하면', freq: 3 },
  { text: '따라서', freq: 3 },
  { text: '순환투자해야', freq: 3 },
  { text: '의', freq: 3 },
  { text: '국채를', freq: 3 },
  { text: '투자법이다', freq: 3 },
  { text: '배가', freq: 3 },
  { text: '평생', freq: 3 },
  { text: '주식부자로', freq: 3 },
  { text: '키우는', freq: 3 },
  { text: '전쟁이', freq: 3 },
  { text: '사옥까지', freq: 3 },
  { text: '팔아서', freq: 3 },
  { text: '조를', freq: 3 },
  { text: '부자가', freq: 3 },
  { text: '내용', freq: 2 },
  { text: '존나', freq: 2 },
  { text: '가능', freq: 2 },
  { text: '유지', freq: 2 },
  { text: '삼성전자는', freq: 2 },
  { text: '조원', freq: 2 },
  { text: '해', freq: 2 },
  { text: '올해', freq: 2 },
  { text: '만원', freq: 2 },
  { text: '모두', freq: 2 },
  { text: '말고', freq: 2 },
  { text: '너무', freq: 2 },
  { text: '번', freq: 2 },
  { text: '언제까지', freq: 2 },
  { text: '어저구', freq: 2 },
  { text: '저저구', freq: 2 },
  { text: '가격을', freq: 2 },
  { text: '빨리', freq: 2 },
  { text: '골로', freq: 2 },
  { text: '실물', freq: 2 },
  { text: '제', freq: 2 },
  { text: '주가가', freq: 2 },
  { text: '조용히', freq: 2 },
  { text: '을', freq: 2 },
  { text: '현재의', freq: 2 },
  { text: '한국이', freq: 2 },
  { text: '잘난', freq: 2 },
  { text: '우크라이나', freq: 2 },
  { text: '재건', freq: 2 },
  { text: '진행중', freq: 2 },
  { text: '발표이것은', freq: 2 },
  { text: '지수', freq: 2 },
  { text: '미친듯', freq: 2 },
  { text: '소리질러', freq: 2 },
  { text: '입증하는것이다', freq: 2 },
  { text: '사기범에', freq: 2 },
  { text: '청년을', freq: 2 },
  { text: '봅니다', freq: 2 },
  { text: '억원', freq: 2 },
  { text: '이번', freq: 2 },
  { text: '를', freq: 2 },
  { text: '결국은', freq: 2 },
  { text: '까지', freq: 2 },
  { text: '둘째주', freq: 2 },
  { text: '보내드리겠습니다', freq: 2 },
  { text: '몰라도', freq: 2 },
  { text: '텐버거성우', freq: 2 },
  { text: '엔솔', freq: 2 },
  { text: '스페이스', freq: 2 },
  { text: '리비안', freq: 2 },
  { text: '벤츠', freq: 2 },
  { text: '성장', freq: 2 },
  { text: '에너지', freq: 2 },
  { text: '안정조치', freq: 2 },
  { text: '선물', freq: 2 },
  { text: '이마트', freq: 2 },
  { text: '시', freq: 2 },
  { text: '원으로', freq: 2 },
  { text: '넘는', freq: 2 },
  { text: '주식만', freq: 2 },
  { text: '시총은', freq: 2 },
  { text: '도지코인의', freq: 2 },
  { text: '도지코인이', freq: 2 },
  { text: '했다', freq: 2 },
  { text: '들고', freq: 2 },
  { text: '트윗을', freq: 2 },
  { text: '머스크의', freq: 2 },
  { text: '순간', freq: 2 },
  { text: '당시', freq: 2 },
  { text: '기어이', freq: 2 },
  { text: '다시', freq: 2 },
  { text: '돌파', freq: 2 },
  { text: '알려졌다정부효율부는', freq: 2 },
  { text: '당선인이', freq: 2 },
  { text: '전체의', freq: 2 },
  { text: '재정', freq: 2 },
  { text: '및', freq: 2 },
  { text: '성과에', freq: 2 },
  { text: '대한', freq: 2 },
  { text: '감사를', freq: 2 },
  { text: '수행하고', freq: 2 },
  { text: '과감한', freq: 2 },
  { text: '개혁', freq: 2 },
  { text: '권고안을', freq: 2 },
  { text: '제시하기', freq: 2 },
  { text: '만든다고', freq: 2 },
  { text: '밝혔던', freq: 2 },
  { text: '조직이다', freq: 2 },
  { text: '뉴욕에서', freq: 2 },
  { text: '열린', freq: 2 },
  { text: '당선인', freq: 2 },
  { text: '선거', freq: 2 },
  { text: '유세', freq: 2 },
  { text: '연설에서', freq: 2 },
  { text: '정부효율부를', freq: 2 },
  { text: '예산에서', freq: 2 },
  { text: '달러약', freq: 2 },
  { text: '조원를', freq: 2 },
  { text: '아낄', freq: 2 },
  { text: '있다고', freq: 2 },
  { text: '말했다한편', freq: 2 },
  { text: '알려졌다', freq: 2 },
  { text: '콘트롤암은', freq: 2 },
  { text: '본체와', freq: 2 },
  { text: '바퀴를', freq: 2 },
  { text: '연결하는', freq: 2 },
  { text: '부품으로', freq: 2 },
  { text: '씨티알모빌리티가', freq: 2 },
  { text: '개발했다시가총액', freq: 2 },
  { text: '억대', freq: 2 },
  { text: '편입시켜라', freq: 2 },
  { text: '지분배', freq: 2 },
  { text: '공식일', freq: 2 },
  { text: '가능성', freq: 2 },
  { text: 'ㅋㅋ', freq: 2 },
  { text: '종합지수', freq: 2 },
  { text: '삼전', freq: 2 },
  { text: '되고', freq: 2 },
  { text: '아무', freq: 2 },
  { text: '저점', freq: 2 },
  { text: '거울아', freq: 2 },
  { text: '증시부양책', freq: 2 },
  { text: '에어레인트럼프', freq: 2 },
  { text: '효과', freq: 2 },
  { text: '상승', freq: 2 },
  { text: '날개', freq: 2 },
  { text: '월가가', freq: 2 },
  { text: '기대하는', freq: 2 },
  { text: '건', freq: 2 },
  { text: '이른바', freq: 2 },
  { text: '크레딧도', freq: 2 },
  { text: '노리는', freq: 2 },
  { text: '대선', freq: 2 },
  { text: '수혜다', freq: 2 },
  { text: '환경보호청과', freq: 2 },
  { text: '캘리포니아', freq: 2 },
  { text: '업계에', freq: 2 },
  { text: '특정', freq: 2 },
  { text: '수준의', freq: 2 },
  { text: '탄소', freq: 2 },
  { text: '배출', freq: 2 },
  { text: '제한을', freq: 2 },
  { text: '이를', freq: 2 },
  { text: '준수하거나', freq: 2 },
  { text: '기준치를', freq: 2 },
  { text: '넘어서는', freq: 2 },
  { text: '테슬라를', freq: 2 },
  { text: '포함한', freq: 2 },
  { text: '전기차', freq: 2 },
  { text: '업체로부터', freq: 2 },
  { text: '크레딧을', freq: 2 },
  { text: '매입하도록', freq: 2 },
  { text: '있다미국', freq: 2 },
  { text: '언론들은', freq: 2 },
  { text: '유지하도록', freq: 2 },
  { text: '사활을', freq: 2 },
  { text: '걸', freq: 2 },
  { text: '예상한다', freq: 2 },
  { text: '분기', freq: 2 },
  { text: '판매로', freq: 2 },
  { text: '벌어들인', freq: 2 },
  { text: '이익은', freq: 2 },
  { text: '억만달러에', freq: 2 },
  { text: '달했다', freq: 2 },
  { text: '이는', freq: 2 },
  { text: '순이익의', freq: 2 },
  { text: '해당한다지난', freq: 2 },
  { text: '호조를', freq: 2 },
  { text: '지속', freq: 2 },
  { text: '자산가', freq: 2 },
  { text: '대열에', freq: 2 },
  { text: '올려', freq: 2 },
  { text: '놓은', freq: 2 },
  { text: '데는', freq: 2 },
  { text: '판매가', freq: 2 },
  { text: '기여했다트럼프', freq: 2 },
  { text: '점쳐진다', freq: 2 },
  { text: 'ㅎㅎ트럼프', freq: 2 },
  { text: '점쳐진다가치주', freq: 2 },
  { text: '돈', freq: 2 },
  { text: '전담조직', freq: 2 },
  { text: '출범', freq: 2 },
  { text: '이재용', freq: 2 },
  { text: '최태원', freq: 2 },
  { text: '정의선', freq: 2 },
  { text: '탄소중립', freq: 2 },
  { text: '감축', freq: 2 },
  { text: '년부터', freq: 2 },
  { text: '지금처럼', freq: 2 },
  { text: '달러가오르면', freq: 2 },
  { text: '다이아몬드달러투자법이다달러투자만으로', freq: 2 },
  { text: '단기간에', freq: 2 },
  { text: '재산을', freq: 2 },
  { text: '불릴수', freq: 2 },
  { text: '있다재테크', freq: 2 },
  { text: '경력이', freq: 2 },
  { text: '년이', freq: 2 },
  { text: '넘은', freq: 2 },
  { text: '전직', freq: 2 },
  { text: '방송', freq: 2 },
  { text: '프로듀서가그의', freq: 2 },
  { text: '경험과', freq: 2 },
  { text: '이론을', freq: 2 },
  { text: '총', freq: 2 },
  { text: '정리한', freq: 2 },
  { text: '시각의', freq: 2 },
  { text: '책이다세상이', freq: 2 },
  { text: '몰랐던', freq: 2 },
  { text: '이론이다하나도', freq: 2 },
  { text: '과장하거나', freq: 2 },
  { text: '숨기지', freq: 2 },
  { text: '투자비법이다', freq: 2 },
  { text: '라는', freq: 2 },
  { text: '주식연구투자가는주가의', freq: 2 },
  { text: '움직임에서', freq: 2 },
  { text: '찾아', freq: 2 },
  { text: '그져', freq: 2 },
  { text: '먹기를', freq: 2 },
  { text: '원했지만', freq: 2 },
  { text: '주가의', freq: 2 },
  { text: '찾았다만약', freq: 2 },
  { text: '사이클반복성이', freq: 2 },
  { text: '있다면', freq: 2 },
  { text: '주식에서', freq: 2 },
  { text: '실패하는', freq: 2 },
  { text: '없게', freq: 2 },
  { text: '된다당연히', freq: 2 },
  { text: '사람의', freq: 2 },
  { text: '소망은', freq: 2 },
  { text: '꿈으로', freq: 2 },
  { text: '끝났다사람들이', freq: 2 },
  { text: '대상으로', freq: 2 },
  { text: '삼을', freq: 2 },
  { text: '자산은', freq: 2 },
  { text: '주식아파트달러예금국채', freq: 2 },
  { text: '뿐이다가끔', freq: 2 },
  { text: '금', freq: 2 },
  { text: '은', freq: 2 },
  { text: '원자재를', freq: 2 },
  { text: '들먹이는', freq: 2 },
  { text: '사람도', freq: 2 },
  { text: '있으나', freq: 2 },
  { text: '이들은', freq: 2 },
  { text: '곁다리', freq: 2 },
  { text: '투자수단에', freq: 2 },
  { text: '불과하다는', freq: 2 },
  { text: '알게된다저자는', freq: 2 },
  { text: '하워드', freq: 2 },
  { text: '막스와', freq: 2 },
  { text: '달리주가가', freq: 2 },
  { text: '아니라', freq: 2 },
  { text: '이들', freq: 2 },
  { text: '자산간에는', freq: 2 },
  { text: '존재하는일정한', freq: 2 },
  { text: '사이클이항상존재함을', freq: 2 },
  { text: '찾아냈다주식아파트', freq: 2 },
  { text: '국채는', freq: 2 },
  { text: '가격에서는', freq: 2 },
  { text: '규칙성을', freq: 2 },
  { text: '찾을', freq: 2 },
  { text: '없고투자순서상으로는', freq: 2 },
  { text: '반드시', freq: 2 },
  { text: '따라야', freq: 2 },
  { text: '순서가', freq: 2 },
  { text: '있음을', freq: 2 },
  { text: '알아냈다이', freq: 2 },
  { text: '따르지', freq: 2 },
  { text: '실패함을', freq: 2 },
  { text: '알', freq: 2 },
  { text: '있다사람들은', freq: 2 },
  { text: '주가는', freq: 2 },
  { text: '반복된다면서', freq: 2 },
  { text: '그래프를', freq: 2 },
  { text: '시세예측에', freq: 2 },
  { text: '사용하지만', freq: 2 },
  { text: '맞는', freq: 2 },
  { text: '경우는', freq: 2 },
  { text: '없다당연한', freq: 2 },
  { text: '얘기다', freq: 2 },
  { text: '들이', freq: 2 },
  { text: '결국에는', freq: 2 },
  { text: '이것이다주가', freq: 2 },
  { text: '달러가격예금국채', freq: 2 },
  { text: '가격에는', freq: 2 },
  { text: '반복성이', freq: 2 },
  { text: '없다그러나저자는투자대상', freq: 2 },
  { text: '자산', freq: 2 },
  { text: '국채간에는항상', freq: 2 },
  { text: '같은매매순서를', freq: 2 },
  { text: '지켜야', freq: 2 },
  { text: '존재함을', freq: 2 },
  { text: '알아', freq: 2 },
  { text: '냈다즉', freq: 2 },
  { text: '재테크를', freq: 2 },
  { text: '시작할', freq: 2 },
  { text: '때에는', freq: 2 },
  { text: '일정기간', freq: 2 },
  { text: '후에는', freq: 2 },
  { text: '사야하고', freq: 2 },
  { text: '후꼭대기에서', freq: 2 },
  { text: '한다이', freq: 2 },
  { text: '후', freq: 2 },
  { text: '정기예금에', freq: 2 },
  { text: '가입했다가마지막으로', freq: 2 },
  { text: '국채에', freq: 2 },
  { text: '투자해야만', freq: 2 },
  { text: '한다이것이', freq: 2 },
  { text: '자산사이클', freq: 2 },
  { text: '이다이것이', freq: 2 },
  { text: '주식아파트달러예금국채중', freq: 2 },
  { text: '자산에만장기투자하면누구나', freq: 2 },
  { text: '이유이다절대로', freq: 2 },
  { text: '자산에만', freq: 2 },
  { text: '장기투자하지', freq: 2 },
  { text: '말라그래도', freq: 2 },
  { text: '싶다면최소', freq: 2 },
  { text: '자산에', freq: 2 },
  { text: '손해는', freq: 2 },
  { text: '적게', freq: 2 },
  { text: '보거나', freq: 2 },
  { text: '이익이', freq: 2 },
  { text: '되는', freq: 2 },
  { text: '된다이렇게', freq: 2 },
  { text: '에셋사이클에', freq: 2 },
  { text: '자산간에', freq: 2 },
  { text: '투자하지', freq: 2 },
  { text: '투자자산을', freq: 2 },
  { text: '가까이로', freq: 2 },
  { text: '폭락하게', freq: 2 },
  { text: '된다우리가', freq: 2 },
  { text: '수없이', freq: 2 },
  { text: '봐온', freq: 2 },
  { text: '가격', freq: 2 },
  { text: '폭락현상이', freq: 2 },
  { text: '이것이다이중', freq: 2 },
  { text: '교체', freq: 2 },
  { text: '필요없으므로', freq: 2 },
  { text: '재산을다른', freq: 2 },
  { text: '나라의', freq: 2 },
  { text: '투자자', freq: 2 },
  { text: '모두는', freq: 2 },
  { text: '재산의', freq: 2 },
  { text: '순환순서를', freq: 2 },
  { text: '차례대로', freq: 2 },
  { text: '한다는', freq: 2 },
  { text: '법칙이', freq: 2 },
  { text: '성립한다이것이미국식', freq: 2 },
  { text: '주식투자와', freq: 2 },
  { text: '비미국식', freq: 2 },
  { text: '주식투자가', freq: 2 },
  { text: '달라야', freq: 2 },
  { text: '이유이다즉', freq: 2 },
  { text: '미국인과', freq: 2 },
  { text: '달라져야한다어디', freq: 2 },
  { text: '사느냐에', freq: 2 },
  { text: '투자기법이', freq: 2 },
  { text: '달라지는', freq: 2 },
  { text: '것이다바로', freq: 2 },
  { text: '교체투자', freq: 2 },
  { text: '자리에서', freq: 2 },
  { text: '배의', freq: 2 },
  { text: '수익이', freq: 2 },
  { text: '발생한다급등한', freq: 2 },
  { text: '아파트와', freq: 2 },
  { text: '팔자마자', freq: 2 },
  { text: '돈으로', freq: 2 },
  { text: '샀다가', freq: 2 },
  { text: '일정', freq: 2 },
  { text: '싯점에', freq: 2 },
  { text: '달러플', freq: 2 },
  { text: '팔기만', freq: 2 },
  { text: '해도', freq: 2 },
  { text: '그자리에서', freq: 2 },
  { text: '남는다책', freq: 2 },
  { text: '설명대로', freq: 2 },
  { text: '약간의', freq: 2 },
  { text: '기교를', freq: 2 },
  { text: '부리면수익이', freq: 2 },
  { text: '기적처럼', freq: 2 },
  { text: '달라진다그래서', freq: 2 },
  { text: '제목이', freq: 2 },
  { text: '핀테크', freq: 2 },
  { text: '수익난다대', freq: 2 },
  { text: '자산시장', freq: 2 },
  { text: '하나를', freq: 2 },
  { text: '통해주식아파트달러스왑예금국채', freq: 2 },
  { text: '투자요령을', freq: 2 },
  { text: '한꺼번에', freq: 2 },
  { text: '익히고', freq: 2 },
  { text: '이해할', freq: 2 },
  { text: '있다지금처럼', freq: 2 },
  { text: '오르면', freq: 2 },
  { text: '달러상승율과', freq: 2 },
  { text: '아파트의', freq: 2 },
  { text: '하락율마져도', freq: 2 },
  { text: '같아야', freq: 2 },
  { text: '법칙이다이것은', freq: 2 },
  { text: '공식이다한국인은', freq: 2 },
  { text: '한국의', freq: 2 },
  { text: '때', freq: 2 },
  { text: '경험', freq: 2 },
  { text: '바', freq: 2 },
  { text: '있다그동안', freq: 2 },
  { text: '대세상승시', freq: 2 },
  { text: '벌었다가대세하락만', freq: 2 },
  { text: '하면돈을', freq: 2 },
  { text: '토해놓은', freq: 2 },
  { text: '경험들이', freq: 2 },
  { text: '누구에게나', freq: 2 },
  { text: '있을', freq: 2 },
  { text: '것이다인간들의', freq: 2 },
  { text: '욕심은', freq: 2 },
  { text: '영원히', freq: 2 },
  { text: '변하지', freq: 2 },
  { text: '않으므로세월이', freq: 2 },
  { text: '아무리', freq: 2 },
  { text: '흘러도', freq: 2 },
  { text: '재산', freq: 2 },
  { text: '순환투자접', freq: 2 },
  { text: '즉펜타곤', freq: 2 },
  { text: '투자법은', freq: 2 },
  { text: '변할', freq: 2 },
  { text: '없다즉달러스와핑을', freq: 2 },
  { text: '안하면', freq: 2 },
  { text: '재산은', freq: 2 },
  { text: '차이가', freq: 2 },
  { text: '난다부록으로', freq: 2 },
  { text: '달러평균법에', freq: 2 },
  { text: '의한', freq: 2 },
  { text: '이후에도', freq: 2 },
  { text: '성공하는', freq: 2 },
  { text: '법과자녀를', freq: 2 },
  { text: '소개한다이', freq: 2 },
  { text: '책은', freq: 2 },
  { text: '아마존', freq: 2 },
  { text: '에서', freq: 2 },
  { text: '영어로', freq: 2 },
  { text: '판매', freq: 2 },
  { text: '중이기도', freq: 2 },
  { text: '하다', freq: 2 },
  { text: '큰', freq: 2 },
  { text: '중국', freq: 2 },
  { text: '말아야', freq: 2 },
  { text: '주식도', freq: 2 },
  { text: '월장은', freq: 2 },
  { text: '받아서', freq: 2 },
  { text: '집사는', freq: 2 },
  { text: '시간', freq: 2 },
  { text: '대기중인', freq: 2 },
  { text: '투자할', freq: 2 },
  { text: '곳이', freq: 2 },
  { text: '일본의', freq: 2 },
  { text: '처럼', freq: 2 },
  { text: '자산가격의', freq: 2 },
  { text: '본격적으로', freq: 2 },
  { text: '폭락하는', freq: 2 },
  { text: '이유를', freq: 2 },
  { text: '달러도', freq: 2 },
  { text: '중으로', freq: 2 },
  { text: '알아야', freq: 2 },
  { text: '롱텀디플레이션', freq: 2 },
  { text: '전문가는', freq: 2 },
  { text: '채권투자', freq: 2 },
  { text: '전문가들의', freq: 2 },
  { text: '국채의', freq: 2 },
  { text: '매', freq: 2 },
  { text: '망한', freq: 2 },
  { text: '월급을', freq: 2 },
  { text: '내수주도', freq: 1 },
  { text: '좋고', freq: 1 },
  { text: '쓰레기장미대선이', freq: 1 },
  { text: '끝나면', freq: 1 },
  { text: '한국시장은', freq: 1 },
  { text: '늘', freq: 1 },
  { text: '버림', freq: 1 },
  { text: '받은건', freq: 1 },
  { text: '알고덜', freq: 1 },
  { text: '있것지', freq: 1 },
  { text: '한국시장에서', freq: 1 },
  { text: '기대', freq: 1 },
  { text: '바가', freq: 1 },
  { text: '전혀', freq: 1 },
  { text: '없다잉ㅠㅜ주르륵ㅡㅜ찔찔찔', freq: 1 },
  { text: '안해도', freq: 1 },
  { text: '대는걸', freq: 1 },
  { text: '고객에게서', freq: 1 },
  { text: '정보르ㄹ', freq: 1 },
  { text: '빼가는', freq: 1 },
  { text: '거자나', freq: 1 },
  { text: '아무도', freq: 1 },
  { text: '모르는데', freq: 1 },
  { text: '가서', freq: 1 },
  { text: '흉을', freq: 1 },
  { text: '봐야지뉴스도', freq: 1 },
  { text: '참나', freq: 1 },
  { text: '요상한걸', freq: 1 },
  { text: '뉴스에내가', freq: 1 },
  { text: '바지에', freq: 1 },
  { text: '오줌싼건', freq: 1 },
  { text: '뉴스꺼리도', freq: 1 },
  { text: '안대것지', freq: 1 },
  { text: '밧때리가', freq: 1 },
  { text: '미국에게', freq: 1 },
  { text: '치명적', freq: 1 },
  { text: '결과를', freq: 1 },
  { text: '줄뻔', freq: 1 },
  { text: '했다한국의ㅏ', freq: 1 },
  { text: '빠때리를', freq: 1 },
  { text: '솎아내기', freq: 1 },
  { text: '시작', freq: 1 },
  { text: '방송에서', freq: 1 },
  { text: '밧때리', freq: 1 },
  { text: '바이오', freq: 1 },
  { text: '반도체', freq: 1 },
  { text: '몰이만', freq: 1 },
  { text: '해대서쳐물린', freq: 1 },
  { text: '종목만', freq: 1 },
  { text: '무너진다고', freq: 1 },
  { text: '아우성이네', freq: 1 },
  { text: 'ㅋㅋㅋ섬유', freq: 1 },
  { text: '증권', freq: 1 },
  { text: '건설', freq: 1 },
  { text: '철강', freq: 1 },
  { text: '대부분', freq: 1 },
  { text: '갠찮은', freq: 1 },
  { text: '실적이다잉', freq: 1 },
  { text: '개똥전자를', freq: 1 },
  { text: '일년내내', freq: 1 },
  { text: '너덜', freq: 1 },
  { text: '끼리만', freq: 1 },
  { text: '매매해라', freq: 1 },
  { text: '포근함', freq: 1 },
  { text: '시키고', freq: 1 },
  { text: '세월을이겨내는거', freq: 1 },
  { text: '말고는', freq: 1 },
  { text: '다른선택이', freq: 1 },
  { text: '없을거라', freq: 1 },
  { text: '보겠데이', freq: 1 },
  { text: '연계도', freq: 1 },
  { text: '복잡하게', freq: 1 },
  { text: '누가쓰것노', freq: 1 },
  { text: '미국에', freq: 1 },
  { text: '대적할', freq: 1 },
  { text: '국가는', freq: 1 },
  { text: '없다충분히', freq: 1 },
  { text: '쎄고도', freq: 1 },
  { text: '넘치는데트럼프는', freq: 1 },
  { text: '뭘', freq: 1 },
  { text: '원하는건가트럼프는', freq: 1 },
  { text: '나랏빚이나', freq: 1 },
  { text: '갚아라', freq: 1 },
  { text: '언제', freq: 1 },
  { text: '죽을지도', freq: 1 },
  { text: '모르는', freq: 1 },
  { text: '위험한', freq: 1 },
  { text: '곳에서', freq: 1 },
  { text: '사는데전쟁하는', freq: 1 },
  { text: '애들은', freq: 1 },
  { text: '조금더', freq: 1 },
  { text: '빨리죽자고', freq: 1 },
  { text: '서두르는거같아', freq: 1 },
  { text: '많이늙었지만', freq: 1 },
  { text: '내대가리보단', freq: 1 },
  { text: '좋은거', freq: 1 },
  { text: '같다미국하고', freq: 1 },
  { text: '교류를', freq: 1 },
  { text: '끊어야', freq: 1 },
  { text: '하는거', freq: 1 },
  { text: '아냐ㅎㅎㅎ', freq: 1 },
];

const StockWordCloudContents = ({
  wordCloutItem,
  index,
  animationState,
}: {
  wordCloutItem: WordCloud;
  index: number;
  animationState: boolean;
}) => {
  return (
    <WordContainer
      key={index}
      orientation={wordCloutItem.orientation ? 1 : 0}
      posX={wordCloutItem.position.x}
      posY={wordCloutItem.position.y}
      sizeX={wordCloutItem.size.w}
      sizeY={wordCloutItem.size.h}
    >
      <Word
        animationState={animationState}
        orientation={wordCloutItem.orientation ? 1 : 0}
        fontSize={wordCloutItem.fontSize}
        colors={wordCloutItem.color}
        delay={0}
      >
        {wordCloutItem.word}
      </Word>
    </WordContainer>
  );
};

const StockWordCloud = ({ stockName, stockId }: { stockName: string; stockId: number }) => {
  const { state } = useLocation();

  const [wordCloud, setWordCloud] = useState<WordCloud[] | null>(null);
  const [didMount, setDidMount] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [animationState, setAnimationState] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getWordCloud = async (stockId: number) => {
    // const res = await Promise.resolve(fetchRelevant(stockId));
    // if (!res) return null;
    // setStockRelevantList(res);
    stockId;
    const res = await sample;
    if (window.Worker) {
      if (!containerRef.current) return;
      generateWordCloud({
        data: res,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    setDidMount(true);

    testWorker.onmessage = ({ data }: { data: WordCloud[] }) => {
      setWordCloud(Array.from(data, (x) => x));
    };

    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    getWordCloud(stockId);
  }, [didMount, stockId]);

  useEffect(() => {
    if (!didMount) return;
    setAnimationState(false);
    setCurrentIndex(-1);
    setWordCloud(null);
  }, [didMount]);

  useEffect(() => {
    if (!didMount) return;
    if (stockName == state?.stockName) return;
    setAnimationState(false);
    setCurrentIndex(-1);
    setWordCloud(null);
  }, [state]);

  useEffect(() => {
    if (!didMount) return;
    setAnimationState(true);
    setCurrentIndex(0);
  }, [wordCloud]);

  useEffect(() => {
    if (!didMount) return;
    if (currentIndex == -1) return;
    if (!wordCloud || currentIndex >= wordCloud.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev + ~~(prev / 25) + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, wordCloud]);

  return (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <FlexDiv alignItems="center" gap="12px">
        <TextHeading size="Small" color="grayscale10">
          국내 개미들의 소리
        </TextHeading>
        <ButtonDiv>
          <ImgDiv src={InfoSVG} width="28px" />
        </ButtonDiv>
      </FlexDiv>
      <StockWordCloudContainer ref={containerRef}>
        {wordCloud &&
          wordCloud.map(
            (e: WordCloud, i: number) =>
              i <= currentIndex && (
                <StockWordCloudContents key={i} animationState={animationState} wordCloutItem={e} index={i} />
              ),
          )}
      </StockWordCloudContainer>
    </FlexDiv>
  );
};

export default StockWordCloud;
