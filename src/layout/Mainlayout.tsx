import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../router';
import SearchBar from './SearchBar';

type MainLayoutProps = {
	children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutProps) => {
	const navigate = useNavigate();

	const [stockName, setStockName] = useState<string>('');
	const [searchedData, setSearchedData] = useState<string[]>(JSON.parse(localStorage.getItem('searchedList') ?? ''));

	useEffect(() => {
		// searchedData 값이 변경될 때 localStorage에 저장
		localStorage.setItem('searchedList', JSON.stringify(searchedData));
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
		const nextData = Array.from(new Set([...searchedData, stockName]));
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
			<div>Mainlayout 입니당 CSS 나중에 반영할게용</div>
			<button onClick={() => navigate('/')}>로고 : 누르면 홈으로 이동</button>
			<div>
				<SearchBar stockName={stockName} onChange={handleStockNameChange}></SearchBar>
				<button onClick={() => handleSearch(stockName)}>검색</button>
				{searchedData.map((curStockName: string, index: number) => (
					<span key={index}>
						<span>{curStockName}</span>
						<button onClick={() => deleteRecentSearch(curStockName)} aria-label="delete">
							{'X'}
						</button>
					</span>
				))}
			</div>
			{children}
		</>
	);
};

export default Mainlayout;
