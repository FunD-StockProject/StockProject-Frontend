import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemLocalStorage, isExistItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
import { webPath } from '@router/index';
import { fetchAutoComplete, fetchSearchSymbolName } from '@controllers/api';
import { StockInfo } from '@controllers/api.Type';
import CancelSVG from '@assets/icons/cancel.svg?react';
import NoResultSVG from '@assets/noResult.svg?react';
import {
  AutoCompleteItemProps,
  AutoCompleteListProps,
  RecentSearchItemProps,
  RecentSearchListProps,
} from './SearchBar.Props';
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

const RecentSearchList = ({ searchedData, handleSearch, deleteRecentSearch }: RecentSearchListProps) => {
  return (
    <RecentSearchListContainer>
      {searchedData.length ? <span>최근검색어</span> : ''}
      {searchedData.map((name: string, idx: number) => (
        <RecentSearchItem
          name={name}
          key={'recent_search_' + idx}
          searchItem={() => handleSearch(name)}
          deleteItem={() => deleteRecentSearch(name)}
        />
      ))}
    </RecentSearchListContainer>
  );
};

const RecentSearchItem = ({ name, searchItem, deleteItem }: RecentSearchItemProps) => {
  return (
    <RecentSearchItemContainer>
      <span onClick={searchItem}>{name}</span>
      <CancelSVG onClick={deleteItem} />
    </RecentSearchItemContainer>
  );
};

const AutoCompleteList = ({ value, searchedResult, handleSearch }: AutoCompleteListProps) => {
  return (
    <AutoCompleteListContainer>
      {searchedResult.length ? (
        searchedResult.map((e: StockInfo, idx: number) => (
          <AutoCompleteItem
            key={'auto_complete_' + idx}
            value={value}
            name={e.symbolName ?? ''}
            searchItem={() => {
              handleSearch(e.symbolName);
            }}
          />
        ))
      ) : (
        <NoResultSVG />
      )}
    </AutoCompleteListContainer>
  );
};

const AutoCompleteItem = ({ value, name, searchItem }: AutoCompleteItemProps) => {
  let arr = Array.from({ length: name.length }, () => false);
  let idx = 0;
  [...name].map((e, i) => {
    if (value[idx] == e) {
      arr[i] = true;
      idx++;
    }
  });

  return (
    <>
      <AutoCompleteItemContainer onClick={searchItem}>
        국내종목
        <AutoCompleteItemText>{[...name].map((e, i) => (arr[i] ? <span>{e}</span> : e))}</AutoCompleteItemText>
      </AutoCompleteItemContainer>
    </>
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

  const callbackRef = useCallback((current: HTMLDivElement) => {
    current?.focus();
  }, []);

  const updateSearchedResult = async (name: string) => {
    if (name.length == 0) {
      setSearchedResult([]);
      return;
    }
    const result = await fetchAutoComplete(name);
    console.log(name);
    console.log(result);
    if (result) setSearchedResult(result);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setStockName(e.target.value.trim());
    updateSearchedResult(e.target.value.trim());
  };

  const searchBarInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const result = await fetchSearchSymbolName(stockName);
      if (result) handleSearch(stockName);
    }
  };

  const handleSearch = (stockName: string | undefined) => {
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
              onBlur={(e: React.FocusEvent<HTMLDivElement, Element>) => !e.relatedTarget && setActiveSearchBar(false)}
            >
              <SearchBarInput
                type="text"
                value={searchValue}
                active={activeSearchBar}
                onChange={handleSearchValueChange}
                onKeyDown={searchBarInputKeyDown}
                onFocus={() => setActiveSearchBar(true)}
                placeholder="검색어를 입력하세요."
              />
              {activeSearchBar ? (
                stockName == '' ? (
                  <RecentSearchList
                    searchedData={searchedData}
                    handleSearch={handleSearch}
                    deleteRecentSearch={deleteRecentSearch}
                  />
                ) : (
                  <AutoCompleteList value={stockName} searchedResult={searchedResult} handleSearch={handleSearch} />
                )
              ) : (
                ''
              )}
            </SearchBarContents>
          </SearchBarContainer>
          <SearchBarDesignPart active={activeSearchBar} />
        </SearchBarLayer>
      </SearchBarLayout>
    </>
  );
};

export default SearchBar;
