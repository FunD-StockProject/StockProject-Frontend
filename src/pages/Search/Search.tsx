import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ResultInfo } from '@ts/Constants';
import { RESULT_TYPE, STOCK_COUNTRY } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import StockCard from '@components/CardList/StockCard/StockCard';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import AntVoicePopUp from '@components/PopUp/AntiVoicePopUp/AntVoicePopUp';
import ZipyoPopup from '@components/PopUp/ZipyoPopUp/ZipyoPopUp';
import SearchTitle from '@components/Search/SearchTitle/SearchTitle';
import StockChart from '@components/Search/StockChart/StockChart';
import StockWordCloud from '@components/Search/StockWordCloud/StockWordCloud';
import SlideView from '@components/SlideView/SlideView';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { ScoreQuery, SearchSymbolNameQuery, StockRelevantQuery } from '@controllers/query';
import AlertSVG from '@assets/alert.svg?react';
import InfoSVG from '@assets/info.svg?react';
import LogoSVG from '@assets/logo_white.svg?react';
import { SearchResultContainer, SearchResultContents, SearchResultInfo } from './Search.Style';

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
      <ContentsItemContent>
        {suspend || (score && <ScoreSlotMachine stockScore={score.score} country={country} />)}
      </ContentsItemContent>
      {isPopupOpen && <ZipyoPopup onClose={togglePopup} />}
    </ContentsItemContainer>
  );
};

const Search = () => {
  const { state } = useLocation();

  const isMobile = useIsMobile();

  const [stockInfo] = useQueryComponent({
    query: SearchSymbolNameQuery(state?.symbolName, state?.country),
  });
  const [resultMode, setResultMode] = useState<RESULT_TYPE>('INDICATOR');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const toggleResultMode = () => setResultMode((prev) => ResultInfo[prev].opposite);
  const togglePopup = () => setPopupOpen((prev) => !prev);
  const [stockRelevantList] = StockRelevantQuery(stockInfo?.stockId);

  return (
    stockInfo && (
      <SearchResultContainer>
        <SearchResultContents>
          <SearchTitle stockInfo={stockInfo} resultMode={resultMode} onClick={toggleResultMode} />
          <SearchResultInfo>
            <AlertSVG />
            인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
          </SearchResultInfo>
          {resultMode === 'INDICATOR' ? (
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
            <StockChart stockId={stockInfo.stockId} symbolName={stockInfo.symbolName} country={stockInfo.country} />
          )}
          <ContentsItemContainer>
            <ContentsItemTitle>이 종목과 점수가 비슷한 종목</ContentsItemTitle>
            {stockRelevantList && (
              <SlideView
                keyName="Relevant"
                list={StockRelevant(stockRelevantList, stockInfo.country)}
                count={isMobile ? 1 : 3}
              />
            )}
          </ContentsItemContainer>
        </SearchResultContents>
      </SearchResultContainer>
    )
  );
};

const StockRelevant = (stockRelevantList: any, country: STOCK_COUNTRY) => {
  return stockRelevantList.map((e: any) => {
    return <StockCard stockInfo={{ ...e, country }} />;
  });
};

export default Search;
