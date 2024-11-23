import { useEffect, useRef, useState } from 'react';
import { WordCloudLayout } from './StockWordCloud.Type';
import { Word, WordContainer } from './StockWordCloud.Style';
import useWorker from '../../hooks/useWorker';

const sample = [
  { text: '다', freq: 10 },
  { text: '차량용', freq: 9 },
  { text: '업체에', freq: 8 },
  { text: '하면', freq: 7 },
  { text: '누구나', freq: 7 },
  { text: '수', freq: 7 },
  { text: '등', freq: 7 },
  { text: '주식을', freq: 6 },
  { text: '주식부자로', freq: 6 },
  { text: '이', freq: 6 },
  { text: '있는', freq: 6 },
  { text: '한', freq: 6 },
  { text: '글로벌', freq: 6 },
  { text: '완성차', freq: 6 },
  { text: '사상최대', freq: 6 },
  { text: '아파트', freq: 5 },
  { text: '재테크', freq: 5 },
  { text: '장기간', freq: 5 },
  { text: '전부', freq: 5 },
  { text: '것으로', freq: 5 },
  { text: '올해', freq: 5 },
  { text: '반기', freq: 5 },
  { text: '누적', freq: 5 },
  { text: '하는', freq: 4 },
  { text: '전혀', freq: 4 },
  { text: '아이를', freq: 4 },
  { text: '투자법은', freq: 4 },
  { text: '따른', freq: 4 },
  { text: '모든', freq: 4 },
  { text: '번', freq: 4 },
  { text: '때', freq: 4 },
  { text: '년', freq: 4 },
  { text: '때에', freq: 4 },
  { text: '테슬라', freq: 4 },
  { text: '공급하고', freq: 4 },
  { text: '따르면', freq: 4 },
  { text: '패널을', freq: 4 },
  { text: '몰라도', freq: 3 },
  { text: '후에도', freq: 3 },
  { text: '더', freq: 3 },
  { text: '키우는', freq: 3 },
  { text: '것은', freq: 3 },
  { text: '주식에', freq: 3 },
  { text: '를', freq: 3 },
  { text: '항상', freq: 3 },
  { text: '평균가격', freq: 3 },
  { text: '이상으로', freq: 3 },
  { text: '무조건', freq: 3 },
  { text: '큰', freq: 3 },
  { text: '장기투자만', freq: 3 },
  { text: '부자가', freq: 3 },
  { text: '거의', freq: 3 },
  { text: '예금', freq: 3 },
  { text: '망하는', freq: 3 },
  { text: '주도주는', freq: 3 },
  { text: '또', freq: 3 },
  { text: '될', freq: 3 },
  { text: '테슬라에', freq: 3 },
  { text: '공급조원', freq: 3 },
  { text: '매출', freq: 3 },
  { text: '분기도', freq: 3 },
  { text: '사면', freq: 2 },
  { text: '필요해', freq: 2 },
  { text: '지수가', freq: 2 },
  { text: '없으니', freq: 2 },
  { text: '법을', freq: 2 },
  { text: '후에는', freq: 2 },
  { text: '아무', freq: 2 },
  { text: '정년', freq: 2 },
  { text: '부자되는', freq: 2 },
  { text: '부자로', freq: 2 },
  { text: '사는', freq: 2 },
  { text: '주식', freq: 2 },
  { text: '돈을', freq: 2 },
  { text: '먹는', freq: 2 },
  { text: '방법이', freq: 2 },
  { text: '주가', freq: 2 },
  { text: '동안', freq: 2 },
  { text: '망한다는', freq: 2 },
  { text: '정리한', freq: 2 },
  { text: '유일한', freq: 2 },
  { text: '알수', freq: 2 },
  { text: '있다이', freq: 2 },
  { text: '그', freq: 2 },
  { text: '등을', freq: 2 },
  { text: '몇', freq: 2 },
  { text: '최고의', freq: 2 },
  { text: '투자하면', freq: 2 },
  { text: '잦은', freq: 2 },
  { text: '완벽하게', freq: 2 },
  { text: '재테크를', freq: 2 },
  { text: '꼭', freq: 2 },
  { text: '적금식으로', freq: 2 },
  { text: '부자가되는', freq: 2 },
  { text: '바로', freq: 2 },
  { text: '투자금을', freq: 2 },
  { text: '자산간', freq: 2 },
  { text: '은퇴한', freq: 2 },
  { text: '보면', freq: 2 },
  { text: '제일', freq: 2 },
  { text: '주식으로', freq: 2 },
  { text: '사람은', freq: 2 },
  { text: '물론', freq: 2 },
  { text: '각', freq: 2 },
  { text: '장기투자하면', freq: 2 },
  { text: '에', freq: 2 },
  { text: '따라서', freq: 2 },
  { text: '가지', freq: 2 },
  { text: '책의', freq: 2 },
  { text: '년간', freq: 2 },
  { text: '화려했던', freq: 2 },
  { text: '대세하락과', freq: 2 },
  { text: '함께', freq: 2 },
  { text: '사실을', freq: 2 },
  { text: '사서', freq: 2 },
  { text: '팔고', freq: 2 },
  { text: '한다', freq: 2 },
  { text: '후', freq: 2 },
  { text: '순환매매에', freq: 2 },
  { text: '투자를', freq: 2 },
  { text: '분석한', freq: 2 },
  { text: '주도주가', freq: 2 },
  { text: '한국의', freq: 2 },
  { text: '이상', freq: 2 },
  { text: '이미', freq: 2 },
  { text: '단순히', freq: 2 },
  { text: '되는', freq: 2 },
  { text: '따라', freq: 2 },
  { text: '주가가', freq: 2 },
  { text: '같은', freq: 2 },
  { text: '형태로', freq: 2 },
  { text: '움직인다고', freq: 2 },
  { text: '다시는', freq: 2 },
  { text: '과거', freq: 2 },
  { text: '주가를', freq: 2 },
  { text: '같이', freq: 2 },
  { text: '아주', freq: 2 },
  { text: '가장', freq: 2 },
  { text: '팔게', freq: 2 },
  { text: '삼전도', freq: 2 },
  { text: '삼성전자', freq: 2 },
  { text: '다음주목요일', freq: 2 },
  { text: '종합지수', freq: 2 },
  { text: '참', freq: 2 },
  { text: '속보', freq: 2 },
  { text: '이게', freq: 2 },
  { text: '사실이면', freq: 2 },
  { text: '시총', freq: 2 },
  { text: '조', freq: 2 },
  { text: '판매승인', freq: 2 },
  { text: '신규상장한', freq: 2 },
  { text: '탑런토탈솔루션이', freq: 2 },
  { text: '자동차', freq: 2 },
  { text: '디스플레이를', freq: 2 },
  { text: '확인됐다일', freq: 2 },
  { text: '업계에', freq: 2 },
  { text: '탑런토탈솔루션은', freq: 2 },
  { text: '공급하면서', freq: 2 },
  { text: '기준', freq: 2 },
  { text: '약', freq: 2 },
  { text: '조원의', freq: 2 },
  { text: '판매량을', freq: 2 },
  { text: '기록하고', freq: 2 },
  { text: '있다사업보고서에', freq: 2 },
  { text: '탑런솔루션의', freq: 2 },
  { text: '주요', freq: 2 },
  { text: '고객사는', freq: 2 },
  { text: '최근', freq: 2 },
  { text: '깜짝', freq: 2 },
  { text: '실적을', freq: 2 },
  { text: '발표한', freq: 2 },
  { text: '테슬라가', freq: 2 },
  { text: '포함돼', freq: 2 },
  { text: '있다', freq: 2 },
  { text: '여기에', freq: 2 },
  { text: '다임러', freq: 2 },
  { text: '벤츠', freq: 2 },
  { text: '현대기아', freq: 2 },
  { text: '도요타', freq: 2 },
  { text: '혼다', freq: 2 },
  { text: '있다글로벌', freq: 2 },
  { text: '제품', freq: 2 },
  { text: '공급을', freq: 2 },
  { text: '하고', freq: 2 },
  { text: '파악되고', freq: 2 },
  { text: '있다배', freq: 2 },
  { text: '짜리', freq: 2 },
  { text: '재료', freq: 2 },
  { text: '실적년도', freq: 2 },
  { text: '분기', freq: 2 },
  { text: '기사', freq: 2 },
  { text: '금투세의', freq: 1 },
  { text: '폐해못지않게불확실', freq: 1 },
  { text: '요소의', freq: 1 },
  { text: '제거가긍정적이라', freq: 1 },
  { text: '본다야', freq: 1 },
  { text: '대표가', freq: 1 },
  { text: '말했듯잘', freq: 1 },
  { text: '못된제도는고쳐야', freq: 1 },
  { text: '한다개선의', freq: 1 },
  { text: '속도를빠르게', freq: 1 },
  { text: '할', freq: 1 },
  { text: '필요가', freq: 1 },
  { text: '있다고', freq: 1 },
  { text: '본다이제기업들실적이', freq: 1 },
  { text: '중요하다켄센서스에근접하거나능가하는우리', freq: 1 },
  { text: '기업들의분발을', freq: 1 },
  { text: '기대해', freq: 1 },
  { text: '본다', freq: 1 },
  { text: '우리나라복지정책거기에필요한', freq: 1 },
  { text: '재원은국민들이', freq: 1 },
  { text: '내는', freq: 1 },
  { text: '세금일진데다른', freq: 1 },
  { text: '나라에서 도외국인이', freq: 1 },
  { text: '집을', freq: 1 },
  { text: '대출해', freq: 1 },
  { text: '주나집값이', freq: 1 },
  { text: '내리면외국인도', freq: 1 },
  { text: '힘들어', freq: 1 },
  {
    text: '지겠지근데오르면이들은대박인가어쨋던내국인과외국인의차이가필요한',
    value: 1,
  },
  { text: '부분에', freq: 1 },
  { text: '대한점검이', freq: 1 },
  { text: '보인다', freq: 1 },
  { text: '금투세를', freq: 1 },
  { text: '폐지', freq: 1 },
  { text: '한다케도답이', freq: 1 },
  { text: '나오기', freq: 1 },
  { text: '힘든', freq: 1 },
  { text: '시장임대만하고', freq: 1 },
  { text: '한국하고', freq: 1 },
  { text: '같았는데대만은', freq: 1 },
  { text: '수직으러', freq: 1 },
  { text: '올라갔는데한국만', freq: 1 },
  { text: '비리비리', freq: 1 },
  { text: '한건한국시장은', freq: 1 },
  { text: '쓰레기장이라는', freq: 1 },
  { text: '거임', freq: 1 },
  { text: 'ㅋㅋㅋ쓰레기를', freq: 1 },
  { text: '걷어내는', freq: 1 },
  { text: '사람이', freq: 1 },
  { text: '영원히', freq: 1 },
  { text: '안', freq: 1 },
  { text: '나올성', freq: 1 },
  { text: '싶은데한국의', freq: 1 },
  { text: '정서를', freq: 1 },
  { text: '생각하면', freq: 1 },
  { text: '말야그래서', freq: 1 },
  { text: '말인데쓰레기장에서', freq: 1 },
  { text: '종이나', freq: 1 },
  { text: '줍는', freq: 1 },
  { text: '나는', freq: 1 },
  { text: '아무래도', freq: 1 },
  { text: '넝마꾼인개벼', freq: 1 },
  { text: '장기보유하면', freq: 1 },
  { text: '깍아주던', freq: 1 },
  { text: '세금을은근술쩍', freq: 1 },
  { text: '없애고지속적인게', freq: 1 },
  { text: '늘', freq: 1 },
  { text: '시장이', freq: 1 },
  { text: '개판이지', freq: 1 },
  { text: '주식과', freq: 1 },
  { text: '등에', freq: 1 },
  { text: '장기투자', freq: 1 },
  { text: '망한다하지만', freq: 1 },
  { text: '주식부자로아이를키우는', freq: 1 },
  { text: '찾았다정년', freq: 1 },
  { text: '곳에도', freq: 1 },
  { text: '투자하지', freq: 1 },
  { text: '말라고한다', freq: 1 },
  { text: '년씩', freq: 1 },
  { text: '사는데', freq: 1 },
  { text: '투자법을', freq: 1 },
  { text: '찾았다누구나', freq: 1 },
  { text: '자자손손', freq: 1 },
  { text: '대물려가며', freq: 1 },
  { text: '평생동안', freq: 1 },
  { text: '법이', freq: 1 },
  { text: '없을까주식을', freq: 1 },
  { text: '없을까정년후에도', freq: 1 },
  { text: '안전하게', freq: 1 },
  { text: '등으로', freq: 1 },
  { text: '불리며', freq: 1 },
  { text: '놀고', freq: 1 },
  { text: '없을까있다어느', freq: 1 },
  { text: '경우에나누구나항상성공하는', freq: 1 },
  { text: '성공투자법을', freq: 1 },
  { text: '찾았다주식투자가', freq: 1 },
  { text: '어려운', freq: 1 },
  { text: '이유는', freq: 1 },
  { text: '경기변동에', freq: 1 },
  { text: '등의', freq: 1 },
  { text: '폭락', freq: 1 },
  { text: '때문이었다그', freq: 1 },
  { text: '직접', freq: 1 },
  { text: '긴', freq: 1 },
  { text: '세월동안', freq: 1 },
  { text: '경험하고', freq: 1 },
  { text: '연구해', freq: 1 },
  { text: '최종적으로', freq: 1 },
  { text: '결론에', freq: 1 },
  { text: '이르렀던', freq: 1 },
  { text: '단순한', freq: 1 },
  { text: '장기투자자는', freq: 1 },
  { text: '사실이었다그러나', freq: 1 },
  { text: '번에', freq: 1 },
  { text: '저자가', freq: 1 },
  { text: '최초로', freq: 1 },
  { text: '성공시킬수', freq: 1 },
  { text: '방법임을', freq: 1 },
  { text: '간단히', freq: 1 },
  { text: '있다게다가', freq: 1 },
  { text: '정년퇴직', freq: 1 },
  { text: '투자해서', freq: 1 },
  { text: '맘놓고', freq: 1 },
  { text: '재산을', freq: 1 },
  { text: '불려가며', freq: 1 },
  { text: '따뜻하고', freq: 1 },
  { text: '여유로운', freq: 1 },
  { text: '여생을', freq: 1 },
  { text: '즐기는', freq: 1 },
  { text: '투자방법임을', freq: 1 },
  { text: '방법들을', freq: 1 },
  { text: '찾기위해저자는', freq: 1 },
  { text: '년간의', freq: 1 },
  { text: '투자경험과', freq: 1 },
  { text: '연구된', freq: 1 },
  { text: '기법들을', freq: 1 },
  { text: '모으고', freq: 1 },
  { text: '미시거시경제경영학', freq: 1 },
  { text: '회계학', freq: 1 },
  { text: '재무관리학법학철학', freq: 1 },
  { text: '융합해서', freq: 1 },
  { text: '연구분석', freq: 1 },
  { text: '해보니', freq: 1 },
  { text: '년전부터', freq: 1 },
  { text: '이제서야', freq: 1 },
  { text: '가능해졌다는', freq: 1 },
  { text: '걸', freq: 1 },
  { text: '알게', freq: 1 },
  { text: '되었다바로', freq: 1 },
  { text: '버핏도', freq: 1 },
  { text: '극찬한', freq: 1 },
  { text: '인류', freq: 1 },
  { text: '발명품', freq: 1 },
  { text: '활용해서다즉', freq: 1 },
  { text: '매매를', freq: 1 },
  { text: '통해', freq: 1 },
  { text: '정기적금식으로', freq: 1 },
  { text: '심리변동에', freq: 1 },
  { text: '매매욕구를', freq: 1 },
  { text: '없앨수', freq: 1 },
  { text: '있고오르거나', freq: 1 },
  { text: '내리거나를', freq: 1 },
  { text: '막론하고', freq: 1 },
  { text: '매매가', freq: 1 },
  { text: '가능하므로', freq: 1 },
  { text: '눈감고', freq: 1 },
  { text: '투자할', freq: 1 },
  { text: '있으며자자손손', freq: 1 },
  { text: '평생부자로', freq: 1 },
  { text: '살', freq: 1 },
  { text: '지식이', freq: 1 },
  { text: '전혀없는', freq: 1 },
  { text: '유치원생들과별도로', freq: 1 },
  { text: '공부하지않은경제학', freq: 1 },
  { text: '박사들도', freq: 1 },
  { text: '투자결과가', freq: 1 },
  { text: '같으며똑같이', freq: 1 },
  { text: '유용한', freq: 1 },
  { text: '방법이다즉매월', freq: 1 },
  { text: '사', freq: 1 },
  { text: '모으기만하면', freq: 1 },
  { text: '주식투자법이다재테크로', freq: 1 },
  { text: '방법은', freq: 1 },
  { text: '투자법주식아파트달러예금', freq: 1 },
  { text: '국채', freq: 1 },
  { text: '순서로', freq: 1 },
  { text: '순환이다', freq: 1 },
  { text: '빅사이클에', freq: 1 },
  { text: '순환투자를', freq: 1 },
  { text: '하지않아도', freq: 1 },
  { text: '되므로이는', freq: 1 },
  { text: '게으른', freq: 1 },
  { text: '투자자들을', freq: 1 },
  { text: '부자로만들어주는가장', freq: 1 },
  { text: '간편한', freq: 1 },
  { text: '주식투자법이다', freq: 1 },
  { text: '하지만', freq: 1 },
  { text: '로', freq: 1 },
  { text: '주식투자도', freq: 1 },
  { text: '장기적으로는', freq: 1 },
  { text: '벌', freq: 1 },
  { text: '있다아이나', freq: 1 },
  { text: '투자자들도', freq: 1 },
  { text: '만들어준다로', freq: 1 },
  { text: '주식투자는', freq: 1 },
  { text: '부도나', freq: 1 },
  { text: '상장폐지도', freq: 1 },
  { text: '당연히', freq: 1 },
  { text: '망하지도', freq: 1 },
  { text: '않는다시중에는', freq: 1 },
  { text: '별의별', freq: 1 },
  { text: '주식투자기법으로', freq: 1 },
  { text: '빌딩으로', freq: 1 },
  { text: '아파트로', freq: 1 },
  { text: '연립주택투자로', freq: 1 },
  { text: '대성공했다는', freq: 1 },
  { text: '사람들의', freq: 1 },
  { text: '광고가', freq: 1 },
  { text: '넘쳐나지만이', freq: 1 },
  { text: '광고들의', freq: 1 },
  { text: '는', freq: 1 },
  { text: '거짓말들이다또한', freq: 1 },
  { text: '어줍잖은', freq: 1 },
  { text: '전문가들은', freq: 1 },
  { text: '된다고', freq: 1 },
  { text: '떠든다결과만', freq: 1 },
  { text: '놓고', freq: 1 },
  { text: '쌀때', freq: 1 },
  { text: '시세와', freq: 1 },
  { text: '비쌀', freq: 1 },
  { text: '때를', freq: 1 },
  { text: '비교하니', freq: 1 },
  { text: '그렇게', freq: 1 },
  { text: '보일뿐이다과연', freq: 1 },
  { text: '그럴까천만에', freq: 1 },
  { text: '말씀이다그들의', freq: 1 },
  { text: '말처럼', freq: 1 },
  { text: '된다면', freq: 1 },
  { text: '누가', freq: 1 },
  { text: '망하겠는가단순히', freq: 1 },
  { text: '망하는게', freq: 1 },
  { text: '주식이었다정확히', freq: 1 },
  { text: '말해서', freq: 1 },
  { text: '장기투자해서', freq: 1 },
  { text: '돈', freq: 1 },
  { text: '없다주식은', freq: 1 },
  { text: '달러나', freq: 1 },
  { text: '국채도', freq: 1 },
  { text: '곳에서만', freq: 1 },
  { text: '조족지혈의', freq: 1 },
  { text: '수익밖에', freq: 1 },
  { text: '못', freq: 1 },
  { text: '챙긴다즉', freq: 1 },
  { text: '벌려면', freq: 1 },
  { text: '투자법에', freq: 1 },
  { text: '맞춰', freq: 1 },
  { text: '교체투자해야', freq: 1 },
  { text: '것이다기업에도', freq: 1 },
  { text: '인간세상', freq: 1 },
  { text: '처럼', freq: 1 },
  { text: '생로병사', freq: 1 },
  { text: '흥망성쇄숏텀롱텀디플레가', freq: 1 },
  { text: '주기적으로', freq: 1 },
  { text: '찾아오기', freq: 1 },
  { text: '때문에그냥', freq: 1 },
  { text: '장투만', freq: 1 },
  { text: '한다면', freq: 1 },
  { text: '망한다기업은', freq: 1 },
  { text: '흔히', freq: 1 },
  { text: '부도가', freq: 1 },
  { text: '나서', freq: 1 },
  { text: '사라지고', freq: 1 },
  { text: '전성기를', freq: 1 },
  { text: '지나면서', freq: 1 },
  { text: '찌그러들어', freq: 1 },
  { text: '완전히깡통이', freq: 1 },
  { text: '되어', freq: 1 },
  { text: '경우가', freq: 1 },
  { text: '너무', freq: 1 },
  { text: '많다게다가', freq: 1 },
  { text: '욕심에', freq: 1 },
  { text: '매매로', freq: 1 },
  { text: '수수료로', freq: 1 },
  { text: '거래세로', freq: 1 },
  { text: '날라간다이제는', freq: 1 },
  { text: '주식아파트달러', freq: 1 },
  { text: '예금국채의', freq: 1 },
  { text: '투자요령을', freq: 1 },
  { text: '동시에', freq: 1 },
  { text: '한권의', freq: 1 },
  { text: '책으로', freq: 1 },
  { text: '익힐', freq: 1 },
  { text: '있다재테크', freq: 1 },
  { text: '요령은', freq: 1 },
  { text: '재산만', freq: 1 },
  { text: '순환투자', freq: 1 },
  { text: '순서에', freq: 1 },
  { text: '맞춰투자하고', freq: 1 },
  { text: '회수할', freq: 1 },
  { text: '줄', freq: 1 },
  { text: '알면', freq: 1 },
  { text: '된다특히', freq: 1 },
  { text: '부록의', freq: 1 },
  { text: '달러투자법만', freq: 1 },
  { text: '제대로', freq: 1 },
  { text: '이해해도', freq: 1 },
  { text: '키울', freq: 1 },
  { text: '있다한국', freq: 1 },
  { text: '주식시장은', freq: 1 },
  { text: '년에', freq: 1 },
  { text: '씩', freq: 1 },
  { text: '주도주를', freq: 1 },
  { text: '중심으로', freq: 1 },
  { text: '코스피', freq: 1 },
  { text: '대폭', freq: 1 },
  { text: '오른다주도주는', freq: 1 },
  { text: '오르며', freq: 1 },
  { text: '상승폭은', freq: 1 },
  { text: '보통', freq: 1 },
  { text: '배다주도주가', freq: 1 },
  { text: '꺾이면', freq: 1 },
  { text: '대개', freq: 1 },
  { text: '상승장은', freq: 1 },
  { text: '끝난다', freq: 1 },
  { text: '인기종목인', freq: 1 },
  { text: '매번', freq: 1 },
  { text: '까지', freq: 1 },
  { text: '폭락한다는', freq: 1 },
  { text: '놀라운', freq: 1 },
  { text: '명심하기', freq: 1 },
  { text: '바란다그래서', freq: 1 },
  { text: '어떤', freq: 1 },
  { text: '주식이든', freq: 1 },
  { text: '보유하면', freq: 1 },
  { text: '저절로', freq: 1 },
  { text: '깡통', freq: 1 },
  { text: '계좌가', freq: 1 },
  { text: '된다주도주가', freq: 1 },
  { text: '내릴', freq: 1 },
  { text: '물론이고기타', freq: 1 },
  { text: '주식은', freq: 1 },
  { text: '내리기', freq: 1 },
  { text: '때문이다이', freq: 1 },
  { text: '망하지', freq: 1 },
  { text: '않으려면보유중인', freq: 1 },
  { text: '아파트를', freq: 1 },
  { text: '사야', freq: 1 },
  { text: '달러와', freq: 1 },
  { text: '국채로', freq: 1 },
  { text: '들어', freq: 1 },
  { text: '가거나', freq: 1 },
  { text: '아니면', freq: 1 },
  { text: '당분간은주식투자와', freq: 1 },
  { text: '쉬어야', freq: 1 },
  { text: '한다이러지', freq: 1 },
  { text: '않으면', freq: 1 },
  { text: '망한다한국의', freq: 1 },
  { text: '경기순환', freq: 1 },
  { text: '년간을', freq: 1 },
  { text: '결과이다따라서', freq: 1 },
  { text: '틀릴', freq: 1 },
  { text: '가능성은', freq: 1 },
  { text: '내외다사람의', freq: 1 },
  { text: '욕심은', freq: 1 },
  { text: '무한하므로', freq: 1 },
  { text: '투자자는', freq: 1 },
  { text: '주도주만을', freq: 1 },
  { text: '매매하고', freq: 1 },
  { text: '싶어하고', freq: 1 },
  { text: '주도주의', freq: 1 },
  { text: '화려함에', freq: 1 },
  { text: '취한', freq: 1 },
  { text: '사람은주도주가폭락을', freq: 1 },
  { text: '해도', freq: 1 },
  { text: '팔지', freq: 1 },
  { text: '못하고', freq: 1 },
  { text: '오를', freq: 1 },
  { text: '생각하기', freq: 1 },
  { text: '쉽지만한', freq: 1 },
  { text: '주도주로', freq: 1 },
  { text: '나섰던', freq: 1 },
  { text: '미국', freq: 1 },
  { text: '다우의', freq: 1 },
  { text: '주식이나', freq: 1 },
  { text: '업종을', freq: 1 },
  { text: '결과다시', freq: 1 },
  { text: '확율은에', freq: 1 },
  { text: '불과하다이', freq: 1 },
  { text: '분석은', freq: 1 },
  { text: '한국에도', freq: 1 },
  { text: '그대로', freq: 1 },
  { text: '적용할', freq: 1 },
  { text: '있다따라서', freq: 1 },
  { text: '나서야하는', freq: 1 },
  { text: '것이다이', freq: 1 },
  { text: '전에', freq: 1 },
  { text: '건설주', freq: 1 },
  { text: '증권주은행주', freq: 1 },
  { text: '트로이카주의', freq: 1 },
  { text: '몰락을', freq: 1 },
  { text: '보라', freq: 1 },
  { text: '주', freq: 1 },
  { text: '조선주풍력주태양광주', freq: 1 },
  { text: '보유했다면', freq: 1 },
  { text: '분의', freq: 1 },
  { text: '가격이다어줍잖은', freq: 1 },
  { text: '전문가라는', freq: 1 },
  { text: '사람들', freq: 1 },
  { text: '말', freq: 1 },
  { text: '믿고', freq: 1 },
  { text: '장기투자를', freq: 1 },
  { text: '폭싹', freq: 1 },
  { text: '이로써', freq: 1 },
  { text: '확인된다여러', freq: 1 },
  { text: '이유가', freq: 1 },
  { text: '있지만몇', freq: 1 },
  { text: '사이에', freq: 1 },
  { text: '주도산업들은', freq: 1 },
  { text: '경쟁이', freq: 1 },
  { text: '극심한', freq: 1 },
  { text: '업종이나', freq: 1 },
  { text: '산업이', freq: 1 },
  { text: '것', freq: 1 },
  { text: '때문이다그래서', freq: 1 },
  { text: '폭등장이', freq: 1 },
  { text: '끝나면서', freq: 1 },
  { text: '반드시', freq: 1 },
  { text: '주식시장을', freq: 1 },
  { text: '완전히', freq: 1 },
  { text: '떠나', freq: 1 },
  { text: '아파트달러예금국채의', freq: 1 },
  { text: '순서대로', freq: 1 },
  { text: '을', freq: 1 },
  { text: '따라서투자법에', freq: 1 },
  { text: '바퀴', freq: 1 },
  { text: '자금을', freq: 1 },
  { text: '돌리거나', freq: 1 },
  { text: '최소한', freq: 1 },
  { text: '인버스로', freq: 1 },
  { text: '바꿔줘야', freq: 1 },
  { text: '순환매매도', freq: 1 },
  { text: '하지않는', freq: 1 },
  { text: '이런', freq: 1 },
  { text: '이유와', freq: 1 },
  { text: '욕심', freq: 1 },
  { text: '때문에전문가들의', freq: 1 },
  { text: '주식투자', freq: 1 },
  { text: '성적은', freq: 1 },
  { text: '원숭이', freq: 1 },
  { text: '보다도', freq: 1 },
  { text: '못한', freq: 1 },
  { text: '것이다그리고차트쟁이들이', freq: 1 },
  { text: '너무나', freq: 1 },
  { text: '당연한', freq: 1 },
  { text: '것이다특정의', freq: 1 },
  { text: '과거와', freq: 1 },
  { text: '가정하는', freq: 1 },
  { text: '이들이야말로', freq: 1 },
  { text: '정말로', freq: 1 },
  { text: '순진한', freq: 1 },
  { text: '투자자들이다주식은', freq: 1 },
  { text: '없다고', freq: 1 },
  { text: '봐야하며주가는', freq: 1 },
  { text: '반복되지', freq: 1 },
  { text: '않는다차트로', freq: 1 },
  { text: '지나온', freq: 1 },
  { text: '일견할', freq: 1 },
  { text: '수는', freq: 1 },
  { text: '있지만', freq: 1 },
  { text: '변동의', freq: 1 },
  { text: '궤적처럼', freq: 1 },
  { text: '미래에도', freq: 1 },
  { text: '전제히고미래', freq: 1 },
  { text: '예측하는', freq: 1 },
  { text: '한마디로', freq: 1 },
  { text: '미친', freq: 1 },
  { text: '짓이다재테크라는', freq: 1 },
  { text: '학문이', freq: 1 },
  { text: '없기도', freq: 1 },
  { text: '하지만경영학', freq: 1 },
  { text: '박사든', freq: 1 },
  { text: '경제학박사든', freq: 1 },
  { text: '증권사', freq: 1 },
  { text: '직원이든', freq: 1 },
  { text: '애널리스트든', freq: 1 },
  { text: '별도로', freq: 1 },
  { text: '공부하거나', freq: 1 },
  { text: '경험을', freq: 1 },
  { text: '쌓지', freq: 1 },
  { text: '않으면그들의', freq: 1 },
  { text: '투자결과도', freq: 1 },
  { text: '개미투자자들보다', freq: 1 },
  { text: '나을', freq: 1 },
  { text: '게', freq: 1 },
  { text: '없다는', freq: 1 },
  { text: '것이다그나마', freq: 1 },
  { text: '이것이', freq: 1 },
  { text: '개미들에겐', freq: 1 },
  { text: '위안인', freq: 1 },
  { text: '셈이다그러나대세하락세든', freq: 1 },
  { text: '대세상승세든', freq: 1 },
  { text: '저자의', freq: 1 },
  { text: '투자법으로', freq: 1 },
  { text: '재테크지식과도', freq: 1 },
  { text: '관계없이경기와도', freq: 1 },
  { text: '관계없이누구나', freq: 1 },
  { text: '될수있다는', freq: 1 },
  { text: '점이다펜타곤투자법', freq: 1 },
  { text: '순환투자가', freq: 1 },
  { text: '귀찮거나', freq: 1 },
  { text: '순환투자방법을', freq: 1 },
  { text: '잘', freq: 1 },
  { text: '모르면욕심을', freq: 1 },
  { text: '버리고', freq: 1 },
  { text: '워런', freq: 1 },
  { text: '버핏처럼', freq: 1 },
  { text: '생필품', freq: 1 },
  { text: '주식에만', freq: 1 },
  { text: '성공할', freq: 1 },
  { text: '가능성이', freq: 1 },
  { text: '있음은', freq: 1 },
  { text: '그가', freq: 1 },
  { text: '증명해', freq: 1 },
  { text: '주었다주식이', freq: 1 },
  { text: '뭔지도', freq: 1 },
  { text: '모르면서도', freq: 1 },
  { text: '내', freq: 1 },
  { text: '간단한', freq: 1 },
  { text: '비법과은퇴후에도', freq: 1 },
  { text: '맘놓고재산을', freq: 1 },
  { text: '늘려가는', freq: 1 },
  { text: '투자비법은', freq: 1 },
  { text: '국내', freq: 1 },
  { text: '재태크', freq: 1 },
  { text: '종합서주식아파트달러예금국채의', freq: 1 },
  { text: '대', freq: 1 },
  { text: '투자대상', freq: 1 },
  { text: '자산', freq: 1 },
  { text: '요령부의', freq: 1 },
  { text: '창조', freq: 1 },
  { text: '히든스토리', freq: 1 },
  { text: '시작해도', freq: 1 },
  { text: '투자법어린이를', freq: 1 },
  { text: '평생', freq: 1 },
  { text: '투자비법', freq: 1 },
  { text: '있다라는', freq: 1 },
  { text: '책이다이', freq: 1 },
  { text: '부록에는노부부가', freq: 1 },
  { text: '억으로', freq: 1 },
  { text: '년을', freq: 1 },
  { text: '넉넉하게', freq: 1 },
  { text: '투자법도', freq: 1 },
  { text: '소개되어', freq: 1 },
  { text: '있다페이지로', freq: 1 },
  { text: '대재산에', freq: 1 },
  { text: '투자하는', freq: 1 },
  { text: '요령을', freq: 1 },
  { text: '총정리한', freq: 1 },
  { text: '종합서이다이', freq: 1 },
  { text: '책', freq: 1 },
  { text: '한권으로', freq: 1 },
  { text: '주식아파트달러스왑예금국채투자요령을', freq: 1 },
  { text: '전문가', freq: 1 },
  { text: '수준으로', freq: 1 },
  { text: '익힐수', freq: 1 },
  { text: '있다책의', freq: 1 },
  { text: '이론에', freq: 1 },
  { text: '특정에', freq: 1 },
  { text: '장기투자하기만', freq: 1 },
  { text: '투자에', freq: 1 },
  { text: '성공한다전문가들', freq: 1 },
  { text: '말을', freq: 1 },
  { text: '듣고', freq: 1 },
  { text: '달러', freq: 1 },
  { text: '국채의', freq: 1 },
  { text: '현물', freq: 1 },
  { text: '종목에', freq: 1 },
  { text: '직접투자하면', freq: 1 },
  { text: '가', freq: 1 },
  { text: '망한다특히', freq: 1 },
  { text: '하나', freq: 1 },
  { text: '유의할', freq: 1 },
  { text: '점은주식투자는', freq: 1 },
  { text: '위험하다고', freq: 1 },
  { text: '주식투자를', freq: 1 },
  { text: '아예', freq: 1 },
  { text: '피하면', freq: 1 },
  { text: '가난해진다는', freq: 1 },
  { text: '사실도', freq: 1 },
  { text: '자세히', freq: 1 },
  { text: '설명해', freq: 1 },
  { text: '두었다주식이', freq: 1 },
  { text: '없다면', freq: 1 },
  { text: '쯤', freq: 1 },
  { text: '지난', freq: 1 },
  { text: '실제로는', freq: 1 },
  { text: '차이가', freq: 1 },
  { text: '난다또장기간에', freq: 1 },
  { text: '걸쳐', freq: 1 },
  { text: '배', freq: 1 },
  { text: '폭등한', freq: 1 },
  { text: '우량주인', freq: 1 },
  { text: '삼성전자에', freq: 1 },
  { text: '투자해도', freq: 1 },
  { text: '이유는숏텀디플레나', freq: 1 },
  { text: '롱텀디플레이션이', freq: 1 },
  { text: '왔을', freq: 1 },
  { text: '때개미들은', freq: 1 },
  { text: '버티고', freq: 1 },
  { text: '버티다가', freq: 1 },
  { text: '결국에는', freq: 1 },
  { text: '쌀', freq: 1 },
  { text: '일반', freq: 1 },
  { text: '대중들과', freq: 1 },
  { text: '되어서', freq: 1 },
  { text: '그렇다위기시에는', freq: 1 },
  { text: '다른', freq: 1 },
  { text: '주식처럼', freq: 1 },
  { text: '폭락하고', freq: 1 },
  { text: '돈이', freq: 1 },
  { text: '다같은', freq: 1 },
  { text: '바닥시세로', freq: 1 },
  { text: '팔게되는', freq: 1 },
  { text: '것이다결국', freq: 1 },
  { text: '불경기', freq: 1 },
  { text: '싸게', freq: 1 },
  { text: '다같이', freq: 1 },
  { text: '것이다기업이나', freq: 1 },
  { text: '펀드자금도', freq: 1 },
  { text: '규정을', freq: 1 },
  { text: '준수해야만하는자금이다', freq: 1 },
  { text: '즉', freq: 1 },
  { text: '바닥시세일', freq: 1 },
  { text: '개인이나', freq: 1 },
  { text: '기관들도', freq: 1 },
  { text: '팔아야만', freq: 1 },
  { text: '한다지금에', freq: 1 },
  { text: '와서', freq: 1 },
  { text: '주가는', freq: 1 },
  { text: '상승만을', freq: 1 },
  { text: '것처럼', freq: 1 },
  { text: '보이지만', freq: 1 },
  { text: '매', freq: 1 },
  { text: '불경기마다', freq: 1 },
  { text: '이상씩', freq: 1 },
  { text: '폭락을', freq: 1 },
  { text: '바닥에서', freq: 1 },
  { text: '다시', freq: 1 },
  { text: '상승을', freq: 1 },
  { text: '하여', freq: 1 },
  { text: '현재', freq: 1 },
  { text: '가격이', freq: 1 },
  { text: '된', freq: 1 },
  { text: '것이다', freq: 1 },
  { text: '바닥시세에서', freq: 1 },
  { text: '최고시세까지를다', freq: 1 },
  { text: '먹으려면', freq: 1 },
  { text: '기본적으로', freq: 1 },
  { text: '바닥에', freq: 1 },
  { text: '이상을', freq: 1 },
  { text: '계속보유하여야', freq: 1 },
  { text: '것이다이들이', freq: 1 },
  { text: '장투로', freq: 1 },
  { text: '성공한', freq: 1 },
  { text: '의', freq: 1 },
  { text: '사람들이다여유자금으로', freq: 1 },
  { text: '투자하라고', freq: 1 },
  { text: '떠들지만돈에', freq: 1 },
  { text: '여유가', freq: 1 },
  { text: '세상에', freq: 1 },
  { text: '아무도', freq: 1 },
  { text: '없다재벌도', freq: 1 },
  { text: '마찬가지이다인간은', freq: 1 },
  { text: '욕심이', freq: 1 },
  { text: '끝이', freq: 1 },
  { text: '없기', freq: 1 },
  { text: '때문이다따라서항상', freq: 1 },
  { text: '사고', freq: 1 },
  { text: '파는', freq: 1 },
  { text: '알아야', freq: 1 },
  { text: '한다투자기간', freq: 1 },
  { text: '동안의', freq: 1 },
  { text: '평균가격으로', freq: 1 },
  { text: '팔아도', freq: 1 },
  { text: '팔게된다자녀를', freq: 1 },
  { text: '키우고', freq: 1 },
  { text: '싶은', freq: 1 },
  { text: '사람이나이미', freq: 1 },
  { text: '사람도저자가', freq: 1 },
  { text: '펜타곤투자법으로', freq: 1 },
  { text: '하면언제나', freq: 1 },
  { text: '경제', freq: 1 },
  { text: '성장율', freq: 1 },
  { text: '이상의', freq: 1 },
  { text: '수익은', freq: 1 },
  { text: '보장된다는', freq: 1 },
  { text: '점이다', freq: 1 },
  { text: '늬우스', freq: 1 },
  { text: '정확히', freq: 1 },
  { text: '입니다', freq: 1 },
  { text: '옵션만기일에까지', freq: 1 },
  { text: '오릅니다무조건', freq: 1 },
  { text: '강력추가매수하세요오늘도에코프로', freq: 1 },
  { text: '초급등보셨죠', freq: 1 },
  { text: '잘못', freq: 1 },
  { text: '뽑으면', freq: 1 },
  { text: '골로', freq: 1 },
  { text: '가는겨한반도를', freq: 1 },
  { text: '몇번', freq: 1 },
  { text: '망하게', freq: 1 },
  { text: '애들이', freq: 1 },
  { text: '정치인이자나핵겨', freq: 1 },
  { text: '댕길때국사공부를', freq: 1 },
  { text: '가슴이', freq: 1 },
  { text: '존나', freq: 1 },
  { text: '답답하지', freq: 1 },
  { text: '안았남개죽을', freq: 1 },
  { text: '먹다가쉬어터진', freq: 1 },
  { text: '반찬을', freq: 1 },
  { text: '넣고', freq: 1 },
  { text: '비벼서', freq: 1 },
  { text: '비빔밥을', freq: 1 },
  { text: '기분이랄까', freq: 1 },
  { text: '부자시끼들이', freq: 1 },
  { text: '봉이냐', freq: 1 },
  { text: '오징어게임', freq: 1 },
  { text: '예고편잘', freq: 1 },
  { text: '봐바래몽래인이정재예고편만', freq: 1 },
  { text: '봐도', freq: 1 },
  { text: '흥미가', freq: 1 },
  { text: '만땅이다', freq: 1 },
  { text: '햇엇으니을매나', freq: 1 },
  { text: '드런', freq: 1 },
  { text: '시장였나', freq: 1 },
  { text: '한번했던', freq: 1 },
  { text: '놈은', freq: 1 },
  { text: '습관적으로', freq: 1 },
  { text: '발작을', freq: 1 },
  { text: '일으킴', freq: 1 },
  { text: '인간들이', freq: 1 },
  { text: '어리석다는', freq: 1 },
  { text: '말밖에그래서', freq: 1 },
  { text: '그림', freq: 1 },
  { text: '그릴줄', freq: 1 },
  { text: '알고운전을', freq: 1 },
  { text: '잘하는', freq: 1 },
  { text: '애들로국회에', freq: 1 },
  { text: '입성하게', freq: 1 },
  { text: '해야함', freq: 1 },
  {
    text: '외국애들은다덜부자가대가는데한국놈들만쪽빡차게하는이유가뭐야기회비용',
    value: 1,
  },
  { text: '날라가고', freq: 1 },
  { text: '우야꼬', freq: 1 },
  { text: '재료인데탑런토탈솔루션', freq: 1 },
  { text: '년째', freq: 1 },
  { text: '실적랠리', freq: 1 },
  { text: '중인데도주가는', freq: 1 },
  { text: '상장이래', freq: 1 },
  { text: '사상최저가액면가', freq: 1 },
  { text: '원대', freq: 1 },
  { text: '죽어있는', freq: 1 },
  { text: '종목년도', freq: 1 },
  { text: '매출실적년도', freq: 1 },
  { text: '매출실적월', freq: 1 },
  { text: '일', freq: 1 },
  { text: '보나마나', freq: 1 },
  { text: '분기매출실적이유는', freq: 1 },
  { text: '주문이', freq: 1 },
  { text: '쏟아진다는', freq: 1 },
  { text: '작년', freq: 1 },
  { text: '참고', freq: 1 },
  { text: '분기중에', freq: 1 },
  { text: '어마무시', freq: 1 },
  { text: '공장증설준공', freq: 1 },
  { text: '끝나전부', freq: 1 },
  { text: '경제지', freq: 1 },
  { text: '나온', freq: 1 },
  { text: '내용이라서중장기', freq: 1 },
  { text: '보유시', freq: 1 },
  { text: '기적의', freq: 1 },
  { text: '수익', freq: 1 },
  { text: '터진다텐배거종목', freq: 1 },
  { text: '집', freq: 1 },
  { text: '나간', freq: 1 },
  { text: '세력들', freq: 1 },
  { text: '들어오게', freq: 1 },
  { text: '오늘', freq: 1 },
  { text: '종가원어디', freq: 1 },
  { text: '소문내지마세요쉿', freq: 1 },
  { text: '움켜쥔', freq: 1 },
  { text: '모가지를', freq: 1 },
  { text: '풀어서', freq: 1 },
  { text: '조금', freq: 1 },
  { text: '살거', freq: 1 },
  { text: '같군', freq: 1 },
  { text: '재료인데뉴스탑런토탈솔루션', freq: 1 },
  { text: '판매탑런토탈솔루션', freq: 1 },
  { text: '너의', freq: 1 },
  { text: '고통은', freq: 1 },
  { text: '나의', freq: 1 },
  { text: '행복이자나ㅡㅜ', freq: 1 },
  { text: '주르륵', freq: 1 },
  { text: '세금낸걸로', freq: 1 },
  { text: '배급을', freq: 1 },
  { text: '받아서', freq: 1 },
  { text: '얼마나', freq: 1 },
  { text: '국민이', freq: 1 },
  { text: '잘살거라고', freq: 1 },
  { text: '보는겨', freq: 1 },
  { text: '미친듯', freq: 1 },
  { text: '폭등모하세요', freq: 1 },
  { text: '강력매수하세요', freq: 1 },
  { text: '미친급등이나옵니다', freq: 1 },
  { text: '쓰레기', freq: 1 },
  { text: '종목들을', freq: 1 },
  { text: '시장에', freq: 1 },
  { text: '너저분하게', freq: 1 },
  { text: '계속', freq: 1 },
  { text: '깔아대는데거래소가', freq: 1 },
  { text: '용량딸려서컴파는놈들', freq: 1 },
  { text: '물건', freq: 1 },
  { text: '팔아주는', freq: 1 },
  { text: '짓좀', freq: 1 },
  { text: '그만했으면', freq: 1 },
  { text: '싶네', freq: 1 },
  { text: '굼뜨게', freq: 1 },
  { text: '발표하네노인네', freq: 1 },
  { text: '아니랄까바미국이', freq: 1 },
  { text: '더좋다외국으로', freq: 1 },
  { text: '나갑시다', freq: 1 },
];

const StockWordCloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [wordCloud, postMessage] = useWorker({
    worker: new Worker(new URL('./StockWordCloudWorker.ts', import.meta.url), {
      type: 'module',
    }),
  });
  const [didMount, setDidMount] = useState<boolean>(false);

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    if (window.Worker) {
      if (!containerRef.current) return;
      postMessage({
        data: sample,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, [didMount]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '480px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {wordCloud
        ? wordCloud.map((e: WordCloudLayout, i: number) => {
            return (
              <WordContainer key={i} orientation={e.orientation ? 1 : 0} posX={e.position.x} posY={e.position.y} sizeX={e.size.w} sizeY={e.size.h}>
                <Word orientation={e.orientation ? 1 : 0} fontSize={e.fontSize} colors={e.color} delay={i}>
                  {e.word}
                </Word>
              </WordContainer>
            );
          })
        : ''}
    </div>
  );
};

export default StockWordCloud;
