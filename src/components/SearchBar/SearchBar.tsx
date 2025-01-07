import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { StockSearchInfo } from '@ts/Types';
import { getItemLocalStorage, isExistItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
import { webPath } from '@router/index';
import { fetchAutoComplete, fetchKeyowordsStocks, fetchKeywords, fetchSearchSymbolName } from '@controllers/api';
import { StockInfo } from '@controllers/api.Type';
import { media, theme } from '@styles/themes';
import CancelSVG from '@assets/icons/cancel.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import NoResultSVG from '@assets/noResult.svg?react';
import { AutoCompleteListProps, RecentSearchListProps, SearchBarActiveProps } from './SearchBar.Props';

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
  const [keyword, setKeyword] = useState<any>();

  const COUNTRY = ['KOREA', 'OVERSEA'];

  useEffect(() => {
    const tmp = async () => {
      setKeyword(
        await Promise.all(
          COUNTRY.map(async (e: any) => ({
            text: e == 'KOREA' ? '국내' : '해외',
            country: e,
            keywords: await fetchKeywords(e),
          })),
        ),
      );
    };
    tmp();
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    if (!keyword) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        console.log(currentIndex);
        return (prev + 1) % 2;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, keyword]);

  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

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
  const popularMock = [
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
  ];

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
            {!activeSearchBar && (
              <SearchBarResultContainer>
                {stockName == '' ? (
                  selectedIdx == 0 ? (
                    <>
                      <SearchBarResultContent width="50%">
                        <SearchBarResultTitle>최근 검색 종목</SearchBarResultTitle>
                        <SearchBarResultGridContainer column={1}>
                          {stockSearchInfo &&
                            stockSearchInfo.slice(0, 5).map((stock: StockSearchInfo, idx: number) => (
                              <div key={`recent_search_${idx}`}>
                                <SearchBarResultItemContainer
                                  onClick={() => handleSearch({ symbolName: stock.symbolName, country: stock.country })}
                                >
                                  <SearchBarResultItemSubtitle>
                                    {STOCK_COUNTRY_TYPE[stock.country]} 종목
                                  </SearchBarResultItemSubtitle>
                                  <SearchBarResultItemTitle>{stock.symbolName}</SearchBarResultItemTitle>
                                  <CancelSVG
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteRecentSearch(stock.symbolName);
                                    }}
                                  />
                                </SearchBarResultItemContainer>
                              </div>
                            ))}
                        </SearchBarResultGridContainer>
                      </SearchBarResultContent>
                      <SearchBarResultContent width="100%">
                        <SearchBarResultTitle>인기 검색 종목</SearchBarResultTitle>
                        <SearchBarResultGridContainer column={2}>
                          {popularMock.map((e, i) => {
                            return (
                              <div key={'POPULAR_' + i}>
                                <SearchBarResultItemContainer onClick={() => console.log(e)}>
                                  <SearchBarResultItemSubtitle>{i + 1}</SearchBarResultItemSubtitle>
                                  <SearchBarResultItemTitle>{e}</SearchBarResultItemTitle>
                                </SearchBarResultItemContainer>
                              </div>
                            );
                          })}
                        </SearchBarResultGridContainer>
                      </SearchBarResultContent>
                    </>
                  ) : (
                    <>
                      <SearchBarResultContent width="50%">
                        <SearchBarResultTitle>최근 검색 키워드</SearchBarResultTitle>
                        <SearchBarResultGridContainer column={1}>
                          {stockSearchInfo &&
                            stockSearchInfo.slice(0, 5).map((stock: StockSearchInfo, idx: number) => (
                              <div key={`recent_search_${idx}`}>
                                <SearchBarResultItemContainer
                                  onClick={() => handleSearch({ symbolName: stock.symbolName, country: stock.country })}
                                >
                                  <SearchBarResultItemTitle>{stock.symbolName}</SearchBarResultItemTitle>
                                  <CancelSVG
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteRecentSearch(stock.symbolName);
                                    }}
                                  />
                                </SearchBarResultItemContainer>
                              </div>
                            ))}
                        </SearchBarResultGridContainer>
                      </SearchBarResultContent>
                      <SearchBarResultContent width="100%">
                        <SearchBarResultTitle>
                          <SearchBarResultTitleCountry>{keyword[currentIndex].text}</SearchBarResultTitleCountry>
                          인기 검색 키워드
                        </SearchBarResultTitle>
                        <SearchBarResultGridContainer column={2}>
                          {keyword[currentIndex] &&
                            keyword[currentIndex].keywords.map((e: any, i: number) => {
                              return (
                                <div key={'POPULAR_' + i}>
                                  <SearchBarResultItemContainer onClick={() => console.log(e)}>
                                    <SearchBarResultItemSubtitle>{i + 1}</SearchBarResultItemSubtitle>
                                    <SearchBarResultItemTitle>{e.toUpperCase()}</SearchBarResultItemTitle>
                                  </SearchBarResultItemContainer>
                                </div>
                              );
                            })}
                        </SearchBarResultGridContainer>
                      </SearchBarResultContent>
                    </>
                  )
                ) : selectedIdx == 0 ? (
                  <SearchBarResultContent width="100%">
                    {searchedResult.length ? (
                      <>
                        <SearchBarResultTitle>검색 결과</SearchBarResultTitle>
                        <SearchBarResultGridContainer column={3}>
                          {searchedResult.slice(0, 15).map((stock: StockInfo, idx: number) => (
                            <div key={`${stock.symbolName}_${stock.stockId}`}>
                              <SearchBarResultItemContainer
                                onClick={() => handleSearch({ symbolName: stock.symbolName, country: stock.country })}
                              >
                                <SearchBarResultItemSubtitle>
                                  {STOCK_COUNTRY_TYPE[stock.country]} 종목
                                </SearchBarResultItemSubtitle>
                                <SearchBarResultItemTitle key={`${stock.symbolName}_${stock.stockId}`}>
                                  {getCommonString({ from: stockName.toLocaleUpperCase(), to: stock.symbolName }).map(
                                    (e) => (e.check ? <span>{e.char}</span> : e.char),
                                  )}
                                </SearchBarResultItemTitle>
                              </SearchBarResultItemContainer>
                            </div>
                          ))}
                        </SearchBarResultGridContainer>
                      </>
                    ) : (
                      <SearchBarResultSVG>
                        <NoResultSVG />
                      </SearchBarResultSVG>
                    )}
                  </SearchBarResultContent>
                ) : (
                  <SearchBarResultContent width="100%">
                    {searchedResult.length ? (
                      <>
                        <SearchBarResultTitle>검색 결과</SearchBarResultTitle>
                        <SearchBarResultSubtitle>
                          <b>이재명</b> 이(가) 가장 많이 업급된 종목순으로 노출됩니다.
                        </SearchBarResultSubtitle>
                        <SearchBarResultGridContainer column={2}>
                          {searchedResult.slice(0, 10).map((stock: StockInfo, idx: number) => (
                            <div key={`${stock.symbolName}_${stock.stockId}`}>
                              <SearchBarResultItemContainer
                                onClick={() => handleSearch({ symbolName: stock.symbolName, country: stock.country })}
                              >
                                <SearchBarResultItemSubtitle>
                                  {STOCK_COUNTRY_TYPE[stock.country]} 종목
                                </SearchBarResultItemSubtitle>
                                <SearchBarResultItemTitle key={`${stock.symbolName}_${stock.stockId}`}>
                                  {stock.symbolName}
                                </SearchBarResultItemTitle>
                                <SearchBarResultItemKeyword matched={true}>이재명</SearchBarResultItemKeyword>
                                <SearchBarResultItemKeyword matched={false}>윤석열</SearchBarResultItemKeyword>
                              </SearchBarResultItemContainer>
                            </div>
                          ))}
                        </SearchBarResultGridContainer>
                      </>
                    ) : (
                      <SearchBarResultSVG>
                        <NoResultSVG />
                      </SearchBarResultSVG>
                    )}
                  </SearchBarResultContent>
                )}
              </SearchBarResultContainer>
            )}
          </SearchBarContainer>
        </SearchBarLayer>
      </SearchBarLayout>
    </>
  );
};

const SearchBarResultItemContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '9px 18px',
  borderRadius: '0 24px 24px 0',
  cursor: 'pointer',
  height: '24px',
  [':hover']: {
    background: theme.colors.grayscale100,
    ['> svg']: {
      fill: theme.colors.primary5,
    },
  },

  ['> svg']: {
    width: 'auto',
    height: '12px',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '12px',
    [':hover']: {
      background: theme.colors.grayscale70,
    },
  },
});

const SearchBarResultItemKeyword = styled.span(
  {
    padding: '8px 16px',
    fontSize: '15px',
    textWrap: 'nowrap',
    borderRadius: '24px',
  },
  (props: { matched: boolean }) => ({
    background: props.matched ? theme.colors.primary50 : theme.colors.grayscale80,
  }),
);

const SearchBarResultItemSubtitle = styled.span({
  color: theme.colors.grayscale40,
  fontSize: '15px',
  whiteSpace: 'nowrap',
});

const SearchBarResultItemTitle = styled.span({
  color: theme.colors.primary0,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  fontSize: '19px',
  marginRight: 'auto',
  whiteSpace: 'nowrap',
  ['span']: {
    color: theme.colors.red,
  },
});

const SearchBarResultContainer = styled.div({
  display: 'flex',
  padding: '32px',
  gap: '24px',
});

