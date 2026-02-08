import { useState } from 'react';
import { STOCK_COUNTRY_MAP, StockCountryKey } from '@ts/StockCountry';
import useRouter from '@router/useRouter';
import { useStockTableInfoQuery } from '@controllers/stocks/query';
import { StockTableInfo } from '@controllers/stocks/types';
import LoadingGIF from '@assets/loading.gif';
import ItemTitle from '../Common';
import { HomeItemContainer } from '../Common.Style';
import { RankingContent, RankingLoading, RankingTabContainer, RankingTabLabel, RankingTable } from './Ranking.Style';
import RankingStock from './RankingStock';

export type StockTableTabKey = 'MARKET' | 'VOLUME' | 'RISING' | 'DESCENT';

const STOCK_TABLE_TABS: { key: StockTableTabKey; text: string }[] = [
  { key: 'MARKET', text: '거래대금' },
  { key: 'VOLUME', text: '거래량' },
  { key: 'RISING', text: '급상승' },
  { key: 'DESCENT', text: '급하락' },
];

const HomeRanking = ({ country }: { country: StockCountryKey }) => {
  const { navToStock } = useRouter();
  const [activeTab, setActiveTab] = useState<StockTableTabKey>('MARKET');

  const currencySymbol = STOCK_COUNTRY_MAP[country].currency;

  const { data: stocks, isLoading } = useStockTableInfoQuery(activeTab, country);

  const handleClickStock = (symbolName: string) => () => navToStock(symbolName, country);

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => setActiveTab(e.target.value as StockTableTabKey);

  return (
    <HomeItemContainer>
      <ItemTitle title="종목 차트별 인간지표" country={country} />
      <RankingContent>
        <RankingTabContainer>
          {STOCK_TABLE_TABS.map(({ key, text }) => (
            <RankingTabLabel key={`STOCK_TABLE_TAB_${key}`}>
              <input
                type="radio"
                name="table_tab"
                value={key}
                defaultChecked={activeTab === key}
                onChange={handleTabChange}
              />
              <span>{text}</span>
            </RankingTabLabel>
          ))}
        </RankingTabContainer>
        <RankingTable>
          <thead>
            <tr>
              <th>종목</th>
              <th>주가</th>
              <th>인간지표</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.map((stock: StockTableInfo) => (
              <RankingStock
                key={`STOCK_TABLE_ITEM_${stock.stockId}`}
                stock={stock}
                handleClickStock={handleClickStock}
                currencySymbol={currencySymbol}
              />
            ))}
          </tbody>
        </RankingTable>
        {isLoading && (
          <RankingLoading>
            <img src={LoadingGIF} />
          </RankingLoading>
        )}
      </RankingContent>
    </HomeItemContainer>
  );
};

export default HomeRanking;
