import CardList from '../../layout/CardList/CardList';
import { CardInterface } from '../../ts/Interfaces';
import { StyledContainer, StyledHome, StyledImage, StyleTabMenu } from './Home.Style';
import hotTextLight from '../../assets/hotTextLight.svg';
import hotTextDark from '../../assets/hotTextDark.svg';
import risingTextLight from '../../assets/risingTextLight.svg';
import risingTextDark from '../../assets/risingTextDark.svg';
import descentTextLight from '../../assets/descentTextLight.svg';
import descentTextDark from '../../assets/descentTextDark.svg';

import { useEffect, useRef, useState } from 'react';
import { useSystemTheme } from '../../hooks/useSystemHook';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../../controllers/api';
import { KOREA, OVERSEA } from '../../ts/Constants';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

const Home = () => {
  const [hotStocks, setHotStocks] = useState<CardInterface[][]>([[], []]);
  const [risingStocks, setRisingStocks] = useState<CardInterface[][]>([[], []]);
  const [descentStocks, setDescentStocks] = useState<CardInterface[][]>([[], []]);
  const [tabIndex, setTabIndex] = useState(0);

  const isDarkMode = useSystemTheme();
  const tabMenu = ['국내주식', '해외주식'];
  const hotStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const risingStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const descentStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const [hotKorea, hotOversea] = await Promise.all([fetchHotStocks(KOREA), fetchHotStocks(OVERSEA)]);
        setHotStocks([hotKorea, hotOversea]);

        const [risingKorea, risingOversea] = await Promise.all([fetchRisingStocks(KOREA), fetchRisingStocks(OVERSEA)]);
        setRisingStocks([risingKorea, risingOversea]);

        const [descentKorea, descentOversea] = await Promise.all([fetchDescentStocks(KOREA), fetchDescentStocks(OVERSEA)]);
        setDescentStocks([descentKorea, descentOversea]);
      } catch (error) {
        console.log('Error fetching stocks', error);
      }
    };

    fetchStocks();
  }, []);

  const handleTab = (index: number) => {
    if (tabIndex === index) return;
    const currentScrollPosition = window.scrollY;
    setTabIndex(index);
    hotStocksApiRef.current.scrollToItem(hotStocksApiRef.current.getItemByIndex('0'));
    risingStocksApiRef.current.scrollToItem(risingStocksApiRef.current.getItemByIndex('0'));
    descentStocksApiRef.current.scrollToItem(descentStocksApiRef.current.getItemByIndex('0'));
    window.scrollTo(0, currentScrollPosition);
  };

  const getImageSrc = (type: string) => {
    switch (type) {
      case 'hot':
        return isDarkMode ? hotTextDark : hotTextLight;
      case 'rising':
        return isDarkMode ? risingTextDark : risingTextLight;
      case 'descent':
        return isDarkMode ? descentTextDark : descentTextLight;
      default:
        return '';
    }
  };

  return (
    <StyledHome>
      <StyledContainer>
        <StyleTabMenu>
          {tabMenu.map((el, index) => (
            <li key={index} className={index === tabIndex ? 'submenu focused' : 'submenu'} onClick={() => handleTab(index)}>
              {el}
            </li>
          ))}
        </StyleTabMenu>
        <StyledImage src={getImageSrc('hot')} />
        <CardList list={hotStocks[tabIndex]} isHot={true} apiRef={hotStocksApiRef} />
        <StyledImage src={getImageSrc('rising')} />
        <CardList list={risingStocks[tabIndex]} isHot={false} apiRef={risingStocksApiRef} />
        <StyledImage src={getImageSrc('descent')} />
        <CardList list={descentStocks[tabIndex]} isHot={false} apiRef={descentStocksApiRef} />
      </StyledContainer>
    </StyledHome>
  );
};

export default Home;
