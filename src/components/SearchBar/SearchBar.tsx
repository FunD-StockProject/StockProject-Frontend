import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_CATEGORIES, SEARCH_CATEGORY_MAP, SearchCategoryKey } from '@ts/SearchCategory';
import ArrowLeftSVG from '@assets/icons/arrowLeft.svg?react';
import ChevronDownSVG from '@assets/icons/chevronDown.svg?react';
import CrossSVG from '@assets/icons/cross.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import AutoCompleteKeywords from './AutoComplete/Keywords/Keywords';
import AutoCompleteStocks from './AutoComplete/Stocks/Stocks';
import PopularStocks from './PopularStocks/PopularStocks';
import RecentStocks from './RecentStocks/RecentStocks';
import {
  SearchBarContainer,
  SearchBarContents,
  SearchBarHeaderContainer,
  SearchBarHeaderContents,
  SearchBarInput,
  SearchBarLayout,
  SearchBarSelectBox,
} from './SearchBar.Style';

const SearchBar = ({
  initial = { type: 'STOCK', value: '' },
}: {
  initial: { type: SearchCategoryKey; value: string };
}) => {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState<SearchCategoryKey>(initial.type);
  const selectedSearchType = SEARCH_CATEGORY_MAP[searchType].text;
  const [searchValue, setSearchValue] = useState<string>(initial.value);

  const handleSearchTypeChange = (searchType: SearchCategoryKey) => () => {
    setSearchType(searchType);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchValueClear = () => {
    setSearchValue('');
  };

  const handleSearchBarClose = () => {
    navigate(-1);
  };

  return (
    <SearchBarLayout>
      <SearchBarHeaderContainer>
        <SearchBarHeaderContents>
          <ArrowLeftSVG onClick={handleSearchBarClose} />
          <p>검색</p>
        </SearchBarHeaderContents>
      </SearchBarHeaderContainer>
      <SearchBarContainer>
        <SearchBarContents>
          <SearchBarSelectBox>
            <label tabIndex={-1}>
              {selectedSearchType}
              <ChevronDownSVG />
            </label>
            <ul>
              {SEARCH_CATEGORIES.map(({ key, text }) => (
                <li key={`SEARCH_CATEGORY_${key}`} onMouseDown={handleSearchTypeChange(key)}>
                  {text}
                </li>
              ))}
            </ul>
          </SearchBarSelectBox>
          <SearchBarInput>
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchValue}
              onChange={handleSearchValueChange}
            />
            {searchValue.trim() ? <CrossSVG onClick={handleSearchValueClear} /> : <SearchSVG />}
          </SearchBarInput>
        </SearchBarContents>
        {searchValue.trim() ? (
          searchType === 'STOCK' ? (
            <AutoCompleteStocks searchValue={searchValue.trim()} />
          ) : (
            <AutoCompleteKeywords searchValue={searchValue.trim()} />
          )
        ) : (
          <>
            <RecentStocks />
            <PopularStocks />
          </>
        )}
      </SearchBarContainer>
    </SearchBarLayout>
  );
};

export default SearchBar;
