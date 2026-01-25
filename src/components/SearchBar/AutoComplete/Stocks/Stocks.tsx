import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_COUNTRY_MAP } from '@ts/StockCountry';
import extractMatchedSegments from '@utils/extractMatchedSegments';
import useRecentStocks from '@hooks/useRecentStocks';
import { webPath } from '@router/index';
import {
  SearchBarItemContainer,
  SearchBarItemContents,
  SearchBarItemTitle,
} from '@components/SearchBar/SearchBar.Style';
import { fetchAutoComplete } from '@controllers/stocks/api';
import { useAutoComplete } from '@controllers/stocks/query';
import { AutoCompleteEmptyContainer } from '../AutoComplete.Style';
import { AutoCompleteStocksItem } from './Stocks.Style';

const AutoCompleteStocks = ({ searchValue }: { searchValue: string }) => {
  const navigate = useNavigate();
  const [searchedStocks, setSearchedStocks] = useAutoComplete(fetchAutoComplete, 'symbolName');
  const { addRecentStock } = useRecentStocks();

  useEffect(() => {
    setSearchedStocks(searchValue);
  }, [searchValue]);

  const handleStockClick = (symbolName: string, country: StockCountryKey) => () => {
    addRecentStock(symbolName, country);

    navigate(webPath.search(), { state: { symbolName: symbolName, country: country }, replace: true });
  };

  return (
    <SearchBarItemContainer>
      <SearchBarItemTitle>검색결과</SearchBarItemTitle>
      <SearchBarItemContents>
        {searchedStocks?.length ? (
          searchedStocks.map(({ stockId, symbolName, country, symbol }) => (
            <AutoCompleteStocksItem key={`SEARCHED_STOCK_${stockId}`} onClick={handleStockClick(symbolName, country)}>
              <p className="country">{STOCK_COUNTRY_MAP[country].text}종목</p>
              <p className="name">
                {extractMatchedSegments(symbolName, searchValue).map(({ matched, text }, index) =>
                  matched ? <b key={`SEARCHED_STOCK_${stockId}_NAME_${index}`}>{text}</b> : text,
                )}
                <span className="symbol">
                  {extractMatchedSegments(symbol, searchValue).map(({ matched, text }, index) =>
                    matched ? <b key={`SEARCHED_STOCK_${stockId}_NAME_${index}`}>{text}</b> : text,
                  )}
                </span>
              </p>
            </AutoCompleteStocksItem>
          ))
        ) : (
          <AutoCompleteEmptyContainer>
            <p className="empty_title">&apos;{searchValue}&apos; 검색어에 해당하는 결과가 없어요 😭</p>
            <p className="empty_subtitle">다른 종목을 다시 검색해보세요</p>
          </AutoCompleteEmptyContainer>
        )}
      </SearchBarItemContents>
    </SearchBarItemContainer>
  );
};

export default AutoCompleteStocks;
