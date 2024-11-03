import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../router';
import { isExistItemLocalStorage, getItemLocalStorage, setItemLocalStorage } from '../utils/LocalStorage';
import styled from '@emotion/styled';

const SearchBarDiv = styled.div({
  position: 'relative',
  width: '100%',
  marginBottom: '57px',
});

interface SearchBarContainerProps {
  active: boolean;
}

const SearchBarContainer = styled.div<SearchBarContainerProps>(
  {
    position: 'absolute',
    width: '100%',
    border: '1px solid white',
    background: '#222222',
    // height: 100,
  },
  (props) =>
    props.active
      ? {
          borderRadius: '20px',
        }
      : {
          borderRadius: '20px',
        },
);

const SearchBarInputContainer = styled.div({
  position: 'relative',
  padding: '12px 32px',
  display: 'flex',
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

const ExpandSearchBar = styled(({ children, className, active }: ExpandSearchBarProps) => {
  return (
    <div className={className}>
      <hr />
      {children}
    </div>
  );
})({ padding: '0 12px 24px' }, (props) => (props.active ? {} : { display: 'none' }));

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
})({ display: 'flex', flexDirection: 'column', gap: '8px' });

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
      <button onClick={deleteItem}>X</button>
    </div>
  );
})({
  display: 'flex',
  margin: 0,
  padding: '0 20px',
  fontSize: '24px',
  ['>span:first-of-type']: {
    width: '100%',
  },
  ['p']: {
    margin: 0,
    cursor: 'pointer',
  },
  ['button']: {
    padding: 0,
  },
});

const SearchBar = () => {
  const navigate = useNavigate();

  const [stockName, setStockName] = useState<string>('');
  const [searchedData, setSearchedData] = useState<string[]>(isExistItemLocalStorage('searchedList') ? getItemLocalStorage('searchedList') : []);
  const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);

  const callbackRef = useCallback((current: HTMLDivElement) => {
    current?.focus();
  }, []);

  useEffect(() => {
    // searchedData 값이 변경될 때 localStorage에 저장
    setItemLocalStorage('searchedList', searchedData);
  }, [searchedData]);

  const handleStockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);
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
        <SearchBarContainer ref={callbackRef} tabIndex={-1} onBlur={(e) => !e.relatedTarget && setActiveSearchBar(false)} active={activeSearchBar}>
          <SearchBarInputContainer>
            <SearchBarInput
              value={stockName}
              type="text"
              onChange={handleStockNameChange}
              onKeyDown={searchBarInputKeyDown}
              onFocus={() => setActiveSearchBar(true)}
              placeholder={'입력'}
            />
            <div style={{ cursor: 'pointer' }} onClick={() => handleSearch(stockName)}>
              Search
            </div>
          </SearchBarInputContainer>
          <ExpandSearchBar active={activeSearchBar}>
            <RecentSearchList searchedData={searchedData} handleSearch={handleSearch} deleteRecentSearch={deleteRecentSearch} />
          </ExpandSearchBar>
        </SearchBarContainer>
      </SearchBarDiv>
    </>
  );
};

export default SearchBar;
