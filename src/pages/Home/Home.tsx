import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useStocks } from '@hooks/useStocks';
import CardList from '@layout/CardList/CardList';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import ZipyoSVG from '@assets/zipyo.svg?react';
import { HomeContainer, HomeContents, StyleTabMenu, StyleTabMenuContainer, StyledSpan } from './Home.Style';

const Home = () => {
  const { data: stocks = [[], [], []] } = useStocks(); // useStocks 훅에서 모든 데이터를 가져옴

  const [tabIndex, setTabIndex] = useState<number>(0);
  // const isDarkMode = useSystemTheme();

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

  return (
    <HomeContainer>
      <StyleTabMenuContainer>
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
      </StyleTabMenuContainer>
      <HomeContents>
        <ContentsItemContainer>
          <ContentsItemTitle color="primary40">
            지금 가장<StyledSpan color="primary40">HOT</StyledSpan> 한
            <ZipyoSVG />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList list={stocks[0][tabIndex]} isHot={true} apiRef={hotStocksApiRef} />
          </ContentsItemContent>
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="red">
            지금 민심 <StyledSpan color="red">떡상</StyledSpan> 중인
            <ZipyoSVG />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList list={stocks[1][tabIndex]} apiRef={risingStocksApiRef} />
          </ContentsItemContent>
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="blue">
            지금 민심 <StyledSpan color="blue">떡락</StyledSpan> 중인
            <ZipyoSVG />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList list={stocks[2][tabIndex]} apiRef={descentStocksApiRef} />
          </ContentsItemContent>
        </ContentsItemContainer>
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;
