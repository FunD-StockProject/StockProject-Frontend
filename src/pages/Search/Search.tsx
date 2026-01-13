import { useState } from 'react';
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
import { useRelevantStockFetchQuery, useScoreQuery, useStockSummaryQuery, useSymbolNameSearchQuery } from '@controllers/stocks/query';
import { StockDetailInfo, StockInfo } from '@controllers/stocks/types';
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
  SearchResultTabContainer,
  SearchResultTabLabel,
  SearchResultWordCloudContainer,
  SearchResultWordCloudContents,
  SearchResultCompanyInfoContainer,
  SentimentSection,
  SentimentTitle,
  SentimentContent,
  SentimentDesc,
} from './Search.Style';

type TabKey = 'HUMAN_INDEX' | 'STOCK_CHART' | 'KEYWORD' | 'COMPANY_INFO';

const TABS: { key: TabKey; text: string }[] = [
  { key: 'HUMAN_INDEX', text: '인간지표' },
  { key: 'STOCK_CHART', text: '주식차트' },
  { key: 'KEYWORD', text: '키워드' },
  { key: 'COMPANY_INFO', text: '종목정보' },
];

const SearchResultGaugeChart = ({ stockInfo: { stockId, country, symbolName } }: { stockInfo: StockDetailInfo }) => {
  const [stockScore, suspend] = useQueryComponent({ query: useScoreQuery(stockId, country) });
  const { Modal: AboutHumanZipyoModal, openModal } = useAboutHumanZipyo();

  const handleOpenHumanZipyoModal = () => {
    openModal();
  };

  if (suspend) return null;

  // 목업 데이터 (실제로는 API에서 가져와야 함)
  const industry = '반도체';
  const industryAverage = 45; // 산업 평균 점수
  const ranking = 68; // 상위 N%
  const monthlyAverage = 51; // 최근 한달 평균
  const scoreDiff = (stockScore?.score ?? 0) - monthlyAverage;
  const sentiment = scoreDiff > 0 ? '개선되고' : scoreDiff < 0 ? '약화되고' : '유지되고';

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
      <div className="gauge-description">
        <p>({industry}) 산업의 평균은 {industryAverage}점 이며,</p>
        <p>({symbolName})는 상위 {ranking}% 입니다.</p>
      </div>
      <div className="gauge-chart-wrapper">
        <GuageChart score={stockScore?.score ?? 0} />
      </div>
      <SearchResultAlertContainer>
        ※ 인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요.
      </SearchResultAlertContainer>
      <SentimentSection>
        <SentimentTitle>종목 분위기</SentimentTitle>
        <SentimentContent>
          <SentimentDesc>
            ▲ 최근 한달 평균 대비 {scoreDiff > 0 ? '+' : ''}{scoreDiff}점
          </SentimentDesc>
          <SentimentDesc>
            해당 종목의 한 달 간의 평균 값은 ({monthlyAverage})점 입니다.
          </SentimentDesc>
          <SentimentDesc>
            ({symbolName})에 대한 투자자들의 심리가 {sentiment} 있어요.
          </SentimentDesc>
        </SentimentContent>
      </SentimentSection>
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

const SearchResultCompanyInfo = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const { data: summary = [], isLoading } = useStockSummaryQuery(stockInfo.symbol, stockInfo.country);

  if (isLoading) return null;

  return (
    <SearchResultCompanyInfoContainer>
      <SearchResultItemTtile>
        <div className="title-container">
          <p className="title">종목정보</p>
          <p className="update-time">어제 08:24 기준</p>
        </div>
      </SearchResultItemTtile>
      <div className="company-info-content">
        {summary.map((text, index) => (
          <p key={`SUMMARY_${index}`}>{text}</p>
        ))}
      </div>
    </SearchResultCompanyInfoContainer>
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

  const [selectedTab, setSelectedTab] = useState<TabKey>('HUMAN_INDEX');

  const handleTabChange = (tab: TabKey) => {
    setSelectedTab(tab);
  };

  const renderTabContent = () => {
    if (!stockInfo) return null;

    switch (selectedTab) {
      case 'HUMAN_INDEX':
        return <SearchResultGaugeChart stockInfo={stockInfo} />;
      case 'STOCK_CHART':
        return <SearchResultChart stockInfo={stockInfo} />;
      case 'KEYWORD':
        return <SearchResultWordCloud stockInfo={stockInfo} />;
      case 'COMPANY_INFO':
        return <SearchResultCompanyInfo stockInfo={stockInfo} />;
      default:
        return null;
    }
  };

  return (
    stockInfo && (
      <SearchResultContainer>
        <SearchHeader stockInfo={stockInfo} />
        <Divider />
        <SearchResultContents>
          <SearchTitle stockInfo={stockInfo} />
          <SearchResultTabContainer>
            {TABS.map(({ key, text }) => (
              <SearchResultTabLabel key={`SEARCH_TAB_${key}`} isSelected={selectedTab === key}>
                <input
                  type="radio"
                  name="search_tab"
                  value={key}
                  checked={selectedTab === key}
                  onChange={() => handleTabChange(key)}
                />
                <span>{text}</span>
              </SearchResultTabLabel>
            ))}
          </SearchResultTabContainer>
          {renderTabContent()}
          <Divider />
          <StockRelevant stockId={stockInfo.stockId} country={stockInfo.country} />
        </SearchResultContents>
      </SearchResultContainer>
    )
  );
};

export default Search;
