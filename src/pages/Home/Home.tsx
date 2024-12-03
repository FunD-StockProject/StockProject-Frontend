import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
// import { useStocks } from '@hooks/useStocks';
import CardList from '@components/CardList/CardList';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import ZipyoSVG from '@assets/zipyo.svg?react';
import { HomeContainer, HomeContents, StyleTabMenu, StyleTabMenuContainer, StyledSpan } from './Home.Style';

const Home = () => {
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
            <CardList isHot={true} apiRef={hotStocksApiRef} name={'HOT'} index={tabIndex} />
          </ContentsItemContent>
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="red">
            지금 민심 <StyledSpan color="red">떡상</StyledSpan> 중인
            <ZipyoSVG />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={risingStocksApiRef} name={'RISING'} index={tabIndex} />
          </ContentsItemContent>
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="blue">
            지금 민심 <StyledSpan color="blue">떡락</StyledSpan> 중인
            <ZipyoSVG />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={descentStocksApiRef} name={'DESCENT'} index={tabIndex} />
          </ContentsItemContent>
        </ContentsItemContainer>
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;
