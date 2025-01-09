import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_TYPE } from '@ts/Constants';
import { getItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
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
  SearchBarCountryTitle,
  SearchBarCountryTitleContainer,
  SearchBarCountryTitleContents,
  SearchBarCountryTitleShape,
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
  SearchBarSelectBox,
  SearchBarSelectBoxItems,
} from './SearchBar.Style';

const matchCharacters = (query: string, text: string) => {
  let queryIndex = 0;

  return [...text].map((char) => ({
    char,
    isMatch: query[queryIndex] === char && !!++queryIndex,
  }));
};

type COUNTRY = 'KOREA' | 'OVERSEA';
type CATEGORY = 'STOCK' | 'KEYWORD';

const COUNTRY_TEXT = {
  KOREA: '국내',
  OVERSEA: '해외',
};

const CATEGORY_TEXT = {
  STOCK: '종목',
  KEYWORD: '키워드',
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

const useBlocker = (shouldBlock: boolean, onBlock: () => void, onAlwaysExecute?: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (shouldBlock) {
        event.preventDefault();
        event.returnValue = ''; // 크롬 브라우저에서 동작하도록 설정
        navigate(previousLocation, previousLocation);
        onBlock();
      }
      if (onAlwaysExecute) onAlwaysExecute();
    };

    window.onpopstate = handleBeforeUnload;
  }, [shouldBlock, onBlock, onAlwaysExecute]);

  useEffect(() => {
    setPreviousLocation(location);
  }, [location]);
};

