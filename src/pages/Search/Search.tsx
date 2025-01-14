import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ResultInfo } from '@ts/Constants';
import { RESULT_TYPE } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import MobileStockCardItem from '@components/CardList/MobileStockCard/MobileStockCard';
import StockCardItem from '@components/CardList/StockCard/StockCard';
import { FlexDiv } from '@components/Common/Common';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import AntVoicePopUp from '@components/PopUp/AntiVoicePopUp/AntVoicePopUp';
import ZipyoPopup from '@components/PopUp/ZipyoPopUp/ZipyoPopUp';
import SearchTitle from '@components/Search/SearchTitle/SearchTitle';
import StockChart from '@components/Search/StockChart/StockChart';
import StockWordCloud from '@components/Search/StockWordCloud/StockWordCloud';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockScore } from '@controllers/api.Type';
import { ScoreQuery, SearchSymbolNameQuery, StockRelevantQuery } from '@controllers/query';
import AlertSVG from '@assets/alert.svg?react';
import InfoSVG from '@assets/info.svg?react';
import LogoSVG from '@assets/logo_white.svg?react';
import { SearchResultContainer, SearchResultContents, SearchResultInfo, StockRelevantContainer } from './Search.Style';

const MobileRelevantStocks = ({ stocks, country }: { stocks: StockScore[]; country: string }) => (
  <FlexDiv flexDirection="column" width="100%">
    {stocks.map((stock) => (
      <MobileStockCardItem
        key={`RELEVANT_${stock.stockId}`}
        name={stock.symbolName}
        score={stock.score}
        delta={stock.diff}
        country={country}
        keywords={stock.keywords}
      />
    ))}
  </FlexDiv>
);

const WebRelevantStocks = ({ stocks, country }: { stocks: StockScore[]; country: string }) => (
  <FlexDiv flexDirection="column" gap="24px" width="100%">
    <StockRelevantContainer>
      {stocks.map((stock) => (
        <StockCardItem
          key={`RELEVANT_${stock.stockId}`}
          name={stock.symbolName}
          score={stock.score}
          delta={stock.diff}
          country={country}
          keywords={stock.keywords}
        />
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
      (isMobile ? (
        <MobileRelevantStocks stocks={stockRelevantList} country={country} />
      ) : (
        <WebRelevantStocks stocks={stockRelevantList} country={country} />
      )))
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
      <ContentsItemContent>
        {suspend || (score && <ScoreSlotMachine stockScore={score.score} country={country} />)}
      </ContentsItemContent>
      {isPopupOpen && <ZipyoPopup onClose={togglePopup} />}
    </ContentsItemContainer>
  );
};

const Search = () => {
  const { state } = useLocation();

  const [stockInfo, suspend] = useQueryComponent({
    query: SearchSymbolNameQuery(state?.symbolName, state?.country),
  });
  const [resultMode, setResultMode] = useState<RESULT_TYPE>('INDICATOR');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const toggleResultMode = () => setResultMode((prev) => ResultInfo[prev].opposite);
  const togglePopup = () => setPopupOpen((prev) => !prev);

  return (
    suspend ||
    (stockInfo && (
      <SearchResultContainer>
        <SearchResultContents>
          <SearchTitle stockInfo={stockInfo} resultMode={resultMode} onClick={toggleResultMode} />
          {/* <div>
            {[
              '1983년 현대전자로 설립됐고, 2001년 하이닉스반도체를 거쳐 2012년 최대주주가 SK텔레콤으로 바뀌면서 SK하이닉스로 상호를 변경함.',
              '주력제품은 DRAM, 낸드플래쉬, MCP와 같은 메모리 반도체이며, 2007년부터 시스템LSI 분야인 CIS 사업에 재진출함.',
            ].map((el) => (
              <div>{el}</div>
            ))}
          </div> */}
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
