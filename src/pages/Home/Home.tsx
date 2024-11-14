import CardList from '../../layout/CardList/CardList';
import { CardInterface } from '../../ts/Interfaces';
import { StyledContainer, StyledHeader, StyledHome, StyledImage, StyleTabMenu } from './Home.Style';
import popularTextLight from '../../assets/popularTextLight.svg';
import popularTextDark from '../../assets/popularTextDark.svg';
import soarTextLight from '../../assets/soarTextLight.svg';
import soarTextDark from '../../assets/soarTextDark.svg';
import dropTextLight from '../../assets/dropTextLight.svg';
import dropTextDark from '../../assets/dropTextDark.svg';

import { useEffect, useState } from 'react';
import { useSystemTheme } from '../../hooks/useSystemHook';

const Home = () => {
  const popular: CardInterface[][] = [
    [
      { id: 1, score: 90, stockName: '삼성전자' },
      { id: 2, score: 50, stockName: '카카오' },
      { id: 3, score: 20, stockName: 'SK하이닉스' },
    ],
    [
      { id: 1, score: 90, stockName: '애플' },
      { id: 2, score: 50, stockName: '테슬라' },
      { id: 3, score: 20, stockName: '엔비디아' },
    ],
  ];
  const soar: CardInterface[][] = [
    [
      { id: 1, score: 90, stockName: '삼성전자' },
      { id: 2, score: 50, stockName: '카카오' },
      { id: 3, score: 20, stockName: 'SK하이닉스' },
      { id: 4, score: 90, stockName: '삼성전자' },
      { id: 5, score: 50, stockName: '카카오' },
      { id: 6, score: 20, stockName: 'SK하이닉스' },
      { id: 7, score: 90, stockName: '삼성전자' },
      { id: 8, score: 50, stockName: '카카오' },
      { id: 9, score: 20, stockName: 'SK하이닉스' },
    ],
    [
      { id: 1, score: 90, stockName: '애플' },
      { id: 2, score: 50, stockName: '테슬라' },
      { id: 3, score: 20, stockName: '엔비디아' },
      { id: 4, score: 50, stockName: '테슬라' },
      { id: 5, score: 90, stockName: '애플' },
      { id: 6, score: 20, stockName: '엔비디아' },
      { id: 7, score: 90, stockName: '애플' },
      { id: 8, score: 50, stockName: '테슬라' },
      { id: 9, score: 20, stockName: '엔비디아' },
    ],
  ];
  const drop: CardInterface[][] = [
    [
      { id: 1, score: 90, stockName: '삼성전자' },
      { id: 2, score: 50, stockName: '카카오' },
      { id: 3, score: 20, stockName: 'SK하이닉스' },
      { id: 4, score: 90, stockName: '삼성전자' },
      { id: 5, score: 50, stockName: '카카오' },
      { id: 6, score: 20, stockName: 'SK하이닉스' },
      { id: 7, score: 90, stockName: '삼성전자' },
      { id: 8, score: 50, stockName: '카카오' },
      { id: 9, score: 20, stockName: 'SK하이닉스' },
    ],
    [
      { id: 1, score: 90, stockName: '애플' },
      { id: 2, score: 50, stockName: '테슬라' },
      { id: 3, score: 20, stockName: '엔비디아' },
      { id: 4, score: 50, stockName: '테슬라' },
      { id: 5, score: 90, stockName: '애플' },
      { id: 6, score: 20, stockName: '엔비디아' },
      { id: 7, score: 90, stockName: '애플' },
      { id: 8, score: 50, stockName: '테슬라' },
      { id: 9, score: 20, stockName: '엔비디아' },
    ],
  ];

  const [tabIndex, setTabIndex] = useState(0);
  const isDarkMode = useSystemTheme();
  const tabMenu = ['국내주식', '해외주식'];

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
        <StyledHeader>
          <StyledImage width={'40%'} src={isDarkMode ? popularTextDark : popularTextLight} />
          <CardList list={popular[tabIndex]} isHot={true} />
        </StyledHeader>

        <StyledHeader>
          <StyledImage width={'40%'} src={isDarkMode ? soarTextDark : soarTextLight} />
        </StyledHeader>
        <CardList list={soar[tabIndex]} />

        <StyledHeader>
          <StyledImage width={'40%'} src={isDarkMode ? dropTextDark : dropTextLight} />
        </StyledHeader>
        <CardList list={drop[tabIndex]} />

        <button onClick={() => alert('사용 설명서 팝업')}>{'인간 지표 사용 설명서'}</button>
      </StyledContainer>
    </StyledHome>
  );
};

export default Home;
