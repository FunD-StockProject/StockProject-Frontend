import { StockCountryKey } from '@ts/StockCountry';
import { SmallStockCard } from '@components/CardList/StockCard/StockCard';
import { StockCardContainer, StockCardItem } from '@components/CardList/StockCard/StockCard.Style';
import { useRelevantStockFetchQuery } from '@controllers/stocks/query';
import { StockInfo } from '@controllers/stocks/types';
import { StockItemContainer } from '../Common.Style';
import StockItemTitle from '../ItemTitle';

const StockRelevant = ({ stockId, country }: { stockId: number; country: StockCountryKey }) => {
  const { data: stocks } = useRelevantStockFetchQuery(stockId);

  if (!stocks) return null;

  return (
    <StockItemContainer>
      <StockItemTitle title="이 종목과 점수가 비슷한 종목" country={country} />
      <StockCardContainer>
        <div>
          {stocks?.map((e: StockInfo) => (
            <StockCardItem key={`RELEVANT_STOCK_${e.stockId}`}>
              <SmallStockCard stock={e} country={country} />
            </StockCardItem>
          ))}
        </div>
      </StockCardContainer>
    </StockItemContainer>
  );
};

export default StockRelevant;
