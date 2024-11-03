import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../router';
import SearchBar from './SearchBar';
import { isExistItemLocalStorage, getItemLocalStorage, setItemLocalStorage } from '../utils/LocalStorage';
import styled from '@emotion/styled';

const HeaderLogo = styled(({ src, onClick, className }: { src: string; onClick?: (e: any) => void; className?: string }) => {
  return (
    <div onClick={onClick} className={className}>
      <img src={src} />
    </div>
  );
})({
  padding: '28px 48px',
  ['img']: {
    height: '32px',
    cursor: 'pointer',
  },
});

const HeaderContainer = styled(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>;
})({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Header = () => {
  const navigate = useNavigate();

  const [stockName, setStockName] = useState<string>('');
  const [searchedData, setSearchedData] = useState<string[]>(isExistItemLocalStorage('searchedList') ? getItemLocalStorage('searchedList') : ['123', '123']);

  useEffect(() => {
    // searchedData 값이 변경될 때 localStorage에 저장
    setItemLocalStorage('searchedList', searchedData);
  }, [searchedData]);

  const handleStockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);
  };

  const handleStockNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <HeaderContainer>
        <HeaderLogo src="/src/assets/logo.svg" onClick={() => navigate('/')} />
        <div>
          <SearchBar stockName={stockName} onChange={handleStockNameChange} onKeyDown={handleStockNameKeyDown}></SearchBar>
          <button onClick={() => handleSearch(stockName)}>검색</button>
          {searchedData.map((curStockName: string, index: number) => (
            <span key={index}>
              <span onClick={() => handleSearch(curStockName)}>{curStockName}</span>
              <button onClick={() => deleteRecentSearch(curStockName)} aria-label="delete">
                {'X'}
              </button>
            </span>
          ))}
        </div>
      </HeaderContainer>
    </>
  );
};

export default Header;
