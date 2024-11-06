import CardList from '../../layout/CardList/CardList';
import { CardInterface } from '../../ts/Interfaces';
import { StyledHeader, StyleTabMenu } from './Home.Style';
import popularText from '../../assets/popularText.svg';
import soarText from '../../assets/soarText.svg';
import dropText from '../../assets/dropText.svg';
import { useState } from 'react';

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
  const tabMenu = ['국내', '해외'];

  const handleTab = (index: number) => {
    if (tabIndex !== index) {
      setTabIndex(index);
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <StyleTabMenu>
        {tabMenu.map((el, index) => (
          <li className={index === tabIndex ? 'submenu focused' : 'submenu'} key={index} onClick={() => handleTab(index)}>
            {el}
          </li>
        ))}
      </StyleTabMenu>
      <StyledHeader>
        <img src={popularText} />
        {/* <img style={{ width: window.innerWidth }} src={test} /> */}
        {/* <img src={test} />
        <img src={test} /> */}
        <CardList list={popular[tabIndex]} isHot={true} />
      </StyledHeader>

      <StyledHeader>
        <img src={soarText} />
      </StyledHeader>
      <CardList list={soar[tabIndex]} />

      <StyledHeader>
        <img src={dropText} />
      </StyledHeader>
      <CardList list={drop[tabIndex]} />

      <button onClick={() => alert('사용 설명서 팝업')}>{'인간 지표 사용 설명서'}</button>
    </div>
  );
};

export default Home;
