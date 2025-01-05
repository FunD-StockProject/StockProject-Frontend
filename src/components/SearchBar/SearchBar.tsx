import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { StockSearchInfo } from '@ts/Types';
import { getItemLocalStorage, isExistItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
import { webPath } from '@router/index';
import { fetchAutoComplete, fetchKeyowordsStocks, fetchSearchSymbolName } from '@controllers/api';
import { StockInfo } from '@controllers/api.Type';
import { media, theme } from '@styles/themes';
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
      {stockSearchedInfo.length != 0 && <span>최근 검색 종목</span>}
      {stockSearchedInfo &&
        stockSearchedInfo.map((stock: StockSearchInfo, idx: number) => (
          <div key={`recent_search_${idx}`}>
            <RecentSearchItemContainer focus={idx == focusIdx}>
              {STOCK_COUNTRY_TYPE[stock.country]} 종목
              <span onClick={() => handleSearch({ symbolName: stock.symbolName, country: stock.country })}>
                {stock.symbolName}
              </span>
              <CancelSVG onClick={() => deleteRecentSearch(stock.symbolName)} />
            </RecentSearchItemContainer>
          </div>
        ))}
    </RecentSearchListContainer>
  );
};

const AutoCompleteList = ({ value, focusIdx, searchedResult, handleSearch }: AutoCompleteListProps) => {
  return (
    <AutoCompleteListContainer>
      {searchedResult.length ? (
        <>
          <span>검색 결과</span>
          <div>
            {searchedResult.map((stock: StockInfo, idx: number) => (
              <div key={`${stock.symbolName}_${stock.stockId}`}>
                <AutoCompleteItemContainer
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
              </div>
            ))}
          </div>
        </>
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

  const [searchedKeywords, setSearchedKeywords] = useState<StockInfo[]>([]);
  const updateSearchedKeywords = async (keywordName: string) => {
    if (keywordName.length == 0) {
      setSearchedKeywords([]);
      return;
    }
    const result = await fetchKeyowordsStocks(keywordName);
    console.log(result);
    if (result) setSearchedKeywords(result);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setStockName(e.target.value.trim());
    updateSearchedResult(e.target.value.trim());
    if (category[selectedIdx] == '키워드') {
      updateSearchedKeywords(e.target.value.trim());
    }
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
          <SearchBarContainer
            active={activeSearchBar}
            ref={callbackRef}
            tabIndex={-1}
            onBlur={(e: React.FocusEvent<HTMLDivElement, Element>) => {
              !e.relatedTarget && setActiveSearchBar(false);
              setFocusIdx(-1);
              setSelectStatus(false);
            }}
          >
            <SearchBarContents active={activeSearchBar}>
              <SearchBarSelectBox ref={selectRef} focus={selectStatus}>
                <label onClick={() => setSelectStatus(!selectStatus)}>
                  {category[selectedIdx]}
                  {selectStatus ? <UpSVG /> : <DownSVG />}
                </label>
                <SearchBarSelectBoxItems select={selectedIdx}>
                  {category.map((e, i) => (
                    <li
                      key={'CATEGORY_' + i}
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
            {activeSearchBar && (
              <div style={{ display: 'flex', padding: '32px', fontSize: '24px', gap: '24px' }}>
                {stockName == '' ? (
                  <>
                    <RecentSearchList
                      stockSearchedInfo={stockSearchInfo.slice(0, 5)}
                      focusIdx={focusIdx}
                      handleSearch={handleSearch}
                      deleteRecentSearch={deleteRecentSearch}
                    />
                    <PopularSearchListContainer>
                      <span>인기 검색 종목</span>
                      <div>
                        {[
                          '삼성전자',
                          '카카오',
                          '카카오게임즈',
                          'LG화학',
                          '삼성SDI',
                          'SK하이닉스',
                          '아티스트유나이티드',
                          'LG에너지솔루션',
                          'POSCO홀딩스',
                          '신성델타테크',
                        ].map((e, i) => {
                          return (
                            <div key={'POPULAR_' + i}>
                              <PopularSearchItemContainer>
                                {i + 1}
                                <span>{e}</span>
                              </PopularSearchItemContainer>
                            </div>
                          );
                        })}
                      </div>
                    </PopularSearchListContainer>
                  </>
                ) : (
                  <AutoCompleteList
                    value={stockName}
                    focusIdx={focusIdx}
                    searchedResult={searchedResult.slice(0, 15)}
                    handleSearch={handleSearch}
                  />
                )}
              </div>
            )}
          </SearchBarContainer>
        </SearchBarLayer>
      </SearchBarLayout>
    </>
  );
};

const PopularSearchListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: '12px',
  width: '100%',
  overflow: 'hidden;',

  ['> span']: {
    margin: '6px 6px 18px',
    fontSize: '24px',
  },
  [media[0]]: {
    paddingRight: '6px',
    ['> span']: {
      margin: '6px 12px',
      fontSize: '13px',
    },
  },

  ['> div']: {
    display: 'grid',
    gridTemplateRows: 'repeat(5, 1fr)',
    gridAutoFlow: 'column',
    columnGap: '32px',

    ['> div']: {
      padding: '8px 0',
      borderBottom: `1px solid ${theme.colors.grayscale80}`,

      ':last-child, :nth-of-type(5)': {
        border: 'none',
      },
    },
  },

  // ['> div']: {
  //   padding: '8px 0',
  //   borderBottom: `1px solid ${theme.colors.grayscale80}`,

  //   ':last-child': {
  //     border: 'none',
  //   },
  // },
});

const PopularSearchItemContainer = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.grayscale40,
    fontSize: '15px',
    gap: '12px',
    padding: '9px 18px',
    borderRadius: '0 24px 24px 0',
    whiteSpace: 'nowrap',
    ['> span']: {
      color: theme.colors.primary0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '100%',
      fontSize: '19px',
      marginRight: 'auto',
      cursor: 'pointer',
      height: '24px',
      alignContent: 'center',
    },
    [':hover']: {
      background: theme.colors.grayscale100,
    },
    [media[0]]: {
      fontSize: '11px',
      gap: '8px',
      padding: '6px 12px',
      ['> span']: {
        fontSize: '15px',
      },
      [':hover']: {
        background: theme.colors.transparent,
      },
    },
  },
  // (props: { focus: boolean }) =>
  //   props.focus && {
  //     background: theme.colors.grayscale100,
  //     ['> svg']: {
  //       fill: theme.colors.primary5,
  //     },
  //   },
);

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
