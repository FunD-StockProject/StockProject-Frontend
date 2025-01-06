import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { webPath } from '@router/index';
import { StockTableData } from '@controllers/api.Type';
import { StockTableQuery } from '@controllers/query';
import HumanIndexSVG from '@assets/HumanIndex.svg?react';
import {
  DeltaScore,
  HeaderItem,
  StockData,
  StockInfo, // StockLogo,
  StockName,
  StockTableContainer,
  StockTableTitle,
  StyledTabMenu,
  TableHeaderContainer,
  TableRow,
} from './StockTable.style';

const StockTable = ({ country }: { country: string }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const updateTime = country === 'KOREA' ? '17' : '06';
  const tabMenu = ['시가총액', '거래량', '급상승', '급하락'];
  const categories = ['MARKET', 'VOLUME', 'RISING', 'DESCENT'];
  const [stockTable, suspend] = useQueryComponent({ query: StockTableQuery(categories[tabIndex], country) });

  const handleClick = (name: string) => {
    navigate(webPath.search(), { state: { symbolName: name, country: country } });
  };

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
          <li
            key={index}
            className={index === tabIndex ? 'submenu focused' : 'submenu'}
            onClick={() => handleTab(index)}
          >
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
          stockTable.map((stock: StockTableData, index: number) => {
            return (
              <TableRow key={index} onClick={() => handleClick(stock.symbolName)}>
                <StockData>
                  <StockInfo>
                    {/* <StockLogo src={stock.logo} /> */}
                    <StockName>{stock.symbolName}</StockName>
                  </StockInfo>
                </StockData>
                <StockData>
                  <span>{stock.price.toLocaleString()}</span>
                  <DeltaScore delta={stock.priceDiff}>
                    {stock.priceDiff > 0 ? '+' : ''}
                    {stock.priceDiff.toLocaleString()}({Math.abs(stock.priceDiffPerCent)}%)
                  </DeltaScore>
                </StockData>
                <StockData>
                  <span>{stock.score}점 </span>
                  <DeltaScore delta={stock.scoreDiff}>
                    ({stock.scoreDiff > 0 ? '+' : ''}
                    {stock.scoreDiff})
                  </DeltaScore>
                </StockData>
              </TableRow>
            );
          }))}
    </StockTableContainer>
  );
};

export default StockTable;
