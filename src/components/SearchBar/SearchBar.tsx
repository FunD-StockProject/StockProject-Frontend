import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MARKET_CODES, SEARCH_CATEGORY_TEXT, STOCK_COUNTRY_TEXT } from '@ts/Constants';
import { SEARCH_CATEGORY } from '@ts/Types';
import { STORAGE_RECENT_ITEMS, getItemLocalStorage, setItemLocalStorage } from '@utils/LocalStorage';
import { useIsMobile } from '@hooks/useIsMobile';
import { webPath } from '@router/index';
import { fetchAutoComplete, fetchSearchKeyword } from '@controllers/api';
import { AutoCompleteItem, SearchBarResultItems } from '@controllers/api.Type';
import { PopularKeywordQuery, useAutoComplete, usePopularStockFetchQuery } from '@controllers/query';
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
  SearchBarResultItemSVG,
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

const useBlocker = (shouldBlock: boolean, onBlock: () => void, onAlwaysExecute?: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    const handleBeforeUnload = (event: PopStateEvent) => {
      if (shouldBlock) {
        event.preventDefault();
        navigate(previousLocation, { state: previousLocation.state });
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

const useComponentFocus = (
  initialState: boolean,
  ref: React.RefObject<HTMLElement>,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isFocus, setIsFocus] = useState<boolean>(initialState);

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

export const SearchBarItemsComponent = ({
  type,
  category,
  resultItems,
  handleItemClick,
  onItemDelete = () => { },
  searchValue = '',
  displayEmpty,
}: {
  type: 'SEARCHED' | 'RECENT' | 'POPULAR';
  category: SEARCH_CATEGORY;
  resultItems: SearchBarResultItems[];
  handleItemClick: (item: AutoCompleteItem) => void;
  onItemDelete?: (item: AutoCompleteItem) => void;
  searchValue?: string;
  displayEmpty?: boolean;
}) => {
  const width = `${type === 'RECENT' ? 50 : 100}%`;
  const column = type === 'RECENT' ? 1 : type === 'POPULAR' ? 2 : category === 'STOCK' ? 3 : 2;
  const title =
    type === 'SEARCHED' ? '검색 결과' : `${type === 'RECENT' ? '최근' : '인기'} 검색 ${SEARCH_CATEGORY_TEXT[category]}`;

  const searchKeyword = resultItems[0]?.keyword;
  const isHidden = type === 'RECENT' && !resultItems.length;

  if (isHidden) return;
  return (
    <SearchBarResultContent width={width}>
      {type === 'POPULAR' || resultItems.length ? (
        <>
          <SearchBarResultTitle>{title}</SearchBarResultTitle>
          {type === 'SEARCHED' && category == 'KEYWORD' && (
            <SearchBarResultSubtitle>
              <b>{searchKeyword}</b> 이(가) 가장 많이 업급된 종목순으로 노출됩니다.
            </SearchBarResultSubtitle>
          )}
          <SearchBarResultGridContainer column={column}>
            {resultItems.map((item, idx) => {
              const { symbolName, symbol, exchangeNum, country, keywordNames, keyword, value } = item;

              return (
                <div key={`SearchBarItem_${type}_${category}_${type === 'SEARCHED' ? symbolName : value}_${country}`}>
                  <SearchBarResultItemContainer onPointerUp={() => handleItemClick(item)}>
                    {type == 'POPULAR' && <SearchBarResultItemSubtitle>{idx + 1}</SearchBarResultItemSubtitle>}
                    {(category === 'STOCK' ? type === 'RECENT' || type === 'POPULAR' : type === 'SEARCHED') && (
                      <SearchBarResultItemSubtitle>{STOCK_COUNTRY_TEXT[country]} 종목</SearchBarResultItemSubtitle>
                    )}
                    <SearchBarResultItemTitle>
                      {type === 'SEARCHED'
                        ? category === 'STOCK'
                          ? matchCharacters(searchValue.toLocaleUpperCase(), symbolName).map(({ isMatch, char }, i) =>
                            isMatch ? <span key={`SearchBarItemText_${value}_${country}_${i}`}>{char}</span> : char,
                          )
                          : symbolName
                        : value}
                      {type === 'SEARCHED' && category === 'STOCK' && (
                        <div>
                          <div>
                            {matchCharacters(searchValue.toLocaleUpperCase(), symbol).map(({ isMatch, char }, i) =>
                              isMatch ? (
                                <span key={`SearchBarItemTextSymbol_${value}_${country}_${i}`}>{char}</span>
                              ) : (
                                char
                              ),
                            )}
                          </div>
                          <div>{MARKET_CODES[exchangeNum]}</div>
                        </div>
                      )}
                    </SearchBarResultItemTitle>
                    {type === 'RECENT' && (
                      <SearchBarResultItemSVG>
                        <CancelSVG
                          onPointerUp={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onItemDelete(item);
                          }}
                        />
                      </SearchBarResultItemSVG>
                    )}
                    {type === 'SEARCHED' && category == 'KEYWORD' && (
                      <>
                        <SearchBarResultItemKeyword matched={true}>{searchKeyword}</SearchBarResultItemKeyword>
                        <SearchBarResultItemKeyword matched={false}>
                          {keywordNames.filter((e) => e !== keyword)[0]}
                        </SearchBarResultItemKeyword>
                      </>
                    )}
                  </SearchBarResultItemContainer>
                </div>
              );
            })}
          </SearchBarResultGridContainer>
        </>
      ) : (
        displayEmpty && (
          <SearchBarResultSVG>
            <NoResultSVG />
          </SearchBarResultSVG>
        )
      )}
    </SearchBarResultContent>
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

  const [selectedCategory, setSelectedCategory] = useState<SEARCH_CATEGORY>('STOCK');
  const [focusedItem, setFocusedItem] = useState<any>({
    idx: -1,
    type: '',
  });
  focusedItem;

  const resultContainerRef = useRef<HTMLDivElement>(null);
  const resultContainerHeight = window.innerHeight - (resultContainerRef.current?.getBoundingClientRect().top ?? 0);

  const [recentStocks, setRecentStocks] = useState<AutoCompleteItem[]>(
    getItemLocalStorage(STORAGE_RECENT_ITEMS['STOCK'], []),
  );
  const [recentKeyowrds, setRecentKeyowrds] = useState<AutoCompleteItem[]>(
    getItemLocalStorage(STORAGE_RECENT_ITEMS['KEYWORD'], []),
  );
  const [recentItems, setRecentItems] =
    selectedCategory == 'STOCK' ? [recentStocks, setRecentStocks] : [recentKeyowrds, setRecentKeyowrds];

  const [popularStocks] = usePopularStockFetchQuery();
  const [popularKeywords] = PopularKeywordQuery();
  const popularItems = selectedCategory == 'STOCK' ? popularStocks : popularKeywords;

  const [searchedStocks, setSearchedStocks] = useAutoComplete(fetchAutoComplete, 'symbolName');
  const [searchedKeywords, setSearchedKeywords] = useAutoComplete(fetchSearchKeyword, 'keyword');
  const searchedItems = selectedCategory == 'STOCK' ? searchedStocks : searchedKeywords;

  useEffect(() => {
    const setSearchedItems = selectedCategory == 'STOCK' ? setSearchedStocks : setSearchedKeywords;
    setSearchedItems(searchValue);
  }, [searchValue, selectedCategory]);

  useBlocker(
    isMobile && isActiveSearchBar,
    () => updateActiveSearchBar(false),
    () => inputRef.current?.blur(),
  );


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
      document.body.style.position = active ? 'fixed' : ''; // iOS Safari
      document.body.style.inset = active ? '0px' : '';
      document.body.style.left = active ? '0px' : '';
      document.body.style.right = active ? '0px' : '';
      window.onscroll = active ? onScrollEvent : null;

      if (active) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        resultContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsActiveSearchBar(active);
  };

  // LocalStorage

  const addRecentItem = (item: AutoCompleteItem) => {
    const { value, country } = item;
    const updatedItems = [item, ...recentItems.filter((e) => e.value !== value || e.country !== country)];

    setItemLocalStorage(STORAGE_RECENT_ITEMS[selectedCategory], updatedItems);
    setRecentItems(updatedItems);
  };

  const deleteRecentItem = (item: AutoCompleteItem) => {
    const { value, country } = item;
    const updatedItems = recentItems.filter((e) => e.value !== value || e.country !== country);

    setItemLocalStorage(STORAGE_RECENT_ITEMS[selectedCategory], updatedItems);
    setRecentItems(updatedItems);
  };

  const handleSearch = (item: AutoCompleteItem) => {
    const { symbolName, country } = item;
    addRecentItem(item);
    navigate(webPath.search(), { state: { symbolName, country } });
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

  const handleSelectBoxItemClick = (category: SEARCH_CATEGORY) => {
    setSelectedCategory(category);
    setIsFocusSelectBox(false);
    setInputValue('');
  };

  const handleItemClick = (item: AutoCompleteItem) => {
    if (searchValue.length || selectedCategory == 'STOCK') handleSearch(item);
    else setInputValue(item.value);
  };

  // Component

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
              <span>{SEARCH_CATEGORY_TEXT[selectedCategory]}</span>
              {isFocusSelectBox ? <UpSVG /> : <DownSVG />}
            </label>
            <SearchBarSelectBoxItems
              select={Object.keys(SEARCH_CATEGORY_TEXT).findIndex((e) => e === selectedCategory)}
            >
              {(Object.keys(SEARCH_CATEGORY_TEXT) as SEARCH_CATEGORY[]).map((category) => (
                <li key={`CATEGORY_${category}`} onClick={() => handleSelectBoxItemClick(category)}>
                  {SEARCH_CATEGORY_TEXT[category]}
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
            height={!isActiveSearchBar ? 0 : isMobile ? resultContainerHeight : 490}
          >
            <SearchBarResultLayout>
              <SearchBarResultContainer>
                {searchValue == '' ? (
                  <>
                    <SearchBarItemsComponent
                      type="RECENT"
                      category={selectedCategory}
                      resultItems={recentItems.slice(0, 5)}
                      handleItemClick={handleItemClick}
                      onItemDelete={deleteRecentItem}
                    />
                    <SearchBarItemsComponent
                      type="POPULAR"
                      category={selectedCategory}
                      resultItems={popularItems as SearchBarResultItems[]}
                      handleItemClick={handleItemClick}
                    />
                  </>
                ) : (
                  <SearchBarItemsComponent
                    type="SEARCHED"
                    category={selectedCategory}
                    resultItems={searchedItems.slice(0, SEARCHED_RESULT_MAX_LENGTH[selectedCategory])}
                    handleItemClick={handleItemClick}
                    searchValue={searchValue}
                    displayEmpty
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
