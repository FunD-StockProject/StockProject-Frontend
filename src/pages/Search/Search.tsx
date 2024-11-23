import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import sonjulPNG from '../../assets/sonjul.png';
import theme from '../../styles/themes';
import SearchTitle from '../../components/SearchTitle/SearchTitle';
import { ButtonDiv, FlexDiv, ImgDiv } from '../../components/Common';
import { useState } from 'react';
import { Text, TextHeading, TextTitle } from '../../components/Text';
import LogoSVG from '../../assets/logo_white.svg';
import InfoSVG from '../../assets/info.svg';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import StockWordCloud from '../../components/StockWordCloud/StockWordCloud';

const SearchContainer = styled.div({
  width: '100%',
  marginBottom: 'auto',
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
        <ScoreSlotMachine stockName={stockName} stockScore={65} slotMachineType="stockScoreTitle" />
        <ScoreSlotMachine stockName={stockName} stockScore={65} slotMachineType="stockScoreImage" />
        <ScoreSlotMachine stockName={stockName} stockScore={65} slotMachineType="stockScore" />
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '18px',
  width: '100%',
  background: theme.colors.grayscale100,
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

const SearchResultRelativeStock = () => {
  return (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <TextTitle size="XLarge" color="grayscale10">
        관련 종목
      </TextTitle>
      <SearchResultRelativeStockContainer>
        <SearchResultRelativeStockItem>
          <ImgDiv src={sonjulPNG} width="240px" />
          <SearchResultRelativeStockItemTitle>
            <ButtonDiv background="blue" radius="24px" padding="12px 24px">
              <Text size="Small" color="primary0">
                결국 손절 타이밍을 놓쳤다!
              </Text>
            </ButtonDiv>
            <TextHeading size="Small" color="grayscale90">
              삼성전자
            </TextHeading>
          </SearchResultRelativeStockItemTitle>
        </SearchResultRelativeStockItem>
        <SearchResultRelativeStockItem>
          <ImgDiv src={sonjulPNG} width="240px" />
          <SearchResultRelativeStockItemTitle>
            <ButtonDiv background="blue" radius="24px" padding="12px 24px">
              <Text size="Small" color="primary0">
                결국 손절 타이밍을 놓쳤다!
              </Text>
            </ButtonDiv>
            <TextHeading size="Small" color="grayscale90">
              삼성전자
            </TextHeading>
          </SearchResultRelativeStockItemTitle>
        </SearchResultRelativeStockItem>
        <SearchResultRelativeStockItem>
          <ImgDiv src={sonjulPNG} width="240px" />
          <SearchResultRelativeStockItemTitle>
            <ButtonDiv background="blue" radius="24px" padding="12px 24px">
              <Text size="Small" color="primary0">
                결국 손절 타이밍을 놓쳤다!
              </Text>
            </ButtonDiv>
            <TextHeading size="Small" color="grayscale90">
              삼성전자
            </TextHeading>
          </SearchResultRelativeStockItemTitle>
        </SearchResultRelativeStockItem>
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
