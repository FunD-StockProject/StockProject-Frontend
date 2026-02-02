import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_COUNTRY_MAP } from '@ts/StockCountry';
import extractMatchedSegments from '@utils/extractMatchedSegments';
import useRecentStocks from '@hooks/useRecentStocks';
import useRouter from '@router/useRouter';
import { fetchAutoComplete } from '@controllers/stocks/api';
import { useAutoComplete } from '@controllers/stocks/query';
import { SearchBarItemContainer, SearchBarItemContents, SearchBarItemTitle } from '../../SearchBar.Style';
import { AutoCompleteEmptyContainer } from '../AutoComplete.Style';
import { AutoCompleteStocksItem } from './Stocks.Style';

const AutoCompleteStocks = ({ searchValue }: { searchValue: string }) => {
  const { navToStock } = useRouter();
  const [searchedStocks, setSearchedStocks] = useAutoComplete(fetchAutoComplete, 'symbolName');
  const { addRecentStock } = useRecentStocks();

  useEffect(() => {
    setSearchedStocks(searchValue);
  }, [searchValue]);

  const handleStockClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      const symbolName = el.dataset.symbolname as string;
      const country = el.dataset.country as StockCountryKey;

      addRecentStock(symbolName, country);
      navToStock(symbolName, country, { replace: true });
    },
    [addRecentStock, navToStock],
  );

  const autoCompleteStocks = useMemo(() => {
    if (!searchedStocks?.length) return [];

    return searchedStocks.map(({ stockId, symbolName, country, symbol }) => {
      const nameSegments = extractMatchedSegments(symbolName, searchValue);
      const symbolSegments = extractMatchedSegments(symbol, searchValue);

      return {
        stockId,
        symbolName,
        country,
        symbol,
        nameSegments,
        symbolSegments,
      };
    });
  }, [searchedStocks, searchValue]);

  const hasResults = autoCompleteStocks.length;

  return (
    <SearchBarItemContainer>
      <SearchBarItemTitle>검색결과</SearchBarItemTitle>
      <SearchBarItemContents>
        {hasResults ? (
          autoCompleteStocks.map(({ stockId, symbolName, country, nameSegments, symbolSegments }) => (
            <AutoCompleteStocksItem
              key={`SEARCHED_STOCK_${stockId}`}
              onClick={handleStockClick}
              data-symbolname={symbolName}
              data-country={country}
            >
              <p className="country">{STOCK_COUNTRY_MAP[country].text}종목</p>

              <p className="name">
                {nameSegments.map(({ matched, text }, index) => {
                  const key = `SEARCHED_STOCK_${stockId}_NAME_${index}`;

                  return matched ? <b key={key}>{text}</b> : <Fragment key={key}>{text}</Fragment>;
                })}

                <span className="symbol">
                  {symbolSegments.map(({ matched, text }, index) => {
                    const key = `SEARCHED_STOCK_${stockId}_SYMBOL_${index}`;

                    return matched ? <b key={key}>{text}</b> : <Fragment key={key}>{text}</Fragment>;
                  })}
                </span>
              </p>
            </AutoCompleteStocksItem>
          ))
        ) : (
          <AutoCompleteEmptyContainer>
            <p className="empty_title">'{searchValue}' 검색어에 해당하는 결과가 없어요 😭</p>
            <p className="empty_subtitle">다른 종목을 다시 검색해보세요</p>
          </AutoCompleteEmptyContainer>
        )}
      </SearchBarItemContents>
    </SearchBarItemContainer>
  );
};

export default AutoCompleteStocks;