const useComponentFocus = (initialState: boolean, ref: React.RefObject<HTMLElement>) => {
  const [isFocus, setIsFocus] = useState<any>(initialState);

  useEffect(() => ref.current?.[isFocus ? 'focus' : 'blur'](), [isFocus]);

  return [isFocus, setIsFocus];
};

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const SearchBarPreInputComponent = ({
  category,
  recentItems,
  popularItems,
  onItemClick,
  onItemDelete,
  setSelectedCountry,
  selectedCountry,
}: {
  category: CATEGORY;
  recentItems: any;
  popularItems: any;
  onItemClick: any;
  onItemDelete: any;
  setSelectedCountry: any;
  selectedCountry: any;
}) => {
  if (!popularItems) return;

  return (
    <>
      {!!recentItems.length && (
        <SearchBarResultContent width="50%">
          <SearchBarResultTitle>최근 검색 {CATEGORY_TEXT[category]}</SearchBarResultTitle>
          <SearchBarResultGridContainer column={1}>
            {recentItems &&
              recentItems.slice(0, 5).map((e: any, idx: number) => (
                <div key={`recent_search_${idx}`}>
                  <SearchBarResultItemContainer onPointerUp={() => onItemClick(e)}>
                    {category == 'STOCK' && (
                      <SearchBarResultItemSubtitle>
                        {STOCK_COUNTRY_TYPE[e.country]} {CATEGORY_TEXT[category]}
                      </SearchBarResultItemSubtitle>
                    )}
                    <SearchBarResultItemTitle>{e.value}</SearchBarResultItemTitle>
                    <CancelSVG
                      onPointerUp={(event: React.PointerEvent<SVGSVGElement>) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onItemDelete(e);
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
          인기 검색 {CATEGORY_TEXT[category]}
          {category == 'KEYWORD' && (
            <SearchBarCountryTitleContainer
              onClick={() =>
                setSelectedCountry(Object.keys(COUNTRY_TEXT).filter((e) => e != selectedCountry)[0])
              }
            >
              <input type="checkbox" />
              <SearchBarCountryTitleContents>
                <SearchBarCountryTitleShape
                  current={!!Object.keys(COUNTRY_TEXT).findIndex((e) => e == selectedCountry)}
                />
                {Object.values(COUNTRY_TEXT).map((e) => (
                  <SearchBarCountryTitle key={'SearchBarCountryTitle_' + e}>
                    {e}
                  </SearchBarCountryTitle>
                ))}
              </SearchBarCountryTitleContents>
            </SearchBarCountryTitleContainer>
          )}
        </SearchBarResultTitle>
        <SearchBarResultGridContainer column={2}>
          {popularItems.map((e: any, i: number) => {
            return (
              <div key={'POPULAR_' + e.value}>
                <SearchBarResultItemContainer onPointerUp={() => onItemClick(e)}>
                  <SearchBarResultItemSubtitle>{i + 1}</SearchBarResultItemSubtitle>
                  {category == 'STOCK' && (
                    <SearchBarResultItemSubtitle>
                      {STOCK_COUNTRY_TYPE[e.country]} {CATEGORY_TEXT[category]}
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

const SearchBar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const SEARCHED_RESULT_MAX_LENGTH = {
    STOCK: 15,
    KEYWORD: isMobile ? 15 : 10,
  };

  const [inputValue, setInputValue] = useState<string>('');
  const searchValue = inputValue.replace(/\s+/g, '').toUpperCase();

  const inputRef = useRef<HTMLInputElement>(null);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const [isActiveSearchBar, setIsActiveSearchBar] = useState<boolean>(false);
  const [isFocusSelectBox, setIsFocusSelectBox] = useComponentFocus(false, selectBoxRef);
  const [isFocusInput, setIsFocusInput] = useComponentFocus(false, inputRef);

  const [selectedCategory, setSelectedCategory] = useState<CATEGORY>('STOCK');
  const [selectedCountry, setSelectedCountry] = useState<COUNTRY>('KOREA');
  const [focusedItem, setFocusedItem] = useState<any>({ idx: -1, type: '' });
  focusedItem;

  const resultContainerRef = useRef<HTMLDivElement>(null);
  const resultContainerHeight =
    window.innerHeight - (resultContainerRef.current?.getBoundingClientRect().top ?? 0);
  console.log(resultContainerHeight);
  console.log(
    resultContainerRef.current?.getBoundingClientRect().top,
    window.innerHeight,
    window.outerHeight,
    resultContainerRef.current?.getBoundingClientRect().height,
    document.body.getBoundingClientRect().height,
  );
  // console.log(window.outerHeight);

  const [recentStocks, setRecentStocks] = useState<any>(getItemLocalStorage('RecentStocks', []));
  const [recentKeyowrds, setRecentKeyowrds] = useState<any>(
    getItemLocalStorage('RecentKeywords', []),
  );

  const [popularStocks, _] = useState<any>(popularMock);
  const { data: popularKeywords } = PopularKeywordQuery();

  const [searchedStocks, setSearchedStocks] = useAutoComplete(fetchAutoComplete, 'symbolName');
  const [searchedKeywords, setSearchedKeywords] = useAutoComplete(fetchKeyowordsStocks, 'keyword');

  useEffect(() => {
    const setSearchedItems = selectedCategory == 'STOCK' ? setSearchedStocks : setSearchedKeywords;
    setSearchedItems(searchValue);
  }, [searchValue, selectedCategory]);

  useEffect(() => {
    if (!popularKeywords) return;
    const interval = setInterval(() => {
      const countryList = Object.keys(COUNTRY_TEXT) as COUNTRY[];
      setSelectedCountry(
        (prev) =>
          countryList[
            (countryList.findIndex((category) => category == prev) + 1) % countryList.length
          ],
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedCountry]);

  useBlocker(
    isMobile && isActiveSearchBar,
    () => updateActiveSearchBar(false),
    () => inputRef.current?.blur(),
  );

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

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    setFocusedItem((prev: any) => ({ ...prev, idx: -1 }));
  };

  const updateActiveSearchBar = (active: boolean) => {
    const onScrollEvent = () => {
      function lockScroll() {
        window.scrollTo(0, 0);
      }
      window.requestAnimationFrame(lockScroll);
    };

    if (isMobile) {
      document.documentElement.style.overflow = active ? 'hidden' : '';
      document.body.style.overflow = active ? 'hidden' : '';
      document.body.style.position = active ? 'fixed' : '';
      document.body.style.inset = active ? '0px' : '';
      document.body.style.left = active ? '0px' : '';
      document.body.style.right = active ? '0px' : '';
      window.onscroll = active ? onScrollEvent : null;

      if (active) window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsActiveSearchBar(active);
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

  const handleSearch = (item: any) => {
    addRecentItem(item);
    navigate(webPath.search(), {
      state: { symbolName: item.symbolName, country: item.country },
    });
    setInputValue('');
    (document.activeElement as HTMLElement).blur();
    updateActiveSearchBar(false);
  };

  // SearchBar EventHandler

  const handleSearchBarInputFocus = () => {
    setIsFocusInput(true);
    updateActiveSearchBar(true);
  };

  // SelectBox EventHandler

  const handleSelectBoxClick = () => {
    if (!isActiveSearchBar && !isFocusSelectBox) updateActiveSearchBar(true);
    setIsFocusSelectBox(!isFocusSelectBox);
  };

  const handleSelectBoxItemClick = (category: CATEGORY) => {
    setSelectedCategory(category);
    setIsFocusSelectBox(false);
    setInputValue('');
  };

  const handleItemClick = (item: any) => {
    if (searchValue.length || selectedCategory == 'STOCK') handleSearch(item);
    else setInputValue(item.value);
  };

  // Component

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
              {searchedItems.map((item: any) => (
                <div key={`${item.symbolName}_${item.stockId}`}>
                  <SearchBarResultItemContainer onPointerUp={() => handleItemClick(item)}>
                    <SearchBarResultItemSubtitle>
                      {STOCK_COUNTRY_TYPE[item.country]} 종목
                    </SearchBarResultItemSubtitle>
                    <SearchBarResultItemTitle>
                      {category == 'STOCK'
                        ? matchCharacters(searchValue.toLocaleUpperCase(), item.symbolName).map(
                            ({ isMatch, char }, i) =>
                              isMatch ? (
                                <span key={'searched_' + item.symbolName + '_' + i}>{char}</span>
                              ) : (
                                char
                              ),
                          )
                        : item.symbolName}
                    </SearchBarResultItemTitle>
                    {category == 'KEYWORD' &&
                      item.keywordNames.map((keyword: string, idx: number) => (
                        <SearchBarResultItemKeyword
                          key={`keywords_${item.symbolName}_${idx}`}
                          matched={keyword == item.keyword}
                        >
                          {keyword}
                        </SearchBarResultItemKeyword>
                      ))}
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

  const searchBarContainerRef = useOutsideClick(() => updateActiveSearchBar(false));

  return (
    <>
      <SearchBarLayout>
        <SearchBarContainer ref={searchBarContainerRef} active={isActiveSearchBar}>
          <SearchBarSelectBox
            ref={selectBoxRef}
            focus={isFocusSelectBox}
            onBlur={() => setIsFocusSelectBox(false)}
            tabIndex={-1}
            minimize={isFocusInput || (!!inputValue.length && !isFocusSelectBox)}
          >
            <label onClick={handleSelectBoxClick}>
              <span>{CATEGORY_TEXT[selectedCategory]}</span>
              {isFocusSelectBox ? <UpSVG /> : <DownSVG />}
            </label>
            <SearchBarSelectBoxItems
              select={Object.keys(CATEGORY_TEXT).findIndex((e) => e == selectedCategory)}
            >
              {(Object.keys(CATEGORY_TEXT) as CATEGORY[]).map((category) => (
                <li key={'CATEGORY_' + category} onClick={() => handleSelectBoxItemClick(category)}>
                  {CATEGORY_TEXT[category]}
                </li>
              ))}
            </SearchBarSelectBoxItems>
          </SearchBarSelectBox>
          <SearchBarInput>
            <input
              type="text"
              value={inputValue}
              ref={inputRef}
              // onKeyDown={searchBarInputKeyDown}
              onChange={handleSearchValueChange}
              onFocus={handleSearchBarInputFocus}
              onBlur={() => setIsFocusInput(false)}
              placeholder="검색어를 입력하세요."
            />
            {!isActiveSearchBar ? (
              <SearchSVG />
            ) : (
              <CancelSVG
                onClick={() => {
                  updateActiveSearchBar(false);
                  setInputValue('');
                }}
              />
            )}
          </SearchBarInput>
          <SearchBarResultLayoutContainer
            ref={resultContainerRef}
            height={!isActiveSearchBar ? 0 : isMobile ? resultContainerHeight : 450}
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
                    onItemClick={handleItemClick}
                    onItemDelete={deleteRecentItem}
                    setSelectedCountry={setSelectedCountry}
                    selectedCountry={selectedCountry}
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
