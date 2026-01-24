import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import useRecentStocks from '@hooks/useRecentStocks';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { usePopularStockFetchQuery } from '@controllers/stocks/query';
import ChevronLeftSVG from '@assets/icons/chevronLeft.svg?react';
import { SearchBarItemContainer, SearchBarItemContents, SearchBarItemTitle } from '../SearchBar.Style';
import { PopularStocksItem, PopularStocksItemContents } from './PopularStocks.Style';

const PopularStocks = () => {
  const navigate = useNavigate();

  const { addRecentStock } = useRecentStocks();

  const [popularStocks] = usePopularStockFetchQuery();

  const handlePopularStockClick = (symbolName: string, country: StockCountryKey) => () => {
    addRecentStock(symbolName, country);

    navigate(webPath.search(), { state: { symbolName: symbolName, country: country }, replace: true });
  };

  return (
    <SearchBarItemContainer>
      <SearchBarItemTitle>인간지표 인기검색어</SearchBarItemTitle>
      <SearchBarItemContents>
        {popularStocks.map(({ stockId, symbolName, country }, index) => (
          <PopularStocksItem
            key={`SEARCHED_STOCK_${symbolName}`}
            onClick={handlePopularStockClick(symbolName, country)}
          >
            <p>{index + 1}</p>
            <PopularStocksItemContents>
              <StockImage stockId={stockId} />
              <p className="symbolName">{symbolName}</p>
              <ChevronLeftSVG />
            </PopularStocksItemContents>
          </PopularStocksItem>
        ))}
      </SearchBarItemContents>
    </SearchBarItemContainer>
  );
};

export default PopularStocks;
