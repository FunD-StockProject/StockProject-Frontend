import { useLocation } from 'react-router-dom';

const Result = () => {
	const { state } = useLocation();
	const { stockId } = state;

	return (
		<>
			<div>주식종목 검색 결과 화면이에요</div>
			<div>지금은 그냥 검색한거 길이를 stockId로 넣엇슴</div>
			{stockId}
		</>
	);
};

export default Result;
