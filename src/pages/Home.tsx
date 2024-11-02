import CardList from '../layout/CardList/CardList';
import { CardInterface } from '../ts/Interfaces';

const Home = () => {
  const popular: CardInterface[] = [
    { id: 1, score: 90, stockName: '애플' },
    { id: 2, score: 50, stockName: '테슬라' },
    { id: 3, score: 20, stockName: '엔비디아' },
  ];
  const soar: CardInterface[] = [
    { id: 1, score: 90, stockName: '애플' },
    { id: 2, score: 50, stockName: '테슬라' },
    { id: 3, score: 20, stockName: '엔비디아' },
  ];
  const drop: CardInterface[] = [
    { id: 1, score: 90, stockName: '애플' },
    { id: 2, score: 50, stockName: '테슬라' },
    { id: 3, score: 20, stockName: '엔비디아' },
  ];

  return (
    <>
      <div>가장 주목받고 있는 인간 지표</div>
      <CardList list={popular} />

      <div>민심 떡상 지표</div>
      <CardList list={soar} />

      <div>민심 떡락 지표</div>
      <CardList list={drop} />
      <button onClick={() => alert('사용 설명서 팝업')}>{'인간 지표 사용 설명서'}</button>
    </>
  );
};

export default Home;
