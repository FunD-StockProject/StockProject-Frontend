import { useState } from 'react';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { StockTableData } from '@controllers/api.Type';
import { StockTableQuery } from '@controllers/query';
import HumanIndexSVG from '@assets/HumanIndex.svg?react';
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

const StockTable = ({ country }: { country: string }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [stockTable] = useQueryComponent({ query: StockTableQuery(country) });
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
      {stockTable &&
        stockTable[tabIndex].map((stock: StockTableData, index: number) => (
          <TableRow key={index}>
            <StockData>
              <StockInfo>
                <StockLogo>
                  <img src={stock.logo}></img>
                </StockLogo>
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
