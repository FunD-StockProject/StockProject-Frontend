import { useSearchParams } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import StockHeader from '@components/Page/Stock/Header/Header';
import StockRelevant from '@components/Page/Stock/Relevant/Relevant';
import StockTitle from '@components/Page/Stock/StockTitle/StockTitle';
import StockInfoTab from '@components/Page/Stock/Tab/InfoTab';
import { useSymbolNameSearchQuery } from '@controllers/stocks/query';
import { StockContainer, StockContent } from './Stock.Style';

const StockPage = () => {
  const [searchParams] = useSearchParams();
  const [name, country] = [searchParams.get('name'), searchParams.get('country')];
  const { data: stockInfo } = useSymbolNameSearchQuery(name!, country as StockCountryKey);

  if (!stockInfo) return null;

  return (
    <StockContainer>
      <StockHeader stockInfo={stockInfo} />
      <StockContent>
        <StockTitle stockInfo={stockInfo} />
        <StockInfoTab stockInfo={stockInfo} />
        <span className="divider" />
        <StockRelevant stockId={stockInfo.stockId} country={stockInfo.country} />
      </StockContent>
    </StockContainer>
  );
};

export default StockPage;
