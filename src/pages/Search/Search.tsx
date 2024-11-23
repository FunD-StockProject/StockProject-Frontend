import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import sonjulPNG from '../../assets/sonjul.png';
import theme from '../../styles/themes';
import SearchTitle from '../../components/SearchTitle/SearchTitle';
import { ButtonDiv, FlexDiv, ImgDiv } from '../../components/Common';
import { useState } from 'react';
import {
  Text,
  TextDetail,
  TextHeading,
  TextTitle,
} from '../../components/Text';
import LogoSVG from '../../assets/logo_white.svg';
import InfoSVG from '../../assets/info.svg';
import UpSVG from '../../assets/icons/up.svg?react';
import DownSVG from '../../assets/icons/down.svg?react';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '../../components/StockWordCloud/StockWordCloud';
import { scoreToImage } from '../../utils/ScoreConvert';

const SearchContainer = styled.div({
  width: '100%',
  marginBottom: '64px',
});

const SearchResultContainer = styled.div({
  background: theme.colors.primary100,
  width: '100%',
});

const SearchResultContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '60px 60px',
  height: '100%',
  gap: '48px',
});

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
        <TextTitle size="XLarge" color="grayscale10">
          국내 개미
        </TextTitle>
        <ImgDiv src={LogoSVG} height="24px" />
        <ButtonDiv onClick={() => {}}>
          <ImgDiv src={InfoSVG} />
        </ButtonDiv>
      </FlexDiv>
      <SearchResultIndicatorContainer>
        <ScoreSlotMachine
          stockName={stockName}
          stockScore={score}
          slotMachineType="stockScoreTitle"
        />
        <ScoreSlotMachine
          stockName={stockName}
          stockScore={score}
          slotMachineType="stockScoreImage"
        />
        <ScoreSlotMachine
          stockName={stockName}
          stockScore={score}
          slotMachineType="stockScore"
        />
      </SearchResultIndicatorContainer>
    </FlexDiv>
  );
};

const SearchResultSoundContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  // background: theme.colors.grayscale90,
  gap: '28px',
  height: 'auto',
});

const SearchResultSound = () => {
  return (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <FlexDiv alignItems="center" gap="12px">
        <TextTitle size="XLarge" color="grayscale10">
          국내 개미들의 소리
        </TextTitle>
        <ButtonDiv onClick={() => {}}>
          <ImgDiv src={InfoSVG} />
        </ButtonDiv>
      </FlexDiv>
      <SearchResultSoundContainer>
        <StockWordCloud />
      </SearchResultSoundContainer>
    </FlexDiv>
  );
};

const SearchResultRelativeStockContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  gap: '28px',
});

const SearchResultRelativeStockItem = styled.div({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '18px',
  width: '100%',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
});

const SearchResultRelativeStockItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0 0 18px 18px',
  padding: '24px 0',
  width: '100%',
  background: theme.colors.grayscale10,
  gap: '12px',
});

const RelatedStockScoreDiv = styled(
  ({
    stockScore,
    stockDeltaScore,
  }: {
    stockScore: number;
    stockDeltaScore: number;
  }) => {
    return (
      <ButtonDiv
        gap="8px"
        background={stockScore > 50 ? 'red' : 'blue'}
        radius="100px"
        padding="8px 24px"
      >
        <Text size="Large" weight="Bold" color="primary0">
          {stockScore}점
        </Text>
        <FlexDiv gap="2px" alignItems="center">
          <TextDetail weight="Bold" color="primary0">
            {stockDeltaScore}
          </TextDetail>
          {stockDeltaScore > 0 ? (
            <UpSVG fill={theme.colors.primary0} />
          ) : (
            <DownSVG fill={theme.colors.primary0} />
          )}
        </FlexDiv>
      </ButtonDiv>
    );
  },
)({});

const RelatedStockItem = ({
  stockName,
  stockScore,
  stockDeltaScore,
}: {
  stockName: string;
  stockScore: number;
  stockDeltaScore: number;
}) => {
  return (
    <SearchResultRelativeStockItem onClick={() => {}}>
      <ImgDiv src={scoreToImage(stockScore)} width="100%" />
      <SearchResultRelativeStockItemTitle>
        <RelatedStockScoreDiv
          stockScore={stockScore}
          stockDeltaScore={stockDeltaScore}
        />
        <TextHeading color="grayscale90">{stockName}</TextHeading>
      </SearchResultRelativeStockItemTitle>
    </SearchResultRelativeStockItem>
  );
};

const SearchResultRelativeStock = () => {
  const arr = [
    { stockName: '삼성전자', stockScore: 81, stockDeltaScore: 18 },
    { stockName: '한화솔루션', stockScore: 11, stockDeltaScore: -18 },
    { stockName: 'SK하이닉스', stockScore: 32, stockDeltaScore: -7 },
  ];

  return (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <TextTitle size="XLarge" color="grayscale10">
        관련 종목
      </TextTitle>
      <SearchResultRelativeStockContainer>
        {arr.map((e, i) => (
          <RelatedStockItem
            key={i}
            stockName={e.stockName}
            stockScore={e.stockScore}
            stockDeltaScore={e.stockDeltaScore}
          />
        ))}
      </SearchResultRelativeStockContainer>
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

  const [resultMode, setResultMode] = useState<'indicator' | 'chart'>(
    'indicator',
  );

  const toggleResultMode = () => {
    setResultMode(resultMode == 'indicator' ? 'chart' : 'indicator');
  };

  return (
    <SearchContainer>
      <SearchTitle
        stockName={stockName}
        resultMode={resultMode}
        onClick={toggleResultMode}
      />
      <SearchResultContainer>
        <SearchResultContents>
          {resultMode == 'indicator' ? (
            <>
              <SearchResultIndicator stockName={stockName} />
              <SearchResultSound />
            </>
          ) : (
            <>
              <SearchResultChart />
            </>
          )}
          <SearchResultRelativeStock />
        </SearchResultContents>
      </SearchResultContainer>
    </SearchContainer>
  );
};

export default Search;