const SearchBarResultSVG = styled.div({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  padding: '64px',
  display: 'flex',
  justifyContent: 'center',
  ['svg']: {
    width: 'auto',
    height: '100%',
  },
});

const SearchBarResultContent = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '18px',
    minHeight: '300px',
  },
  (props: { width: string }) => ({ width: props.width }),
);

const SearchBarResultTitle = styled.div({
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const SearchBarResultSubtitle = styled.span({
  color: theme.colors.grayscale30,
  fontSize: '15px',
  whiteSpace: 'nowrap',
  fontWeight: '500',
  ['b']: {
    fontWeight: '900',
  },
});

const SearchBarResultTitleCountry = styled.span({
  background: theme.colors.grayscale80,
  padding: '8px 16px',
  borderRadius: '24px',
  fontSize: '19px',
});

const SearchBarResultGridContainer = styled.div(
  {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '32px',

    ['> div']: {
      padding: '8px 0',
      borderBottom: `1px solid ${theme.colors.grayscale80}`,
      width: 'auto',
      overflow: 'hidden',

      ':last-child, :nth-of-type(5n)': {
        border: 'none',
      },
    },
  },
  (props: { column: number }) => ({
    gridTemplateRows: `repeat(5, ${props.column}fr)`,
  }),
);

const SearchBarLayout = styled.div({
  position: 'relative',
  height: '200px',
  [media[0]]: {
    height: '150px',
  },
});

const SearchBarLayer = styled.div({
  position: 'absolute',
  zIndex: '10',
  width: '100%',
  top: '0px',
});

const SearchBarContainer = styled.div(
  {
    display: 'flex',
    padding: '12px',
    gap: '12px',
    fontWeight: '700',
    fontSize: '32px',
    color: theme.colors.primary5,
    flexDirection: 'column',
    lineHeight: '1',
    background: theme.colors.primary100,
    outline: 'none',

    [media[0]]: {
      gap: '12px',
      padding: '18px 24px',
      fontSize: '25px',
    },
  },
  (props: SearchBarActiveProps) => ({
    borderRadius: '8px',
    [media[0]]: {
      borderRadius: '8px',
    },
  }),
);

const SearchBarSelectBox = styled.div(
  {
    position: 'relative',
    display: 'flex',
    width: '50%',
    label: {
      fontSize: '17px',
      borderRadius: '8px',
      padding: '18px',
      alignContent: 'center',
      width: '100%',
      background: theme.colors.grayscale100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      ['svg']: {
        fill: theme.colors.grayscale10,
        height: '16px',
        width: 'auto',
      },
    },
  },
  ({ focus }: { focus: boolean }) =>
    focus && {
      label: {
        background: theme.colors.grayscale90,
        borderRadius: '8px 8px 0 0',
      },
      ul: {
        display: 'flex',
      },
    },
);

const SearchBarContents = styled.div(
  {
    display: 'flex',
    width: '100%',
    gap: '12px',
  },
  (props: SearchBarActiveProps) => ({
    // borderRadius: '10px',
    // overflow: 'hidden',
    // border: '1px solid ' + (props.active ? theme.colors.primary5 : theme.colors.transparent),
  }),
);

const SearchBarInput = styled.div({
  display: 'flex',
  alignItems: 'center',
  background: theme.colors.grayscale100,
  padding: '18px',
  borderRadius: '12px',
  width: '100%',
  ['input']: {
    boxSizing: 'border-box',
    width: '100%',
    border: 'none',
    background: theme.colors.transparent,
    color: theme.colors.primary0,
    outline: 'none',
    fontFamily: 'Pretendard',

    '::placeholder': {
      color: theme.colors.grayscale50,
    },
  },
  ['svg']: {
    height: '24px',
    width: 'auto',
    stroke: theme.colors.primary0,
    cursor: 'pointer',
  },
  [media[0]]: {
    padding: '0 12px',
    ['input']: {
      padding: '12px 0',
    },
    ['svg']: {
      height: '18px',
    },
  },
});

const AutoCompleteItemText = styled.div({
  color: theme.colors.primary0,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  fontSize: '19px',
  ['span']: {
    color: theme.colors.red,
  },
  [media[0]]: {
    fontSize: '15px',
  },
});

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
