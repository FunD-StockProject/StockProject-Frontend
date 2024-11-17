import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../router';
import { isExistItemLocalStorage, getItemLocalStorage, setItemLocalStorage } from '../utils/LocalStorage';
import styled from '@emotion/styled';
import noResultSVG from '../assets/noResult.svg';
import { LayoutProps } from '../ts/Types';
import { ReactComponent as SearchSVG } from '../assets/icons/search.svg';
import { ReactComponent as CancelSVG } from '../assets/icons/cancel.svg';

const SearchBarDiv = styled.div({
  position: 'relative',
  width: '100%',
  marginBottom: '72px',
});

const SearchBarContainer = styled.div({
  position: 'absolute',
  width: '100%',
  background: '#222222',
  border: '1px solid white',
  borderRadius: '20px',
});

const SearchBarInputContainer = styled.div({
  position: 'relative',
  padding: '12px 32px',
  display: 'flex',
  alignItems: 'center',
});

const SearchBarInput = styled.input({
  width: '100%',
  margin: '0',
  padding: '0',
  background: 'none',
  fontSize: '24px',
  lineHeight: '36px',
  border: 'none',
  outline: 'none',
});

interface ExpandSearchBarProps {
  children?: React.ReactNode;
  className?: string;
  active: boolean;
}

const ExpandSearchBar = styled(({ children, className }: ExpandSearchBarProps) => {
  return (
    <div className={className}>
      <hr />
      {children}
    </div>
  );
})(
  {
    padding: '0 12px 12px',
    height: '320px',
    overflow: 'hidden',

    ['hr']: {
      margin: 0,
    },
  },
  (props: ExpandSearchBarProps) => (props.active ? {} : { display: 'none' }),
);

interface RecentSearchListProps {
  className?: string;
  searchedData: string[];
  handleSearch: (name: string) => void;
  deleteRecentSearch: (name: string) => void;
}

const RecentSearchList = styled(({ className, searchedData, handleSearch, deleteRecentSearch }: RecentSearchListProps) => {
  return (
    <div key={'asd'} className={className}>
      {searchedData.map((name: string, idx: number) => (
        <RecentSearchItem name={name} key={idx} searchItem={() => handleSearch(name)} deleteItem={() => deleteRecentSearch(name)} />
      ))}
    </div>
  );
})({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '12px 0',
});

interface RecentSearchItemProps {
  className?: string;
  name: string;
  key: number;
  searchItem: (e: any) => void;
  deleteItem: (e: any) => void;
}

const RecentSearchItem = styled(({ className, name, key, searchItem, deleteItem }: RecentSearchItemProps) => {
  return (
    <div key={key} className={className}>
      <span>
        <p onClick={searchItem}>{name}</p>
      </span>
      <CancelSVG fill="white" width={32} height={32} onClick={deleteItem} />
    </div>
  );
})({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: '0 20px',
  fontSize: '24px',
  textAlign: 'left',
  ['>span:first-of-type']: {
    width: '100%',
  },
  ['p']: {
    margin: 0,
    cursor: 'pointer',
  },
  ['svg']: {
    cursor: 'pointer',
    padding: 0,
  },
});

const NoAutoCompleteListView = styled(({ className }: LayoutProps) => {
  return (
    <div className={className}>
      <img src={noResultSVG} />
      <p>
        검색 결과가 없습니다
        <br />
        오타가 있는지 확인해보세요!
      </p>
    </div>
  );
})({
  padding: '48px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  ['img']: {
    height: '128px',
  },
  ['p']: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
});

const AutoCompleteList = styled(() => {
  const apiResult = [];

  return apiResult.length ? <></> : <NoAutoCompleteListView />;
})(
  {
    padding: '0 12px 12px',
    ['hr']: {
      margin: 0,
    },
  },
  {},
);

const SearchBar = () => {
  const navigate = useNavigate();

  const [stockName, setStockName] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchedData, setSearchedData] = useState<string[]>(isExistItemLocalStorage('searchedList') ? getItemLocalStorage('searchedList') : []);
  const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);

  const callbackRef = useCallback((current: HTMLDivElement) => {
    current?.focus();
  }, []);

  useEffect(() => {
    // searchedData 값이 변경될 때 localStorage에 저장
    setItemLocalStorage('searchedList', searchedData);
  }, [searchedData]);

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setStockName(e.target.value.trim());
  };

  const searchBarInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(stockName);
    }
  };

  const handleSearch = (stockName: string) => {
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

  return (
    <>
      <SearchBarDiv>
        <SearchBarContainer
          ref={callbackRef}
          tabIndex={-1}
          onBlur={(e: React.FocusEvent<HTMLDivElement, Element>) => !e.relatedTarget && setActiveSearchBar(false)}
        >
          <SearchBarInputContainer>
            <SearchBarInput
              value={searchValue}
              type="text"
              onChange={handleSearchValueChange}
              onKeyDown={searchBarInputKeyDown}
              onFocus={() => setActiveSearchBar(true)}
              placeholder={'입력'}
            />
            <SearchSVG stroke="white" style={{ cursor: 'pointer' }} onClick={() => handleSearch(stockName)} />
          </SearchBarInputContainer>
          <ExpandSearchBar active={activeSearchBar}>
            {stockName == '' ? (
              <RecentSearchList searchedData={searchedData} handleSearch={handleSearch} deleteRecentSearch={deleteRecentSearch} />
            ) : (
              <AutoCompleteList />
            )}
          </ExpandSearchBar>
        </SearchBarContainer>
      </SearchBarDiv>
    </>
  );
};

export default SearchBar;
