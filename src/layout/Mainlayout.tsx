import { useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { webPath } from '../router';

type MainLayoutProps = {
	children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutProps) => {
	const [stockName, setStockName] = useState('');
	const navigate = useNavigate();

	useState('');
	const onChange = (e: any) => {
		setStockName(e?.target.value);
	};

	const onClick = (stockName: string) => {
		const stockId = stockName.length;
		navigate(webPath.search(), { state: { stockId } });
	};

	return (
		<>
			<div>Mainlayout 입니당 CSS 나중에 반영할게용</div>
			<button onClick={() => navigate('/')}>로고 : 누르면 홈으로 이동</button>
			<div>
				<SearchBar stockName={stockName} onChange={onChange}></SearchBar>
				<button onClick={() => onClick(stockName)}>검색</button>
			</div>
			{children}
		</>
	);
};

export default Mainlayout;
