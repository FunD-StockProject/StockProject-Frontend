import CardList from '../../layout/CardList/CardList';
import { CardInterface } from '../../ts/Interfaces';
import { StyledContainer, StyledHome, StyledImage, StyleTabMenu } from './Home.Style';
import hotTextLight from '../../assets/hotTextLight.svg';
import hotTextDark from '../../assets/hotTextDark.svg';
import risingTextLight from '../../assets/risingTextLight.svg';
import risingTextDark from '../../assets/risingTextDark.svg';
import descentTextLight from '../../assets/descentTextLight.svg';
import descentTextDark from '../../assets/descentTextDark.svg';

import { useEffect, useState } from 'react';
import { useSystemTheme } from '../../hooks/useSystemHook';

const Home = () => {
  const [hotStocks, setHotStocks] = useState<CardInterface[][]>([]);
  const [risingStocks, setRisingStocks] = useState<CardInterface[][]>([]);
  const [descentStocks, setDescentStocks] = useState<CardInterface[][]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const isDarkMode = useSystemTheme();
  const tabMenu = ['국내주식', '해외주식'];

  useEffect(() => {
    setHotStocks([
      [
        {
          stockId: 1,
          symbolName: '마이크로컨텍솔',
          score: 51,
        },
        {
          stockId: 3,
          symbolName: 'AJ네트웍스',
          score: 51,
        },
        {
          stockId: 67,
          symbolName: 'LF',
          score: 51,
        },
      ],
      [
        {
          stockId: 1,
          symbolName: 'AAPL',
          score: 90,
        },
        {
          stockId: 2,
          symbolName: 'TSLA',
          score: 40,
        },
        {
          stockId: 3,
          symbolName: 'NVA',
          score: 10,
        },
      ],
    ]);

    setRisingStocks([
      [
        {
          stockId: 1,
          symbolName: '마이크로컨텍솔',
          score: 51,
        },
        {
          stockId: 3,
          symbolName: 'AJ네트웍스',
          score: 51,
        },
        {
          stockId: 16,
          symbolName: 'CS홀딩스',
          score: 51,
        },
        {
          stockId: 17,
          symbolName: 'DB',
          score: 51,
        },
        {
          stockId: 20,
          symbolName: 'DB하이텍',
          score: 51,
        },
        {
          stockId: 54,
          symbolName: 'KB금융',
          score: 51,
        },
        {
          stockId: 67,
          symbolName: 'LF',
          score: 51,
        },
        {
          stockId: 5,
          symbolName: 'BGF리테일',
          score: 51,
        },
        {
          stockId: 77,
          symbolName: 'LG전자',
          score: 51,
        },
      ],
      [
        { stockId: 1, score: 90, symbolName: '애플' },
        { stockId: 2, score: 50, symbolName: '테슬라' },
        { stockId: 3, score: 20, symbolName: '엔비디아' },
        { stockId: 4, score: 50, symbolName: '테슬라' },
        { stockId: 5, score: 90, symbolName: '애플' },
        { stockId: 6, score: 20, symbolName: '엔비디아' },
        { stockId: 7, score: 90, symbolName: '애플' },
        { stockId: 8, score: 50, symbolName: '테슬라' },
        { stockId: 9, score: 20, symbolName: '엔비디아' },
      ],
    ]);

    setDescentStocks([
      [
        {
          stockId: 1,
          symbolName: '마이크로컨텍솔',
          score: 51,
        },
        {
          stockId: 3,
          symbolName: 'AJ네트웍스',
          score: 51,
        },
        {
          stockId: 16,
          symbolName: 'CS홀딩스',
          score: 51,
        },
        {
          stockId: 17,
          symbolName: 'DB',
          score: 51,
        },
        {
          stockId: 20,
          symbolName: 'DB하이텍',
          score: 51,
        },
        {
          stockId: 54,
          symbolName: 'KB금융',
          score: 51,
        },
        {
          stockId: 67,
          symbolName: 'LF',
          score: 51,
        },
        {
          stockId: 5,
          symbolName: 'BGF리테일',
          score: 51,
        },
        {
          stockId: 77,
          symbolName: 'LG전자',
          score: 51,
        },
      ],
      [
        { stockId: 1, score: 90, symbolName: '애플' },
        { stockId: 2, score: 50, symbolName: '테슬라' },
        { stockId: 3, score: 20, symbolName: '엔비디아' },
        { stockId: 4, score: 50, symbolName: '테슬라' },
        { stockId: 5, score: 90, symbolName: '애플' },
        { stockId: 6, score: 20, symbolName: '엔비디아' },
        { stockId: 7, score: 90, symbolName: '애플' },
        { stockId: 8, score: 50, symbolName: '테슬라' },
        { stockId: 9, score: 20, symbolName: '엔비디아' },
      ],
    ]);
  }, []);

  const handleTab = (index: number) => {
    if (tabIndex !== index) {
      setTabIndex(index);
    }
  };

  return (
    <StyledHome style={{ backgroundColor: `${isDarkMode ? 'black' : 'white'}` }}>
      <StyledContainer>
        <StyleTabMenu>
          {tabMenu.map((el, index) => (
            <li className={index === tabIndex ? 'submenu focused' : 'submenu'} key={index} onClick={() => handleTab(index)}>
              {el}
            </li>
          ))}
        </StyleTabMenu>
        <StyledImage src={isDarkMode ? hotTextDark : hotTextLight} />
        <CardList list={hotStocks[tabIndex] ?? []} isHot={true} />

        <StyledImage src={isDarkMode ? risingTextDark : risingTextLight} />
        <CardList list={risingStocks[tabIndex] ?? []} />

        <StyledImage src={isDarkMode ? descentTextDark : descentTextLight} />
        <CardList list={descentStocks[tabIndex] ?? []} backgroundColor="#2D92FF" />
      </StyledContainer>
    </StyledHome>
  );
};

export default Home;
