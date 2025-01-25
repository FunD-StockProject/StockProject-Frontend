import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { webPath } from '@router/index';
import { StockTableInfo } from '@controllers/api.Type';
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

const TAB_MENUS = [
  { label: '시가총액', category: 'MARKET' },
  { label: '거래량', category: 'VOLUME' },
  { label: '급상승', category: 'RISING' },
  { label: '급하락', category: 'DESCENT' },
];

const StockTable = ({ country }: { country: string }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const updateTime = STOCK_UPDATE_TIME[country];
  const { data: stockTable = [] } = StockTableQuery(TAB_MENUS[tabIndex].category, country);

  const handleClick = useCallback(
    (name: string) => navigate(webPath.search(), { state: { symbolName: name, country } }),
    [navigate, country],
  );

  return (
    <StockTableContainer>
      <StockTableTitle>
        <div>
          종목 차트별 <HumanIndexSVG />
        </div>
        <span>매일 {updateTime}시 업데이트됩니다.</span>
      </StockTableTitle>
      <StyledTabMenu>
        {TAB_MENUS.map((tab, index) => (
          <li
            key={tab.category}
            className={index === tabIndex ? 'submenu focused' : 'submenu'}
            onClick={() => setTabIndex(index)}
          >
            {tab.label}
          </li>
        ))}
      </StyledTabMenu>
      <TableHeaderContainer>
        <HeaderItem>종목</HeaderItem>
        <HeaderItem>주가</HeaderItem>
        <HeaderItem>인간지표</HeaderItem>
      </TableHeaderContainer>
      {stockTable.map((stock) => (
        <StockRow key={stock.symbolName} stock={stock} onClick={handleClick} />
      ))}
    </StockTableContainer>
  );
};

const StockRow = ({ stock, onClick }: { stock: StockTableInfo; onClick: (name: string) => void }) => {
  return (
    <TableRow onClick={() => onClick(stock.symbolName)}>
      <StockData>
        <StockInfo>
          <StockName>{stock.symbolName}</StockName>
        </StockInfo>
      </StockData>
      <StockData>
        <span>{stock.price.toLocaleString()}</span>
        <DeltaScore delta={stock.priceDiff}>
          {stock.priceDiff > 0 ? '+' : ''}
          {stock.priceDiff.toLocaleString()} ({Math.abs(stock.priceDiffPerCent)}%)
        </DeltaScore>
      </StockData>
      <StockData>
        <span>{stock.score}점</span>
        <DeltaScore delta={stock.scoreDiff}>
          ({stock.scoreDiff > 0 ? '+' : ''}
          {stock.scoreDiff})
        </DeltaScore>
      </StockData>
    </TableRow>
  );
};

export default StockTable;
