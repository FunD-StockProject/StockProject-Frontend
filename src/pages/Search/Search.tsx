import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InfoSVG from '../../assets/info.svg';
import LogoSVG from '../../assets/logo_white.svg';
import { ButtonDiv, FlexDiv, ImgDiv } from '../../components/Common/Common';
import SearchTitle from '../../components/SearchTitle/SearchTitle';
import StockCardItem from '../../components/StockCard/StockCard';
import StockChart from '../../components/StockChart/StockChart';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '../../components/StockWordCloud/StockWordCloud';
import { TextHeading } from '../../components/Text/Text';
import { fetchSearchSymbolName } from '../../controllers/api';
import { StockInfo } from '../../controllers/api.Type';
import { media, theme } from '../../styles/themes';
import { SearchResultContainer, SearchResultContents, StockRelevantContainer } from './Search.Style';

const ContentsItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  [media[0]]: {
    gap: '12px',
  },
});

const ContentsItemTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  ['img']: {
    height: theme.fontSize.Title.XLarge.Web,
  },
  [media[0]]: {
    gap: '6px',
    ['img']: {
      height: theme.fontSize.Title.XLarge.Mobile,
    },
  },
});

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
                  <TextHeading size="Small" color="grayscale10">
                    국내 개미
                  </TextHeading>
                  <ImgDiv src={LogoSVG} />
                  <ButtonDiv onClick={() => {}}>
                    <ImgDiv src={InfoSVG} width="28px" />
                  </ButtonDiv>
                </ContentsItemTitle>
                <ScoreSlotMachine stockName={stockInfo.symbolName} stockScore={stockInfo.scoreKorea} />
              </ContentsItemContainer>
              <ContentsItemContainer>
                <ContentsItemTitle>
                  <TextHeading size="Small" color="grayscale10">
                    국내 개미
                  </TextHeading>
                  <ImgDiv src={LogoSVG} />
                  <ButtonDiv onClick={() => {}}>
                    <ImgDiv src={InfoSVG} width="28px" />
                  </ButtonDiv>
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
            <ContentsItemTitle>
              <TextHeading size="Small" color="grayscale10">
                관련 종목
              </TextHeading>
            </ContentsItemTitle>
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
