import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import {
  getItemLocalStorage,
  isExistItemLocalStorage,
  setItemLocalStorage,
} from '@utils/LocalStorage';
import { useIsMobile } from '@hooks/useIsMobile';
import { webPath } from '@router/index';
import { fetchAutoComplete, fetchKeyowordsStocks } from '@controllers/api';
import { PopularKeywordQuery, useAutoComplete } from '@controllers/query';
import CancelSVG from '@assets/icons/cancel.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import NoResultSVG from '@assets/noResult.svg?react';
import {
  SearchBarContainer,
  SearchBarInput,
  SearchBarLayout,
  SearchBarResultContainer,
  SearchBarResultContent,
  SearchBarResultGridContainer,
  SearchBarResultItemContainer,
  SearchBarResultItemKeyword,
  SearchBarResultItemSubtitle,
  SearchBarResultItemTitle,
  SearchBarResultLayout,
  SearchBarResultLayoutContainer,
  SearchBarResultSVG,
  SearchBarResultSubtitle,
  SearchBarResultTitle,
  SearchBarResultTitleCountry,
  SearchBarSelectBox,
  SearchBarSelectBoxItems,
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

type COUNTRY = 'KOREA' | 'OVERSEA';
type CATEGORY = 'STOCK' | 'KEYWORD';

const CountryInfo = {
  KOREA: {
    text: '국내',
  },
  OVERSEA: {
    text: '해외',
  },
};

const categoryInfo = {
  STOCK: {
    text: '종목',
  },
  KEYWORD: {
    text: '키워드',
  },
};

const SEARCHED_RESULT_MAX_LENGTH = {
  STOCK: 15,
  KEYWORD: 10,
};

const popularMock = [
  {
    country: 'KOREA',
    value: '삼성전자',
    symbolName: '삼성전자',
  },
  {
    country: 'KOREA',
    value: '카카오',
    symbolName: '카카오',
  },
  {
    country: 'KOREA',
    value: '카카오게임즈',
    symbolName: '카카오게임즈',
  },
  {
    country: 'KOREA',
    value: 'LG화학',
    symbolName: 'LG화학',
  },
  {
    country: 'KOREA',
    value: '삼성SDI',
    symbolName: '삼성SDI',
  },
  {
    country: 'KOREA',
    value: 'SK하이닉스',
    symbolName: 'SK하이닉스',
  },
  {
    country: 'KOREA',
    value: '아티스트유나이티드',
    symbolName: '아티스트유나이티드',
  },
  {
    country: 'KOREA',
    value: 'LG에너지솔루션',
    symbolName: 'LG에너지솔루션',
  },
  {
    country: 'KOREA',
    value: 'POSCO홀딩스',
    symbolName: 'POSCO홀딩스',
  },
  {
    country: 'KOREA',
    value: '신성델타테크',
    symbolName: '신성델타테크',
  },
];

const useBlocker = (blockCondition: any, callback: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [beforeLocation, setBeforeLocation] = useState<any>(location);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (blockCondition) {
        event.preventDefault();
        event.returnValue = ''; // 크롬 브라우저에서 동작하도록 설정
        navigate(beforeLocation, beforeLocation);
        if (typeof callback === 'function') callback();
      }
    };

    window.onpopstate = handleBeforeUnload;
  }, [blockCondition, callback]);

  useEffect(() => {
    setBeforeLocation(location);
  }, [location]);
};

