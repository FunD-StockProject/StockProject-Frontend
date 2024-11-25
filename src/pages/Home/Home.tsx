import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ContentsItemContainer, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import descentTextDark from '../../assets/descentTextDark.svg';
import descentTextLight from '../../assets/descentTextLight.svg';
import hotTextDark from '../../assets/hotTextDark.svg';
import hotTextLight from '../../assets/hotTextLight.svg';
import risingTextDark from '../../assets/risingTextDark.svg';
import risingTextLight from '../../assets/risingTextLight.svg';
import ZipyoSVG from '../../assets/zipyo.svg?react';
import { FlexDiv } from '../../components/Common/Common';
import { TextHeading } from '../../components/Text/Text';
import { useStocks } from '../../hooks/useStocks';
import { useSystemTheme } from '../../hooks/useSystemHook';
import CardList from '../../layout/CardList/CardList';
import { theme, themeColor } from '../../styles/themes';
import { StockType } from '../../ts/Types';
import { StyleTabMenu, StyledContainer, StyledHome, StyledImage } from './Home.Style';

const Home = () => {
  const { data: stocks = [[], [], []] } = useStocks(); // useStocks 훅에서 모든 데이터를 가져옴

  const [tabIndex, setTabIndex] = useState<number>(0);
  const isDarkMode = useSystemTheme();

  const hotStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const risingStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const descentStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);

  const tabMenu = ['국내주식', '해외주식'];

  const handleTab = (index: number) => {
    if (tabIndex === index) {
      return;
    }

    setTabIndex(index);

    const currentScrollPosition = window.scrollY;
    const refs = [hotStocksApiRef, risingStocksApiRef, descentStocksApiRef];
    refs.forEach((ref) => ref.current.scrollToItem(ref.current.getItemByIndex('0')));

    window.scrollTo(0, currentScrollPosition);
  };

  const getImageSrc = (type: StockType) => {
    const images: Record<StockType, string> = {
      hot: isDarkMode ? hotTextDark : hotTextLight,
      rising: isDarkMode ? risingTextDark : risingTextLight,
      descent: isDarkMode ? descentTextDark : descentTextLight,
    };

    return images[type];
  };

  const HomeContainer = styled.div({
    background: theme.colors.primary100,
    width: '100%',
  });

  const HomeContents = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1280px',
    boxSizing: 'border-box',
    margin: '0px auto',
    padding: '60px 60px',
    height: '100%',
    gap: '48px',
  });

  const StyledSpan = styled.span((props: { color?: themeColor }) => ({
    color: props.color ? theme.colors[props.color] : '#000000',
  }));

  return (
    <HomeContainer>
      <StyleTabMenu>
        {tabMenu.map((el, index) => (
          <li
            key={index}
            className={index === tabIndex ? 'submenu focused' : 'submenu'}
            onClick={() => handleTab(index)}
          >
            {el}
          </li>
        ))}
      </StyleTabMenu>
      <HomeContents>
        <ContentsItemContainer>
          <ContentsItemTitle color="primary40">
            지금 가장<StyledSpan color="primary40">HOT</StyledSpan> 한
            <ZipyoSVG />
          </ContentsItemTitle>
          <CardList list={stocks[0][tabIndex]} isHot={true} apiRef={hotStocksApiRef} />
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="red">
            지금 민심 <StyledSpan color="red">떡상</StyledSpan> 중인
            <ZipyoSVG />
          </ContentsItemTitle>
          <CardList list={stocks[1][tabIndex]} apiRef={risingStocksApiRef} />
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="blue">
            지금 민심 <StyledSpan color="blue">떡락</StyledSpan> 중인
            <ZipyoSVG />
          </ContentsItemTitle>
          <CardList list={stocks[2][tabIndex]} apiRef={descentStocksApiRef} />
        </ContentsItemContainer>
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;
