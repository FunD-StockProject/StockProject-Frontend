import { useState } from 'react';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { StockTableData } from '@controllers/api.Type';
import { StockTableQuery } from '@controllers/query';
import HumanIndexSVG from '@assets/HumanIndex.svg?react';
import {
  DeltaScore,
  HeaderItem,
  StockData,
  StockInfo,
  StockLogo,
  StockName,
  StockTableContainer,
  StockTableTitle,
  StyledTabMenu,
  TableHeaderContainer,
  TableRow,
} from './StockTable.style';

const StockTable = ({ country }: { country: string }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const updateTime = country === 'KOREA' ? '17' : '06';
  const tabMenu = ['거래대금', '거래량', '급상승', '급하락'];
  const [stockTable, suspend] = useQueryComponent({ query: StockTableQuery(country) });

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
        <span>매일 {updateTime}시 업데이트됩니다.</span>
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
      {suspend ||
        (stockTable &&
          stockTable[tabIndex].map((stock: StockTableData, index: number) => {
            return (
              <TableRow key={index}>
                <StockData>
                  <StockInfo>
                    <StockLogo src={stock.logo} />
                    <StockName>{stock.name}</StockName>
                  </StockInfo>
                </StockData>
                <StockData>
                  <span>{stock.price.toLocaleString()}</span>
                  <DeltaScore delta={stock.change}>
                    {stock.change > 0 ? '+' : ''}
                    {stock.change.toLocaleString()}({Math.abs(stock.changeRate)}%)
                  </DeltaScore>
                </StockData>
                <StockData>
                  <span>{stock.score}점 </span>
                  <DeltaScore delta={stock.delta}>
                    ({stock.delta > 0 ? '+' : ''}
                    {stock.delta})
                  </DeltaScore>
                </StockData>
              </TableRow>
            );
          }))}
    </StockTableContainer>
  );
};

export default StockTable;
