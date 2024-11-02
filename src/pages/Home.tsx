import CardList from '../layout/CardList';
import { CardInterface } from '../ts/interfaces';

const Home = () => {
  const popular: CardInterface[] = [
    { id: 1, score: 90 },
    { id: 2, score: 50 },
    { id: 3, score: 20 },
  ];
  const soar: CardInterface[] = [
    { id: 1, score: 90 },
    { id: 2, score: 50 },
    { id: 3, score: 20 },
  ];
  const drop: CardInterface[] = [
    { id: 1, score: 90 },
    { id: 2, score: 50 },
    { id: 3, score: 20 },
  ];

  return (
    <>
      <div>가장 주목받고 있는 인간 지표</div>
      <CardList list={popular} />

      <div>민심 떡상 지표</div>
      <CardList list={soar} />

      <div>민심 떡락 지표</div>
      <CardList list={drop} />
    </>
  );
};

export default Home;
