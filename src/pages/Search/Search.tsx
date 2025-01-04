import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { FlexDiv } from '@components/Common/Common';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import MobileStockCardGrid from '@components/MobileStockCardGrid/MobileStockCardGrid';
import AntVoicePopUp from '@components/PopUp/AntiVoicePopUp/AntVoicePopUp';
import ZipyoPopup from '@components/PopUp/ZipyoPopUp/ZipyoPopUp';
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

const MobileRelevantStocks = ({ stocks, country }: { stocks: StockScore[]; country: string }) => (
  <FlexDiv flexDirection="row" width="100%">
    <MobileStockCardGrid curStocks={stocks} name="RELEVANT" country={country} />
  </FlexDiv>
);

const WebRelevantStocks = ({ stocks, country }: { stocks: StockScore[]; country: string }) => (
  <FlexDiv flexDirection="column" gap="24px" width="100%">
    <StockRelevantContainer>
      {stocks.map((stock) => (
        <StockCardItem key={`RELEVANT_${stock.stockId}`} name={stock.symbolName} score={stock.score} delta={stock.diff} country={country} />
      ))}
    </StockRelevantContainer>
  </FlexDiv>
);

const StockRelevant = ({ stockId, country }: { stockId: number; country: string }) => {
  const [stockRelevantList, suspend] = useQueryComponent({ query: StockRelevantQuery(stockId) });
  const isMobile = useIsMobile();

  return (
    suspend ||
    (stockRelevantList &&
      (isMobile ? <MobileRelevantStocks stocks={stockRelevantList} country={country} /> : <WebRelevantStocks stocks={stockRelevantList} country={country} />))
  );
};

const SearchResultHumanIndicator = ({ stockId, country }: { stockId: number; country: string }) => {
  const [score, suspend] = useQueryComponent({ query: ScoreQuery(stockId, country) });
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => setPopupOpen((prev) => !prev);

  return (
    <ContentsItemContainer>
      <ContentsItemTitle>
        개미들의
        <LogoSVG />
        <InfoSVG className="btn_info" onClick={togglePopup} />
      </ContentsItemTitle>
      <ContentsItemContent>{suspend || (score && <ScoreSlotMachine stockScore={score.score} country={country} />)}</ContentsItemContent>
      {isPopupOpen && <ZipyoPopup onClose={togglePopup} />}
    </ContentsItemContainer>
  );
};

const Search = () => {
  const { state } = useLocation();

  const [stockInfo, suspend] = useQueryComponent({
    query: SearchSymbolNameQuery(state?.symbolName, state?.country),
  });
  const [resultMode, setResultMode] = useState<'indicator' | 'chart'>('indicator');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const toggleResultMode = () => setResultMode((prev) => (prev === 'indicator' ? 'chart' : 'indicator'));
  const togglePopup = () => setPopupOpen((prev) => !prev);

  return (
    suspend ||
    (stockInfo && (
      <SearchResultContainer>
        <SearchResultContents>
          <SearchTitle stockInfo={stockInfo} resultMode={resultMode} onClick={toggleResultMode} />
          {resultMode === 'indicator' ? (
            <>
              <SearchResultHumanIndicator stockId={stockInfo.stockId} country={stockInfo.country} />
              <ContentsItemContainer>
                <ContentsItemTitle>
                  개미들의 목소리
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
              <StockRelevant stockId={stockInfo.stockId} country={stockInfo.country} />
            </ContentsItemContent>
          </ContentsItemContainer>
        </SearchResultContents>
      </SearchResultContainer>
    ))
  );
};

export default Search;
