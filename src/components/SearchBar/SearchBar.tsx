import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { isExistItemLocalStorage, getItemLocalStorage, setItemLocalStorage } from '../../utils/LocalStorage';
import CancelSVG from '../../assets/icons/cancel.svg?react';
import NoResultSVG from '../../assets/noResult.svg?react';
import { TextDetail, TextTitle } from '../Text/Text';
import { AbsoluteDiv, ButtonDiv, FlexDiv, RelativeDiv } from '../Common/Common';
import { fetchAutoComplete, fetchSearchSymbolName } from '../../controllers/api';
import {
  AutoCompleteItemViewProps,
  AutoCompleteListViewProps,
  RecentSearchItemViewProps,
  RecentSearchListViewProps,
} from './SearchBar.Props';
import {
  AutoCompleteCorrectSpan,
  SearchBarContainer,
  SearchBarContents,
  SearchBarDesignPart,
  SearchBarInput,
} from './SearchBar.Style';
import { theme } from '../../styles/themes';
import { StockInfo } from '../../controllers/api.Type';

const RecentSearchListView = ({ searchedData, handleSearch, deleteRecentSearch }: RecentSearchListViewProps) => {
  return (
    <FlexDiv flexDirection="column" padding={searchedData.length ? '16px' : '0'} gap="8px">
      {searchedData.map((name: string, idx: number) => (
        <RecentSearchItemView
          name={name}
          key={'recent_search_' + idx}
          searchItem={() => handleSearch(name)}
          deleteItem={() => deleteRecentSearch(name)}
        />
      ))}
    </FlexDiv>
  );
};

const RecentSearchItemView = ({ name, searchItem, deleteItem }: RecentSearchItemViewProps) => {
  return (
    <FlexDiv alignItems="center" justifyContent="space-between" width="100%">
      <ButtonDiv onClick={searchItem}>
        <TextTitle color="primary0">{name}</TextTitle>
      </ButtonDiv>
      <ButtonDiv onClick={deleteItem}>
        <CancelSVG fill={theme.colors.primary5} width={32} height={32} />
      </ButtonDiv>
    </FlexDiv>
  );
};

const AutoCompleteListView = ({ value, searchedResult, handleSearch }: AutoCompleteListViewProps) => {
  return searchedResult.length ? (
    <FlexDiv flexDirection="column" padding="16px" gap="16px">
      {searchedResult.map((e: StockInfo, idx: number) => (
        <AutoCompleteItemView
          key={'auto_complete_' + idx}
          value={value}
          name={e.symbolName ?? ''}
          searchItem={() => {
            handleSearch(e.symbolName);
          }}
        />
      ))}
    </FlexDiv>
  ) : (
    <FlexDiv justifyContent="center" padding="32px 0">
      <NoResultSVG />
    </FlexDiv>
  );
};

const AutoCompleteItemView = ({ value, name, searchItem }: AutoCompleteItemViewProps) => {
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
      <ButtonDiv onClick={searchItem}>
        <FlexDiv gap="12px" alignItems="center">
          <TextDetail color="grayscale40">국내종목</TextDetail>
          <TextTitle color="primary0">
            {[...name].map((e, i) => (arr[i] ? <AutoCompleteCorrectSpan>{e}</AutoCompleteCorrectSpan> : e))}
          </TextTitle>
        </FlexDiv>
      </ButtonDiv>
      {/* <hr style={{ width: '100%' }} /> */}
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
      <RelativeDiv>
        <div style={{ height: '240px' }}></div>
        <AbsoluteDiv width="100%" top="0">
          <SearchBarContainer active={activeSearchBar}>
            <TextTitle size="XLarge" color="primary5">
              Search
            </TextTitle>
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
                  <RecentSearchListView
                    searchedData={searchedData}
                    handleSearch={handleSearch}
                    deleteRecentSearch={deleteRecentSearch}
                  />
                ) : (
                  <AutoCompleteListView value={stockName} searchedResult={searchedResult} handleSearch={handleSearch} />
                )
              ) : (
                ''
              )}
            </SearchBarContents>
          </SearchBarContainer>
          <SearchBarDesignPart active={activeSearchBar} />
        </AbsoluteDiv>
      </RelativeDiv>
    </>
  );
};

export default SearchBar;
