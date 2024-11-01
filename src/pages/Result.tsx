import { useLocation } from 'react-router-dom';

const Result = () => {
	const { state } = useLocation();
	const stockName = state?.stockName;

	return (
		<>
			<div>주식종목 검색 결과 화면이에요</div>
			<div>지금은 그냥 검색한거 넣엇슴</div>
			{stockName}
		</>
	);
};

export default Result;
