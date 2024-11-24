import CardList from '../../layout/CardList/CardList';

import { CardInterface } from '../../ts/Interfaces';
import { StyledContainer, StyledHome, StyledImage, StyleTabMenu } from './Home.Style';
import hotTextLight from '../../assets/hotTextLight.svg';
import hotTextDark from '../../assets/hotTextDark.svg';
import risingTextLight from '../../assets/risingTextLight.svg';
import risingTextDark from '../../assets/risingTextDark.svg';
import descentTextLight from '../../assets/descentTextLight.svg';
import descentTextDark from '../../assets/descentTextDark.svg';

import { Suspense, useRef, useState } from 'react';
import { useSystemTheme } from '../../hooks/useSystemHook';
import { fetchDescentStocks, fetchHotStocks, fetchRisingStocks } from '../../controllers/api';
import { KOREA, OVERSEA } from '../../ts/Constants';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useQuery } from 'react-query';

const Home = () => {
  // const [hotStocks, setHotStocks] = useState<CardInterface[][]>([[], []]);
  // const [risingStocks, setRisingStocks] = useState<CardInterface[][]>([[], []]);
  // const [descentStocks, setDescentStocks] = useState<CardInterface[][]>([[], []]);

  const useStocks = (type: string) => {
    const fetchStocks = async (type: string) => {
      switch (type) {
        case 'hot':
          return Promise.all([fetchHotStocks(KOREA), fetchHotStocks(OVERSEA)]);
        case 'rising':
          return Promise.all([fetchRisingStocks(KOREA), fetchRisingStocks(OVERSEA)]);
        case 'descent':
          return Promise.all([fetchDescentStocks(KOREA), fetchDescentStocks(OVERSEA)]);
        default:
          throw new Error('Unknown type');
      }
    };

    return useQuery([type], () => fetchStocks(type), {
      suspense: true,
    });
  };

  const { data: hotStocks = [[], []] } = useStocks('hot');
  const { data: risingStocks = [[], []] } = useStocks('rising');
  const { data: descentStocks = [[], []] } = useStocks('descent');

  const [tabIndex, setTabIndex] = useState(0);
  const isDarkMode = useSystemTheme();

  const hotStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const risingStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const descentStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);

  const tabMenu = ['국내주식', '해외주식'];

  const handleTab = (index: number) => {
    if (tabIndex === index) {
      return;
    }
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
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default Home;
