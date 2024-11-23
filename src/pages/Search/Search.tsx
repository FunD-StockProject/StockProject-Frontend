import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import theme from '../../styles/themes';
import SearchTitle from '../../components/SearchTitle/SearchTitle';
import { ButtonDiv, FlexDiv, ImgDiv } from '../../components/Common/Common';
import { useEffect, useState } from 'react';
import { TextHeading } from '../../components/Text/Text';
import LogoSVG from '../../assets/logo_white.svg';
import InfoSVG from '../../assets/info.svg';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '../../components/StockWordCloud/StockWordCloud';
import { SearchContainer, SearchResultContainer, SearchResultContents } from './Search.Style';
import StockRelevant from '../../components/RelatedStock/RelatedStock';
import { fetchSearchSymbolName, StockInfo } from '../../controllers/api';

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
        <ScoreSlotMachine stockName={stockName} stockScore={stockScore} slotMachineType="stockScoreTitle" />
        <ScoreSlotMachine stockName={stockName} stockScore={stockScore} slotMachineType="stockScoreImage" />
        <ScoreSlotMachine stockName={stockName} stockScore={stockScore} slotMachineType="stockScore" />
      </SearchResultIndicatorContainer>
    </FlexDiv>
  );
};

const SearchResultChartContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  gap: '28px',
  height: '640px',
  background: theme.colors.grayscale90,
});

const SearchResultChart = ({ stockId }: { stockId: number }) => {
  return (
    <FlexDiv flexDirection="column" width="100%">
      {stockId}
      <FlexDiv flexDirection="column" gap="24px" width="100%">
        <SearchResultChartContainer></SearchResultChartContainer>
      </FlexDiv>
    </FlexDiv>
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

  return stockInfo ? (
    <SearchContainer>
      <SearchTitle stockName={stockInfo.symbolName} resultMode={resultMode} onClick={toggleResultMode} />
      <SearchResultContainer>
        <SearchResultContents>
          {resultMode == 'indicator' ? (
            <>
              <SearchResultIndicator stockName={stockInfo.symbolName} stockScore={stockInfo.scoreKorea} />
              <StockWordCloud stockId={stockInfo.stockId} />
            </>
          ) : (
            <>
              <SearchResultChart stockId={stockInfo.stockId} />
            </>
          )}
          <StockRelevant stockId={stockInfo.stockId} />
        </SearchResultContents>
      </SearchResultContainer>
    </SearchContainer>
  ) : (
    ''
  );
};

export default Search;
