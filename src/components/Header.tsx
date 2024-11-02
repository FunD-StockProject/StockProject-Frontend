import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../router';
import SearchBar from './SearchBar';
import { isExistItemLocalStorage, getItemLocalStorage, setItemLocalStorage } from '../utils/LocalStorage';
import logo from '../assets/logo.svg';

const Header = () => {
  const navigate = useNavigate();

  const [stockName, setStockName] = useState<string>('');
  const [searchedData, setSearchedData] = useState<string[]>(isExistItemLocalStorage('searchedList') ? getItemLocalStorage('searchedList') : []);

  useEffect(() => {
    // searchedData 값이 변경될 때 localStorage에 저장
    setItemLocalStorage('searchedList', searchedData);
  }, [searchedData]);

  const handleStockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);
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
      <img src={logo} onClick={() => navigate('/')} />
      <div>
        <div>
          <SearchBar stockName={stockName} onChange={handleStockNameChange}></SearchBar>
          <button onClick={() => handleSearch(stockName)}>검색</button>
        </div>
        {searchedData.map((curStockName: string, index: number) => (
          <span key={index}>
            <span onClick={() => handleSearch(curStockName)}>{curStockName}</span>
            <button onClick={() => deleteRecentSearch(curStockName)} aria-label="delete">
              {'X'}
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default Header;
