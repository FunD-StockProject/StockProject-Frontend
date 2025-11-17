import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import { diffToPercent, diffToValue } from '@utils/ScoreConvert';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { StockTableInfo } from '@controllers/api.Type';
import { useStockTableInfoQuery } from '@controllers/query';
import { HomeItemTtile } from '../Title/Title.Style';
import {
  StockTableContainer,
  StockTableContent,
  StockTableItem,
  StockTableItemPrice,
  StockTableItemScore,
  StockTableItemSymbol,
  StockTableTabContainer,
  StockTableTabLabel,
  StockTableTable,
} from './StockTable.style';

const StockTableTab = [
  { key: 'MARKET', text: '거래대금' },
  { key: 'VOLUME', text: '거래량' },
  { key: 'RISING', text: '급상승' },
  { key: 'DESCENT', text: '급하락' },
];

const StockTable = ({ country }: { country: StockCountryKey }) => {
  const navigate = useNavigate();

  const [tableTab, setTableTab] = useState<string>('MARKET');

  const updateTime = STOCK_UPDATE_TIME[country];
  const [stockTable, suspend] = useQueryComponent({
    query: useStockTableInfoQuery(tableTab, country),
  });

  const handleClick = (name: string) => () => {
    navigate(webPath.search(), { state: { symbolName: name, country: country } });
  };

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableTab(e.target.value);
  };

  return (
    <StockTableContainer>
      <HomeItemTtile>
        <p className="title">종목 차트별 인간지표 TOP5</p>
        <p className="update-time">어제 {updateTime} 기준</p>
      </HomeItemTtile>
      <StockTableContent>
        <StockTableTabContainer>
          {StockTableTab.map(({ key, text }, idx) => (
            <StockTableTabLabel key={`STOCK_TABLE_TAB_${key}`}>
              <input type="radio" name="table_tab" value={key} defaultChecked={idx === 0} onChange={handleTabChange} />
              <span>{text}</span>
            </StockTableTabLabel>
          ))}
        </StockTableTabContainer>
        {suspend || (
          <StockTableTable>
            <thead>
              <tr>
                <th>종목</th>
                <th>주가</th>
                <th>인간지표</th>
              </tr>
            </thead>
            <tbody>
              {stockTable?.map((stock: StockTableInfo) => (
                <StockTableItem
                  key={`STOCK_TABLE_ITEM_${tableTab}_${stock.stockId}`}
                  onClick={handleClick(stock.symbolName)}
                >
                  <StockTableItemSymbol>
                    <StockImage stockId={stock.stockId} alt={stock.symbolName} />
                    <p>{stock.symbolName}</p>
                  </StockTableItemSymbol>
                  <StockTableItemPrice delta={stock.priceDiff}>
                    <p className="price">{stock.price.toLocaleString()}</p>
                    <p className="diff">
                      {diffToValue(stock.priceDiff)}(
                      {diffToPercent(stock.price, stock.priceDiff, { fixed: 2, sign: false })})
                    </p>
                  </StockTableItemPrice>
                  <StockTableItemScore delta={stock.scoreDiff}>
                    <p className="score">{stock.score}점</p>
                    <p className="diff">({diffToPercent(stock.score, stock.scoreDiff, { sign: true, fixed: 0 })})</p>
                  </StockTableItemScore>
                </StockTableItem>
              ))}
            </tbody>
          </StockTableTable>
        )}
      </StockTableContent>
    </StockTableContainer>
  );
};

export default StockTable;
