import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import SearchTitle from '../../components/SearchTitle/SearchTitle';
import { ButtonDiv, FlexDiv, ImgDiv } from '../../components/Common/Common';
import { useEffect, useState } from 'react';
import { TextHeading } from '../../components/Text/Text';
import LogoSVG from '../../assets/logo_white.svg';
import InfoSVG from '../../assets/info.svg';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '../../components/StockWordCloud/StockWordCloud';
import { SearchResultContainer, SearchResultContents, StockRelevantContainer } from './Search.Style';
import { fetchSearchSymbolName } from '../../controllers/api';
import StockChart from '../../components/StockChart/StockChart';
import StockCardItem from '../../components/StockCard/StockCard';
import { StockInfo } from '../../controllers/api.Type';
import { theme } from '../../styles/themes';

const SearchResultIndicatorContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  background: theme.colors.grayscale100,
  borderRadius: '25px',
  padding: '48px',
  gap: '28px',
});

const SearchResultIndicator = ({ stockName, stockScore }: { stockName: string; stockScore: number }) => {
  return (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <FlexDiv alignItems="center" gap="12px">
        <TextHeading size="Small" color="grayscale10">
          국내 개미
        </TextHeading>
        <ImgDiv src={LogoSVG} height="28px" />
        <ButtonDiv onClick={() => {}}>
          <ImgDiv src={InfoSVG} width="28px" />
        </ButtonDiv>
      </FlexDiv>
      <SearchResultIndicatorContainer>
        <ScoreSlotMachine stockName={stockName} stockScore={stockScore} slotMachineType="TITLE" />
        <ScoreSlotMachine stockName={stockName} stockScore={stockScore} slotMachineType="IMAGE" />
        <ScoreSlotMachine stockName={stockName} stockScore={stockScore} slotMachineType="SCORE" />
      </SearchResultIndicatorContainer>
    </FlexDiv>
  );
};

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
      <TextHeading size="Small" color="grayscale10">
        관련 종목
      </TextHeading>
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
    // const res = await Promise.resolve(fetchSearchSymbolName(stockName));
    const res = {
      stockId: 1,
      symbol: 'ㅁㄴㅇ',
      symbolName: 'ㅁㄴㅇ',
      securityName: 'ㅁㄴㅇ',
      exchangeNum: 'ㅁㄴㅇ',
      scoreId: 1,
      scoreKorea: 1,
      scoreOversea: 1,
    };
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
              <SearchResultIndicator stockName={stockInfo.symbolName} stockScore={stockInfo.scoreKorea} />
              <StockWordCloud stockName={stockInfo.symbolName} stockId={stockInfo.stockId} />
            </>
          ) : (
            <>
              <StockChart stockId={stockInfo.stockId} />
            </>
          )}
          <StockRelevant stockId={stockInfo.stockId} />
        </SearchResultContents>
      </SearchResultContainer>
    </>
  ) : (
    ''
  );
};

export default Search;
