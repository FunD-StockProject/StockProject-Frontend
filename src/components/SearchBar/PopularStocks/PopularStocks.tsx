import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { getItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
import { webPath } from '@router/index';
import { usePopularStockFetchQuery } from '@controllers/query';
import ChevronLeftSVG from '@assets/icons/chevronLeft.svg?react';
import { SearchBarItemContainer, SearchBarItemContents, SearchBarItemTitle } from '../SearchBar.Style';
import { PopularStocksItem, PopularStocksItemContents } from './PopularStocks.Style';

const PopularStocks = () => {
  const navigate = useNavigate();

  const [popularStocks] = usePopularStockFetchQuery();

  const handlePopularStockClick = (symbolName: string, country: StockCountryKey) => () => {
    setItemLocalStorage('RecentStocks', [
      { symbolName, country },
      ...getItemLocalStorage('RecentStocks', []).filter(
        (item: { symbolName: string }) => item.symbolName !== symbolName,
      ),
    ]);

    navigate(webPath.search(), { state: { symbolName: symbolName, country: country }, replace: true });
  };

  return (
    <SearchBarItemContainer>
      <SearchBarItemTitle>인간지표 인기검색어</SearchBarItemTitle>
      <SearchBarItemContents>
        {popularStocks.map(({ symbolName, country }, index) => (
          <PopularStocksItem
            key={`SEARCHED_STOCK_${symbolName}`}
            onClick={handlePopularStockClick(symbolName, country)}
          >
            <p>{index + 1}</p>
            <PopularStocksItemContents>
              <img src={''} />
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