const SearchBar = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const resultContainerRef = useRef<HTMLDivElement>(null);

  const [resultContainerHeight, setResultContainerHeight] = useState<number>();

  const [selectedCategory, setSelectedCategory] = useState<CATEGORY>('STOCK');
  const [selectedCountry, setSelectedCountry] = useState<COUNTRY>('KOREA');

  const [selectStatus, setSelectStatus] = useState<boolean>(false);
  const [focusedItem, setFocusedItem] = useState<any>({ idx: -1, type: '' });
  focusedItem;

  const [recentStocks, setRecentStocks] = useState<any>(
    isExistItemLocalStorage('RecentStocks') ? getItemLocalStorage('RecentStocks') : [],
  );
  const [recentKeyowrds, setRecentKeyowrds] = useState<any>(
    isExistItemLocalStorage('RecentKeywords') ? getItemLocalStorage('RecentKeywords') : [],
  );

  const [popularStocks, _] = useState<any>(popularMock);
  const { data: popularKeywords } = PopularKeywordQuery();

  const [searchedStocks, setSearchedStocks] = useAutoComplete(fetchAutoComplete, 'symbolName');
  const [searchedKeywords, setSearchedKeywords] = useAutoComplete(fetchKeyowordsStocks, 'keyword');

  const activeSearchBarRef = useRef<any>(activeSearchBar);
  const inputRef = useRef<HTMLInputElement>(null);

  const callbackRef = useCallback((current: HTMLDivElement) => {
    return current?.focus();
  }, []);

  useEffect(() => {
    const resultContainer = resultContainerRef.current;
    if (!resultContainer) return;
    setResultContainerHeight(window.innerHeight - resultContainer.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    if (!popularKeywords) return;
    const interval = setInterval(() => {
      const countryList = Object.keys(CountryInfo) as COUNTRY[];
      setSelectedCountry(
        (prev) => countryList[(countryList.findIndex((e) => e == prev) + 1) % countryList.length],
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedCountry, popularKeywords]);

  // const searchBarInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   // const length = searchValue == '' ? (selectedCategory == 'STOCK' ? ()):(2);

  //   if (searchValue == '') {
  //     const recentItems = selectedCategory == 'STOCK' ? recentStocks : recentKeyowrds;
  //     const popularItems =
  //       selectedCategory == 'STOCK' ? popularStocks : popularKeywords[selectedCountry];
  //   } else {
  //     const searchedItems = selectedCategory == 'STOCK' ? searchedStocks : searchedKeywords;
  //   }

  //   // if (e.key == 'ArrowDown') {
  //   //   e.preventDefault();
  //   //   setFocusIdx((prev) =>
  //   //     stockName == '' ? (prev + 1) % stockSearchInfo.length : (prev + 1) % searchedResult.length,
  //   //   );
  //   // } else if (e.key == 'ArrowUp') {
  //   //   e.preventDefault();
  //   //   setFocusIdx((prev) =>
  //   //     stockName == ''
  //   //       ? ((prev == -1 ? 0 : prev) + stockSearchInfo.length - 1) % stockSearchInfo.length
  //   //       : ((prev == -1 ? 0 : prev) + searchedResult.length - 1) % searchedResult.length,
  //   //   );
  //   // }

  //   // else if (e.key == 'Escape') {
  //   //   (document.activeElement as HTMLElement).blur();
  //   //   setFocusIdx(-1);
  //   // } else if (e.key === 'Enter') {
  //   //   if (focusIdx === -1) return;
  //   //   const name =
  //   //     stockName == ''
  //   //       ? stockSearchInfo[focusIdx].symbolName
  //   //       : searchedResult[focusIdx].symbolName;
  //   //   const country =
  //   //     stockName == ''
  //   //       ? stockSearchInfo[focusIdx].country
  //   //       : searchedResult[focusIdx].country;
  //   //   const result = await fetchSearchSymbolName(name, country);
  //   //   if (result) {
  //   //     const curStockSearchInfo: StockSearchInfo = {
  //   //       symbolName: result.symbolName,
  //   //       country: result.country,
  //   //     };
  //   //     handleSearch(curStockSearchInfo);
  //   //   }
  //   // }
  // };

  useEffect(() => {
    const select = selectRef.current;
    if (!select) return;
    if (selectStatus) {
      select.focus();
    }
  }, [selectStatus]);

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value.replace(/\s+/g, '').toUpperCase();

    setInputValue(value);
    setSearchValue(trimmedValue);
    setFocusedItem((prev: any) => ({ ...prev, idx: -1 }));

    setSearchedStocks(selectedCategory == 'STOCK' ? trimmedValue : '');
    setSearchedKeywords(selectedCategory == 'KEYWORD' ? trimmedValue : '');
  };

  // LocalStorage

  const addRecentItem = (item: any) => {
    const [recentItems, setRecentItems]: any =
      selectedCategory == 'STOCK'
        ? [recentStocks, setRecentStocks]
        : [recentKeyowrds, setRecentKeyowrds];
    const storageName = selectedCategory == 'STOCK' ? 'RecentStocks' : 'RecentKeywords';

    const updatedItems = [
      item,
      ...recentItems.filter((e: any) => e.value !== item.value || e.country !== item.country),
    ];

    setItemLocalStorage(storageName, updatedItems);
    setRecentItems(updatedItems);
  };

  const deleteRecentItem = (item: any) => {
    const [recentItems, setRecentItems]: any =
      selectedCategory == 'STOCK'
        ? [recentStocks, setRecentStocks]
        : [recentKeyowrds, setRecentKeyowrds];
    const storageName = selectedCategory == 'STOCK' ? 'RecentStocks' : 'RecentKeywords';

    const updatedItems = recentItems.filter(
      (e: any) => e.value !== item.value || e.country !== item.country,
    );

    setItemLocalStorage(storageName, updatedItems);
    setRecentItems(updatedItems);
  };

  // SearchBar EventHandler

  const handleSearchBarBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    !e.relatedTarget && updateActiveSearchBar(false);
    setFocusedItem((prev: any) => ({ ...prev, idx: -1 }));
    setSelectStatus(false);
  };

  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);

  const handleSearchBarFocus = () => {
    updateActiveSearchBar(true);
    setIsFocusInput(true);
  };

  // SelectBox EventHandler

  const handleSelectBoxClick = () => {
    if (!activeSearchBar && !selectStatus) {
      updateActiveSearchBar(true);
    }
    setSelectStatus(!selectStatus);
  };

  const handleSelectBoxItemClick = (category: CATEGORY) => {
    setSelectedCategory(category);
    setSelectStatus(false);

    setSearchedStocks(category == 'STOCK' ? searchValue : '');
    setSearchedKeywords(category == 'KEYWORD' ? searchValue : '');
  };

  useBlocker(activeSearchBarRef.current, () => {
    updateActiveSearchBar(false);
    inputRef.current?.blur();
  });

  const updateActiveSearchBar = (active: boolean) => {
    if (isMobile) {
      document.body.style.overflow = active ? 'hidden' : '';
      if (active) window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    activeSearchBarRef.current = active;
    setActiveSearchBar(active);
  };

  const handleSearch = (item: any) => {
    addRecentItem(item);
    navigate(webPath.search(), {
      state: { symbolName: item.symbolName, country: item.country },
    });
    setSearchValue('');
    setInputValue('');
    (document.activeElement as HTMLElement).blur();
    updateActiveSearchBar(false);
  };

  const handlePreInputItemClick = (item: any) => {
    if (selectedCategory == 'STOCK') {
      handleSearch(item);
    } else {
      setInputValue(item.value);
      setSearchValue(item.value);
      setSearchedKeywords(item.value);
    }
  };

  const SearchBarPreInputComponent = ({
    category,
    recentItems,
    popularItems,
    country,
  }: {
    category: CATEGORY;
    recentItems: any;
    popularItems: any;
    country?: string;
  }) => {
    if (!popularItems) return;

    return (
      <>
        {!!recentItems.length && (
          <SearchBarResultContent width="50%">
            <SearchBarResultTitle>최근 검색 {categoryInfo[category].text}</SearchBarResultTitle>
            <SearchBarResultGridContainer column={1}>
              {recentItems &&
                recentItems.slice(0, 5).map((e: any, idx: number) => (
                  <div key={`recent_search_${idx}`}>
                    <SearchBarResultItemContainer onPointerUp={() => handlePreInputItemClick(e)}>
                      {category == 'STOCK' && (
                        <SearchBarResultItemSubtitle>
                          {STOCK_COUNTRY_TYPE[e.country]} {categoryInfo[category].text}
                        </SearchBarResultItemSubtitle>
                      )}
                      <SearchBarResultItemTitle>{e.value}</SearchBarResultItemTitle>
                      <CancelSVG
                        onPointerUp={(event: React.PointerEvent<SVGSVGElement>) => {
                          event.preventDefault();
                          event.stopPropagation();
                          deleteRecentItem(e);
                        }}
                      />
                    </SearchBarResultItemContainer>
                  </div>
                ))}
            </SearchBarResultGridContainer>
          </SearchBarResultContent>
        )}
        <SearchBarResultContent width="100%">
          <SearchBarResultTitle>
            {category == 'KEYWORD' && (
              <SearchBarResultTitleCountry>{country}</SearchBarResultTitleCountry>
            )}
            인기 검색 {categoryInfo[category].text}
          </SearchBarResultTitle>
          <SearchBarResultGridContainer column={2}>
            {popularItems.map((e: any, i: number) => {
              return (
                <div key={'POPULAR_' + e.value}>
                  <SearchBarResultItemContainer onPointerUp={() => handlePreInputItemClick(e)}>
                    <SearchBarResultItemSubtitle>{i + 1}</SearchBarResultItemSubtitle>
                    {category == 'STOCK' && (
                      <SearchBarResultItemSubtitle>
                        {STOCK_COUNTRY_TYPE[e.country]} {categoryInfo[category].text}
                      </SearchBarResultItemSubtitle>
                    )}
                    <SearchBarResultItemTitle>{e.value}</SearchBarResultItemTitle>
                  </SearchBarResultItemContainer>
                </div>
              );
            })}
          </SearchBarResultGridContainer>
        </SearchBarResultContent>
      </>
    );
  };

  const SearchBarPostInputComponent = ({
    category,
    searchedItems,
  }: {
    category: CATEGORY;
    searchedItems: any;
  }) => {
    return (
      <SearchBarResultContent width="100%">
        {searchedItems?.length ? (
          <>
            <SearchBarResultTitle>검색 결과</SearchBarResultTitle>
            {category == 'KEYWORD' && (
              <SearchBarResultSubtitle>
                <b>{searchedItems[0].keyword}</b> 이(가) 가장 많이 업급된 종목순으로 노출됩니다.
              </SearchBarResultSubtitle>
            )}
            <SearchBarResultGridContainer column={category == 'STOCK' ? 3 : 2}>
              {searchedItems.map((e: any) => (
                <div key={`${e.symbolName}_${e.stockId}`}>
                  <SearchBarResultItemContainer onPointerUp={() => handleSearch(e)}>
                    <SearchBarResultItemSubtitle>
                      {STOCK_COUNTRY_TYPE[e.country]} 종목
                    </SearchBarResultItemSubtitle>
                    <SearchBarResultItemTitle>
                      {category == 'STOCK'
                        ? getCommonString({
                            from: searchValue.toLocaleUpperCase(),
                            to: e.symbolName,
                          }).map(({ check, char }, i) =>
                            check ? (
                              <span key={'searched_' + e.symbolName + '_' + i}>{char}</span>
                            ) : (
                              char
                            ),
                          )
                        : e.symbolName}
                    </SearchBarResultItemTitle>
                    {category == 'KEYWORD' && (
                      <>
                        <SearchBarResultItemKeyword matched={true}>
                          이재명
                        </SearchBarResultItemKeyword>
                        <SearchBarResultItemKeyword matched={false}>
                          윤석열
                        </SearchBarResultItemKeyword>
                      </>
                    )}
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
    );
  };

  const isMobile = useIsMobile();

  return (
    <>
      <SearchBarLayout>
        <SearchBarContainer
          ref={callbackRef}
          onBlur={handleSearchBarBlur}
          active={activeSearchBar}
          tabIndex={-1}
        >
          <SearchBarSelectBox
            ref={selectRef}
            focus={selectStatus}
            onBlur={(e) => {
              !e.relatedTarget && setSelectStatus(false);
            }}
            tabIndex={0}
            minimize={isFocusInput || (!!inputValue.length && !selectStatus)}
          >
            <label onClick={handleSelectBoxClick}>
              <span>{categoryInfo[selectedCategory].text}</span>
              {selectStatus ? <UpSVG /> : <DownSVG />}
            </label>
            <SearchBarSelectBoxItems
              select={Object.keys(categoryInfo).findIndex((e) => e == selectedCategory)}
            >
              {(Object.keys(categoryInfo) as CATEGORY[]).map((category) => (
                <li key={'CATEGORY_' + category} onClick={() => handleSelectBoxItemClick(category)}>
                  {categoryInfo[category].text}
                </li>
              ))}
            </SearchBarSelectBoxItems>
          </SearchBarSelectBox>
          <SearchBarInput>
            <input
              type="text"
              value={inputValue}
              ref={inputRef}
              onChange={handleSearchValueChange}
              // onKeyDown={searchBarInputKeyDown}
              onFocus={handleSearchBarFocus}
              onBlur={() => setIsFocusInput(false)}
              placeholder="검색어를 입력하세요."
            />
            <SearchSVG
              onClick={() => {
                if (selectedCategory == 'KEYWORD') {
                  addRecentItem(searchValue);
                }
              }}
            />
          </SearchBarInput>
          <SearchBarResultLayoutContainer
            ref={resultContainerRef}
            height={!activeSearchBar ? 0 : isMobile ? resultContainerHeight : undefined}
          >
            <SearchBarResultLayout>
              <SearchBarResultContainer>
                {searchValue == '' ? (
                  <SearchBarPreInputComponent
                    category={selectedCategory}
                    recentItems={selectedCategory == 'STOCK' ? recentStocks : recentKeyowrds}
                    popularItems={
                      selectedCategory == 'STOCK' ? popularStocks : popularKeywords[selectedCountry]
                    }
                    country={CountryInfo[selectedCountry].text}
                  />
                ) : (
                  <SearchBarPostInputComponent
                    category={selectedCategory}
                    searchedItems={(selectedCategory == 'STOCK'
                      ? searchedStocks
                      : searchedKeywords
                    ).slice(0, SEARCHED_RESULT_MAX_LENGTH[selectedCategory])}
                  />
                )}
              </SearchBarResultContainer>
            </SearchBarResultLayout>
          </SearchBarResultLayoutContainer>
        </SearchBarContainer>
      </SearchBarLayout>
    </>
  );
};

export default SearchBar;
