import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import theme from '../../styles/themes';
import SearchTitle from '../../components/SearchTitle/SearchTitle';
import { ButtonDiv, FlexDiv, ImgDiv } from '../../components/Common/Common';
import { useState } from 'react';
import { TextHeading } from '../../components/Text/Text';
import LogoSVG from '../../assets/logo_white.svg';
import InfoSVG from '../../assets/info.svg';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '../../components/StockWordCloud/StockWordCloud';
import { SearchContainer, SearchResultContainer, SearchResultContents } from './Search.Style';
import RelatedStock from '../../components/RelatedStock/RelatedStock';

const SearchResultIndicatorContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  background: theme.colors.grayscale100,
  borderRadius: '25px',
  padding: '48px',
  gap: '28px',
});

const SearchResultIndicator = ({ stockName }: { stockName: string }) => {
  const score = ~~(Math.random() * 101);
  // console.log(123);

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
        <ScoreSlotMachine stockName={stockName} stockScore={score} slotMachineType="stockScoreTitle" />
        <ScoreSlotMachine stockName={stockName} stockScore={score} slotMachineType="stockScoreImage" />
        <ScoreSlotMachine stockName={stockName} stockScore={score} slotMachineType="stockScore" />
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

const SearchResultChart = () => {
  return (
    <FlexDiv flexDirection="column" width="100%">
      <FlexDiv flexDirection="column" gap="24px" width="100%">
        <SearchResultChartContainer></SearchResultChartContainer>
      </FlexDiv>
    </FlexDiv>
  );
};

const Search = () => {
  const { state } = useLocation();
  const stockName = state?.stockName;

  const [resultMode, setResultMode] = useState<'indicator' | 'chart'>('indicator');

  const toggleResultMode = () => {
    setResultMode(resultMode == 'indicator' ? 'chart' : 'indicator');
  };

  return (
    <SearchContainer>
      <SearchTitle stockName={stockName} resultMode={resultMode} onClick={toggleResultMode} />
      <SearchResultContainer>
        <SearchResultContents>
          {resultMode == 'indicator' ? (
            <>
              <SearchResultIndicator stockName={stockName} />
              <StockWordCloud />
            </>
          ) : (
            <>
              <SearchResultChart />
            </>
          )}
          <RelatedStock />
        </SearchResultContents>
      </SearchResultContainer>
    </SearchContainer>
  );
};

export default Search;
