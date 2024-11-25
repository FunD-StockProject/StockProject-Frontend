import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FlexDiv } from '@components/Common/Common';
import { ContentsItemContainer, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import SearchTitle from '@components/SearchTitle/SearchTitle';
import StockCardItem from '@components/StockCard/StockCard';
import StockChart from '@components/StockChart/StockChart';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '@components/StockWordCloud/StockWordCloud';
import { fetchSearchSymbolName } from '@controllers/api';
import { StockInfo } from '@controllers/api.Type';
import InfoSVG from '@assets/info.svg?react';
import LogoSVG from '@assets/logo_white.svg?react';
import { SearchResultContainer, SearchResultContents, StockRelevantContainer } from './Search.Style';

const sample = [
  { stockId: 123, symbolName: '삼성전자', score: 81, diff: 18 },
  { stockId: 123, symbolName: '한화솔루션', score: 11, diff: -18 },
  { stockId: 123, symbolName: 'SK하이닉스', score: 32, diff: -7 },
];

const StockRelevant = ({ stockId }: { stockId: number }) => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [stockRelevantList, setStockRelevantList] = useState<any[]>();

  const getStockRelevantList = async (stockId: number) => {
    // const res = await Promise.resolve(fetchRelevant(stockId));
    // if (!res) return null;
    // setStockRelevantList(res);
    stockId;
    setStockRelevantList(sample);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    getStockRelevantList(stockId);
  }, [didMount]);

  return stockRelevantList ? (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <StockRelevantContainer>
        {stockRelevantList.map((e, i) => (
          <StockCardItem key={i} name={e.symbolName} score={e.score} delta={e.diff} />
        ))}
      </StockRelevantContainer>
    </FlexDiv>
  ) : (
    ''
  );
};

const Search = () => {
  const { state } = useLocation();

  const [resultMode, setResultMode] = useState<'indicator' | 'chart'>('indicator');
  const [didMount, setDidMount] = useState<boolean>(false);
  const [stockInfo, setStockInfo] = useState<StockInfo>();

  const toggleResultMode = () => {
    setResultMode(resultMode == 'indicator' ? 'chart' : 'indicator');
  };

  const getScoreInfo = async (stockName: string) => {
    if (!stockName) return null;
    const res = await Promise.resolve(fetchSearchSymbolName(stockName));
    if (!res) return null;
    setStockInfo(res);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    getScoreInfo(state?.stockName);
  }, [didMount]);

  useEffect(() => {
    if (!didMount) return;
    getScoreInfo(state?.stockName);
  }, [state]);

  return stockInfo ? (
    <>
      <SearchTitle stockName={stockInfo.symbolName} resultMode={resultMode} onClick={toggleResultMode} />
      <SearchResultContainer>
        <SearchResultContents>
          {resultMode == 'indicator' ? (
            <>
              <ContentsItemContainer>
                <ContentsItemTitle>
                  국내 개미
                  <LogoSVG />
                  <InfoSVG className="btn_info" onClick={() => {}} />
                </ContentsItemTitle>
                <ScoreSlotMachine stockName={stockInfo.symbolName} stockScore={stockInfo.scoreKorea} />
              </ContentsItemContainer>
              <ContentsItemContainer>
                <ContentsItemTitle>
                  국내 개미들의 소리
                  <InfoSVG className="btn_info" onClick={() => {}} />
                </ContentsItemTitle>
                <StockWordCloud stockName={stockInfo.symbolName} stockId={stockInfo.stockId} />
              </ContentsItemContainer>
            </>
          ) : (
            <>
              <StockChart stockId={stockInfo.stockId} />
            </>
          )}
          <ContentsItemContainer>
            <ContentsItemTitle>관련 종목</ContentsItemTitle>
            <StockRelevant stockId={stockInfo.stockId} />
          </ContentsItemContainer>
        </SearchResultContents>
      </SearchResultContainer>
    </>
  ) : (
    ''
  );
};

export default Search;
