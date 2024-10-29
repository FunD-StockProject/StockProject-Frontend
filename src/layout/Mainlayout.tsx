import {
	JSXElementConstructor,
	ReactElement,
	ReactNode,
	ReactPortal,
	useState,
} from 'react';
import SearchBar from './SearchBar';
import { json, useNavigate } from 'react-router-dom';
import { webPath } from '../router';

type MainLayoutProps = {
	children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutProps) => {
	const [stockName, setStockName] = useState('');
	const [searchedData, setSearchedData] = useState(
		JSON.parse(localStorage.getItem('searchedList') + '') ?? []
	);
	const navigate = useNavigate();

	useState('');
	const onChange = (e: any) => {
		setStockName(e.target.value);
	};

	const onClick = (stockName: string) => {
		// 최근 검색 기록 추가
		let curDataSet = new Set(searchedData);
		curDataSet.add(stockName);
		const nextData = [...curDataSet];
		localStorage.setItem('searchedList', JSON.stringify(nextData));
		setSearchedData(nextData);

		setStockName('');
		navigate(webPath.search(), { state: { stockName } });
	};
	const onDelete = (stockName: string) => {
		let curData = searchedData;
		const nextData = curData.filter((el: string) => el !== stockName);
		localStorage.setItem('searchedList', JSON.stringify(nextData));
		setSearchedData(nextData);
	};

	return (
		<>
			<div>Mainlayout 입니당 CSS 나중에 반영할게용</div>
			<button onClick={() => navigate('/')}>로고 : 누르면 홈으로 이동</button>
			<div>
				<SearchBar stockName={stockName} onChange={onChange}></SearchBar>
				<button onClick={() => onClick(stockName)}>검색</button>
				{searchedData.map((stockName: string) => (
					<span>
						<span>{stockName}</span>
						<button onClick={() => onDelete(stockName)} aria-label="delete">
							{'delete'}
						</button>
					</span>
				))}
			</div>
			{children}
		</>
	);
};

export default Mainlayout;
