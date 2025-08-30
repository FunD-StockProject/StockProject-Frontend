import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ResultInfo } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import { RESULT_TYPE } from '@ts/Types';
import useModal from '@hooks/useModal';
import { useQueryComponent } from '@hooks/useQueryComponent';
import SearchHeader from '@layout/SearchHeader/SearchHeader';
import { SmallStockCard } from '@components/CardList/StockCard/StockCard';
import { StockCardContainer, StockCardItem } from '@components/CardList/StockCard/StockCard.Style';
import AntVoicePopUp from '@components/PopUp/AntiVoicePopUp/AntVoicePopUp';
import ZipyoPopup from '@components/PopUp/ZipyoPopUp/ZipyoPopUp';
import GuageChart from '@components/Search/GuageChart/GuageChart';
import SearchTitle from '@components/Search/SearchTitle/SearchTitle';
import StockChart from '@components/Search/StockChart/StockChart';
import StockWordCloud from '@components/Search/StockWordCloud/StockWordCloud';
import { StockDetailInfo, StockInfo } from '@controllers/api.Type';
import { useRelevantStockFetchQuery, useScoreQuery, useSymbolNameSearchQuery } from '@controllers/query';
import { useAddBookmarkMutation } from '@controllers/query/favorites';
import { theme } from '@styles/themes';
import InfoSVG from '@assets/icons/info.svg?react';
import {
  Divider,
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

// 이름 추천

const SearchResultGaugeChart = ({ stockInfo: { stockId, country } }: { stockInfo: StockDetailInfo }) => {
  const [stockScore, suspend] = useQueryComponent({ query: useScoreQuery(stockId, country) });

  if (suspend) return null;

  const { Modal, openModal } = useModal({ Component: ZipyoPopup });

  return (
    <SearchResultGaugeChartContainer>
      <SearchResultItemTtile>
        <div className="title-container">
          <p className="title">인간지표 점수</p>
          <p className="update-time">어제 08:24 기준</p>
        </div>
        <div className="info-container">
          <p>인간지표 점수란 무엇인가요?</p>
          <InfoSVG className="btn_info" onClick={openModal} />
        </div>
      </SearchResultItemTtile>
      <GuageChart score={stockScore?.score ?? 0} />
      <Modal />
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
  const { Modal, openModal } = useModal({ Component: AntVoicePopUp });

  return (
    <SearchResultWordCloudContainer>
      <SearchResultItemTtile>
        <div className="title-container">
          <p className="title">자주 언급되는 단어</p>
          <p className="update-time">어제 08:24 기준</p>
        </div>
        <div className="info-container">
          <p>자주 언급되는 단어란 무엇인가요?</p>
          <InfoSVG className="btn_info" onClick={openModal} />
        </div>
      </SearchResultItemTtile>
      <SearchResultWordCloudContents>
        <StockWordCloud symbol={stockInfo.symbol} country={stockInfo.country} />
      </SearchResultWordCloudContents>
      <Modal />
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
  const [heartColor, setHeartColor] = useState(theme.colors.red);
  const [bellColor, setBellColor] = useState(theme.colors.red);
  const { mutate: mutateBookMark } = useAddBookmarkMutation();

  const [stockInfo] = useQueryComponent({
    query: useSymbolNameSearchQuery(state?.symbolName, state?.country),
  });
  const [resultMode, setResultMode] = useState<RESULT_TYPE>('INDICATOR');

  const toggleResultMode = () => setResultMode((prev) => ResultInfo[prev].opposite);
  const onHeartClick = () => {
    mutateBookMark(stockInfo?.stockId!);
    setHeartColor(heartColor === theme.colors.red ? theme.colors.sub_gray6 : theme.colors.red);
  };

  const onBellClick = () => {
    setBellColor(heartColor === theme.colors.red ? theme.colors.sub_gray6 : theme.colors.red);
  };

  return (
    stockInfo && (
      <SearchResultContainer>
        <SearchHeader
          heartColor={heartColor}
          bellColor={bellColor}
          onHeartClick={onHeartClick}
          onBellClick={onBellClick}
        />
        <Divider />
        <SearchResultContents>
          <SearchTitle stockInfo={stockInfo} resultMode={resultMode} onClick={toggleResultMode} />
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
