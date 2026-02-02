import { useCallback, useEffect, useState } from 'react';
import { SEARCH_CATEGORIES, SEARCH_CATEGORY_MAP, SearchCategoryKey } from '@ts/SearchCategory';
import ChevronDownSVG from '@assets/icons/chevronDown.svg?react';
import CrossSVG from '@assets/icons/cross.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import AutoCompleteKeywords from './AutoComplete/Keywords/Keywords';
import AutoCompleteStocks from './AutoComplete/Stocks/Stocks';
import PopularKeywords from './PopularKeywords/PopularKeywords';
import PopularStocks from './PopularStocks/PopularStocks';
import RecentStocks from './RecentStocks/RecentStocks';
import { SearchBarContainer, SearchBarContents, SearchBarInput, SearchBarSelectBox } from './SearchBar.Style';
import { SearchBarModalData } from './useSearchBarModal';

const SearchBar = ({
  modalData: { type = 'STOCK', value = '' },
}: {
  modalData: SearchBarModalData;
}): JSX.Element | null => {
  const [searchType, setSearchType] = useState<SearchCategoryKey>(type);
  const [inputValue, setInputValue] = useState<string>(value);

  const selectedSearchType = SEARCH_CATEGORY_MAP[searchType].text;
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchTypeMouseDown = useCallback(
    (key: SearchCategoryKey) => () => {
      setSearchType(key);
    },
    [],
  );

  const handleSearchValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSearchValueClear = useCallback(() => {
    setInputValue('');
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const curr = inputValue.trim();

      setSearchValue(curr);
    }, 200);

    return () => window.clearInterval(id);
  }, [inputValue]);

  return (
    <SearchBarContainer>
      <SearchBarContents>
        <SearchBarSelectBox>
          <label tabIndex={-1}>
            {selectedSearchType}
            <ChevronDownSVG />
          </label>
          <ul>
            {SEARCH_CATEGORIES.map(({ key, text }) => (
              <li key={`SEARCH_CATEGORY_${key}`} onMouseDown={handleSearchTypeMouseDown(key)}>
                {text}
              </li>
            ))}
          </ul>
        </SearchBarSelectBox>
        <SearchBarInput>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={inputValue}
            onChange={handleSearchValueChange}
          />
          {searchValue ? <CrossSVG onClick={handleSearchValueClear} /> : <SearchSVG />}
        </SearchBarInput>
      </SearchBarContents>
      {searchValue ? (
        searchType === 'STOCK' ? (
          <AutoCompleteStocks searchValue={searchValue} />
        ) : (
          <AutoCompleteKeywords searchValue={searchValue} />
        )
      ) : searchType === 'STOCK' ? (
        <>
          <RecentStocks />
          <PopularStocks />
        </>
      ) : (
        <PopularKeywords setInputValue={setInputValue} />
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
