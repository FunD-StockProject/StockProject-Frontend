import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { StockSearchInfo } from '@ts/Types';
import { getItemLocalStorage, isExistItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
import { webPath } from '@router/index';
import { fetchAutoComplete, fetchSearchSymbolName } from '@controllers/api';
import { StockInfo } from '@controllers/api.Type';
import CancelSVG from '@assets/icons/cancel.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import NoResultSVG from '@assets/noResult.svg?react';
import { AutoCompleteListProps, RecentSearchListProps } from './SearchBar.Props';
import {
  AutoCompleteItemContainer,
  AutoCompleteItemText,
  AutoCompleteListContainer,
  RecentSearchItemContainer,
  RecentSearchListContainer,
  SearchBarContainer,
  SearchBarContents,
  SearchBarDesignPart,
  SearchBarInput,
  SearchBarLayer,
  SearchBarLayout,
} from './SearchBar.Style';

const getCommonString = ({ from, to }: { from: string; to: string }) => {
  const arr = Array.from([...to], (e) => ({
    char: e,
    check: false,
  }));
  let idx = 0;
  arr.map((e, i) => {
    if (from[idx] == e.char) {
      arr[i].check = true;
      idx++;
    }
  });
  return arr;
};

const RecentSearchList = ({ stockSearchedInfo, focusIdx, handleSearch, deleteRecentSearch }: RecentSearchListProps) => {
  console.log(stockSearchedInfo);

  return (
    <RecentSearchListContainer isEmpty={stockSearchedInfo.length == 0}>
      {stockSearchedInfo.length != 0 && <span>최근검색어</span>}
      {stockSearchedInfo &&
        stockSearchedInfo.map((stock: StockSearchInfo, idx: number) => (
          <RecentSearchItemContainer key={`recent_search_${idx}`} focus={idx == focusIdx}>
            {STOCK_COUNTRY_TYPE[stock.country]} 종목
            <span onClick={() => handleSearch(stock.symbolName)}>{stock.symbolName}</span>
            <CancelSVG onClick={() => deleteRecentSearch(stock.symbolName)} />
          </RecentSearchItemContainer>
        ))}
    </RecentSearchListContainer>
  );
};

const AutoCompleteList = ({ value, focusIdx, searchedResult, handleSearch }: AutoCompleteListProps) => {
  return (
    <AutoCompleteListContainer>
      {searchedResult.length ? (
        searchedResult.map((e: StockInfo, idx: number) => (
          <AutoCompleteItemContainer
            key={`${e.symbolName}_${e.stockId}`}
            focus={idx == focusIdx}
            onClick={() => handleSearch(e.symbolName)}
          >
            {STOCK_COUNTRY_TYPE[e.country]} 종목
            <AutoCompleteItemText key={`${e.symbolName}_${e.symbolName}`}>
              {getCommonString({ from: value, to: e.symbolName }).map((e) =>
                e.check ? <span>{e.char}</span> : e.char,
              )}
            </AutoCompleteItemText>
          </AutoCompleteItemContainer>
        ))
      ) : (
        <NoResultSVG />
      )}
    </AutoCompleteListContainer>
  );
};

const SearchBar = () => {
  const navigate = useNavigate();

  const [stockName, setStockName] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [stockSearchInfo, setStockSearchInfo] = useState<StockSearchInfo[]>(
    isExistItemLocalStorage('stockSearchInfo') ? getItemLocalStorage('stockSearchInfo') : [],
  );
  const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);
  const [searchedResult, setSearchedResult] = useState<StockInfo[]>([]);
  const [focusIdx, setFocusIdx] = useState<number>(-1);

  const callbackRef = useCallback((current: HTMLDivElement) => {
    current?.focus();
  }, []);

  const updateSearchedResult = async (name: string) => {
    if (name.length == 0) {
      setSearchedResult([]);
      return;
    }
    const result = await fetchAutoComplete(name);
    if (result) setSearchedResult(result);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setStockName(e.target.value.trim());
    updateSearchedResult(e.target.value.trim());
    setFocusIdx(-1);
  };

  const searchBarInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'ArrowDown') {
      e.preventDefault();
      setFocusIdx((prev) =>
        stockName == '' ? (prev + 1) % stockSearchInfo.length : (prev + 1) % searchedResult.length,
      );
    } else if (e.key == 'ArrowUp') {
      e.preventDefault();
      setFocusIdx((prev) =>
        stockName == ''
          ? ((prev == -1 ? 0 : prev) + stockSearchInfo.length - 1) % stockSearchInfo.length
          : ((prev == -1 ? 0 : prev) + searchedResult.length - 1) % searchedResult.length,
      );
    } else if (e.key == 'Escape') {
      (document.activeElement as HTMLElement).blur();
      setFocusIdx(-1);
    } else if (e.key === 'Enter') {
      let name = stockName;
      if (focusIdx != -1) {
        name = stockName == '' ? stockSearchInfo[focusIdx].symbolName : searchedResult[focusIdx].symbolName;
      }
      const result = await fetchSearchSymbolName(name);

      if (result) {
        const curStockSearchInfo: StockSearchInfo = { symbolName: result.symbolName, country: result.country };
        addRecentSearch(curStockSearchInfo);
        handleSearch(name);
      }
    }
  };

  const handleSearch = (stockName: string | undefined) => {
    if (!stockName) {
      return;
    }

    navigate(webPath.search(), { state: { stockName } });
    setStockName('');
    setSearchValue('');
    (document.activeElement as HTMLElement).blur();
    setActiveSearchBar(false);
  };

  const addRecentSearch = (stockInfo: StockSearchInfo) => {
    if (!stockInfo.symbolName) return;
    // 최근 검색 기록 추가
    const nextData = Array.from(new Set([stockInfo, ...stockSearchInfo]));

    if (JSON.stringify(nextData) !== JSON.stringify(stockSearchInfo)) {
      setStockSearchInfo(nextData);
    }
  };

  const deleteRecentSearch = (stockName: string) => {
    // 최근 검색 기록 삭제
    setStockSearchInfo((prevData) => prevData.filter((item) => item.symbolName !== stockName));
  };

  useEffect(() => {
    // searchedData 값이 변경될 때 localStorage에 저장
    setItemLocalStorage('stockSearchInfo', stockSearchInfo);
  }, [stockSearchInfo]);

  return (
    <>
      <SearchBarLayout>
        <SearchBarLayer>
          <SearchBarContainer active={activeSearchBar}>
            Search
            <SearchBarContents
              active={activeSearchBar}
              ref={callbackRef}
              tabIndex={-1}
              onBlur={(e: React.FocusEvent<HTMLDivElement, Element>) => {
                !e.relatedTarget && setActiveSearchBar(false);
                setFocusIdx(-1);
              }}
            >
              <SearchBarInput active={activeSearchBar}>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchValueChange}
                  onKeyDown={searchBarInputKeyDown}
                  onFocus={() => setActiveSearchBar(true)}
                  placeholder="검색어를 입력하세요."
                />
                <SearchSVG />
              </SearchBarInput>
              {activeSearchBar &&
                (stockName == '' ? (
                  <RecentSearchList
                    stockSearchedInfo={stockSearchInfo}
                    focusIdx={focusIdx}
                    handleSearch={handleSearch}
                    deleteRecentSearch={deleteRecentSearch}
                  />
                ) : (
                  <AutoCompleteList
                    value={stockName}
                    focusIdx={focusIdx}
                    searchedResult={searchedResult}
                    handleSearch={handleSearch}
                  />
                ))}
            </SearchBarContents>
          </SearchBarContainer>
          <SearchBarDesignPart active={activeSearchBar} />
        </SearchBarLayer>
      </SearchBarLayout>
    </>
  );
};

export default SearchBar;
