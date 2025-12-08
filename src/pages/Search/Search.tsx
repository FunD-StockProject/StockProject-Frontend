import { useLocation } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { useQueryComponent } from '@hooks/useQueryComponent';
import SearchHeader from '@layout/SearchHeader/SearchHeader';
import { SmallStockCard } from '@components/CardList/StockCard/StockCard';
import { StockCardContainer, StockCardItem } from '@components/CardList/StockCard/StockCard.Style';
import useAboutAntVoice from '@components/Modal/CenterTutorial/AboutAntVoice/useAboutAntVoice';
import useAboutHumanZipyo from '@components/Modal/CenterTutorial/AboutHumanZipyo/useAboutHumanZipyo';
import GuageChart from '@components/Search/GuageChart/GuageChart';
import SearchTitle from '@components/Search/SearchTitle/SearchTitle';
import StockChart from '@components/Search/StockChart/StockChart';
import StockWordCloud from '@components/Search/StockWordCloud/StockWordCloud';
import { useRelevantStockFetchQuery, useScoreQuery, useSymbolNameSearchQuery } from '@controllers/stocks/query';
import { StockDetailInfo, StockInfo } from '@controllers/stocks/types';
import AlertSVG from '@assets/icons/alert.svg?react';
import InfoSVG from '@assets/icons/info.svg?react';
import {
  Divider,
  SearchResultAlertContainer,
  SearchResultChartContainer,
  SearchResultChartContents,
  SearchResultContainer,
  SearchResultContents,
  SearchResultGaugeChartContainer,
  SearchResultItemTtile,
  SearchResultRelevantContainer,
  SearchResultWordCloudContainer,
  SearchResultWordCloudContents,
} from './Search.Style';

const SearchResultGaugeChart = ({ stockInfo: { stockId, country } }: { stockInfo: StockDetailInfo }) => {
  const [stockScore, suspend] = useQueryComponent({ query: useScoreQuery(stockId, country) });

  if (suspend) return null;

  const { Modal: AboutHumanZipyoModal, openModal } = useAboutHumanZipyo();
  const handleOpenHumanZipyoModal = () => {
    openModal();
  };

  return (
    <SearchResultGaugeChartContainer>
      {AboutHumanZipyoModal}
      <SearchResultItemTtile>
        <div className="title-container">
          <p className="title">인간지표 점수</p>
          <p className="update-time">어제 08:24 기준</p>
        </div>
        <div className="info-container">
          <p>인간지표 점수란 무엇인가요?</p>
          <InfoSVG className="btn_info" onClick={handleOpenHumanZipyoModal} />
        </div>
      </SearchResultItemTtile>
      <GuageChart score={stockScore?.score ?? 0} />
      <SearchResultAlertContainer>
        <div>
          <AlertSVG />
          <p>인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요</p>
        </div>
      </SearchResultAlertContainer>
    </SearchResultGaugeChartContainer>
  );
};

const SearchResultChart = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  return (
    <SearchResultChartContainer>
      <SearchResultItemTtile>
        <div className="title-container">
          <p className="title">주식차트</p>
          <p className="update-time">어제 08:24 기준</p>
        </div>
      </SearchResultItemTtile>
      <SearchResultChartContents>
        <StockChart stockId={stockInfo.stockId} symbolName={stockInfo.symbolName} country={stockInfo.country} />
      </SearchResultChartContents>
    </SearchResultChartContainer>
  );
};

const SearchResultWordCloud = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const { Modal: AboutAntVoiceModal, openModal } = useAboutAntVoice();

  const handleOpenAntVoiceModal = () => {
    openModal();
  };

  return (
    <SearchResultWordCloudContainer>
      {AboutAntVoiceModal}
      <SearchResultItemTtile>
        <div className="title-container">
          <p className="title">자주 언급되는 단어</p>
          <p className="update-time">어제 08:24 기준</p>
        </div>
        <div className="info-container">
          <p>자주 언급되는 단어란 무엇인가요?</p>
          <InfoSVG className="btn_info" onClick={handleOpenAntVoiceModal} />
        </div>
      </SearchResultItemTtile>
      <SearchResultWordCloudContents>
        <StockWordCloud symbol={stockInfo.symbol} country={stockInfo.country} />
      </SearchResultWordCloudContents>
    </SearchResultWordCloudContainer>
  );
};

const StockRelevant = ({ stockId, country }: { stockId: number; country: StockCountryKey }) => {
  const [curRelevantStocks, suspend] = useQueryComponent({ query: useRelevantStockFetchQuery(stockId) });

  if (suspend) return null;

  return (
    <SearchResultRelevantContainer>
      <SearchResultItemTtile>
        <div className="title-container">
          <p className="title">이 종목과 점수가 비슷한 종목</p>
          <p className="update-time">어제 08:24 기준</p>
        </div>
      </SearchResultItemTtile>
      <StockCardContainer>
        {curRelevantStocks?.map((e: StockInfo) => (
          <StockCardItem key={`RELEVANT_STOCK_${e.stockId}`}>
            <SmallStockCard stock={e} country={country} />
          </StockCardItem>
        ))}
      </StockCardContainer>
    </SearchResultRelevantContainer>
  );
};

const Search = () => {
  const { state } = useLocation();
  const [stockInfo] = useQueryComponent({
    query: useSymbolNameSearchQuery(state?.symbolName, state?.country),
  });

  return (
    stockInfo && (
      <SearchResultContainer>
        <SearchHeader stockInfo={stockInfo} />
        <Divider />
        <SearchResultContents>
          <SearchTitle stockInfo={stockInfo} />
          <Divider />
          <SearchResultGaugeChart stockInfo={stockInfo} />
          <SearchResultChart stockInfo={stockInfo} />
          <SearchResultWordCloud stockInfo={stockInfo} />
          <Divider />
          <StockRelevant stockId={stockInfo.stockId} country={stockInfo.country} />
        </SearchResultContents>
      </SearchResultContainer>
    )
  );
};

export default Search;
