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
    { id: 4, score: 50, stockName: '테슬라' },
    { id: 5, score: 90, stockName: '애플' },
    { id: 6, score: 20, stockName: '엔비디아' },
    { id: 7, score: 90, stockName: '애플' },
    { id: 8, score: 50, stockName: '테슬라' },
    { id: 9, score: 20, stockName: '엔비디아' },
  ];
  const drop: CardInterface[] = [
    { id: 1, score: 90, stockName: '애플' },
    { id: 2, score: 50, stockName: '테슬라' },
    { id: 3, score: 20, stockName: '엔비디아' },
    { id: 4, score: 50, stockName: '테슬라' },
    { id: 5, score: 90, stockName: '애플' },
    { id: 6, score: 20, stockName: '엔비디아' },
    { id: 7, score: 90, stockName: '애플' },
    { id: 8, score: 50, stockName: '테슬라' },
    { id: 9, score: 20, stockName: '엔비디아' },
  ];

  return (
    <>
      <div>
        <h2>가장 주목받고 있는 인간 지표</h2>
        <CardList list={popular} />
      </div>

      <div>
        <h2>민심 떡상 지표</h2>
        <CardList list={soar} />
      </div>

      <div>
        <h2>민심 떡락 지표</h2>
        <CardList list={drop} />
      </div>

      <button onClick={() => alert('사용 설명서 팝업')}>{'인간 지표 사용 설명서'}</button>
    </>
  );
};

export default Home;
