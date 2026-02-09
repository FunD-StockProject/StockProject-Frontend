import { getDiffText } from '@utils/Number';
import { deltaToCaret } from '@utils/ScoreConvert';
import useAboutHumanZipyo from '@components/Modal/CenterTutorial/AboutHumanZipyo/useAboutHumanZipyo';
import GuageChart from '@components/Search/GuageChart/GuageChart';
import { useScoreQuery, useStockZipyoDataQuery } from '@controllers/stocks/query';
import { StockDetailInfo } from '@controllers/stocks/types';
import { StockItemContainer } from '../../Common.Style';
import StockItemTitle from '../../ItemTitle';
import {
  ZipyoContainer,
  ZipyoDescContainer,
  ZipyoGuageChartContainer,
  ZipyoSentimentContainer,
  ZipyoSentimentDesc,
} from './Zipyo.Style';

const StockZipyoPanel = ({ stockInfo: { stockId, country, symbolName } }: { stockInfo: StockDetailInfo }) => {
  const { data: stockScore } = useScoreQuery(stockId, country);
  const { data: zipyoData } = useStockZipyoDataQuery(stockId, country);
  const { Modal: AboutHumanZipyoModal, openModal: openAboutHumanZipyoModal } = useAboutHumanZipyo();

  if (!stockScore || !zipyoData) return null;

  const { industryName, industryAverage, stockRanking, monthlyAverage } = zipyoData;
  const monthlyAverageDiff = stockScore.score - monthlyAverage;
  const monthlyAverageDiffText = getDiffText({ valueDiff: monthlyAverageDiff });
  const sentiment = !monthlyAverageDiff ? '유지되고' : monthlyAverageDiff > 0 ? '개선되고' : '약화되고';
  const Caret = deltaToCaret(monthlyAverageDiff);

  return (
    <StockItemContainer>
      {AboutHumanZipyoModal}
      <StockItemTitle
        title="인간지표 점수"
        country={country}
        help={{ text: '인간지표 점수란 무엇인가요?', onClick: () => openAboutHumanZipyoModal() }}
      />
      <ZipyoContainer>
        <ZipyoDescContainer>
          <p>
            <b>({industryName})</b> 산업의 평균은 <b>{industryAverage}점</b> 이며,
            <br /> <b>({symbolName})</b>는 상위 <b>{stockRanking}%</b> 입니다.
          </p>
        </ZipyoDescContainer>
        <ZipyoGuageChartContainer>
          <GuageChart score={stockScore?.score ?? 0} />
          <p>※ 인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요.</p>
        </ZipyoGuageChartContainer>
        <ZipyoSentimentContainer>
          <p className="title">종목 분위기</p>
          <ZipyoSentimentDesc delta={monthlyAverageDiff}>
            <Caret /> 최근 한달 평균 대비 {monthlyAverageDiffText}점
            <br /> 해당 종목의 한 달 간의 평균 값은 ({monthlyAverage})점 입니다.
            <br />({symbolName})에 대한 투자자들의 심리가 {sentiment} 있어요.
          </ZipyoSentimentDesc>
        </ZipyoSentimentContainer>
      </ZipyoContainer>
    </StockItemContainer>
  );
};

export default StockZipyoPanel;
