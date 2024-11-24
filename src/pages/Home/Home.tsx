import CardList from '../../layout/CardList/CardList';
import { StyledContainer, StyledHome, StyledImage, StyleTabMenu } from './Home.Style';
import hotTextLight from '../../assets/hotTextLight.svg';
import hotTextDark from '../../assets/hotTextDark.svg';
import risingTextLight from '../../assets/risingTextLight.svg';
import risingTextDark from '../../assets/risingTextDark.svg';
import descentTextLight from '../../assets/descentTextLight.svg';
import descentTextDark from '../../assets/descentTextDark.svg';

import { useRef, useState } from 'react';
import { useSystemTheme } from '../../hooks/useSystemHook';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { StockType } from '../../ts/Types';
import { useStocks } from '../../hooks/useStocks';

const Home = () => {
  const { data: hotStocks = [[], []] } = useStocks('hot');
  const { data: risingStocks = [[], []] } = useStocks('rising');
  const { data: descentStocks = [[], []] } = useStocks('descent');

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

  return (
    <StyledHome>
      <StyledContainer>
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
        <StyledImage src={getImageSrc('hot')} />
        <CardList list={hotStocks[tabIndex]} isHot={true} apiRef={hotStocksApiRef} />
        <StyledImage src={getImageSrc('rising')} />
        <CardList list={risingStocks[tabIndex]} apiRef={risingStocksApiRef} />
        <StyledImage src={getImageSrc('descent')} />
        <CardList list={descentStocks[tabIndex]} apiRef={descentStocksApiRef} />
      </StyledContainer>
    </StyledHome>
  );
};

export default Home;
