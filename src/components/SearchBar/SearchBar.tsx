import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const RecentSearchList = ({ searchedData, focusIdx, handleSearch, deleteRecentSearch }: RecentSearchListProps) => {
  return (
    <RecentSearchListContainer isEmpty={searchedData.length == 0}>
      {searchedData.length != 0 && <span>최근검색어</span>}
      {searchedData.map((name: string, idx: number) => (
        <RecentSearchItemContainer key={`recent_search_${idx}`} focus={idx == focusIdx}>
          국내종목
          <span onClick={() => handleSearch(name)}>{name}</span>
          <CancelSVG onClick={() => deleteRecentSearch(name)} />
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
          <AutoCompleteItemContainer focus={idx == focusIdx} onClick={() => handleSearch(e.symbolName)}>
            {e.country}
            <AutoCompleteItemText>
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
  const [searchedData, setSearchedData] = useState<string[]>(
    isExistItemLocalStorage('searchedList') ? getItemLocalStorage('searchedList') : [],
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
      setFocusIdx((prev) => (stockName == '' ? (prev + 1) % searchedData.length : (prev + 1) % searchedResult.length));
    } else if (e.key == 'ArrowUp') {
      e.preventDefault();
      setFocusIdx((prev) =>
        stockName == ''
          ? ((prev == -1 ? 0 : prev) + searchedData.length - 1) % searchedData.length
          : ((prev == -1 ? 0 : prev) + searchedResult.length - 1) % searchedResult.length,
      );
    } else if (e.key == 'Escape') {
      (document.activeElement as HTMLElement).blur();
      setFocusIdx(-1);
    } else if (e.key === 'Enter') {
      let name = stockName;
      if (focusIdx != -1) {
        name = stockName == '' ? searchedData[focusIdx] : searchedResult[focusIdx].symbolName;
      }
      const result = await fetchSearchSymbolName(name);
      if (result) handleSearch(name);
    }
  };

  const handleSearch = (stockName: string | undefined) => {
    console.log(stockName);
    if (!stockName) {
      return;
    }

    addRecentSearch(stockName);
    navigate(webPath.search(), { state: { stockName } });
    setStockName('');
    setSearchValue('');
    (document.activeElement as HTMLElement).blur();
    setActiveSearchBar(false);
  };

  const addRecentSearch = (stockName: string) => {
    // 최근 검색 기록 추가
    const nextData = Array.from(new Set([stockName, ...searchedData]));
    if (JSON.stringify(nextData) !== JSON.stringify(searchedData)) {
      setSearchedData(nextData);
    }
  };

  const deleteRecentSearch = (stockName: string) => {
    // 최근 검색 기록 삭제
    setSearchedData((prevData) => prevData.filter((item) => item !== stockName));
  };

  useEffect(() => {
    // searchedData 값이 변경될 때 localStorage에 저장
    setItemLocalStorage('searchedList', searchedData);
  }, [searchedData]);

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
                    searchedData={searchedData}
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
