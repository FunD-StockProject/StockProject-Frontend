import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_MAP, StockCountryKey } from '@ts/StockCountry';
import useRecentStocks from '@hooks/useRecentStocks';
import { webPath } from '@router/index';
import ClockSVG from '@assets/icons/clock.svg?react';
import CrossSVG from '@assets/icons/cross.svg?react';
import { SearchBarItemContainer, SearchBarItemContents, SearchBarItemTitle } from '../SearchBar.Style';
import { RecentStocksItem, RecentStocksItemContents } from './RecentStocks.Style';

const RecentStocks = () => {
  const navigate = useNavigate();

  const { recentStocks, addRecentStock, removeRecentStock } = useRecentStocks();

  const handleRecentStockDelete = (symbolName: string) => (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();

    removeRecentStock(symbolName);
  };

  const handleRecentStockClick = (symbolName: string, country: StockCountryKey) => () => {
    addRecentStock(symbolName, country);

    navigate(webPath.search(), { state: { symbolName: symbolName, country: country }, replace: true });
  };

  return (
    <SearchBarItemContainer>
      <SearchBarItemTitle>최근 검색어</SearchBarItemTitle>
      <SearchBarItemContents>
        {(recentStocks ?? []).map(({ symbolName, country }) => (
          <RecentStocksItem key={`SEARCHED_STOCK_${symbolName}`} onClick={handleRecentStockClick(symbolName, country)}>
            <ClockSVG />
            <RecentStocksItemContents>
              <p className="country">{STOCK_COUNTRY_MAP[country].text}종목</p>
              <p className="symbolName">{symbolName}</p>
              <CrossSVG onClick={handleRecentStockDelete(symbolName)} />
            </RecentStocksItemContents>
          </RecentStocksItem>
        ))}
      </SearchBarItemContents>
    </SearchBarItemContainer>
  );
};

export default RecentStocks;
