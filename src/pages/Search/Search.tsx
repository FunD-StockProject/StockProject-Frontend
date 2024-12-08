import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { FlexDiv } from '@components/Common/Common';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import AntVoicePopUp from '@components/PopUp/AntVoicePopUp';
import ZipyoPopup from '@components/PopUp/ZipyoPopUp';
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

  if (suspend) return null;

  return (
    stockRelevantList && (
      <FlexDiv flexDirection="column" gap="24px" width="100%">
        <StockRelevantContainer>
          {stockRelevantList.map((stock: StockScore, index: number) => (
            <StockCardItem key={index} name={stock.symbolName} score={stock.score} delta={stock.diff} />
          ))}
        </StockRelevantContainer>
      </FlexDiv>
    )
  );
};

const SearchResultHumanIndicator = ({ stockId, country }: { stockId: number; country: string }) => {
  const [score, suspend] = useQueryComponent({ query: ScoreQuery(stockId, country) });
  const [isPopupOpen, setPopupOpen] = useState(false);

  if (suspend) return null;

  const togglePopup = () => setPopupOpen((prev) => !prev);

  return (
    score && (
      <ContentsItemContainer>
        <ContentsItemTitle>
          {STOCK_COUNTRY_TYPE[country]} 개미
          <LogoSVG />
          <InfoSVG className="btn_info" onClick={togglePopup} />
        </ContentsItemTitle>
        <ContentsItemContent>
          <ScoreSlotMachine stockScore={score.score} />
        </ContentsItemContent>
        {isPopupOpen && <ZipyoPopup onClose={togglePopup} />}
      </ContentsItemContainer>
    )
  );
};

const Search = () => {
  const { state } = useLocation();
  const [stockInfo, suspend] = useQueryComponent({ query: SearchSymbolNameQuery(state?.stockName) });
  const [resultMode, setResultMode] = useState<'indicator' | 'chart'>('indicator');
  const [isPopupOpen, setPopupOpen] = useState(false);

  if (suspend) return null;

  const toggleResultMode = () => setResultMode((prev) => (prev === 'indicator' ? 'chart' : 'indicator'));
  const togglePopup = () => setPopupOpen((prev) => !prev);

  return (
    stockInfo && (
      <>
        <SearchTitle stockInfo={stockInfo} resultMode={resultMode} onClick={toggleResultMode} />
        <SearchResultContainer>
          <SearchResultContents>
            {resultMode === 'indicator' ? (
              <>
                <SearchResultHumanIndicator stockId={stockInfo.stockId} country={stockInfo.country} />
                <ContentsItemContainer>
                  <ContentsItemTitle>
                    {STOCK_COUNTRY_TYPE[stockInfo.country]} 개미들의 소리
                    <InfoSVG className="btn_info" onClick={togglePopup} />
                  </ContentsItemTitle>

                  <ContentsItemContent>
                    <StockWordCloud symbol={stockInfo.symbol} country={stockInfo.country} />
                  </ContentsItemContent>
                  {isPopupOpen && <AntVoicePopUp onClose={togglePopup} />}
                </ContentsItemContainer>
              </>
            ) : (
              <StockChart stockId={stockInfo.stockId} />
            )}
            <ContentsItemContainer>
              <ContentsItemTitle>이 종목과 점수가 비슷한 종목</ContentsItemTitle>
              <ContentsItemContent>
                <StockRelevant stockId={stockInfo.stockId} />
              </ContentsItemContent>
            </ContentsItemContainer>
          </SearchResultContents>
        </SearchResultContainer>
      </>
    )
  );
};

export default Search;
