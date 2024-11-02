import CardList from '../layout/CardList';

interface CardInterface {
  id: number;
  score: number;
}

const Home = () => {
  const popular: CardInterface[] = [{ id: 1, score: 90 }];
  const soar: CardInterface[] = [{ id: 2, score: 80 }];
  const drop: CardInterface[] = [{ id: 3, score: 70 }];

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
