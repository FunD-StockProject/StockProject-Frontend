import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { FlexDiv } from '@components/Common/Common';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import SearchTitle from '@components/SearchTitle/SearchTitle';
import StockCardItem from '@components/StockCard/StockCard';
import StockChart from '@components/StockChart/StockChart';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '@components/StockWordCloud/StockWordCloud';
import { StockScore } from '@controllers/api.Type';
import { ScoreQuery, SearchSymbolNameQuery, StockRelevantQuery } from '@controllers/query';
import InfoSVG from '@assets/info.svg?react';
import LogoSVG from '@assets/logo_white.svg?react';
import { SearchResultContainer, SearchResultContents, StockRelevantContainer } from './Search.Style';

const StockRelevant = ({ stockId }: { stockId: number }) => {
  const [stockRelevantList, suspend] = useQueryComponent({ query: StockRelevantQuery(stockId) });

  return (
    suspend ||
    (stockRelevantList && (
      <FlexDiv flexDirection="column" gap="24px" width="100%">
        <StockRelevantContainer>
          {stockRelevantList.map((e: StockScore, i: number) => (
            <StockCardItem key={i} name={e.symbolName} score={e.score} delta={e.diff} />
          ))}
        </StockRelevantContainer>
      </FlexDiv>
    ))
  );
};

const SearchResultHumanIndicator = ({ stockId, country }: { stockId: number; country: string }) => {
  const [score, suspend] = useQueryComponent({ query: ScoreQuery(stockId, country) });

  return (
    suspend ||
    (score != null && (
      <ContentsItemContainer>
        <ContentsItemTitle>
          {STOCK_COUNTRY_TYPE[country]} 개미
          <LogoSVG />
          <InfoSVG className="btn_info" onClick={() => {}} />
        </ContentsItemTitle>
        <ContentsItemContent>
          <ScoreSlotMachine stockScore={score.score} />
        </ContentsItemContent>
      </ContentsItemContainer>
    ))
  );
};

const Search = () => {
  const { state } = useLocation();

  const [stockInfo, suspend] = useQueryComponent({ query: SearchSymbolNameQuery(state?.stockName) });
  const [resultMode, setResultMode] = useState<'indicator' | 'chart'>('indicator');

  const toggleResultMode = () => {
    setResultMode(resultMode == 'indicator' ? 'chart' : 'indicator');
  };
  return (
    suspend ||
    (stockInfo && (
      <>
        <SearchTitle stockInfo={stockInfo} resultMode={resultMode} onClick={toggleResultMode} />
        <SearchResultContainer>
          <SearchResultContents>
            {resultMode == 'indicator' ? (
              <>
                <SearchResultHumanIndicator stockId={stockInfo.stockId} country={stockInfo.country} />
                <ContentsItemContainer>
                  <ContentsItemTitle>
                    국내 개미들의 소리
                    <InfoSVG className="btn_info" onClick={() => {}} />
                  </ContentsItemTitle>
                  <ContentsItemContent>
                    <StockWordCloud stockName={stockInfo.symbolName} stockId={stockInfo.stockId} />
                  </ContentsItemContent>
                </ContentsItemContainer>
              </>
            ) : (
              <>
                <StockChart stockId={stockInfo.stockId} />
              </>
            )}
            <ContentsItemContainer>
              <ContentsItemTitle>관련 종목</ContentsItemTitle>
              <ContentsItemContent>
                <StockRelevant stockId={stockInfo.stockId} />
              </ContentsItemContent>
            </ContentsItemContainer>
          </SearchResultContents>
        </SearchResultContainer>
      </>
    ))
  );
};

export default Search;
