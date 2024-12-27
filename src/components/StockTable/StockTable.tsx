// 예시 로고
import { useState } from 'react';
import HumanIndexSVG from '@assets/HumanIndex.svg?react';
import SamsungLogo from '@assets/zipyo.svg?react';
import {
  ChangeValue,
  HeaderItem,
  StockData,
  StockInfo,
  StockLogo,
  StockTableContainer,
  StockTableTitle,
  StyledTabMenu,
  TableHeaderContainer,
  TableRow,
} from './StockTable.style';

// 인간지표 이미지

const stockData = [
  [
    { logo: <SamsungLogo />, name: '삼성전자1', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자1', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자1', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자1', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자1', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자1', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
  [
    { logo: <SamsungLogo />, name: '삼성전자2', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자2', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자2', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자2', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자2', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자2', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
  [
    { logo: <SamsungLogo />, name: '삼성전자3', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자3', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자3', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자3', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자3', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자3', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
  [
    { logo: <SamsungLogo />, name: '삼성전자4', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자4', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자4', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자4', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
    { logo: <SamsungLogo />, name: '삼성전자4', price: 56000, change: 200, changeRate: 0.36, score: 65, delta: 6 },
    { logo: <SamsungLogo />, name: '짭삼전자4', price: 13875, change: -2754, changeRate: -0.36, score: 16, delta: -6 },
  ],
];

const StockTable = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabMenu = ['거래대금', '거래량', '급상승', '급하락'];
  const handleTab = (index: number) => {
    if (tabIndex === index) {
      return;
    }

    setTabIndex(index);
  };
  return (
    <StockTableContainer>
      <StockTableTitle>
        <div>
          종목 차트별 <HumanIndexSVG />
        </div>
        <span>어제 08:24 기준</span>
      </StockTableTitle>
      <StyledTabMenu>
        {tabMenu.map((el, index) => (
          <li key={index} className={index === tabIndex ? 'submenu focused' : 'submenu'} onClick={() => handleTab(index)}>
            {el}
          </li>
        ))}
      </StyledTabMenu>
      <TableHeaderContainer>
        <HeaderItem>종목</HeaderItem>
        <HeaderItem>주가</HeaderItem>
        <HeaderItem>인간지표</HeaderItem>
      </TableHeaderContainer>
      {stockData[tabIndex].map((stock, index) => (
        <TableRow key={index}>
          <StockData>
            <StockInfo>
              <StockLogo>{stock.logo}</StockLogo>
              {stock.name}
            </StockInfo>
          </StockData>
          <StockData>
            <div>{stock.price.toLocaleString()}</div>
            <ChangeValue isPositive={stock.change > 0}>
              {stock.change.toLocaleString()} ({Math.abs(stock.changeRate)}%)
            </ChangeValue>
          </StockData>
          <StockData>
            <span>{stock.score}점 </span>
            <ChangeValue isPositive={stock.delta > 0}>
              ({stock.delta > 0 ? '+' : ''}
              {stock.delta}% )
            </ChangeValue>
          </StockData>
        </TableRow>
      ))}
    </StockTableContainer>
  );
};

export default StockTable;
