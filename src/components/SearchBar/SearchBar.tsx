import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { StockSearchInfo } from '@ts/Types';
import { getItemLocalStorage, isExistItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
import { webPath } from '@router/index';
import { fetchAutoComplete, fetchSearchSymbolName } from '@controllers/api';
import { StockInfo } from '@controllers/api.Type';
import { theme } from '@styles/themes';
import CancelSVG from '@assets/icons/cancel.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
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
  SearchBarInput,
  SearchBarLayer,
  SearchBarLayout,
  SearchBarSelectBox,
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
  return (
    <RecentSearchListContainer isEmpty={stockSearchedInfo.length == 0}>
      {stockSearchedInfo.length != 0 && <span>최근검색어</span>}
      {stockSearchedInfo &&
        stockSearchedInfo.map((stock: StockSearchInfo, idx: number) => (
          <RecentSearchItemContainer key={`recent_search_${idx}`} focus={idx == focusIdx}>
            {STOCK_COUNTRY_TYPE[stock.country]} 종목
            <span onClick={() => handleSearch({ symbolName: stock.symbolName, country: stock.country })}>
              {stock.symbolName}
            </span>
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
        searchedResult.map((stock: StockInfo, idx: number) => (
          <AutoCompleteItemContainer
            key={`${stock.symbolName}_${stock.stockId}`}
            focus={idx == focusIdx}
            onClick={() => handleSearch({ symbolName: stock.symbolName, country: stock.country })}
          >
            {STOCK_COUNTRY_TYPE[stock.country]} 종목
            <AutoCompleteItemText key={`${stock.symbolName}_${stock.stockId}`}>
              {getCommonString({ from: value.toLocaleUpperCase(), to: stock.symbolName }).map((e) =>
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

  const selectRef = useRef<HTMLDivElement>(null);

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
      if (focusIdx === -1) return;

      const name = stockName == '' ? stockSearchInfo[focusIdx].symbolName : searchedResult[focusIdx].symbolName;
      const country = stockName == '' ? stockSearchInfo[focusIdx].country : searchedResult[focusIdx].country;
      const result = await fetchSearchSymbolName(name, country);

      if (result) {
        const curStockSearchInfo: StockSearchInfo = { symbolName: result.symbolName, country: result.country };
        handleSearch(curStockSearchInfo);
      }
    }
  };

  const handleSearch = (curStockSearchInfo: StockSearchInfo) => {
    if (!curStockSearchInfo.symbolName) {
      return;
    }

    const symbolName = curStockSearchInfo.symbolName;
    const country = curStockSearchInfo.country;
    debugger;
    addRecentSearch(curStockSearchInfo);
    navigate(webPath.search(), { state: { symbolName: symbolName, country: country } });
    setStockName('');
    setSearchValue('');
    (document.activeElement as HTMLElement).blur();
    setActiveSearchBar(false);
  };

  const addRecentSearch = (stockInfo: StockSearchInfo) => {
    if (!stockInfo.symbolName) return;
    // 최근 검색 기록 추가
    const exists = stockSearchInfo.some((item) => JSON.stringify(item) === JSON.stringify(stockInfo));

    if (!exists) {
      const nextData = [...stockSearchInfo, stockInfo];
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

  const [selectStatus, setSelectStatus] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    const select = selectRef.current;
    if (!select) return;
    if (!selectStatus) {
      select.blur();
    } else {
      select.focus();
    }
  }, [selectStatus]);

  const category = ['종목', '키워드'];

  return (
    <>
      <SearchBarLayout>
        <SearchBarLayer>
          <SearchBarContainer active={activeSearchBar}>
            <SearchBarContents
              active={activeSearchBar}
              ref={callbackRef}
              tabIndex={-1}
              onBlur={(e: React.FocusEvent<HTMLDivElement, Element>) => {
                !e.relatedTarget && setActiveSearchBar(false);
                setFocusIdx(-1);
                setSelectStatus(false);
              }}
            >
              {/* <select
                ref={selectRef}
                onClick={() => setSelectStatus(!selectStatus)}
                onBlur={() => setSelectStatus(false)}
              >
                {['종목', '키워드'].map((e) => (
                  <option>{e}</option>
                ))}
              </select> */}
              <SearchBarSelectBox ref={selectRef} focus={selectStatus}>
                <label onClick={() => setSelectStatus(!selectStatus)}>
                  {category[selectedIdx]}
                  {selectStatus ? <UpSVG /> : <DownSVG />}
                </label>
                <SearchBarSelectBoxItems select={selectedIdx}>
                  {category.map((e, i) => (
                    <li
                      onClick={() => {
                        setSelectedIdx(i);
                        setSelectStatus(false);
                      }}
                    >
                      {e}
                    </li>
                  ))}
                </SearchBarSelectBoxItems>
              </SearchBarSelectBox>
              <SearchBarInput>
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
            </SearchBarContents>
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
          </SearchBarContainer>
        </SearchBarLayer>
      </SearchBarLayout>
    </>
  );
};

const SearchBarSelectBoxItems = styled.ul(
  {
    position: 'absolute',
    top: '100%',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',

    li: {
      width: '100%',
      background: theme.colors.grayscale90,
      textAlign: 'center',
      fontSize: '15px',
      padding: '18px 0',
      borderTop: `2px solid ${theme.colors.grayscale100}`,
    },
  },
  ({ select }: { select: number }) => ({
    [`li:nth-of-type(${select + 1})`]: {
      background: theme.colors.grayscale100,
    },
  }),
);

export default SearchBar;
